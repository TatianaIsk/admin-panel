import {useTheme} from "../../../../ThemeContext.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../../store.jsx";
import Album from "../Album.jsx";
import Loader from "@/Loading/Loading.jsx";
import styles from "../../Tasks/TaskList/TaskList.module.scss";
import Pagination from "@/Pagination/Pagination.jsx";
import classnames from "classnames";
import style from './AlbumList.module.scss'
import Title from "@/Title/Title.jsx";
import Searching from "@/Searching/Searching.jsx";

const AlbumList = () => {
    const {isDarkMode} = useTheme();
    const [albums, setAlbums] = useState(store.state.albums)
    const [users, setUsers] = useState(store.state.users)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function fetchData() {
            await store.fetchAlbums();
            setAlbums(store.state.albums);
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
    const [albumsPerPage] = useState(24)

    const indexOfLastAlbum = currentPage * albumsPerPage
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum)

    const filterAlbums = () => {
        let filteredAlbums = albums;

        if (searchQuery.trim() !== "") {
            filteredAlbums = filteredAlbums.filter(album => album.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        }

        return filteredAlbums;
    };

    const renderAlbums = () => {
        const filteredAlbums = filterAlbums();
        if (filteredAlbums.length === 0) {
            return <tr>
                <td className="errorMess" colSpan="3">Записи не найдены</td>
            </tr>
        }

        return filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum).map((album) => {
            return <Album key={album.id} album={album} username={findUsername(album.userId)}/>
        })
    };

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <div>
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}>
                        <div className="searhcing">
                            <Title
                                isDarkMode={isDarkMode}
                                title="Альбомы"
                                htmlFor="searchAlbums"
                            />
                            <Searching
                                isDarkMode={isDarkMode}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                id="searchAlbums"
                            />
                        </div>
                        <div
                            className={style.tableWrapper}>
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
                                </tr>
                                </thead>
                                <tbody>
                                {renderAlbums()}
                                </tbody>
                            </table>
                        </div>
                        <div className="paginationCount">
                            <Pagination
                                users={albums}
                                usersPerPage={albumsPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                            <p className="countRows">
                                Строк на странице: {currentAlbums.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AlbumList