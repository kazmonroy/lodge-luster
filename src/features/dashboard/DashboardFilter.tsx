import TableFilters from '../../ui/TableFilters';

export interface Options {
  value: string;
  label: string;
}

function DashboardFilter() {
  const filterField = 'last';
  const filterOptions: Options[] = [
    {
      label: 'Last 7 days',
      value: '7',
    },
    {
      label: 'Last 30 days',
      value: '30',
    },
    {
      label: 'Last 90 days',
      value: '90',
    },
  ];
  return (
    <TableFilters filterField={filterField} filterOptions={filterOptions} />
  );
}

export default DashboardFilter;
