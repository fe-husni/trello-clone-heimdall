import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center flex-col font-text">
      <div className="flex items-center justify-center flex-col font-heading">
        <div className="font-semibold mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 project management tools
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-semibold">Heimdall helps team move</h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit font-semibold font-heading">
          work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto font-text">
        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Heimdall.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Heimdall for Free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;