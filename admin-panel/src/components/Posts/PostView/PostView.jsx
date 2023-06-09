import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './PostView.module.scss'
import store from "../../../store.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

function PostView() {
    const { isDarkMode } = useTheme();
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
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "";
    };

    if (!post) {
        return <div>Пользователь не найден</div>;
    }

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Header/>
                    <Menu/>
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                        <div className={styles.panel}>
                            <a className={styles.panelLink} href="/users"> назад</a>
                            <div className={styles.panelRight}>
                                <a className={styles.panelLink} href="">редактировать</a>
                                <a className={styles.panelLink} href="/users">список</a>
                                <a className={styles.panelLink} href="">удалить пользователя</a>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Просмотр пользователя</h2>
                        <div>
                            <button className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                пользователи
                            </button>
                            <button className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                альбомы
                            </button>
                            <button className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                задачи
                            </button>
                            <button className={`${styles.btnCard} ${isDarkMode ? styles.btnCardDark : ''}`}>
                                сгенерировать карту компетенций >>>
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr className={styles.tr}>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    id:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Пользователь:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Заголовок:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Текст:
                                </th>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {post.id}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {findUsername(post.userId)}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {post.title}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
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