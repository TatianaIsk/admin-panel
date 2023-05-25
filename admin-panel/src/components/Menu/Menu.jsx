import React, {useState} from "react";
import styles from "./menu.module.scss";
import {useSpring, animated} from "react-spring";
import {NavLink} from "react-router-dom";
import Users from "../Users/Users.jsx";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMiniOpen, setIsMiniOpen] = useState(false)

    const miniMenuAnimation = useSpring({
        transform: `translateY(${isMiniOpen ? 0 : -40}%)`,
        config: { duration: 250 },
    });

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function miniMenu() {
        setIsMiniOpen(!isMiniOpen)
    }

    return (
        <>
            <button className={isOpen ? styles.btn : styles.btnClose}
                    onClick={toggleMenu}>
            </button>
            <div className={styles.column}></div>
            {isOpen && (
                <div className={styles.menu}>
                    <ul>
                        <NavLink to={<Users/>}>Пользователи</NavLink>
                        <NavLink to="">Задания</NavLink>
                        <NavLink to="">Картинки</NavLink>
                        <NavLink to="">Альбомы</NavLink>
                        <NavLink to="">Блог
                            <button className={isMiniOpen ? styles.iconOpen : styles.iconClose}
                                    onClick={miniMenu}>
                            </button>
                            {isMiniOpen && (
                                <animated.div style={miniMenuAnimation} className={styles.miniMenu}>
                                    <ul>
                                        <NavLink to="">Посты</NavLink>
                                        <NavLink to="" className={styles.comment}>Комментарии</NavLink>
                                    </ul>
                                </animated.div>
                            )}
                        </NavLink>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Menu;


