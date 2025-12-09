// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";

const OrganizationIdPage = () => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Info/>
      <Separator/>
      <div className="px-2 md:px-4">
        <BoardList/>
      </div>
    </div>
  );
};

export default OrganizationIdPage;