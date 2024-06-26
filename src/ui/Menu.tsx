import { MouseEventHandler, createContext, useContext, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import useCloseElement from '../hooks/useCloseElement';
import { createPortal } from 'react-dom';
import styles from './styles/Menu.module.css';

interface Position {
  x: number;
  y: number;
}
interface Context {
  openId: number | null;
  open: (el: number) => void;
  close: () => void;
  position: Position | undefined;
  setPosition: (obj: Position) => void;
}

interface MenuButton {
  children: string;
  onClick?: () => void;
  icon: JSX.Element;
}

const MenuContext = createContext<Context>({
  openId: null,
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});

function Menu({ children }: { children: JSX.Element }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<Position>();
  const open = setOpenId;
  const close = () => setOpenId(null);
  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Content({ children }: { children: JSX.Element[] }) {
  return <div style={{ position: 'relative' }}>{children}</div>;
}

function Toggle({
  id,
  icon = <HiOutlineEllipsisVertical />,
}: {
  id: number;
  icon?: JSX.Element;
}) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const rect = (e!.target! as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();

    if (rect === undefined) return;

    setPosition({
      x: window.innerWidth - rect?.width - rect?.x,
      y: rect?.y + rect?.height + 8,
    });

    openId === null || openId !== id ? open(id) : close();
  };

  return (
    <>
      <button className={styles.toggle} onClick={handleToggle}>
        {icon}
      </button>
    </>
  );
}

function List({
  children,
  id,
}: {
  children: JSX.Element[];
  id: number | string;
}) {
  const { openId, close, position } = useContext(MenuContext);
  const { ref } = useCloseElement(close, false);

  if (openId !== id) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        right: `${position?.x}px`,
        top: `${position?.y}px`,
        position: 'fixed',
      }}
      className={styles.menuList}
    >
      {children}
    </div>,
    document.body
  );
}

function Button({ children, onClick, icon }: MenuButton) {
  const { close } = useContext(MenuContext);
  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <button className={styles.listButton} onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

Menu.Content = Content;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
