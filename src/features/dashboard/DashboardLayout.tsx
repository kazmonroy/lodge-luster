import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/hooks/useCabins';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useQueryDate } from './hooks/useQueryDate';
import { useRecentBookings } from './hooks/useRecentBookings';
import { useRecentStays } from './hooks/useRecentStays';
import styles from './styles/DashboardLayout.module.css';

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays } = useRecentStays();
  const { numDays } = useQueryDate();
  const { cabins, isLoading } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoading) return <Spinner />;
  return (
    <div className={styles.dashboard}>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays!}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Todays activities</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
