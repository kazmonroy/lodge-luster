import { formatCurrency } from '../../utils/helpers';
import { Cabin } from '../../services/types/collection';
import { useCreateCabin } from './hooks/useCreateCabin';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import {
  HiOutlineClipboardDocument,
  HiOutlinePencilSquare,
  HiXMark,
} from 'react-icons/hi2';
import styles from './styles/CabinRow.module.css';
import Spinner from '../../ui/Spinner';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menu from '../../ui/Menu';

const emptyCabin =
  'https://wgjzrjfkwsremzyxnsxm.supabase.co/storage/v1/object/public/cabin-images/cabin-empty.png';

function CabinRow({ cabin }: { cabin: Cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

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
      <Table.Row key={cabinId}>
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
            <Menu.Content>
              <Menu.Toggle id={cabinId!} />
              <Menu.List id={cabinId!}>
                <Menu.Button
                  icon={<HiOutlineClipboardDocument />}
                  onClick={() => handleDuplicate()}
                >
                  Duplicate
                </Menu.Button>

                <Modal.Open opens='cabin-edit'>
                  <Menu.Button icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menu.Button>
                </Modal.Open>

                <Modal.Open opens='cabin-delete'>
                  <Menu.Button icon={<HiXMark />}>Delete</Menu.Button>
                </Modal.Open>
              </Menu.List>

              <Modal.Window name='cabin-edit' title={`Edit cabin ${name}`}>
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name='cabin-delete' title={`Delete cabin ${name}`}>
                <ConfirmDelete
                  itemName={name!}
                  onConfirm={() => handleDelete(cabinId!)}
                />
              </Modal.Window>
            </Menu.Content>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
