import { HiXMark } from 'react-icons/hi2';
import styles from './styles/Modal.module.css';

import Row from './Row';
import { createPortal } from 'react-dom';
interface Props {
  children?: JSX.Element;
  onClose?: () => void;
}

function Modal({ children, onClose }: Props) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Row direction='horizontal'>
          <h3>Create new cabin</h3>
          <button className={styles.btnModal} onClick={onClose}>
            <HiXMark />
          </button>
        </Row>

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
