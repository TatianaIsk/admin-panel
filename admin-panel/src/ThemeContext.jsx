import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({ isDarkMode: false, setDarkMode: () => {} });

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

    const setDarkMode = (value) => {
        localStorage.setItem('isDarkMode', value);
        setIsDarkMode(value);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const { isDarkMode, setDarkMode } = useContext(ThemeContext);

    return { isDarkMode, setDarkMode };
};
