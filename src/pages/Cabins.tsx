import AddCabin from '../features/cabins/AddCabin';
import CabinTable from '../features/cabins/CabinTable';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>All Cabins</h2>

        <AddCabin />
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
