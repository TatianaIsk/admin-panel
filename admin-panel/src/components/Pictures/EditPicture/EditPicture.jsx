import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './EditPicture.module.scss'
import store from "../../../store.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";
import ImageUploader from "../ImageUploader/ImageUploader.jsx";

function EditPicture() {
    const { isDarkMode } = useTheme();
    const {pictureId} = useParams();

    const [picture, setPicture] = useState(null);
    const [albums, setAlbums] = useState(null)
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('')
    const [album, setAlbum] = useState('')
    const [img, setImg] = useState('')

    useEffect(() => {
        async function fetchData() {
            await store.fetchAlbums()
            setAlbums(store.state.albums)

            await store.fetchPicture(pictureId)
            setPicture(store.state.selectedPictures)
            setName(store.state.selectedPictures.title)
            setAlbum(store.state.selectedPictures.albumId)
            setImg(store.state.selectedPictures.url)

            setLoading(false);
        }

        fetchData();
    }, [pictureId]);

    if (!picture) {
        return <div>Пользователь не найден</div>;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const pictureData = { name, album, img};
        try {
            await store.updatePicture(pictureId, pictureData);
            console.log('Данные успешно изменены');
            console.log(pictureData)
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Header/>
                    <Menu/>
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`} onSubmit={handleSubmit}>
                        <div className={styles.panel}>
                            <a className={styles.panelLink} href="/users"> назад</a>
                            <div className={styles.panelRight}>
                                <Link className={styles.panelLink} to={`/users/view/${picture.id}`}>просмотр</Link>
                                <a className={styles.panelLink} href="">список</a>
                                <a className={styles.panelLink} href="">удалить пользователя</a>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Редактировать изображение</h2>
                        <section className={styles.inpContainer}>
                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> Название
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={name}
                                       onChange={(event) => setName(event.target.value)}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> альбом
                                </label>
                                <select className={`${styles.selectCreate} ${isDarkMode ? styles.selectCreateDark : ''}`}
                                        id="user"
                                        name="user"
                                        value={album}
                                        onChange={(event) => setAlbum(event.target.value)}
                                >
                                    <option className={styles.optionFirst} value="">Выберите альбом</option>
                                    {albums.map((album) => (
                                        <option key={album.id} value={album.id}>{album.title}</option>
                                    ))}
                                </select>
                            </div>
                        </section>

                        <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Изображение</p>

                        <ImageUploader/>

                        <button onClick={handleSubmit} className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>сохранить изменения >>></button>

                    </div>
                </>
            )}
        </div>
    );
}

export default EditPicture;