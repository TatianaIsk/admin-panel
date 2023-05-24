import {NavLink} from "react-router-dom";
import style from './Menu.module.scss'
const Menu = () => {
    return (
        <div className={style.menu}>
            <a href="/users"
                     className={style.item}>
                Пользователи
            </a>
            <a href="/tasks"
                     className={style.item}>
                Занятия
            </a>
            <a href="/pictures"
                     className={style.item}>
                Картинки
            </a>
            <a href="/albums"
                     className={style.item}>
                Альбомы
            </a>
            <a href="/blog"
                     className={style.item}>
                Блог
            </a>
        </div>
    )
}

export default Menu