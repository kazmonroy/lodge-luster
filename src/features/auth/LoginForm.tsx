import { useState } from 'react';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import styles from '../../ui/styles/Form.module.css';
import { login } from '../../services/apiAuth';
function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  //   const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
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
          //   disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Password' direction='vertical'>
        <input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          //   disabled={isLoading}
        />
      </FormRow>

      <Button size='medium'>
        {/* {!isLoading ? 'Log in' : <SpinnerMini />} */}
        Log in to your account
      </Button>
    </form>
  );
}

export default LoginForm;
