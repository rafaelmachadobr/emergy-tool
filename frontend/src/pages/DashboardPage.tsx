import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="mb-2 flex items-center justify-between space-y-2">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Button>Download</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
