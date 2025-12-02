// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

import { ensureUserInDb } from "@/lib/ensure-user";

const OrganizationIdPage = async () => {
  await ensureUserInDb();
  return (
    <div>
      Organization Page!
      {/* <OrganizationSwitcher/> */}
    </div>
  );
};

export default OrganizationIdPage;