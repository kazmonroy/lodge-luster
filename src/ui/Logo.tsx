import { NavLink } from 'react-router-dom';
import styles from './styles/Logo.module.css';
function Logo() {
  return (
    <NavLink className={styles.logo} to='/'>
      <span>Lodge</span>
      <span>Luster</span>
    </NavLink>
  );
}

export default Logo;
