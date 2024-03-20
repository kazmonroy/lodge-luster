import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/auth/Logout';
import Menu from './Menu';
import styles from './styles/Header.module.css';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  return (
    <Menu>
      <header className={styles.header}>
        <Menu.Content>
          <Menu.Toggle id='user' icon={<HiOutlineUser />} />
          <Menu.List id='user'>
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
