import React from "react";
import classnames from 'classnames';
import styles from './Searching.module.scss';

export default function Searching({value, isDarkMode, onChange, id}) {
    return (
        <input type="text"
               className={classnames(
                   isDarkMode ? styles.searchDark : styles.search
               )}
               id={id}
               placeholder="Поиск"
               value={value}
               onChange={onChange}
        />
    )
}