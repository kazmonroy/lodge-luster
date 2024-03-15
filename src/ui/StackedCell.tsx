import styles from './styles/StackedCell.module.css';

function StackedCell({ children }: { children: JSX.Element[] }) {
  return <div className={styles.stacked}>{children}</div>;
}

export default StackedCell;
