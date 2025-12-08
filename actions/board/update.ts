"use server"

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prismadb } from "@/lib/prismadb";
import { requireOrgMember } from "@/lib/require-org-member";
import { ok, fail, type ActionState } from "../_types";

// input schema
const Schema = z.object({
    boardId: z.string().min(1),
    title: z.string().min(3).max(255),
});

export async function updateBoard(input: z.infer<typeof Schema>): Promise<ActionState<{ id: string }>> {
  try {
    const { orgDbId } = await requireOrgMember();
    const { boardId, title } = Schema.parse(input);

    //memastikan board ada
    const board = await prismadb.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgDbId,
        },
        select: { id: true },
    });
    if (!board) return fail(new Error("Board tidak ditemukan"));

    //update logic 
    const updatedBoard = await prismadb.board.update({
        where: { id: boardId },
        data: { title },
        select: { id: true },
    });
    
    revalidatePath("/organization/[orgId]/boards");
    return ok(updatedBoard);
  }catch (e: any) {
    return fail(new Error(e?.message || "Gagal mengupdate board"));
  }  
}