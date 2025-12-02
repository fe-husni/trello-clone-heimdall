"use client";

import { UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {
  return (
    <div>
      <UserButton 
      afterSwitchSessionUrl="/"/>
      {/* or use  afterSignOutUrl="/" */}
    </div>
  );
};

export default ProtectedPage;