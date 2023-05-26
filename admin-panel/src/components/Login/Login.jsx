import style from './Login.module.scss'
import Header from "../Header/Header.jsx";

const Login = () => {
    return (
        <div>
            <Header/>
            <div className={style.loginWrapper}>
                <div className={style.title}>
                    <h2>авторизация</h2>
                </div>
                <div className={style.input}>
                    <label htmlFor="login">Логин</label>
                    <input id="login"/>

                    <label htmlFor="password">Пароль</label>
                    <input id="password"/>

                    <button>Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Login