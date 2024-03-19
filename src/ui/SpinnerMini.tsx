import { BiLoaderAlt } from 'react-icons/bi';
import styles from './styles/Spinner.module.css';

function SpinnerMini() {
  return (
    <div className={styles.spinnerMini}>
      <BiLoaderAlt />
    </div>
  );
}

export default SpinnerMini;
