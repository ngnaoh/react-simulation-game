import { DashboardUserProvider } from "@/contexts/dashboard-user-provider";

const DashboardUser = () => {
  return (
    <DashboardUserProvider>
      <main className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold text-zinc-400">
            Waiting for the admin to start simulations
          </h1>
          <p className="text-zinc-400">
            Once the admin starts the simulations, you will be able to see the
            simulations
          </p>
        </div>
      </main>
    </DashboardUserProvider>
  );
};

export default DashboardUser;
