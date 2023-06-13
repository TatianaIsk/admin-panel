import React, {useState} from "react";
import styles from "./menu.module.scss";
import {useSpring, animated} from "react-spring";
import {useTheme} from "../../ThemeContext.jsx";
import style from "../Header/Header.module.scss";

function Menu() {
    const { isDarkMode } = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [isMiniOpen, setIsMiniOpen] = useState(false)
    const [graphic, setGraphic] = useState(false)

    const menuAnimation = useSpring({
        transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
    });

    const miniMenuAnimation = useSpring({
        height: isMiniOpen ? "100%" : "0%",
        opacity: isMiniOpen ? 1 : 0,
        config: { duration: 300 },
    });

    const graphMenuAnimation = useSpring({
        height: isMiniOpen ? "100%" : "0%",
        opacity: isMiniOpen ? 1 : 0,
        config: { duration: 300 },
    });

    function toggleMenu() {
        setIsOpen(!isOpen);

        const otherComponent = document.querySelector('.wrapper');
        if (isOpen) {
            otherComponent.style.margin = '0 100px 0 100px';
        } else {
            otherComponent.style.margin = '60px 0 0 440px';
        }
    }

    function miniMenu() {
        setIsMiniOpen(!isMiniOpen)
    }

    function graphMenu() {
        setGraphic(!graphic)
    }

    return (
        <>
            <button className={`${isOpen ? isDarkMode ? styles.btnDark : styles.btn : isDarkMode ? styles.btnCloseDark : styles.btnClose}`}
                    onClick={toggleMenu}
            >
            </button>
            <div className={`${styles.column} ${isDarkMode ? styles.columnDark : ''}`}></div>
            {isOpen && (
                <animated.div className={`${styles.menu} ${isDarkMode ? styles.menuDark : ''}`} style={menuAnimation}>
                    <ul>
                        <a href="/users">Пользователи</a>
                        <a href="/todos">Задания</a>
                        <div className={styles.blog}>
                            <a href="">Графика</a>
                            <button className={`${graphic ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose}`}
                                    onClick={graphMenu}>
                            </button>
                        </div>
                        {graphic && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <a href="/pictures" className={styles.comment}>Картинки</a>
                                    <a href="/albums" className={styles.comment}>Альбомы</a>
                                </ul>
                            </div>
                        )}
                        <div className={styles.blog}>
                            <a href="">Блог</a>
                            <button className={`${isMiniOpen ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose}`}
                                    onClick={miniMenu}>
                            </button>
                        </div>
                        {isMiniOpen && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <a href="/posts" className={styles.comment}>Посты</a>
                                    <a href="/comments" className={styles.comment}>Комментарии</a>
                                </ul>
                            </div>
                        )}
                    </ul>
                </animated.div>
            )}
        </>
    );
}

export default Menu;


