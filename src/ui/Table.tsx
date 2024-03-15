import { createContext, useContext } from 'react';
import styles from './styles/Table.module.css';
interface Context {
  columns: string;
}

interface TableProps {
  children: JSX.Element[];
  columns: string;
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
    <div
      style={{ gridTemplateColumns: columns }}
      className={`${styles.tableHeader}`}
    >
      {children}
    </div>
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

function Body({ children }: { children: JSX.Element[] }) {
  return <div>{children}</div>;
}

function Footer() {
  return <div></div>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
