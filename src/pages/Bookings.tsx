import BookingsTable from '../features/bookings/BookingsTable';
import Row from '../ui/Row';

function Bookings() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Bookings</h2>
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
