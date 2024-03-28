import { HiOutlineMoon } from 'react-icons/hi2';
import styles from './styles/DarkModeToggle.module.css';
function DarkModeToggle() {
  return (
    <div className={styles.toggle}>
      <button>
        <HiOutlineMoon />
      </button>
    </div>
  );
}

export default DarkModeToggle;
