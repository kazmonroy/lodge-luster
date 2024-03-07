import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import styles from './styles/CabinRow.module.css';
import { Cabin } from '../../services/types/collection';

interface Props {
  cabin: Cabin;
}

const emptyCabin =
  'https://wgjzrjfkwsremzyxnsxm.supabase.co/storage/v1/object/public/cabin-images/cabin-empty.png';
function CabinRow({ cabin }: Props) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,

    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCabin,
    queryKey: ['cabins'],
    onSuccess: () => {
      alert(`Cabin ${cabinId} deleted!`);
      queryClient.cancelQueries({ queryKey: ['cabins'] });
    },
  });

  const handleDelete = (id: number) => {
    mutate(id);
  };
  return (
    <div className={styles.cabinRow} key={cabinId}>
      <img src={image ? image : emptyCabin} alt={name!} />
      <div>{name}</div>
      <div>{maxCapacity} guests</div>
      <div className={styles.price}>{formatCurrency(regularPrice!)}</div>
      {discount ? (
        <div className={styles.discount}>{formatCurrency(discount)}</div>
      ) : (
        <span>&mdash;</span>
      )}
      <button onClick={() => handleDelete(cabinId)}>Delete</button>
    </div>
  );
}

export default CabinRow;