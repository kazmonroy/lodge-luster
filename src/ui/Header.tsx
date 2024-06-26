import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/auth/Logout';
import Menu from './Menu';
import styles from './styles/Header.module.css';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../features/auth/UserAvatar';
import DarkModeToggle from './DarkModeToggle';
function Header() {
  const navigate = useNavigate();
  return (
    <Menu>
      <header className={styles.header}>
        <DarkModeToggle />
        <Menu.Content>
          <Menu.Toggle id={1} icon={<UserAvatar />} />
          <Menu.List id={1}>
            <Menu.Button
              icon={<HiOutlineUser />}
              onClick={() => navigate('account')}
            >
              Your profile
            </Menu.Button>
            <Logout />
          </Menu.List>
        </Menu.Content>
      </header>
    </Menu>
  );
}

export default Header;
