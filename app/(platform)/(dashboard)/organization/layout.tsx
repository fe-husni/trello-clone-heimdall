const OrganizationLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="pt-32">
      {children}
    </main>
  );
};

export default OrganizationLayout;