import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineCog6Tooth,
  HiOutlineUser,
} from 'react-icons/hi2';
import styles from './styles/Navbar.module.css';

const routes = [
  { path: '/', page: 'Home', icon: <HiOutlineHome /> },
  { path: '/bookings', page: 'Bookings', icon: <HiOutlineCalendarDays /> },
  { path: '/cabins', page: 'Cabins', icon: <HiOutlineHomeModern /> },
  { path: '/users', page: 'Users', icon: <HiOutlineUser /> },
  { path: '/settings', page: 'Settings', icon: <HiOutlineCog6Tooth /> },
];

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        {routes.map((route) => (
          <li key={route.page}>
            <NavLink
              to={route.path}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {route.icon}
              {route.page}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
