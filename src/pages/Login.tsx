import LoginForm from '../features/auth/LoginForm';
import Logo from '../ui/Logo';
import styles from '../ui/styles/Login.module.css';
function Login() {
  return (
    <main className={styles.loginLayout}>
      <Logo />
      <LoginForm />
    </main>
  );
}

export default Login;
