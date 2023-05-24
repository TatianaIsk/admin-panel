import style from './Header.module.scss'
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <header className={style.header}>
            <img className={style.logo} src={logo}  alt=""/>
            <div className={style.panel}>
                <button className={style.btnDark}></button>
                <button className={style.btnUser}></button>
            </div>
        </header>
    )
}

export default Header