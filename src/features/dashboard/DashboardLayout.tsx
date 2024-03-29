import Spinner from '../../ui/Spinner';
import { useRecentBookings } from './hooks/useRecentBookings';
import { useRecentStays } from './hooks/useRecentStays';
import styles from './styles/DashboardLayout.module.css';

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays } = useRecentStays();

  console.log(confirmedStays);

  if (isLoadingBookings || isLoadingStays) return <Spinner />;
  return (
    <div className={styles.dashboard}>
      <div>Stats</div>
      <div>Todays activities</div>
      <div>stay durations</div>
      <div>sales chart</div>
    </div>
  );
}

export default DashboardLayout;
