import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: {
              width: "100%"
            },
            cardBox: {
              boxShadow: "none",
              width: "100%",
              border: "1px solid #e5e5e5",
              maxWidth: "none"
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%"
            }
          }
        }}
      >

      </OrganizationProfile>
    </div>
  );
};

export default SettingsPage;