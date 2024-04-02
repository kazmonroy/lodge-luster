import { Booking } from '../../services/types/collection';
import styles from './styles/TodaysList.module.css';

interface Props {
  data: Booking[];
  render: (el: Booking) => JSX.Element;
}
function TodaysList({ data, render }: Props) {
  return <div className={styles.todaysList}>{data.map(render)}</div>;
}

export default TodaysList;
