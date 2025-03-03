import Sidebar from "@/app/components/sidebar";
const Dashboard = () => {
  return (
    <div className="bg-white flex">
      <Sidebar />
      <div className="p-5">
        <div className="mb-3 pb-3 w-full">
          <h1 className="text-black text-5xl font-medium">Events</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
