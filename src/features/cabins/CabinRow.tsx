import { formatCurrency } from '../../utils/helpers';
import { Cabin } from '../../services/types/collection';
import { useCreateCabin } from './hooks/useCreateCabin';
import styles from './styles/CabinRow.module.css';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import {
  HiOutlineClipboardDocument,
  HiOutlinePencilSquare,
  HiXMark,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';

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
    description,
  } = cabin;

  const [showForm, setShowForm] = useState<boolean>(false);

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const handleDelete = (id: number) => {
    deleteCabin(id);
  };

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
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
          <Modal>
            <Modal.Open opens='cabin-edit'>
              <Button onClick={() => setShowForm((prev) => !prev)}>
                <HiOutlinePencilSquare />
              </Button>
            </Modal.Open>

            <Modal.Window name='cabin-edit' title={`Edit cabin ${name}`}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Button onClick={() => handleDelete(cabinId!)}>
            <HiXMark />
          </Button>
          <Button onClick={() => handleDuplicate()}>
            <HiOutlineClipboardDocument />
          </Button>
        </div>
      </div>
    </>
  );
}

export default CabinRow;
