import  './MainPage.scss'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";
import {useState} from "react";
import {useTheme} from "../../ThemeContext.jsx";

const MainPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <>
            <Header/>
            <Menu/>
            <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                <h2 className="mainTitle">M-Social</h2>
                <h3>Добро пожаловать в админ-панель M-Social!</h3>
                <p className="text">Используйте боковое меню, чтобы перейти к нужному разделу</p>
            </div>
        </>
    )
}

export default MainPage

