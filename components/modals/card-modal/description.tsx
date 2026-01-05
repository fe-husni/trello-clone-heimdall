"use client";

import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>(data.description || "");

  /** 🔥 REF KHUSUS UNTUK EDITOR */
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  const enableEditing = () => {
    setContent(data.description || "");
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
    setContent(data.description || "");
  };

  useEffect(() => {
    if (!isEditing) {
      setContent(data.description || "");
    }
  }, [data.description, isEditing]);


  /* ===== ESC KEY ===== */
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  });

  /* ===== CLICK OUTSIDE (FIX RADIX PORTAL) ===== */
  useOnClickOutside(editorWrapperRef, (event) => {
    const target = event.target as Node;

    // ⛔ Abaikan klik di Radix Dropdown (portal)
    const radixDropdown = document.querySelector(
      "[data-radix-popper-content-wrapper]"
    );

    if (radixDropdown?.contains(target)) {
      return;
    }

    disableEditing();
  });

  const { execute } = useAction(updateCard, {
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["card", updated.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      });

      toast.success(`Card "${updated.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = () => {
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description: content, // HTML
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />

      <div className="w-full">
        <p className="font-semibold text-neutral-700">Description</p>

        {isEditing ? (
          <div ref={editorWrapperRef} className="mt-2 space-y-2">
            <RichTextEditor value={content} onChange={setContent} />

            <div className="flex items-center gap-x-2">
              <Button type="button" size="sm" onClick={onSubmit}>
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px]  rounded-md mt-2 prose prose-sm prose-neutral max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                data.description ||
                "<p>Add a more detailed description...</p>",
            }}
          />
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
