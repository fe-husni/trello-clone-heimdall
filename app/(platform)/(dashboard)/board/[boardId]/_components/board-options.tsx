"use client";

import { useParams, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { MoreHorizontal, Trash, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const router = useRouter();
  const params = useParams();
  const orgId = params.orgId as string;

  const { mutate } = useSWRConfig();

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: async () => {
      toast.success("Board deleted successfully");

      await mutate("/api/boards"); // trigger refetch [web:116]

      router.push(`/organization/${orgId}`);
      // router.refresh(); 
    },
    onError: (error) => toast.error(error),
  });

  const onDelete = () => execute({ id });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="end">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="px-2">
              <Button
                variant="destructive"
                disabled={isLoading}
                className="rounded-sm w-full h-auto p-2 px-5 justify-center font-normal text-sm"
              >
                <Trash />
                Delete Board!
              </Button>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this board?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be undone. All data inside this board will be removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                Yes, delete board
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
};
