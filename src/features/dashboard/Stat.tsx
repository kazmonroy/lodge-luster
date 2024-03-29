import styles from './styles/Stat.module.css';
interface Props {
  icon: JSX.Element;
  title: string;
  value: string;
  color: string;
}

function Stat({ icon, title, value, color }: Props) {
  const styleIconBg = { backgroundColor: `var(--color-${color}-100)` };
  const styleIcon = { color: `var(--color-${color}-700)` };
  return (
    <div className={styles.stat}>
      <div className={styles.icon} style={styleIconBg}>
        <span style={styleIcon}>{icon}</span>
      </div>
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
  );
}

export default Stat;
