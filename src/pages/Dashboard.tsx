import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import Row from '../ui/Row';

function Dashboard() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Dashboard</h2>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
