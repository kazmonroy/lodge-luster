import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import styles from './styles/BookingDetailsBox.module.css';
import { format, isToday } from 'date-fns';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import DataItem from '../../ui/DataItem';
import { Booking } from '../../services/types/collection';

function BookingDetailsBox({ booking = {} }: { booking: Booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;
  return (
    <section className={styles.detailsBox}>
      <div className={styles.detailsHeader}>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} {numNights! <= 1 ? 'night' : 'nights'} in Cabin{' '}
            <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </div>

      <section className={styles.mainSection}>
        <div className={styles.guest}>
          {countryFlag && (
            <img
              src={countryFlag}
              alt={`Flag of ${country}`}
              className={styles.flag}
            />
          )}
          <p>
            {guestName} {numGuests! > 1 ? `+ ${numGuests! - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <div className={`${styles.price} ${isPaid && styles.isPaid}`}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price:`}>
            {formatCurrency(totalPrice!)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice!
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </div>
      </section>

      <div className={styles.detailsFooter}>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </div>
    </section>
  );
}

export default BookingDetailsBox;
