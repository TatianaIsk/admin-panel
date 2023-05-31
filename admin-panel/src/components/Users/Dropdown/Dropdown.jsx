import styles from './Dropdown.module.scss'
import {Link} from "react-router-dom";
import React from "react";
const Dropdown = ({ onClose, to }) => {
    return (
        <div className={styles.dropdown}>
            <ul className={styles.linksBox}>
                <Link to={to} className={styles.links} target="_blank" rel="noopener noreferrer">Просмотр</Link>
                <a className={styles.links} href="">Редактировать</a>
                <a className={styles.links} href="">Удалить</a>
                <p className={styles.close} onClick={onClose}>Закрыть</p>
            </ul>
        </div>
    );
};


export default Dropdown;