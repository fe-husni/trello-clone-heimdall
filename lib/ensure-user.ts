import { auth, currentUser } from "@clerk/nextjs/server";
import { prismadb } from "@/lib/prismadb";

export async function ensureUserInDb() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser(); // data user dari Clerk (server-side) :contentReference[oaicite:0]{index=0}
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    null;

  await prismadb.user.upsert({
    where: { id: userId },
    update: { email, name, imageUrl: user?.imageUrl || null },
    create: { id: userId, email, name, imageUrl: user?.imageUrl || null },
  });

  return { userId };
}
