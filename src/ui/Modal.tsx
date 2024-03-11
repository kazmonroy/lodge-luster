import {
  JSXElementConstructor,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styles from './styles/Modal.module.css';

import Row from './Row';

interface OpenProps {
  children?: any;
  opens: string;
}

interface WindowProps {
  children?: ReactElement<
    { onCloseModal: () => void },
    string | JSXElementConstructor<any>
  >;
  title: string;
  name: string;
}

interface Context {
  openName: string;
  open: (el: string) => void;
  close: () => void;
}

const ModalContext = createContext<Context>({
  openName: '',
  open: () => {},
  close: () => {},
});

function Modal({ children }: { children: JSX.Element[] }) {
  const [openName, setOpenName] = useState<string>('');
  const close = () => setOpenName('');
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, title, name }: WindowProps) {
  const { close, openName } = useContext(ModalContext);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClick(e: any) {
      if (ref.current && !ref.current!.contains(e.target)) {
        console.log('clicked outside');
        close();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [close]);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <Row direction='horizontal'>
          <h3>{title}</h3>
          <button className={styles.btnModal} onClick={close}>
            <HiXMark />
          </button>
        </Row>

        <>{cloneElement(children!, { onCloseModal: close })}</>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
