import { useState } from 'react';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import styles from '../../ui/styles/Form.module.css';
import { useLogin } from './hooks/useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState<string>('test@test.com');
  const [password, setPassword] = useState<string>('test123');
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail(''), setPassword('');
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.login}`}>
      <FormRow label='Email address' direction='vertical'>
        <input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Password' direction='vertical'>
        <input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <Button size='medium' type='submit'>
        {!isLoading ? 'Log in to your account' : <SpinnerMini />}
      </Button>
    </form>
  );
}

export default LoginForm;
