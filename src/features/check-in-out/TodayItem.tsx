import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';
import styles from './styles/TodayItem.module.css';
interface Props {
  activity: {
    id: string;
    status: string;
    guests: { countryFlag: string; country: string; fullName: string };
    numNights: number;
  };
}

function TodayItem({ activity }: Props) {
  const { id, status, guests, numNights } = activity;

  const navigate = useNavigate();
  const handleClick = () => navigate(`/checkin/${id}`);
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
        <Button size='small' onClick={handleClick}>
          Check in
        </Button>
      )}
    </div>
  );
}

export default TodayItem;
