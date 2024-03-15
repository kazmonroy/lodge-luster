import TableFilters from '../../ui/TableFilters';

function CabinTableFilters() {
  const filterField = 'discount';
  const filterOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'No Discount',
      value: 'no-discount',
    },
    {
      label: 'With Discount',
      value: 'with-dicount',
    },
  ];
  return (
    <TableFilters filterField={filterField} filterOptions={filterOptions} />
  );
}

export default CabinTableFilters;
