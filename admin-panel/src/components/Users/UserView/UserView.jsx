import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './UserView.module.scss'
import store from "../../../store.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

function UserView() {
    const {isDarkMode} = useTheme();
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
                            <a className={styles.panelBack} href="/users"> назад</a>
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
                        <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Просмотр
                            пользователя</h2>
                        <div className={styles.btns}>
                            <Link to={`/posts/view/${user.id}`}
                                  className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>
                                посты
                            </Link>
                            <Link to={`/albums/view/${user.id}`}
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
                                    ФИО:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Никнейм (eng):
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Телефон:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    E-mail:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Адрес:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Компания:
                                </th>
                                <th className={`${styles.th} ${isDarkMode ? styles.thDark : ''}`}>
                                    Веб-сайт:
                                </th>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.id}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.name}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.username}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.phone}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.email}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.address.street}, {user.address.city}, {user.address.zipcode}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                                    {user.company.name}
                                </td>
                                <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
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

