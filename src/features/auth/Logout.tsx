import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';

import Menu from '../../ui/Menu';
import { useLogout } from './hooks/useLogout';

function Logout() {
  const { logout } = useLogout();
  return (
    <Menu.Button onClick={logout} icon={<HiMiniArrowRightOnRectangle />}>
      Log out
    </Menu.Button>
  );
}

export default Logout;
