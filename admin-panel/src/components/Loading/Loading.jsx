import React from 'react';
import styles from './Loading.module.scss'
import {useTheme} from "../../ThemeContext.jsx";

const Loader = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={styles.loader}>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
            <div className={`${styles.loaderBar } ${isDarkMode ? styles.loaderBarDark : ''}`}></div>
        </div>
    );
};

export default Loader;