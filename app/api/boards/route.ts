import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {

    const { orgId } = await auth();

    if (!orgId) {
        return NextResponse.json([]);
    }

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return NextResponse.json(boards);
}