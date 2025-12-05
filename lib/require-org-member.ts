import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/prismadb";

export async function requireOrgMember() {
  const { userId, orgId } = await auth();

  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/select-org");

  // 1) cari org DB berdasarkan clerk 
  const org = await prismadb.organization.findUnique({
    where: { clerkOrgId: orgId },
    select: { id: true },
  });
  if (!org) throw new Error("Organization belum tersync ke DB");

  // 2) cek membership
  const membership = await prismadb.membership.findUnique({
    where: { userId_organizationId: { userId, organizationId: org.id } },
    select: { role: true },
  });
  if (!membership) throw new Error("Forbidden: kamu bukan member organisasi ini");

  return { userId, clerkOrgId: orgId, orgDbId: org.id, role: membership.role };
}
