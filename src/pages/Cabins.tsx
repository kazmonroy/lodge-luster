import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Row from '../ui/Row';
import Button from '../ui/Button';

function Cabins() {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <>
      <Row direction='horizontal'>
        <h2>All Cabins</h2>
        <p>Filter / sort </p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((prev: boolean) => !prev)}>
          add new cabin
        </Button>
      </Row>
      <Row>{showForm && <CreateCabinForm />}</Row>
    </>
  );
}

export default Cabins;
