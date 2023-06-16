import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import styles from './ALbumView.module.scss'
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import {a} from "react-spring";

function AlbumView() {
    const { isDarkMode } = useTheme();
    const { albumTitle } = useParams();

    const [posts, setPosts] = useState(null)
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await store.fetchAlbum(albumTitle);
            setAlbum(store.state.selectedAlbums);
            setLoading(false);

            await store.fetchUsers();
            setUsers(store.state.users);

            await store.fetchPosts()
            setPosts(store.state.posts)
        }

        fetchData();
    }, [albumTitle]);

    const findUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId)
        return user ? user.name : ""
    }

    const findUserUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId)
        return user ? user.username : ""
    }

    const findPostTitle = (postId) => {
        const post = posts && posts.find((post) => post.id === postId)
        return post ? post.title : ""
    }

    if (!album) {
        return <div>Альбом не найден</div>;
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
                            <a className={styles.panelLink} href="/albums">назад</a>
                            <div className={styles.panelRight}>
                                <a className={styles.panelLink} href="/albums">список</a>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Просмотр альбома</h2>
                        <div>
                            <Link to={`/users/view/${findUserUsername(album.userId)}`}
                                  className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                пользователи
                            </Link>
                            <Link to={`/posts/view/${findPostTitle(album.id)}`}
                                  className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                посты
                            </Link>
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
                            </tr>
                            <tr className={styles.tr}>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {album.id}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {findUsername(album.userId)}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {album.title}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default AlbumView;