import { useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import { useUser } from './hooks/useUser';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

function AuthGuard({ children }: Props) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
}

export default AuthGuard;
