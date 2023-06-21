import React from "react";
import classnames from 'classnames';
import styles from './PostsLink.module.scss';
import {Link} from "react-router-dom";

export default function PostsLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/posts"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : '',
                styles.comment
            )}
            onClick={() => onClick('posts')}>
            Посты
        </Link>
    );
}