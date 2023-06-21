import React from "react";
import classnames from 'classnames';
import styles from './AlbumsLink.module.scss';
import {Link} from "react-router-dom";

export default function AlbumsLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/albums"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : '',
                styles.comment
            )}
            onClick={() => onClick('albums')}>
            Альбомы
        </Link>
    );
}