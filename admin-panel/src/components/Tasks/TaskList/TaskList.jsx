import React, {useState, useEffect} from "react";

import styles from './TaskList.module.scss'
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import store from "../../../store.jsx";
import Task from "../Task.jsx";
import Pagination from "../../Pagination/Pagination.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

function TaskList() {
    const [todos, setTodos] = useState(store.state.todos)
    const [users, setUsers] = useState(store.state.users)
    const [statusList, setStatusList] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);

    const { isDarkMode } = useTheme();

    useEffect(() => {
        async function fetchData() {
            await store.fetchTodos()
            setTodos(store.state.todos)
            await store.fetchUsers()
            setUsers(store.state.users)
            setLoading(false);

            const statuses = store.state.todos.map(todo => todo.completed);
            const uniqueStatuses = [...new Set(statuses)];
            setStatusList(uniqueStatuses);
        }
        fetchData();
    }, []);

    const findUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "";
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(24);

    const indexOfLastUser = currentPage * todosPerPage;
    const indexOfFirstUser = indexOfLastUser - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        setSelectedUser("");
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem("selectedUser", selectedUser);
        localStorage.setItem("currentPage", currentPage);
    }, [selectedUser, currentPage]);

    const filterTodos = () => {
        let filteredTodos = todos;
        if (selectedUser) {
            const userId = users.find(user => user.name === selectedUser)?.id;
            filteredTodos = filteredTodos.filter(todo => todo.userId === userId);
        }
        if (selectedStatus !== "") {
            filteredTodos = filteredTodos.filter(todo => todo.completed === (selectedStatus === "true"));
        }
        return filteredTodos;
    };

    const renderTodos = () => {
        const filteredTodos = filterTodos();
        if (filteredTodos.length === 0) {
            return <tr>
                <td className="errorMess" colSpan="3">Записи не найдены</td>
            </tr>
        }

        return filteredTodos.slice(indexOfFirstUser, indexOfLastUser).map((todo) => {
            const username = findUsername(todo.userId);
            return <Task key={todo.id} todo={todo} username={username}/>;
        })
    };

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <div>
                    <Header/>
                    <Menu/>
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                        <div className="searhcing">
                            <label className={`titleUser ${isDarkMode ? 'titleUserDark' : ''}`}
                                   htmlFor="searchUser">
                                задания
                            </label>
                            <input
                                type="text"
                                className={`searchUser ${isDarkMode ? 'searchUserDark' : ''}`}
                                id="searchUser"
                                placeholder="Поиск"
                            />
                        </div>
                        <div className={styles.filters}>
                            <select className={`${styles.selectTask} ${isDarkMode ? styles.selectTaskDark : ''}`}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option className={styles.optionTask} value="" defaultValue>пользователь</option>
                                {users.map((user) => (
                                    <option key={user.id}>{user.name}</option>
                                ))}
                            </select>
                            <select className={`${styles.selectTask} ${isDarkMode ? styles.selectTaskDark : ''}`}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option className={styles.optionTask} value="" defaultValue>статус</option>
                                {statusList.map((status, index) => (
                                    <option key={index} value={status}>{status ? "Выполнено" : "Не выполнено"}</option>
                                ))}
                            </select>
                        </div>
                        <table className={styles.tableTask}>
                            <thead className={styles.theadTask}>
                            <tr className={styles.trTask}>
                                <th className="thTask">
                                    ID
                                    <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                </th>
                                <th className="thTask">
                                    пользователь
                                    <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                </th>
                                <th className="thTask">
                                    заголовок
                                    <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                </th>
                                <th className="thTask">
                                    выполнена
                                    <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderTodos()}
                            </tbody>
                        </table>
                        <div className="paginationCount">
                            <a href="/todos/create" className={`${styles.btnCreate} ${isDarkMode ? styles.btnCreateDark : ''}`}>Создать >>></a>
                            <Pagination users={todos} usersPerPage={todosPerPage} setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}/>
                            <p className="countRows">Строк на странице: {currentTodos.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;