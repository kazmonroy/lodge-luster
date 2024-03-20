import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/auth/Logout';
import Menu from './Menu';
import styles from './styles/Header.module.css';
function Header() {
  return (
    <Menu>
      <header className={styles.header}>
        <Menu.Content>
          <Menu.Toggle id='user' icon={<HiOutlineUser />} />
          <Menu.List id='user'>
            <Menu.Button icon={<HiOutlineUser />}>Your profile</Menu.Button>
            <Logout />
          </Menu.List>
        </Menu.Content>
      </header>
    </Menu>
  );
}

export default Header;
