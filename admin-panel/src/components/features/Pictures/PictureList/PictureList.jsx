import Header from "../../../ui/Header/Header.jsx";
import Menu from "../../../ui/Menu/Menu.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import styles from "./PictureList.module.scss";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import Picture from "../Picture.jsx";

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
                    <Header/>
                    <Menu/>
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                        <div className="searhcing">
                            <label className={`titleUser ${isDarkMode ? 'titleUserDark' : ''}`}
                                   htmlFor="searchAlbums">
                                картинки
                            </label>
                            <input
                                type="text"
                                className={`searchUser ${isDarkMode ? 'searchUserDark' : ''}`}
                                id="searchAlbums"
                                placeholder="Поиск"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="tableWrapper" style={{height: '700px', overflow: 'auto'}}>
                            <table className={styles.tableTask}>
                                <thead className={styles.theadTask}>
                                <tr className={styles.trTask}>
                                    <th className="thTask">
                                        ID
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thTask">
                                        Альбом
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thTask">
                                        Заголовок
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thTask">
                                        Картинка
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderPictures()}
                                </tbody>
                            </table>
                        </div>
                        <div className="paginationCount">
                            <a href="/todos/create"
                               className={`${styles.btnCreate} ${isDarkMode ? styles.btnCreateDark : ''}`}>Создать
                                >>></a>
                            <Pagination users={pictures} usersPerPage={picturesPerPage} setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}/>
                            <p className="countRows">Строк на странице: {currentPictures.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PictureList