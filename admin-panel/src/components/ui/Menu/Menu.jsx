import React, {useEffect, useState} from "react";
import styles from "./Menu.module.scss";
import {useSpring, animated} from "react-spring";
import {useTheme} from "../../../ThemeContext.jsx";
import classnames from 'classnames';
import GraphicsMenu from "./MenuLinks/GraphicsMenu/GraphicsMenu.jsx";
import TodosLink from "./MenuLinks/TodosLink/TodosLink.jsx";
import UsersLink from "./MenuLinks/UsersLink/UsersLink.jsx";
import PicturesLink from "./MenuLinks/PicturesLink/PicturesLink.jsx";
import AlbumsLink from "./MenuLinks/AlbumsLink/AlbumsLink.jsx";
import BlogsMenu from "./MenuLinks/BlogsMenu/BlogsMenu.jsx";
import PostsLink from "./MenuLinks/PostsLink/PostsLink.jsx";
import CommentsLink from "./MenuLinks/CommnetsLink/CommentsLink.jsx";

function Menu() {
    const {isDarkMode} = useTheme();

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
        config: {duration: 300},
    });

    const graphMenuAnimation = useSpring({
        height: isMiniOpen ? "100%" : "0%",
        opacity: isMiniOpen ? 1 : 0,
        config: {duration: 300},
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
                        <UsersLink
                            isSelected={selectedLink === 'users'}
                            isDarkMode={isDarkMode}
                            onClick={handleClick}
                        />
                        <TodosLink
                            isSelected={selectedLink === 'todos'}
                            isDarkMode={isDarkMode}
                            onClick={handleClick}
                        />
                        <GraphicsMenu
                            isOpen={graphic}
                            isDarkMode={isDarkMode}
                            onClick={graphMenu}
                        />
                        {graphic && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <PicturesLink
                                        isSelected={selectedLink === 'pictures'}
                                        isDarkMode={isDarkMode}
                                        onClick={handleClick}
                                    />
                                    <AlbumsLink
                                        isSelected={selectedLink === 'albums'}
                                        isDarkMode={isDarkMode}
                                        onClick={handleClick}
                                    />
                                </ul>
                            </div>
                        )}
                        <BlogsMenu
                            isOpen={isMiniOpen}
                            isDarkMode={isDarkMode}
                            onClick={miniMenu}
                        />
                        {isMiniOpen && (
                            <div className={styles.miniMenu}>
                                <ul>
                                    <PostsLink
                                        isSelected={selectedLink === 'posts'}
                                        isDarkMode={isDarkMode}
                                        onClick={handleClick}
                                    />
                                    <CommentsLink
                                        isSelected={selectedLink === 'comments'}
                                        isDarkMode={isDarkMode}
                                        onClick={handleClick}
                                    />
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


