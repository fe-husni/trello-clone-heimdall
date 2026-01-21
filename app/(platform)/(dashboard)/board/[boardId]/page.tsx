import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";

import { BoardNavbar } from "./_components/board-navbar";
import { ListContainer } from "./_components/list-container";

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  noStore();

  const { orgId } = await auth();
  if (!orgId) redirect("/select-org"); // sesuaikan

  const board = await db.board.findFirst({
    where: { id: params.boardId, orgId },
  });
  if (!board) redirect(`/organization/${orgId}`);

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: { orgId },
    },
    include: {
      cards: { orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <BoardNavbar data={board} />
      <div className="pt-24 px-6">
        <ListContainer boardId={params.boardId} data={lists} />
      </div>
    </>
  );
}
