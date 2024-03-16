import BookingsTable from '../features/bookings/BookingsTable';
import BookingsTableFilter from '../features/bookings/BookingsTableFilter';
import Row from '../ui/Row';

function Bookings() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Bookings</h2>
        <BookingsTableFilter />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
