import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const OrganizationIdPage = () => {
  return (
    <div>
      Organization Page!
      {/* <OrganizationSwitcher/> */}
    </div>
  );
};

export default OrganizationIdPage;