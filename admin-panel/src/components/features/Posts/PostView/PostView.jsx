import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import styles from './PostView.module.scss'
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import classnames from "classnames";
import Loading from "../../../ui/Loading/Loading.jsx";

function PostView() {
    const {isDarkMode} = useTheme();
    const {postId} = useParams();

    const [post, setPost] = useState(store.state.selectedUser);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await store.fetchPost(postId);
            setPost(store.state.selectedPost);
            setLoading(false);
            await store.fetchUsers();
            setUsers(store.state.users);
        }

        fetchData();
    }, [postId]);

    const findUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId);
        return user ? user.name : "";
    };

    if (!post) {
        return <Loader/>;
    }

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Header/>
                    <Menu/>
                    <div
                        className={classnames(
                            `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                        )}>
                        <div className={styles.panel}>
                            <Link
                                className={styles.panelLink}
                                to="/posts">
                                назад
                            </Link>
                            <div className={styles.panelRight}>
                                <Link
                                    className={styles.panelLink}
                                    to="/posts">
                                    список
                                </Link>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Просмотр поста</h2>
                        <div>
                            <Link
                                to={`/users/view/${post.userId}`}
                                className={classnames(
                                    `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                )}>
                                пользователи
                            </Link>
                            <Link
                                to={`/albums/view/${post.id}`}
                                className={classnames(
                                    `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                )}>
                                альбомы
                            </Link>
                            <button
                                className={classnames(
                                    `${styles.btnCard} ${isDarkMode ? styles.btnCardDark : ''}`
                                )}>
                                сгенерировать карту компетенций >>>
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr className={styles.tr}>
                                <th
                                    className={classnames(
                                        `${styles.th} ${isDarkMode ? styles.thDark : ''}`
                                    )}>
                                    id:
                                </th>
                                <th
                                    className={classnames(
                                        `${styles.th} ${isDarkMode ? styles.thDark : ''}`
                                    )}>
                                    Пользователь:
                                </th>
                                <th
                                    className={classnames(
                                        `${styles.th} ${isDarkMode ? styles.thDark : ''}`
                                    )}>
                                    Заголовок:
                                </th>
                                <th
                                    className={classnames(
                                        `${styles.th} ${isDarkMode ? styles.thDark : ''}`
                                    )}>
                                    Текст:
                                </th>
                            </tr>
                            <tr className={styles.tr}>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {post.id}
                                </td>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {findUsername(post.userId)}
                                </td>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {post.title}
                                </td>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {post.body}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default PostView;