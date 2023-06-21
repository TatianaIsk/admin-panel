import React from "react";
import classnames from 'classnames';
import styles from './PicturesLink.module.scss';
import {Link} from "react-router-dom";

export default function PicturesLink({isSelected, isDarkMode, onClick}) {
    return (
        <Link
            to="/pictures"
            className={classnames(
                isSelected ? isDarkMode ? styles.activeDark : styles.active : '',
                styles.comment
            )}
            onClick={() => onClick('pictures')}>
            Картинки
        </Link>
    );
}