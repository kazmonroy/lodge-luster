import Button from '../../ui/Button';
import { useLogout } from './hooks/useLogout';

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <Button onClick={logout} disabled={isLoading}>
      Log out
    </Button>
  );
}

export default Logout;
