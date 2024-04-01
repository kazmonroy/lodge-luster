import { useTodaysActivity } from './hooks/useTodaysActivity';
import styles from './styles/TodaysActivity.module.css';

function TodaysActivity() {
  const { stays, isLoading } = useTodaysActivity();

  console.log(stays);
  return (
    <div className={styles.todaysActivity}>
      <h2>Today</h2>
    </div>
  );
}

export default TodaysActivity;
