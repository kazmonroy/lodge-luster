import { ReactElement } from 'react';
import styles from './styles/Tag.module.css';

function Tag({ type, children }: { type: string; children: string }) {
  return (
    <span
      className={styles.tag}
      style={{
        color: `var(--color-${type}-700)`,
        background: `var(--color-${type}-100)`,
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
