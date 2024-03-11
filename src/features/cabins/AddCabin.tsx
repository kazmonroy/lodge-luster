import { useState } from 'react';
import Button from '../../ui/Button';
import Row from '../../ui/Row';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOnClose = () => setIsOpenModal((prev) => !prev);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((prev) => !prev)}>
        + new cabin
      </Button>
      {/* <Row>{isOpenModal && <CreateCabinForm />}</Row> */}
      <Row>
        {isOpenModal && (
          <Modal onClose={() => handleOnClose?.()}>
            <CreateCabinForm onCloseModal={handleOnClose} />
          </Modal>
        )}
      </Row>
    </div>
  );
}

export default AddCabin;
