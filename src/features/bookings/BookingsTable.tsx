import { Booking } from '../../services/types/collection';
import { useBookings } from './hooks/useBookings';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingsTable() {
  const { bookings, isLoading } = useBookings();

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
      <Table.Footer>
        <Pagination count={50} />
      </Table.Footer>
    </Table>
  );
}

export default BookingsTable;
