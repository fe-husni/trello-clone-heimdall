import { OrganizationList } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
};