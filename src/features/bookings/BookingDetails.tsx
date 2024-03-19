import { useNavigate } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';

import styles from './styles/BookingDetails.module.css';
import useBooking from './hooks/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import BookingDetailsBox from './BookingDetailsBox';
import { useCheckout } from '../check-in-out/hooks/useCheckout';
import { useDeleteBooking } from './hooks/useDeleteBooking';

function BookingDetails() {
  const { booking, isLoading } = useBooking();
  const { checkout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <p>No bookings at the moment</p>;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const handleCheckout = () => {
    checkout({ bookingId });
  };
  const handleDeleteBooking = () => {
    deleteBooking(bookingId, {
      onSettled: () => navigate(-1),
    });
  };

  return (
    <>
      <Row direction='horizontal'>
        <div className={styles.headingGroup}>
          <h1>Booking #{bookingId}</h1>
          <Tag type={statusToTagName[status]}>{status!.replace('-', ' ')}</Tag>
        </div>
        <Button style='text' onClick={moveBack}>
          &larr; Back
        </Button>
      </Row>

      <BookingDetailsBox booking={booking} />

      <div className={styles.buttonsGroup}>
        <Modal>
          <Modal.Open opens='delete'>
            <Button style='danger'>Delete booking</Button>
          </Modal.Open>

          <Modal.Window name='delete' title={`Delete Booking ${bookingId}`}>
            <ConfirmDelete
              itemName='booking'
              disabled={isDeletingBooking}
              onConfirm={handleDeleteBooking}
            />
          </Modal.Window>
        </Modal>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={handleCheckout}>Check out</Button>
        )}
      </div>
    </>
  );
}

export default BookingDetails;
