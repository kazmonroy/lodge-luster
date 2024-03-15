import { createContext, useContext, useState } from 'react';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import useCloseElement from '../hooks/useCloseElement';

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
  return <>{children}</>;
}

function Toggle({ id }: { id: number }) {
  const { openId, open, close } = useContext(MenuContext);

  const handleToggle = () => {
    openId === null || openId !== id ? open(id) : close();
  };

  return (
    <>
      <button onClick={handleToggle}>
        <HiOutlineEllipsisVertical />
      </button>
    </>
  );
}

function List({ children, id }: { children: JSX.Element[]; id: number }) {
  const { openId, close } = useContext(MenuContext);
  const { ref } = useCloseElement(close);

  return <div ref={ref}>{openId === id && <ul>{children}</ul>}</div>;
}

function Button({ children }: { children: JSX.Element }) {
  return <li>{children}</li>;
}

Menu.Content = Content;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
