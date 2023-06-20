import React, {useState, useEffect} from "react";

import styles from './TaskList.module.scss'
import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import store from "../../../../store.jsx";
import Task from "../Task.jsx";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import {Link} from "react-router-dom";
import classnames from "classnames";

function TaskList() {
    const [todos, setTodos] = useState(store.state.todos)
    const [users, setUsers] = useState(store.state.users)
    const [statusList, setStatusList] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const {isDarkMode} = useTheme();

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
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [todosPerPage] = useState(24)

    const indexOfLastUser = currentPage * todosPerPage
    const indexOfFirstUser = indexOfLastUser - todosPerPage
    const currentTodos = todos.slice(indexOfFirstUser, indexOfLastUser)

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

        if (searchQuery.trim() !== "") {
            filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
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
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}>
                        <div className="searhcing">
                            <label
                                className={classnames(
                                    `titleUser ${isDarkMode ? 'titleUserDark' : ''}`
                                )}
                                htmlFor="searchUser">
                                задания
                            </label>
                            <input
                                type="text"
                                className={classnames(
                                    `${styles.searchTask} ${isDarkMode ? styles.searchTaskDark : ''}`
                                )}
                                id="searchUser"
                                placeholder="Поиск"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles.filters}>
                            <select
                                className={classnames(
                                    `${styles.selectTask} ${isDarkMode ? styles.selectTaskDark : ''}`
                                )}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option
                                    className={styles.optionTask}
                                    value=""
                                    defaultValue>
                                    пользователь
                                </option>
                                {users.map((user) => (
                                    <option key={user.id}>{user.name}</option>
                                ))}
                            </select>
                            <select
                                className={classnames(
                                    `${styles.selectTodos} ${isDarkMode ? styles.selectTodosDark : ''}`
                                )}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option
                                    className={styles.optionTask}
                                    value=""
                                    defaultValue>
                                    статус
                                </option>
                                {statusList.map((status, index) => (
                                    <option
                                        key={index}
                                        value={status}>
                                        {status ? "Выполнено" : "Не выполнено"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="tableWrapper" style={{height: '700px', overflow: 'auto'}}>
                            <table className={styles.tableTask}>
                                <thead className={styles.theadTask}>
                                <tr className={styles.trTask}>
                                    <th className="thTask">
                                        ID
                                        <button
                                            className={classnames(
                                                `btnTh ${isDarkMode ? 'btnThDark' : ''}`
                                            )}>
                                        </button>
                                    </th>
                                    <th className="thTask">
                                        пользователь
                                        <button
                                            className={classnames(
                                                `btnTh ${isDarkMode ? 'btnThDark' : ''}`
                                            )}>
                                        </button>
                                    </th>
                                    <th className="thTask">
                                        заголовок
                                        <button
                                            className={classnames(
                                                `btnTh ${isDarkMode ? 'btnThDark' : ''}`
                                            )}>
                                        </button>
                                    </th>
                                    <th className="thTask">
                                        выполнена
                                        <button
                                            className={classnames(
                                                `btnTh ${isDarkMode ? 'btnThDark' : ''}`
                                            )}>
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderTodos()}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.paginateBlock}>
                            <Link to="/todos/create"
                                  className={classnames(
                                      `${styles.btnCreate} ${isDarkMode ? styles.btnCreateDark : ''}`
                                  )}>
                                Создать >>>
                            </Link>
                            <div className={styles.pagination}>
                                <Pagination
                                    users={todos}
                                    usersPerPage={todosPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                            <p
                                className={classnames(
                                    `${styles.countRows} ${isDarkMode ? styles.countRowsDark : ''}`
                                )}>
                                Строк на странице: {currentTodos.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;