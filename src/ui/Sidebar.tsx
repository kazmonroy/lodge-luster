import styles from './styles/Sidebar.module.css';
import Logo from './Logo';
import Navbar from './Navbar';
import Uploader from '../data/Uploader';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Navbar />
      <Uploader />
    </aside>
  );
}

export default Sidebar;
