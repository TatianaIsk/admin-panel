import React from "react";
import classnames from 'classnames';
import styles from './BlogsMenu.module.scss';

export default function BlogsMenu({isOpen, isDarkMode, onClick}) {
    return (
        <div className={styles.blog}>
            <span>Блог</span>
            <button className={classnames(
                isOpen ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose
            )}
                    onClick={onClick}>
            </button>
        </div>
    );
}