import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './PostView.module.scss'
import store from "../../../store.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

function PostView() {
    const {isDarkMode} = useTheme();
    const {postTitle} = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [albums, setAlbums] = useState(null)

    useEffect(() => {
        async function fetchData() {
            await store.fetchPost(postTitle);
            setPost(store.state.selectedPost);
            setLoading(false);

            await store.fetchUsers();
            setUsers(store.state.users);

            await store.fetchAlbums()
            setAlbums(store.state.albums)
        }

        fetchData();
    }, [postTitle]);

    const findUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId)
        return user ? user.name : ""
    }

    const findUserUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId)
        return user ? user.username : ""
    }

    const findAlbumTitle = (albumId) => {
        const album = albums && albums.find((album) => album.id === albumId)
        return album ? album.title : ""
    }

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
                            <a className={styles.panelLink} href="/posts"> назад</a>
                            <div className={styles.panelRight}>
                                <a className={styles.panelLink} href="/posts">список</a>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Просмотр поста</h2>
                        <div>
                            <Link to={`/users/view/${findUserUsername(post?.userId)}`} className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                пользователи
                            </Link>
                            <Link to={`/albums/view/${findAlbumTitle(post?.id)}`}
                                  className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                альбомы
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