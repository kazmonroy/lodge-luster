import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>+ new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form' title='Create new cabin'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCabin;
