import style from './Login.module.scss'
import Header from "../Header/Header.jsx";
import {useTheme} from "../../ThemeContext.jsx";
import React, {useState} from "react";

const Login = () => {
    const {isDarkMode} = useTheme();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
        } else {
            setErrorMessage("Неверный логин или пароль");
        }
    }

    return (
        <div>
            <Header/>
            <div className={`${style.loginWrapper} ${isDarkMode ? style.loginWrapperDark : ''}`}>
                <div className={style.title}>
                    <h2>авторизация</h2>
                </div>
                <div className={style.input}>

                    {errorMessage && (
                        <div className={style.errorLogin}>
                            {errorMessage}
                        </div>
                    )}
                    <div className={style.inputBox}>
                        <label className={`${style.labelCreate} ${isDarkMode ? style.labelCreateDark : ''}`}
                               htmlFor="task"> логин
                        </label>
                        <input className={style.inputCreate}
                               id="task"
                               name="task"
                               type="text"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Введите данные"
                        />
                    </div>

                    {errorMessage && (
                        <div className={style.errorPassword}>
                            {errorMessage}
                        </div>
                    )}
                    <div className={style.inputBox}>
                        <label className={`${style.labelCreate} ${isDarkMode ? style.labelCreateDark : ''}`}
                               htmlFor="task"> пароль
                        </label>
                        <input className={style.inputCreate}
                               id="task"
                               name="task"
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Введите данные"
                        />
                    </div>

                    <button className={`${style.btnSub} ${isDarkMode ? style.btnSubDark : ''}`} onClick={handleLogin}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login