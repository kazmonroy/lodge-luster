import CabinTable from '../features/cabins/CabinTable';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>All Cabins</h2>
        <p>Filter / sort </p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
