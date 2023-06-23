import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styles from './ALbumView.module.scss'
import store from "../../../../store.jsx";
import Loader from "@/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import classnames from "classnames";

function AlbumView() {
    const { isDarkMode } = useTheme();
    const {albumId} = useParams();

    const [album, setAlbum] = useState(store.state.selectedAlbums);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await store.fetchAlbum(albumId);
            setAlbum(store.state.selectedAlbums);
            setLoading(false);
            await store.fetchUsers();
            setUsers(store.state.users);
        }

        fetchData();
    }, [albumId]);


    const findUsername = (userId) => {
        const user = users && users.find((user) => user.id === userId)
        return user ? user.name : ""
    }

    if (!album) {
        return <Loader/>;
    }

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}>
                        <div className={styles.panel}>
                            <Link
                                className={styles.panelLink}
                                to="/albums">
                                назад
                            </Link>
                            <div className={styles.panelRight}>
                                <Link
                                    className={styles.panelLink}
                                    to="/albums">
                                    список
                                </Link>
                            </div>
                        </div>
                        <h2
                            className={classnames(
                                `${styles.title} ${isDarkMode ? styles.titleDark : ''}`
                            )}>
                            Просмотр альбома
                        </h2>
                        <div>
                            <Link
                                to={`/users/view/${album.userId}`}
                                className={classnames(
                                    `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                )}>
                                пользователи
                            </Link>
                            <Link
                                to={`/posts/view/${album.id}`}
                                className={classnames(
                                    `${styles.btn} ${isDarkMode ? styles.btnDark : ''}`
                                )}>
                                посты
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
                            </tr>
                            <tr className={styles.tr}>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {album.id}
                                </td>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
                                    {findUsername(album.userId)}
                                </td>
                                <td
                                    className={classnames(
                                        `${styles.td} ${isDarkMode ? styles.tdDark : ''}`
                                    )}>
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