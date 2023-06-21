import React from "react";
import classnames from 'classnames';
import styles from './GraphicsMenu.module.scss';

export default function GraphicsMenu({isOpen, isDarkMode, onClick}) {
    return (
        <div className={styles.blog}>
            <span>Графика</span>
            <button className={classnames(
                isOpen ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose
            )}
                    onClick={onClick}>
            </button>
        </div>
    );
}