import { formatCurrency } from '../../utils/helpers';

import { Cabin } from '../../services/types/collection';

import styles from './styles/CabinRow.module.css';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';

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

  const [showForm, setShowForm] = useState<boolean>(false);

  const { deleteCabin, isDeleting } = useDeleteCabin();

  const handleDelete = (id: number) => {
    deleteCabin(id);
  };

  if (isDeleting) return <Spinner />;
  return (
    <>
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
        <div>
          <Button onClick={() => setShowForm((prev) => !prev)}>Edit</Button>

          <Button onClick={() => handleDelete(cabinId)}>Delete</Button>
        </div>
      </div>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
