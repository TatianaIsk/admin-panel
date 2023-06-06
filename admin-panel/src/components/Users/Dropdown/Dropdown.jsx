import styles from './Dropdown.module.scss'
import {Link} from "react-router-dom";
import React from "react";
import {useTheme} from "../../../ThemeContext.jsx";
const Dropdown = ({ onClose, toView, toEdit, selectedUserId, isMenuOpen}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={styles.dropdown}>
            <ul className={styles.linksBox}>
                <Link to={toView} className={`${styles.links} ${isDarkMode ? styles.linksDark : ''}`} rel="noopener noreferrer">Просмотр</Link>
                <Link to={toEdit} className={`${styles.links} ${isDarkMode ? styles.linksDark : ''}`} rel="noopener noreferrer">Редактировать</Link>
                <a className={`${styles.links} ${isDarkMode ? styles.linksDark : ''}`} href="">Удалить</a>
                <p className={`${styles.close} ${isDarkMode ? styles.closeDark : ''}`} onClick={onClose}>Закрыть</p>
            </ul>
        </div>
    );
};


export default Dropdown;