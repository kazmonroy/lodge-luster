import Button from './Button';
import styles from './styles/ErrorFallback.module.css';
import '../index.css';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}
function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <>
      <div className={styles.errorMain}>
        <div className={styles.box}>
          <h1>Something went wrong 🧐</h1>
          <p>{error.message}</p>
          <Button size='small' onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </div>
    </>
  );
}

export default ErrorFallback;
