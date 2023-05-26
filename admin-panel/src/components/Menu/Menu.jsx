import React, {useState} from "react";
import styles from "./menu.module.scss";
import {useSpring, animated} from "react-spring";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMiniOpen, setIsMiniOpen] = useState(false)

    const miniMenuAnimation = useSpring({
        transform: `translateY(${isMiniOpen ? 0 : -40}%)`,
        config: { duration: 250 },
    });

    function toggleMenu() {
        setIsOpen(!isOpen);

        const otherComponent = document.querySelector('.wrapper');
        if (isOpen) {
            otherComponent.style.margin = '0 0 0 100px';
        } else {
            otherComponent.style.margin = '60px 0 0 440px';
        }
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
                        <a href="/users">Пользователи</a>
                        <a href="">Задания</a>
                        <a href="">Картинки</a>
                        <a href="">Альбомы</a>
                        <a href="">Блог
                            <button className={isMiniOpen ? styles.iconOpen : styles.iconClose}
                                    onClick={miniMenu}>
                            </button>
                            {isMiniOpen && (
                                <animated.div style={miniMenuAnimation} className={styles.miniMenu}>
                                    <ul>
                                        <a href="">Посты</a>
                                        <a href="" className={styles.comment}>Комментарии</a>
                                    </ul>
                                </animated.div>
                            )}
                        </a>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Menu;


