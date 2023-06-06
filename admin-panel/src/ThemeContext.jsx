import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext({ isDarkMode: false, setDarkMode: () => {} });

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] =
        useState(localStorage.getItem('isDarkMode') === 'true');

    useEffect(() => {
        const rootElement = document.querySelector(':root');

        if (isDarkMode) {
            rootElement.style.setProperty('--background-color', '#191919');
        } else {
            rootElement.style.setProperty('--background-color', '#F2F2F2');
        }
        return () => {
            rootElement.style.removeProperty('--background-color');
        };
    }, [isDarkMode]);

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
