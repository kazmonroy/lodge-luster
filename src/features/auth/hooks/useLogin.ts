import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success('Logged in!'), navigate('/', { replace: true });
    },
    onError: () => toast.error('Provided email or password are incorrect'),
  });
  return { login, isLoading };
}