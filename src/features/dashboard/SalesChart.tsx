import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { Booking } from '../../services/types/collection';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import styles from './styles/SalesChart.module.css';
interface Props {
  bookings: Booking[];
  numDays: number;
}
function SalesChart({ bookings, numDays }: Props) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#9ca3af',
        background: '#18212f',
        border: '1px solid var(--color-grey-100)',
        radius: '.25rem',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#6b7280',
        background: '#fff',
        border: '1px solid var(--color-grey-100)',
        radius: '.25rem',
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice!, 0),
      extrasSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice!, 0),
    };
  });

  return (
    <div className={styles.salesChart}>
      <h2>
        Sales from {format(allDates.at(0)!, 'MMMM dd yyyy')} -{' '}
        {format(allDates.at(-1)!, 'MMMM dd yyyy')}
      </h2>

      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            contentStyle={{
              background: colors.background,
              border: colors.border,
              borderRadius: colors.radius,
            }}
          />
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <Area
            type='monotone'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            unit=' $'
            name='Total sales'
          />

          <Area
            type='monotone'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            unit=' $'
            name='Extra sales'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
