import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';

interface Context {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<Context>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: JSX.Element }) {
  const initialState = { initialState: false, key: 'isDarkMode' };
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(initialState);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
