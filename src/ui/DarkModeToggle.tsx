import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import styles from './styles/DarkModeToggle.module.css';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={styles.toggle}>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
      </button>
    </div>
  );
}

export default DarkModeToggle;
