import React from "react";
import classnames from 'classnames';
import styles from './Title.module.scss';

export default function Title({htmlFor, isDarkMode, title}) {
    return (
        <label
            className={classnames(
                styles.titleUser, isDarkMode && styles.titleUserDark
            )}
            htmlFor={htmlFor}>
            {title}
        </label>
    )
}