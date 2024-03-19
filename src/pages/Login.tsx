import LoginForm from '../features/auth/LoginForm';
import Logo from '../ui/Logo';
import styles from '../ui/styles/Login.module.css';
function Login() {
  return (
    <main className={styles.loginLayout}>
      <Logo />
      <h2>Log in to your account</h2>
      <LoginForm />
    </main>
  );
}

export default Login;
