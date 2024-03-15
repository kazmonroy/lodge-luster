import { createContext, useContext, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import useCloseElement from '../hooks/useCloseElement';
import { createPortal } from 'react-dom';
import styles from './styles/Menu.module.css';
interface Context {
  openId: number | null;
  open: (el: number) => void;
  close: () => void;
}

const MenuContext = createContext<Context>({
  openId: null,
  open: () => {},
  close: () => {},
});

function Menu({ children }: { children: JSX.Element }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const open = setOpenId;
  const close = () => setOpenId(null);
  return (
    <MenuContext.Provider value={{ openId, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Content({ children }: { children: JSX.Element[] }) {
  return <div style={{ position: 'relative' }}>{children}</div>;
}

function Toggle({ id }: { id: number }) {
  const { openId, open, close } = useContext(MenuContext);

  const handleToggle = (e: Event) => {
    const rect = (e!.target! as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();
    console.log(rect);
    openId === null || openId !== id ? open(id) : close();
  };

  return (
    <>
      <button className={styles.toggle} onClick={handleToggle}>
        <HiOutlineEllipsisVertical />
      </button>
    </>
  );
}

function List({ children, id }: { children: JSX.Element[]; id: number }) {
  const { openId, close } = useContext(MenuContext);
  const { ref } = useCloseElement(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ right: '20px', top: '20px', position: 'fixed' }}
      className={styles.menuList}
    >
      {children}
    </ul>,
    document.body
  );

  //   return <div ref={ref}>{openId === id && <ul>{children}</ul>}</div>;
}

function Button({ children }: { children: JSX.Element }) {
  return (
    <li>
      <button className={styles.listButton}>
        <span>{children}</span>
      </button>
    </li>
  );
}

Menu.Content = Content;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
