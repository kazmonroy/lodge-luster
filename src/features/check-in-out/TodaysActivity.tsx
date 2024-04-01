import { useTodaysActivity } from './hooks/useTodaysActivity';
import Spinner from '../../ui/Spinner';
import TodaysList from './TodaysList';
import styles from './styles/TodaysActivity.module.css';
import TodayItem from './TodayItem';
import { Booking } from '../../services/types/collection';

function TodaysActivity() {
  const { stays, isLoading } = useTodaysActivity();

  return (
    <div className={styles.todaysActivity}>
      <h2>Today</h2>
      {!isLoading ? (
        stays!.length! > 0 ? (
          <TodaysList
            data={stays!}
            render={(activity: Booking) => (
              <TodayItem key={activity.id} activity={activity} />
            )}
          />
        ) : (
          'No activities today'
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodaysActivity;
