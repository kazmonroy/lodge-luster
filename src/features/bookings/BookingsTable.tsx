import { Booking } from '../../services/types/collection';
import { useBookings } from './hooks/useBookings';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';

function BookingsTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();

  const filterQuery = searchParams.get('status') || 'all';
  const sortByQuery = searchParams.get('sortBy') || 'startDate-asc';

  // Filter
  function filterBookings() {
    let filteredBookings;
    switch (filterQuery) {
      case 'checked-in':
        filteredBookings = bookings?.filter((b) => b.status === 'checked-in');
        break;
      case 'checked-out':
        filteredBookings = bookings?.filter((b) => b.status === 'checked-out');
        break;
      case 'unconfirmed':
        filteredBookings = bookings?.filter((b) => b.status === 'unconfirmed');
        break;
      default:
        filteredBookings = bookings;
        break;
    }
    return filteredBookings;
  }

  const filteredBookings = filterBookings();

  // Sort

  const [field, direction] = sortByQuery.split('-');

  const modifier = direction === 'asc' ? 1 : -1;
  const sortedBookings = filteredBookings?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // console.log('sortedBookings', sortedBookings);

  if (isLoading) return <Spinner />;
  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(booking: Booking) => (
          <BookingRow booking={booking} key={booking.id} />
        )}
      />
    </Table>
  );
}

export default BookingsTable;
