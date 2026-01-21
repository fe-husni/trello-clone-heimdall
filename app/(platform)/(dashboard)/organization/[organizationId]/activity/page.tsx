import { Accessibility } from "lucide-react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { Suspense } from "react";
import { BoardList, BoardListSkeleton } from "../_components/board-list";


const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;