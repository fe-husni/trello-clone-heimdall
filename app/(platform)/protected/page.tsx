"use client";

import { UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {
  return (
    <div>
      <UserButton 
      afterSwitchSessionUrl="/"/>
    </div>
  );
};

export default ProtectedPage;