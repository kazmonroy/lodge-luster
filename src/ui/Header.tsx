import Logout from '../features/auth/Logout';
import styles from './styles/Header.module.css';
function Header() {
  return (
    <header className={styles.header}>
      <Logout />
    </header>
  );
}

export default Header;
