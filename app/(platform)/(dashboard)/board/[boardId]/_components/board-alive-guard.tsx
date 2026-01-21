"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
};

export function BoardAliveGuard({ boardId, orgId }: { boardId: string; orgId: string }) {
  const router = useRouter();

  const { error } = useSWR(`/api/boards/${boardId}`, fetcher, {
    refreshInterval: 2000,
    revalidateOnFocus: true,
  });

  useEffect(() => {
    // HANYA redirect kalau benar-benar 404/unauthorized
    if (error && error.message === "404") {
      console.log("Board not found, redirecting...");
      router.replace(`/organization/${orgId}`);
    }
  }, [error, orgId, router, boardId]);

  return null;
}
