import React from 'react';
import styles from './styles/Main.module.css';

interface Props {
  children: React.ReactNode;
}

function Main({ children }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
  );
}

export default Main;
