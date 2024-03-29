import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { Booking } from '../../services/types/collection';
import Stat from './Stat';

interface Props {
  bookings: Booking[];
  confirmedStays: Booking[];
}
function Stats({ bookings, confirmedStays }: Props) {
  const numBookings = bookings.length;

  const allStats = [
    {
      title: 'Bookings',
      color: 'blue',
      icon: <HiOutlineBriefcase />,
      value: numBookings,
    },
    {
      title: 'Sales',
      color: 'green',
      icon: <HiOutlineBanknotes />,
      value: numBookings,
    },
    {
      title: 'Check ins',
      color: 'indigo',
      icon: <HiOutlineCalendarDays />,
      value: numBookings,
    },
    {
      title: 'Occupancy rate',
      color: 'yellow',
      icon: <HiOutlineChartBar />,
      value: numBookings,
    },
  ];
  return (
    <>
      {allStats.map((stat) => (
        <Stat
          key={stat.title}
          color={stat.color}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </>
  );
}

export default Stats;
