import { db } from "@/lib/db";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";

// export const runtime = "nodejs";


const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Info />
      <Separator />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;