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
import { useCheckin } from './hooks/useCheckin';
import { useSettings } from '../settings/hooks/useSettings';

function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings: { breakfastPrice } = {}, isLoading: isLoadingSettings } =
    useSettings();

  const {
    status,
    id: bookingId,
    isPaid,
    totalPrice,
    hasBreakfast,
    numNights,
    numGuests,

    guests: { fullName: guestName } = {},
  } = booking;

  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
  }, [booking, isPaid]);

  useEffect(() => {
    setAddBreakfast(hasBreakfast ?? false);
  }, [booking, hasBreakfast]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return <p>No bookings at the moment</p>;

  const optionalBreakfastPrice = breakfastPrice! * numNights * numGuests;
  const finalBookingPrice = addBreakfast
    ? optionalBreakfastPrice + totalPrice
    : totalPrice;

  const handleCheckIn = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: finalBookingPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  };

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
          id='breakfast'
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((prev) => !prev);
            setConfirmPaid(false);
          }}
        >
          <span>
            Want to add breakfast for
            <span> {formatCurrency(optionalBreakfastPrice!)}?</span>
          </span>
        </Checkbox>
      </div>

      <div className={styles.box}>
        <Checkbox
          id='totalPrice'
          disabled={confirmPaid!}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          <span>
            I confirm that {guestName} has paid the total amount of{' '}
            <span>
              {formatCurrency(finalBookingPrice)}{' '}
              {addBreakfast
                ? `(${formatCurrency(totalPrice)} + ${formatCurrency(
                    optionalBreakfastPrice
                  )})`
                : ''}
            </span>
          </span>
        </Checkbox>
      </div>

      <div className={styles.buttonsGroup}>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
      </div>
    </>
  );
}

export default CheckInBooking;
