import styles from './styles/Row.module.css';

interface Props {
  children: JSX.Element[] | JSX.Element;
  direction?: string;
  gap?: number;
}
function Row({ children, direction = 'vertical', gap = 0 }: Props) {
  return (
    <div
      style={{ gap: `${gap}rem` }}
      className={`${styles.row} ${styles[direction]}`}
    >
      {children}
    </div>
  );
}

export default Row;
