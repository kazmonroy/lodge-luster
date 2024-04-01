import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';
import styles from './styles/TodayItem.module.css';
import { useCheckout } from './hooks/useCheckout';
interface Props {
  activity: {
    id: string;
    status: string;
    guests: { countryFlag: string; country: string; fullName: string };
    numNights: number;
  };
}

function TodayItem({ activity }: Props) {
  const { id: bookingId, status, guests, numNights } = activity;
  const { checkout } = useCheckout();

  const handleCheckout = () => {
    checkout({ bookingId });
  };

  const navigate = useNavigate();
  const handleCheckIn = () => navigate(`/checkin/${bookingId}`);

  return (
    <div className={styles.todayItem}>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}

      <img
        className={styles.flag}
        src={guests.countryFlag!}
        alt={`Flag of ${guests.country!}`}
      />
      <div className={styles.guest}>{guests.fullName!}</div>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button size='small' onClick={handleCheckIn}>
          Check in
        </Button>
      )}

      {status === 'checked-in' && (
        <Button size='small' onClick={handleCheckout}>
          Check out
        </Button>
      )}
    </div>
  );
}

export default TodayItem;
