import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import styles from './EditUser.module.scss'
import store from "../../../../store.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import classnames from "classnames";

function EditUser() {
    const {isDarkMode} = useTheme();
    const {username} = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('')
    const [usernames, setUsername] = useState('')
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
            await store.fetchUser(username)
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
    }, [username]);

    if (!user) {
        return <Loader/>
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const userData = {name, username, email, website, phone, zipcode, city, street, companyName, catchPhrase};
        try {
            await store.updateUser(userId, userData);
            console.log('Данные успешно изменены');
            console.log(userData)
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
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}
                         onSubmit={handleSubmit}>
                        <div className={styles.panel}>
                            <Link
                                className={styles.panelBack}
                                to="/users">
                                назад
                            </Link>
                            <div className={styles.panelRight}>
                                <Link
                                    className={styles.panelLink}
                                    to={`/users/view/${user.id}`}>
                                    просмотр
                                </Link>
                                <Link
                                    className={styles.panelLink}
                                    to="/users">
                                    список
                                </Link>
                                <Link
                                    className={styles.panelLink}
                                    to="">
                                    удалить пользователя
                                </Link>
                            </div>
                        </div>
                        <h2 className={classnames(
                            `${styles.title} ${isDarkMode ? styles.titleDark : ''}`
                        )}>
                            Редактировать пользователя
                        </h2>
                        <div className={styles.blocks}>
                            <section className={styles.inpContainer}>
                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp">
                                        фио
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>

                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp">
                                        никнейм (eng)
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={usernames}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                </div>
                            </section>

                            <section className={styles.inpContainer}>
                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> e-mail
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>

                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> веб-сайт
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={website}
                                        onChange={(event) => setWebsite(event.target.value)}
                                    />
                                </div>
                            </section>

                            <div className={styles.inputBox}>
                                <label
                                    className={classnames(
                                        `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                    )}
                                    htmlFor="nameComp"> телефон
                                </label>
                                <input
                                    className={classnames(
                                        `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                    )}
                                    id="nameComp"
                                    name="nameComp"
                                    type="text"
                                    placeholder="Введите данные"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>

                            <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Адрес</p>

                            <section className={styles.inpContainer}>
                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> индекс
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={zipcode}
                                        onChange={(event) => setZipcode(event.target.value)}
                                    />
                                </div>

                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> город
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
                                    />
                                </div>
                            </section>

                            <div className={styles.inputBox}>
                                <label
                                    className={classnames(
                                        `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                    )}
                                    htmlFor="nameComp"> улица
                                </label>
                                <input
                                    className={classnames(
                                        `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                    )}
                                    id="nameComp"
                                    name="nameComp"
                                    type="text"
                                    placeholder="Введите данные"
                                    value={street}
                                    onChange={(event) => setStreet(event.target.value)}
                                />
                            </div>

                            <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Компания</p>

                            <section className={styles.inpContainer}>
                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> название
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={companyName}
                                        onChange={(event) => setCompanyName(event.target.value)}
                                    />
                                </div>

                                <div className={styles.inputBox}>
                                    <label
                                        className={classnames(
                                            `${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`
                                        )}
                                        htmlFor="nameComp"> описание
                                    </label>
                                    <input
                                        className={classnames(
                                            `${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`
                                        )}
                                        id="nameComp"
                                        name="nameComp"
                                        type="text"
                                        placeholder="Введите данные"
                                        value={catchPhrase}
                                        onChange={(event) => setCatchPhrase(event.target.value)}
                                    />
                                </div>
                            </section>

                            <button onClick={handleSubmit}
                                    className={classnames(
                                        `${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`)}
                            >
                                сохранить изменения >>>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditUser;