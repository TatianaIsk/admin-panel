import {useTheme} from "../../../../ThemeContext.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import styles from "./PictureList.module.scss";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import Picture from "../Picture.jsx";
import classnames from "classnames";
import Title from "../../../ui/Title/Title.jsx";
import Searching from "../../../ui/Searching/Searching.jsx";

const PictureList = () => {
    const {isDarkMode} = useTheme();
    const [albums, setAlbums] = useState(store.state.albums)
    const [pictures, setPictures] = useState(store.state.pictures)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function fetchData() {
            await store.fetchAlbums();
            setAlbums(store.state.albums);
            await store.fetchPictures();
            setPictures(store.state.pictures);
            setLoading(false);
        }

        fetchData();
    }, []);

    const findAlbum = (albumId) => {
        const album = albums !== undefined ? albums.find((album) => album.id === albumId) : null;
        return album ? album.title : "";
    };

    const [currentPage, setCurrentPage] = useState(1)
    const [picturesPerPage] = useState(24)

    const indexOfLastPicture = currentPage * picturesPerPage
    const indexOfFirstPicture = indexOfLastPicture - picturesPerPage
    const currentPictures = pictures.slice(indexOfFirstPicture, indexOfLastPicture)

    const filterPicture = () => {
        let filteredPictures = pictures;

        if (searchQuery.trim() !== "") {
            filteredPictures = filteredPictures.filter(picture => picture.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
        }

        return filteredPictures;
    };

    const renderPictures = () => {
        const filteredPictures = filterPicture();
        if (filteredPictures.length === 0) {
            return (
                <tr>
                    <td className="errorMess" colSpan="3">Записи не найдены</td>
                </tr>
            );
        }

        return currentPictures.map((picture) => {
            return <Picture key={picture.id} picture={picture} album={findAlbum(picture.albumId)}/>;
        });
    };

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <div>
                    <div
                        className={classnames(
                            `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                        )}>
                        <div className="searhcing">
                            <Title
                                isDarkMode={isDarkMode}
                                title="Картинки"
                                htmlFor="searchPictures"
                            />
                            <Searching
                                isDarkMode={isDarkMode}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                id="searchPictures"
                            />
                        </div>
                        <div className={styles.tableWrapper}>
                            <table className={styles.tableTask}>
                                <thead className={styles.theadTask}>
                                <tr className={styles.trTask}>
                                    <th className="thTask">
                                        ID
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thTask">
                                        Альбом
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thTask">
                                        Заголовок
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thTask">
                                        Картинка
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderPictures()}
                                </tbody>
                            </table>
                        </div>
                        <div className="paginationCount">
                            <Pagination
                                users={pictures}
                                usersPerPage={picturesPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                            <p className="countRows">
                                Строк на странице: {currentPictures.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PictureList