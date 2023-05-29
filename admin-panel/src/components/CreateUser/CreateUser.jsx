import styles from './CreateUser.module.scss'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";
import InputLabel from "../InputLabel/InputLabel.jsx";
import {useState} from "react";

const CreateUser = () => {
    const [formValues, setFormValues] = useState({fio: '', login: '', email: '', site: '', phone: '', index: '', city: ''})

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            <Header/>
            <Menu/>
            <div className="wrapper">
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/users"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="">просмотр</a>
                        <a className={styles.panelLink} href="">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={styles.title}>Создать пользователя</h2>
                <section className={styles.inpContainer}>
                    <InputLabel
                        label="ФИО"
                        id="fio"
                        type="text"
                        name="fio"
                        value={formValues.fio}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />

                    <InputLabel
                        label="логин"
                        id="login"
                        type="text"
                        name="login"
                        value={formValues.login}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />
                </section>

                <section className={styles.inpContainer}>
                    <InputLabel
                        label="e-mail"
                        id="e-mail"
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />

                    <InputLabel
                        label="веб-сайт"
                        id="site"
                        type="text"
                        name="site"
                        value={formValues.site}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />
                </section>

                <InputLabel
                    label="телефон"
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    placeholder="Введите данные"
                />

                <p className={styles.subtitle}>Адрес</p>

                <section className={styles.inpContainer}>
                    <InputLabel
                        label="индекс"
                        id="index"
                        type="text"
                        name="index"
                        value={formValues.index}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />

                    <InputLabel
                        label="город"
                        id="city"
                        type="text"
                        name="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                        placeholder="Введите данные"
                    />
                </section>
            </div>
        </>
    )
}

export default CreateUser