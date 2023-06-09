import styles from './CreateTask.module.scss'
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../store.jsx";
import {useTheme} from "../../../ThemeContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
    const [todos, setTodos] = useState(store.state.todos)
    const [users, setUsers] = useState(store.state.users)
    const [statusList, setStatusList] = useState([]);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        async function fetchData() {
            await store.fetchTodos()
            setTodos(store.state.todos)
            await store.fetchUsers()
            setUsers(store.state.users)

            const statuses = store.state.todos.map(todo => todo.completed);
            const uniqueStatuses = [...new Set(statuses)];
            setStatusList(uniqueStatuses);
        }

        fetchData();
    }, []);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        user: '',
        task: '',
        status: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos', formValues);
            store.state.todos.push(response.data);
            navigate('/todos');
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Header/>
            <Menu/>
            <form className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`} onSubmit={handleSubmit}>
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/todos"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="/todos">список</a>
                    </div>
                </div>
                <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Создать задачу</h2>
                <div className={styles.selectBox}>
                    <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                           htmlFor="user"> пользователь
                    </label>
                    <select className={`${styles.selectCreate} ${isDarkMode ? styles.selectCreateDark : ''}`}
                            id="user"
                            name="user"
                            value={formValues.user}
                            onChange={handleInputChange}
                    >
                        <option className={styles.optionFirst} value="" defaultValue>Выберите пользователя</option>
                        {users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputBox}>
                    <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                           htmlFor="task"> задача
                    </label>
                    <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                           id="task"
                           name="task"
                           type="text"
                           value={formValues.task}
                           onChange={handleInputChange}
                           placeholder="Введите данные"
                    />
                </div>

                <div className={styles.selectBox}>
                    <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                           htmlFor="status"> статус выполнения
                    </label>
                    <select className={`${styles.selectCreate} ${isDarkMode ? styles.selectCreateDark : ''}`}
                            id="status"
                            name="status"
                            value={formValues.status}
                            onChange={handleInputChange}
                    >
                        <option className={styles.optionFirst} value="" defaultValue>Выберите статус выполения</option>
                        {statusList.map((status, index) => (
                            <option key={index} value={status}>{status ? "Выполнено" : "Не выполнено"}</option>
                        ))}
                    </select>
                </div>

                <button onClick={handleSubmit} className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>создать >>></button>
            </form>
        </>
    )
}

export default CreateTask