import React from "react";
import classnames from 'classnames';
import styles from './UserLink.module.scss';
import {Link} from "react-router-dom";

export default function UsersLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/users"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : ''
            )}
            onClick={() => onClick('users')}>
            Пользователи
        </Link>
    );
}