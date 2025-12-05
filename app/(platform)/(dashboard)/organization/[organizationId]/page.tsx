// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

import { ensureUserInDb } from "@/lib/ensure-user";
import { ensureOrgInDb } from "@/lib/ensure-org";

const OrganizationIdPage = async () => {
  await ensureUserInDb();
  await ensureOrgInDb();
  return (
    <div>
      Organization Page!
      {/* <OrganizationSwitcher/> */}
    </div>
  );
};

export default OrganizationIdPage;