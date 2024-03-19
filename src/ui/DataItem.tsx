import styles from './styles/DataItem.module.css';

interface Props {
  icon: JSX.Element;
  label: string;
  children: JSX.Element | JSX.Element[] | string;
}
function DataItem({ icon, label, children }: Props) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
