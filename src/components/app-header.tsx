import LogoutSession from "./logout-session";

type AppHeaderProps = {
  leftSection: React.ReactNode;
  rightSection?: React.ReactNode;
  confirmWhenLoggingOut?: boolean;
};

const AppHeader = ({
  leftSection,
  rightSection,
  confirmWhenLoggingOut = false,
}: AppHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-border bg-background/50 backdrop-blur-sm rounded-lg p-4">
      <div className="space-y-3">{leftSection}</div>
      {rightSection ?? (
        <LogoutSession confirmWhenLoggingOut={confirmWhenLoggingOut} />
      )}
    </header>
  );
};

export default AppHeader;
