import styles from './Dropdown.module.scss'
import {Link} from "react-router-dom";
import React from "react";
const Dropdown = ({ onClose, toView, toEdit, selectedUserId, isMenuOpen}) => {
    return (
        <div className={styles.dropdown}>
            <ul className={styles.linksBox}>
                <Link to={toView} className={styles.links} rel="noopener noreferrer">Просмотр</Link>
                <Link to={toEdit} className={styles.links} rel="noopener noreferrer">Редактировать</Link>
                <a className={styles.links} href="">Удалить</a>
                <p className={styles.close} onClick={onClose}>Закрыть</p>
            </ul>
        </div>
    );
};


export default Dropdown;