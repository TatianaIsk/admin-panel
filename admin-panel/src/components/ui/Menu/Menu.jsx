import React, {useEffect, useState} from "react";
import styles from "./Menu.module.scss";
import {useSpring, animated} from "react-spring";
import {useTheme} from "../../../ThemeContext.jsx";
import classnames from 'classnames';

function Menu() {
    const { isDarkMode } = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [isMiniOpen, setIsMiniOpen] = useState(false)
    const [graphic, setGraphic] = useState(false)

    const [selectedLink, setSelectedLink] = useState('');

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

    function handleClick(linkName) {
        setSelectedLink(linkName);
        localStorage.setItem('selectedLink', linkName);
    }

    useEffect(() => {
        const savedLink = localStorage.getItem('selectedLink');
        if (savedLink) {
            setSelectedLink(savedLink);
        }
    }, []);

    function miniMenu() {
        setIsMiniOpen(!isMiniOpen)
    }

    function graphMenu() {
        setGraphic(!graphic)
    }

    return (
        <>
            <button className={classnames(
                `${isOpen ? isDarkMode ? styles.btnDark : styles.btn : isDarkMode ? styles.btnCloseDark : styles.btnClose}`
            )}
                    onClick={toggleMenu}
            >
            </button>
            <div className={`${styles.column} ${isDarkMode ? styles.columnDark : ''}`}></div>
            {isOpen && (
                <animated.div className={classnames(
                    `${styles.menu} ${isDarkMode ? styles.menuDark : ''}`
                )}
                              style={menuAnimation}>
                    <ul>
                        <a href="/users"
                           className={classnames(
                               selectedLink === 'users' ? isDarkMode ? styles.activeDark : styles.active : ''
                           )}
                           onClick={() => handleClick('users')}>
                            Пользователи
                        </a>
                        <a href="/todos"
                           className={classnames(
                               selectedLink === 'todos' ? isDarkMode ? styles.activeDark : styles.active : ''
                           )}
                           onClick={() => handleClick('todos')}>
                            Задания
                        </a>
                        <div className={styles.blog}>
                            <span>Графика</span>
                            <button className={`${graphic ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose}`}
                                    onClick={graphMenu}>
                            </button>
                        </div>
                        {graphic && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <a href="/pictures"
                                       className={classnames(
                                           selectedLink === 'pictures' ? isDarkMode ? styles.activeDark : styles.active : '',
                                           styles.comment
                                       )}
                                       onClick={() => handleClick('pictures')}>
                                        Картинки
                                    </a>
                                    <a href="/albums"
                                       className={classnames(
                                           selectedLink === 'albums' ? isDarkMode ? styles.activeDark : styles.active : '',
                                           styles.comment
                                       )}
                                       onClick={() => handleClick('albums')}>
                                        Альбомы
                                    </a>
                                </ul>
                            </div>
                        )}
                        <div className={styles.blog}>
                            <span>Блог</span>
                            <button className={classnames(
                                `${isMiniOpen ? isDarkMode ? styles.iconOpenDark : styles.iconOpen : isDarkMode ? styles.iconCloseDark : styles.iconClose}`
                            )}
                                    onClick={miniMenu}>
                            </button>
                        </div>
                        {isMiniOpen && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <a href="/posts"
                                       className={classnames(
                                           selectedLink === 'posts' ? isDarkMode ? styles.activeDark : styles.active : '',
                                           styles.comment
                                       )}
                                       onClick={() => handleClick('posts')}>
                                        Посты
                                    </a>
                                    <a href="/comments"
                                       className={classnames(
                                           selectedLink === 'comments' ? isDarkMode ? styles.activeDark : styles.active : '',
                                           styles.comment
                                       )}
                                       onClick={() => handleClick('comments')}>
                                        Комментарии
                                    </a>
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


