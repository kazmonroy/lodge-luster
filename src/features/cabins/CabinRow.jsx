import { formatCurrency } from '../../utils/helpers';
import styles from './styles/CabinRow.module.css';

const emptyCabin =
  'https://wgjzrjfkwsremzyxnsxm.supabase.co/storage/v1/object/public/cabin-images/cabin-empty.png';
function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,

    image,
  } = cabin;
  return (
    <div className={styles.cabinRow} key={cabinId}>
      <img src={image ? image : emptyCabin} alt={name} />
      <div>{name}</div>
      <div>{maxCapacity} guests</div>
      <div className={styles.price}>{formatCurrency(regularPrice)}</div>
      {discount ? (
        <div className={styles.discount}>{formatCurrency(discount)}</div>
      ) : (
        <span>&mdash;</span>
      )}
      <button>Delete</button>
    </div>
  );
}

export default CabinRow;
