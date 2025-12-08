"use server"

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prismadb } from "@/lib/prismadb";
import { requireOrgMember } from "@/lib/require-org-member";
import { ok, fail, type ActionState } from "../_types";

// input schema
const Schema = z.object({
    boardId: z.string().min(1),
});

export async function deleteBoard(input: z.infer<typeof Schema>): Promise<ActionState<{ id: string }>>{
    try {
        const { orgDbId } = await requireOrgMember();
        const { boardId } = Schema.parse(input);

    const board = await prismadb.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgDbId,
        },
        select: { id: true },
    });
    if (!board) return fail(new Error("Board tidak ditemukan"));
    
    //delete logic
    await prismadb.board.delete({
        where: { id: boardId },
        select: {id : true}
    });
    revalidatePath("/organization/[orgId]/boards");
        return ok({ id: boardId });
    } catch (e : any) {
        return fail(new Error(e?.message || "Gagal menghapus board"));
    }
}