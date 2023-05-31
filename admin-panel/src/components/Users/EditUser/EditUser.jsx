import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./../../Header/Header.jsx";
import Menu from "./../../Menu/Menu.jsx";
import styles from './EditUser.module.scss'
import InputLabel from "../../InputLabel/InputLabel.jsx";
import store from "../../../store.jsx";

function EditUser() {
    const {userId} = useParams();

    const [user, setUser] = useState(store.state.selectedUser);

    const [name, setName] = useState(user ? user.name : '')
    const [username, setUsername] = useState(user ? user.username : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [website, setWebsite] = useState(user ? user.website : '')
    const [phone, setPhone] = useState(user ? user.phone : '')
    const [zipcode, setZipcode] = useState(user ? user.address.zipcode : '')
    const [city, setCity] = useState(user ? user.address.city : '')
    const [street, setStreet] = useState(user ? user.address.street : '')
    const [compName, setCompName] = useState(user ? user.company.name : '')
    const [catchPhrase, setCatchPhrase] = useState(user ? user.company.catchPhrase : '')

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
                        <Link className={styles.panelLink} to={`/users/view/${user.id}`}>просмотр</Link>
                        <a className={styles.panelLink} href="">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={styles.title}>Редактировать пользователя</h2>
                <section className={styles.inpContainer}>
                    <InputLabel
                        label="ФИО"
                        id="fio"
                        value={name}
                        type="text"
                        name="fio"
                        placeholder="Введите данные"
                        onChange={(event) => setName(event.target.value)}
                    />

                    <InputLabel
                        label="никнейм (eng)"
                        id="login"
                        value={username}
                        type="text"
                        name="login"
                        placeholder="Введите данные"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </section>

                <section className={styles.inpContainer}>
                    <InputLabel
                        label="e-mail"
                        id="e-mail"
                        value={email}
                        type="text"
                        name="email"
                        placeholder="Введите данные"
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <InputLabel
                        label="веб-сайт"
                        id="site"
                        value={website}
                        type="text"
                        name="site"
                        placeholder="Введите данные"
                        onChange={(event) => setWebsite(event.target.value)}
                    />
                </section>

                <InputLabel
                    label="телефон"
                    id="phone"
                    value={phone}
                    type="tel"
                    name="phone"
                    placeholder="Введите данные"
                    onChange={(event) => setPhone(event.target.value)}
                />

                <p className={styles.subtitle}>Адрес</p>

                <section className={styles.inpContainer}>
                    <InputLabel
                        label="индекс"
                        id="index"
                        value={zipcode}
                        type="text"
                        name="index"
                        placeholder="Введите данные"
                        onChange={(event) => setZipcode(event.target.value)}
                    />

                    <InputLabel
                        label="город"
                        id="city"
                        value={city}
                        type="text"
                        name="city"
                        placeholder="Введите данные"
                        onChange={(event) => setCity(event.target.value)}
                    />
                </section>

                <InputLabel
                    label="улица"
                    id="street"
                    value={street}
                    type="text"
                    name="street"
                    placeholder="Введите данные"
                    onChange={(event) => setStreet(event.target.value)}
                />

                <p className={styles.subtitle}>Компания</p>

                <section className={styles.inpContainer}>
                    <InputLabel
                        label="название"
                        id="nameComp"
                        value={compName}
                        type="text"
                        name="nameComp"
                        placeholder="Введите данные"
                        onChange={(event) => setCompName(event.target.value)}
                    />

                    <InputLabel
                        label="описание"
                        id="descriptionComp"
                        value={catchPhrase}
                        type="text"
                        name="descriptionComp"
                        placeholder="Введите данные"
                        onChange={(event) => setCatchPhrase(event.target.value)}
                    />
                </section>

                <button type="submit" className={styles.btnSub}>сохранить изменения >>></button>
            </div>
        </>
    );
}

export default EditUser;