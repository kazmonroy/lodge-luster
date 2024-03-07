import styles from './styles/Row.module.css';
function Row({ children, direction = 'vertical' }) {
  return <div className={`${styles.row} ${styles[direction]}`}>{children}</div>;
}

export default Row;
