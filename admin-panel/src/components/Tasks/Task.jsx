import React from "react";
import incompleteIcon from "../../assets/incomplete-icon.png";
import completeIcon from "../../assets/complete-icon.png";

import styles from './Task.module.scss'

function Task({todo, username}) {

    return (
        <tr key={todo.id}>
            <td className={styles.tdTask}>{todo.id}</td>
            <td className={styles.tdTask}>{username}</td>
            <td className={styles.tdTask}>{todo.title}</td>
            <td style={{cursor: "pointer"}} className={styles.tdTask}>{todo.completed ? <img src={completeIcon} alt="Completed" /> : <img src={incompleteIcon} alt="Incomplete" />}</td>
        </tr>
    );
}

export default Task;