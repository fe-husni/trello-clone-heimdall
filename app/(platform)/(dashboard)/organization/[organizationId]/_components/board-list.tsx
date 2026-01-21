"use client";

import useSWR from "swr";
import Link from "next/link";
import { User2, SquarePlus, HelpCircle } from "lucide-react";
import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function BoardList() {
  const { data: boards, isLoading, error } = useSWR("/api/boards", fetcher, {
    refreshInterval: 2000, //refresh every 2 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) return <BoardListSkeleton />;
  if (error) return <div>Gagal load boards</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {(boards ?? []).map((board: any) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}

        <FormPopover side="right" sideOffset={10}>
          <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-xl flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
            <SquarePlus />
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

export function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  );
}
