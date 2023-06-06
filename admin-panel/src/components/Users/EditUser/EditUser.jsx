import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './EditUser.module.scss'
import InputLabel from "../../InputLabel/InputLabel.jsx";
import store from "../../../store.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

function EditUser() {
    const { isDarkMode } = useTheme();
    const {userId} = useParams();

    const [user, setUser] = useState(store.state.selectedUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await store.fetchUser(userId);
            setUser(store.state.selectedUser);
            setLoading(false);
        }

        fetchData();
    }, [userId]);

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
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                        <div className={styles.panel}>
                            <a className={styles.panelLink} href="/users"> назад</a>
                            <div className={styles.panelRight}>
                                <Link className={styles.panelLink} to={`/users/view/${user.id}`}>просмотр</Link>
                                <a className={styles.panelLink} href="">список</a>
                                <a className={styles.panelLink} href="">удалить пользователя</a>
                            </div>
                        </div>
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Редактировать пользователя</h2>
                        <section className={styles.inpContainer}>
                            <InputLabel
                                label="ФИО"
                                id="fio"
                                value={user.name}
                                type="text"
                                name="fio"
                                placeholder="Введите данные"
                            />

                            <InputLabel
                                label="никнейм (eng)"
                                id="login"
                                value={user.username}
                                type="text"
                                name="login"
                                placeholder="Введите данные"
                            />
                        </section>

                        <section className={styles.inpContainer}>
                            <InputLabel
                                label="e-mail"
                                id="e-mail"
                                value={user.email}
                                type="text"
                                name="email"
                                placeholder="Введите данные"
                            />

                            <InputLabel
                                label="веб-сайт"
                                id="site"
                                value={user.website}
                                type="text"
                                name="site"
                                placeholder="Введите данные"
                            />
                        </section>

                        <InputLabel
                            label="телефон"
                            id="phone"
                            value={user.phone}
                            type="tel"
                            name="phone"
                            placeholder="Введите данные"
                        />

                        <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Адрес</p>

                        <section className={styles.inpContainer}>
                            <InputLabel
                                label="индекс"
                                id="index"
                                value={user.address.zipcode}
                                type="text"
                                name="index"
                                placeholder="Введите данные"
                            />

                            <InputLabel
                                label="город"
                                id="city"
                                value={user.address.city}
                                type="text"
                                name="city"
                                placeholder="Введите данные"
                            />
                        </section>

                        <InputLabel
                            label="улица"
                            id="street"
                            value={user.address.street}
                            type="text"
                            name="street"
                            placeholder="Введите данные"
                        />

                        <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Компания</p>

                        <section className={styles.inpContainer}>
                            <InputLabel
                                label="название"
                                id="nameComp"
                                value={user.company.name}
                                type="text"
                                name="nameComp"
                                placeholder="Введите данные"
                            />

                            <InputLabel
                                label="описание"
                                id="descriptionComp"
                                value={user.company.catchPhrase}
                                type="text"
                                name="descriptionComp"
                                placeholder="Введите данные"
                            />
                        </section>

                        <button type="submit" className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>сохранить изменения >>></button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditUser;