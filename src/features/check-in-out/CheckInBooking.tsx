import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import styles from '../bookings/styles/BookingDetails.module.css';
import useBooking from '../bookings/hooks/useBooking';
import BookingDetailsBox from '../bookings/BookingDetailsBox';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';

function CheckInBooking() {
  const { booking = {}, isLoading } = useBooking();
  const {
    status,
    id: bookingId,
    isPaid,
    totalPrice,
    guests: {
      fullName: guestName,
      email,
      country,
      countryFlag,
      nationalID,
    } = {},
  } = booking;

  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  //   const { checkout, isCheckingOut } = useCheckout();
  //   const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
  }, [booking, isPaid]);

  if (isLoading) return <Spinner />;
  if (!booking) return <p>No bookings at the moment</p>;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row direction='horizontal'>
        <div className={styles.headingGroup}>
          <h1>Booking #{bookingId}</h1>
          <Tag type={statusToTagName['unconfirmed']}>
            {status!.replace('-', ' ')}
          </Tag>
        </div>
        <Button style='text' onClick={moveBack}>
          &larr; Back
        </Button>
      </Row>

      <BookingDetailsBox booking={booking} />

      <div className={styles.box}>
        <Checkbox
          id={bookingId}
          disabled={isPaid!}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          <span>
            I confirm that {guestName} has paid the total amount of{' '}
            {formatCurrency(totalPrice)}
          </span>
        </Checkbox>
      </div>

      <div className={styles.buttonsGroup}>
        <Button onClick={() => console.log('checkin')} disabled={!confirmPaid}>
          Check in booking {bookingId}
        </Button>
      </div>
    </>
  );
}

export default CheckInBooking;