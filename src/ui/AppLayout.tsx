import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './styles/AppLayout.module.css';
import Main from './Main';
function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
