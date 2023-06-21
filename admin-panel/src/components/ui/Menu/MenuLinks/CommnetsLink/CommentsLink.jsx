import React from "react";
import classnames from 'classnames';
import styles from './CommentsLink.module.scss';
import {Link} from "react-router-dom";

export default function CommentsLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/comments"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : '',
                styles.comment
            )}
            onClick={() => onClick('comments')}>
            Комментарии
        </Link>
    );
}