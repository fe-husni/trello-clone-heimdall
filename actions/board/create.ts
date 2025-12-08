"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prismadb } from "@/lib/prismadb";
import { requireOrgMember } from "@/lib/require-org-member";
import { ok, fail, type ActionState } from "../_types";

// input schema
const Schema = z.object({
    title:z.string().min(3).max(255),
})

export async function createBoard(input: z.infer<typeof Schema>): Promise<ActionState<{ boardId: string }>> {
  try{
    // 1) validasi input
    const { orgDbId } = await requireOrgMember();
    const {title} = Schema.parse(input);
    
    // 2) create board
    const board = await prismadb.board.create({
        data: {
            title,
            organizationId: orgDbId,
        },
        select: { id: true },
    });

    // 3) revalidate path
    revalidatePath("/organization/[orgId]/boards");
    
    return ok({ boardId: board.id });
  } catch (e: any) {
    return fail(new Error(e?.message || "Gagal membuat board baru"));
  }
}