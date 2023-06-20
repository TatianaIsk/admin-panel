import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import styles from './UserView.module.scss'
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import classnames from "classnames";

function UserView() {
    const {isDarkMode} = useTheme();
    const {username} = useParams();

    const [user, setUser] = useState(store.state.selectedUser);
    const [posts, setPosts] = useState(null)
    const [albums, setAlbums] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await store.fetchUser(username);
            setUser(store.state.selectedUser);
            setLoading(false);

            await store.fetchPosts()
            setPosts(store.state.posts)

            await store.fetchAlbums()
            setAlbums(store.state.albums)
        }

        fetchData();
    }, [username]);

    const findPostTitle = (postId) => {
        const post = posts && posts.find((post) => post.id === postId)
        return post ? post.title : ""
    }

    const findAlbumTitle = (albumId) => {
        const album = albums && albums.find((album) => album.id === albumId)
        return album ? album.title : ""
    }

    if (!user) {
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
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}>
                        <div className={styles.panel}>
                            <Link className={styles.panelBack} to="/users"> назад</Link>
                            <div className={styles.panelRight}>
                                <Link to={`/users/edit/${user.id}`}
                                      className={styles.panelLink} href="">
                                    редактировать
                                </Link>
                                <Link to={`/users`}
                                      className={styles.panelLink}>
                                    список
                                </Link>
                                <Link to={`/users/delete/${user.id}`}
                                      className={styles.panelLink}>
                                    удалить пользователя
                                </Link>
                            </div>
                        </div>
                        <h2 className={classnames(
                            `${styles.title} ${isDarkMode ? styles.titleDark : ''}`)}
                        >Просмотр пользователя
                        </h2>
                        <div className={styles.btns}>
                            <Link to={`/posts/view/${findPostTitle(user.id)}`}
                                  className={classnames(
                                      `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                  )}>
                                посты
                            </Link>
                            <Link to={`/albums/view/${findAlbumTitle(user.id)}`}
                                  className={classnames(
                                      `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                  )}>
                                альбомы
                            </Link>
                            <button className={classnames(
                                `${styles.btnCard} ${isDarkMode ? styles.btnCardDark : ''}`
                            )}>
                                сгенерировать карту компетенций >>>
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr className={styles.tr}>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    id:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    ФИО:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    Никнейм (eng):
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    Телефон:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    E-mail:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    Адрес:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    Компания:
                                </th>
                                <th className={classnames(
                                    `${styles.th} ${isDarkMode ? styles.thDark : ''}`)}
                                >
                                    Веб-сайт:
                                </th>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.id}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.name}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.username}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.phone}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.email}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.address.street}, {user.address.city}, {user.address.zipcode}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.company.name}
                                </td>
                                <td className={classnames(
                                    `${styles.td} ${isDarkMode ? styles.tdDark : ''}`)}
                                >
                                    {user.website}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserView;

