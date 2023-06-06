import styles from './CreateUser.module.scss'
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";

import {useState} from "react";
import axios from "axios";
import {useTheme} from "../../../ThemeContext.jsx";

const CreateUser = () => {
    const { isDarkMode } = useTheme();

    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        email: '',
        website: '',
        phone: '',
        zipcode: '',
        city: '',
        street: '',
        nameComp: '',
        catchPhrase: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <>
            <Header/>
            <Menu/>
            <form className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/users"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="">просмотр</a>
                        <a className={styles.panelLink} href="">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>Создать пользователя</h2>
                <section className={styles.inpContainer}>
                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="name"> ФИО
                        </label>
                        <input className={styles.inputCreate}
                               id="name"
                               name="name"
                               type="text"
                               value={formValues.name}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="username"> логин
                        </label>
                        <input className={styles.inputCreate}
                               id="username"
                               name="username"
                               type="text"
                               value={formValues.username}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>
                </section>

                <section className={styles.inpContainer}>
                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="email"> e-mail
                        </label>
                        <input className={styles.inputCreate}
                               id="email"
                               name="email"
                               type="text"
                               value={formValues.email}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="website"> веб-сайт
                        </label>
                        <input className={styles.inputCreate}
                               id="website"
                               name="website"
                               type="text"
                               value={formValues.website}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>
                </section>

                <div className={styles.inputBox}>
                    <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                           htmlFor="phone"> телефон
                    </label>
                    <input className={styles.inputCreate}
                           id="phone"
                           name="phone"
                           type="text"
                           value={formValues.phone}
                           onChange={handleInputChange}
                           placeholder="Введите данные"
                    />
                </div>

                <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Адрес</p>

                <section className={styles.inpContainer}>
                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="zipcode"> индекс
                        </label>
                        <input className={styles.inputCreate}
                               id="zipcode"
                               name="zipcode"
                               type="text"
                               value={formValues.zipcode}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="city"> город
                        </label>
                        <input className={styles.inputCreate}
                               id="city"
                               name="city"
                               type="text"
                               value={formValues.city}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>
                </section>

                <div className={styles.inputBox}>
                    <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                           htmlFor="street"> улица
                    </label>
                    <input className={styles.inputCreate}
                           id="street"
                           name="street"
                           type="text"
                           value={formValues.street}
                           onChange={handleInputChange}
                           placeholder="Введите данные"
                    />
                </div>

                <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Компания</p>

                <section className={styles.inpContainer}>
                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="nameComp"> название
                        </label>
                        <input className={styles.inputCreate}
                               id="nameComp"
                               name="nameComp"
                               type="text"
                               value={formValues.nameComp}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>

                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="catchPhrase"> описание
                        </label>
                        <input className={styles.inputCreate}
                               id="catchPhrase"
                               name="catchPhrase"
                               type="text"
                               value={formValues.catchPhrase}
                               onChange={handleInputChange}
                               placeholder="Введите данные"
                        />
                    </div>
                </section>
                <button className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>создать >>></button>
            </form>
        </>
    )
}

export default CreateUser