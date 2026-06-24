import React, {
  createContext,
  useContext,
  useState,
} from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({
  children,
}: any) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};