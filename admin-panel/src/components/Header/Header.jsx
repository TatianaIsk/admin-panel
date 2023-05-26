import style from './Header.module.scss'
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <header className={style.header}>
            <a href="/"><img className={style.logo} src={logo}  alt=""/></a>
            <div className={style.panel}>
                <button className={style.btnDark}></button>
                <a href="/login"><button className={style.btnUser}></button></a>
            </div>
        </header>
    )
}

export default Header