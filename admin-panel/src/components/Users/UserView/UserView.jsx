import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './UserView.module.scss'
import store from "../../../store.jsx";


function UserView() {
    const {userId} = useParams();

    const [user, setUser] = useState(store.state.selectedUser);

    useEffect(() => {
        async function fetchData() {
            await store.fetchUser(userId);
            setUser(store.state.selectedUser);
        }
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    return (
        <>
            <Header/>
            <Menu/>
            <div className="wrapper">
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/users"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="">редактировать</a>
                        <a className={styles.panelLink} href="/users">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={styles.title}>Просмотр пользователя</h2>
                <div>
                    <button className={styles.btn}>посты</button>
                    <button className={styles.btn}>альбомы</button>
                    <button className={styles.btn}>задачи</button>
                    <button className={styles.btnCard}>сгенерировать карту компетенций >>></button>
                </div>
                <table className={styles.table}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>id:</th>
                        <th className={styles.th}>ФИО:</th>
                        <th className={styles.th}>Никнейм (eng):</th>
                        <th className={styles.th}>Телефон:</th>
                        <th className={styles.th}>E-mail:</th>
                        <th className={styles.th}>Адрес:</th>
                        <th className={styles.th}>Компания:</th>
                        <th className={styles.th}>Веб-сайт:</th>
                    </tr>
                    <tr className={styles.tr}>
                        <td className={styles.td}>{user.id}</td>
                        <td className={styles.td}>{user.name}</td>
                        <td className={styles.td}>{user.username}</td>
                        <td className={styles.td}>{user.phone}</td>
                        <td className={styles.td}>{user.email}</td>
                        <td className={styles.td}>{user.address.street}, {user.address.city}, {user.address.zipcode}</td>
                        <td className={styles.td}>{user.company.name}</td>
                        <td className={styles.td}>{user.website}</td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default UserView;

