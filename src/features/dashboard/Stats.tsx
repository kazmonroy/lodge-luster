import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { Booking } from '../../services/types/collection';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

interface Props {
  bookings: Booking[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number | undefined;
}
function Stats({ bookings, confirmedStays, numDays, cabinCount }: Props) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice!, 0);
  const totalCheckins = confirmedStays.length;
  const occupation = Math.round(
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights!, 0) /
      (cabinCount! * numDays)) *
      100
  );

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
      value: formatCurrency(sales),
    },
    {
      title: 'Check ins',
      color: 'indigo',
      icon: <HiOutlineCalendarDays />,
      value: totalCheckins,
    },
    {
      title: 'Occupancy rate',
      color: 'yellow',
      icon: <HiOutlineChartBar />,
      value: `${occupation}%`,
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
