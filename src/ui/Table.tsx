import { createContext, useContext } from 'react';
import styles from './styles/Table.module.css';
import { Booking, Cabin } from '../services/types/collection';
interface Context {
  columns: string;
}

interface TableProps {
  children: JSX.Element[];
  columns: string;
}

interface BodyProps {
  data: Cabin[] | Booking[];
  render: (arg: Cabin | Booking) => JSX.Element;
}

const TableContext = createContext<Context>({
  columns: '',
});

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className={styles.table} role='table'>
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: JSX.Element[] }) {
  const { columns } = useContext(TableContext);

  return (
    <header
      style={{ gridTemplateColumns: columns }}
      className={`${styles.tableHeader}`}
    >
      {children}
    </header>
  );
}

function Row({ children }: { children: JSX.Element[] }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className={styles.cabinRow}
      role='row'
    >
      {children}
    </div>
  );
}

function Body({ data, render }: BodyProps) {
  if (!data.length) return <div>No data to show at the moment</div>;
  return <section>{data.map(render)}</section>;
}

function Footer({ children }: { children: JSX.Element }) {
  return <div className={styles.footer}>{children}</div>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
