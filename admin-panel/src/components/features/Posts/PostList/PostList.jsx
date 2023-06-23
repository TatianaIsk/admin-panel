import {useTheme} from "../../../../ThemeContext.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../../store.jsx";
import Loading from "@/Loading/Loading.jsx";
import Post from "../Post.jsx";
import styles from "./PostList.module.scss";
import Pagination from "@/Pagination/Pagination.jsx";
import classnames from "classnames";
import Title from "@/Title/Title.jsx";
import Searching from "@/Searching/Searching.jsx";

const PostList = () => {
    const {isDarkMode} = useTheme();

    const [posts, setPosts] = useState(store.state.posts);
    const [users, setUsers] = useState(store.state.users);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function fetchData() {
            await store.fetchPosts();
            setPosts(store.state.posts);
            await store.fetchUsers();
            setUsers(store.state.users);
            setLoading(false);
        }

        fetchData();
    }, []);

    const findUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "";
    };

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(24)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentTodos = posts.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
        setSelectedUser("");
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem("selectedUser", selectedUser);
        localStorage.setItem("currentPage", currentPage);
    }, [selectedUser, currentPage]);

    const filterPosts = () => {
        let filteredTodos = posts;

        if (selectedUser) {
            const userId = users.find(user => user.name === selectedUser)?.id;
            filteredTodos = filteredTodos.filter(post => post.userId === userId);
        }

        if (searchQuery.trim() !== "") {
            filteredTodos = filteredTodos.filter(post => post.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        }

        return filteredTodos;
    };

    const renderPosts = () => {
        const filteredPosts = filterPosts();
        if (filteredPosts.length === 0) {
            return <tr>
                <td className="errorMess" colSpan="3">Записи не найдены</td>
            </tr>
        }

        return filteredPosts.slice(indexOfFirstPost, indexOfLastPost).map((post) => {
            return <Post key={post.id} post={post} findUsername={findUsername}/>
        })
    };

    return (
        <>
            <div
                className={classnames(
                    `wrapper ${isDarkMode ? "wrapperDark" : ""}`
                )}>
                <div className="searhcing">
                    <Title
                        isDarkMode={isDarkMode}
                        title="Посты"
                        htmlFor="searchPost"
                    />
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
                    <Searching
                        isDarkMode={isDarkMode}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="searchPost"
                    />
                </div>
                {loading ? (
                    <Loading/>
                ) : (
                    <div className={styles.tableWrapper}>
                        {renderPosts()}
                    </div>
                )}
                <div className={styles.countPag}>
                    <Pagination
                        users={posts}
                        usersPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <p className={classnames(
                        `${styles.countRows} ${isDarkMode ? styles.countRowsDark : ''}`
                    )}>
                        Строк на странице: {currentTodos.length}
                    </p>
                </div>
            </div>
        </>
    );
};

export default PostList;