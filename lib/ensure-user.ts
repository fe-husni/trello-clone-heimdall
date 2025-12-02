import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/prismadb";

export async function ensureUserInDb() {
  const { userId } = await auth();

  //redirect ke sign-in
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    null;

  await prismadb.user.upsert({
    where: { id: userId },
    update: { email, name, avatar: user?.imageUrl || null },
    create: { id: userId, email, name, avatar: user?.imageUrl || null },
  });

  return { userId };
}
