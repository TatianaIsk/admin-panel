import React from 'react';
import styles from './Loading.module.scss'
import {useTheme} from "../../../ThemeContext.jsx";
import classnames from "classnames";

const Loader = () => {
    const {isDarkMode} = useTheme();

    return (
        <div className={styles.loader}>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(`${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(`${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
            <div className={classnames(
                `${styles.loaderBar} ${isDarkMode ? styles.loaderBarDark : ''}`)}>
            </div>
        </div>
    );
};


export default Loader;