import { ReactNode } from 'react';
import { Booking } from '../../services/types/collection';
import styles from './styles/TodaysList.module.css';

interface Props {
  data: Booking[];
  render: () => ReactNode;
}
function TodaysList({ data, render }: Props) {
  return <div className={styles.todaysList}>{data.map(render)}</div>;
}

export default TodaysList;
