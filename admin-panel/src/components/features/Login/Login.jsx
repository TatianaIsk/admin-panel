import style from './Login.module.scss'
import Header from "../../ui/Header/Header.jsx";
import {useTheme} from "../../../ThemeContext.jsx";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";

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
            <div className={classnames(
                `${style.loginWrapper} ${isDarkMode ? style.loginWrapperDark : ''}`
            )}>
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
                        <label
                            className={classnames(
                                `${style.labelCreate} ${isDarkMode ? style.labelCreateDark : ''}`
                            )}
                            htmlFor="task">
                            логин
                        </label>
                        <input
                            className={style.inputCreate}
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
                        <label
                            className={classnames(
                                `${style.labelCreate} ${isDarkMode ? style.labelCreateDark : ''}`
                            )}
                            htmlFor="task">
                            пароль
                        </label>
                        <input
                            className={style.inputCreate}
                            id="task"
                            name="task"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите данные"
                        />
                    </div>

                    <Link
                        className={classnames(
                            `${style.btnSub} ${isDarkMode ? style.btnSubDark : ''}`
                        )}
                        onClick={handleLogin}
                        to="/">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login