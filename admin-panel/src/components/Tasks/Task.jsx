import React from "react";
import incompleteIcon from "../../assets/incomplete-icon.png";
import completeIcon from "../../assets/complete-icon.png";
import incompleteIconDark from "../../assets/darkAssets/incomplete-icon-dark.png"
import completeIconDark from "../../assets/darkAssets/complete-icon-dark.png"

import styles from './Task.module.scss'
import {useTheme} from "../../ThemeContext.jsx";

function Task({todo, username}) {
    const { isDarkMode } = useTheme();

    return (
        <tr className={styles.trTask} key={todo.id}>
            <td className={`${styles.tdTask} ${isDarkMode ? styles.tdTaskDark : ''}`}>{todo.id}</td>
            <td className={`${styles.tdTask} ${isDarkMode ? styles.tdTaskDark : ''}`}>{username}</td>
            <td className={`${styles.tdTask} ${isDarkMode ? styles.tdTaskDark : ''}`}>{todo.title}</td>
            <td style={{cursor: "pointer"}} className={`${styles.tdTask} ${isDarkMode ? styles.tdTaskDark : ''}`}>
                {todo.completed ?
                    <img src={`${isDarkMode ? completeIconDark : completeIcon}`} alt="Completed" />
                    :
                    <img src={`${isDarkMode ? incompleteIconDark : incompleteIcon}`} alt="Incomplete" />
                }
            </td>
        </tr>
    );
}

export default Task;