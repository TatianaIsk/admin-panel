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

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [phone, setPhone] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [catchPhrase, setCatchPhrase] = useState('')

    useEffect(() => {
        async function fetchData() {
            await store.fetchUser(userId)
            setUser(store.state.selectedUser)
            setName(store.state.selectedUser.name)
            setUsername(store.state.selectedUser.username)
            setEmail(store.state.selectedUser.email)
            setWebsite(store.state.selectedUser.website)
            setPhone(store.state.selectedUser.phone)
            setZipcode(store.state.selectedUser.address.zipcode)
            setCity(store.state.selectedUser.address.city)
            setStreet(store.state.selectedUser.address.street)
            setCompanyName(store.state.selectedUser.company.name)
            setCatchPhrase(store.state.selectedUser.company.catchPhrase)
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
                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> фио
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.name}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> никнейм (eng)
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.username}
                                />
                            </div>
                        </section>

                        <section className={styles.inpContainer}>
                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> e-mail
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.email}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> веб-сайт
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.website}
                                />
                            </div>
                        </section>

                        <div className={styles.inputBox}>
                            <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                   htmlFor="nameComp"> телефон
                            </label>
                            <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                   id="nameComp"
                                   name="nameComp"
                                   type="text"
                                   placeholder="Введите данные"
                                   value={user.phone}
                            />
                        </div>

                        <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Адрес</p>

                        <section className={styles.inpContainer}>
                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> индекс
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.address.zipcode}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> город
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.address.city}
                                />
                            </div>
                        </section>

                        <div className={styles.inputBox}>
                            <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                   htmlFor="nameComp"> улица
                            </label>
                            <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                   id="nameComp"
                                   name="nameComp"
                                   type="text"
                                   placeholder="Введите данные"
                                   value={user.address.street}
                            />
                        </div>

                        <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Компания</p>

                        <section className={styles.inpContainer}>
                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> название
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.company.name}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                                       htmlFor="nameComp"> описание
                                </label>
                                <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                                       id="nameComp"
                                       name="nameComp"
                                       type="text"
                                       placeholder="Введите данные"
                                       value={user.company.catchPhrase}
                                />
                            </div>
                        </section>

                        <button type="submit" className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>сохранить изменения >>></button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditUser;