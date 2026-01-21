import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: { boardId: string } }
) {
  const { orgId } = await auth();
  if (!orgId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
    select: { id: true },
  });
  if (!board) return NextResponse.json({ error: "Not found" }, { status: 404 });

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

  return NextResponse.json(lists);
}
