import Logout from '../features/auth/Logout';
import Menu from './Menu';
import styles from './styles/Header.module.css';
function Header() {
  return (
    <Menu>
      <header className={styles.header}>
        <Menu.Content>
          <Menu.Toggle id='user' />
          <Logout />
        </Menu.Content>
      </header>
    </Menu>
  );
}

export default Header;
