import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../../store.jsx";
import Album from "../Album.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import styles from "../../Tasks/TaskList/TaskList.module.scss";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import classnames from "classnames";

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
                                htmlFor="searchAlbums">
                                альбомы
                            </label>
                            <input
                                type="text"
                                className={classnames(
                                    `searchUser ${isDarkMode ? 'searchUserDark' : ''}`
                                )}
                                id="searchAlbums"
                                placeholder="Поиск"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div
                            className="tableWrapper"
                            style={{height: '700px', overflow: 'auto'}}>
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