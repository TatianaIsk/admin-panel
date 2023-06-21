import React from "react";
import classnames from 'classnames';
import styles from './TodosLink.module.scss';
import {Link} from "react-router-dom";

export default function TodosLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/todos"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : ''
            )}
            onClick={() => onClick('todos')}>
            Задания
        </Link>
    );
}