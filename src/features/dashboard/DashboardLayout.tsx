import styles from './styles/DashboardLayout.module.css';

function DashboardLayout() {
  return (
    <div className={styles.dashboard}>
      <div>Stats</div>
      <div>Todays activities</div>
      <div>stay durations</div>
      <div>sales chart</div>
    </div>
  );
}

export default DashboardLayout;
