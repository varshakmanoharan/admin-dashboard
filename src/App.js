import StatisticsCard from './Components/StatisticsCard';
import Sidebar from './Components/Sidebar';
import UserTable from './Components/UserTable';


function App() {
  
  return (
    <div className="flex flex-col md:flex-row">
  <Sidebar className="md:w-1/4" />
  <div className="flex-1 p-8">
    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <StatisticsCard title="Total Users" value="100" />
      <StatisticsCard title="Active Users" value="50" />
      <StatisticsCard title="New Users" value="20" />
    </div>
    <div className="overflow-x-auto mt-4">
      <UserTable />
    </div>
  </div>
</div>

  );
}

export default App;
