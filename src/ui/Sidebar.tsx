import styles from './styles/Sidebar.module.css';
import Logo from './Logo';
import Navbar from './Navbar';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Navbar />
    </aside>
  );
}

export default Sidebar;
