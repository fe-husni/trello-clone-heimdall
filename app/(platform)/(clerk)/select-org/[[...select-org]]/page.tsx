import { OrganizationList } from "@clerk/nextjs";
// import { Organization } from "@clerk/nextjs/server";
import { ensureUserInDb } from "@/lib/ensure-user";

export default async function CreateOrganizationPage() {

  await ensureUserInDb();
  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
};