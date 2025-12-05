import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/prismadb";

export async function ensureOrgInDb(paramsOrgId?: string) {
    const {userId,orgId} = await auth();
    if (!userId) redirect("/sign-in");

    const activeOrgId = paramsOrgId ?? orgId;
    if (!activeOrgId) redirect("/select-org");

    //ambil data organization dari clerk
    const org = await (await clerkClient()).organizations.getOrganization({ organizationId: activeOrgId });

    await prismadb.organization.upsert({
        where: { clerkOrgId: activeOrgId},
        update: {
            name: org.name,
            ownerId: userId,
        },
        create: {
            clerkOrgId: activeOrgId,
            name:  org.name,
            ownerId: userId,
        }
    });
    return { userId, orgId: activeOrgId };
}