import style from './MainPage.module.scss'
import Header from "../Header/Header.jsx";
import React, {useState, useContext} from "react";
import Menu from "../Menu/Menu.jsx";

const MainPage = () => {

    return (
        <>
            <Header/>
            <Menu/>
            <div className={style.main}>
                <h2>M-Social</h2>
                <h3>Добро пожаловать в админ-панель M-Social!</h3>
                <p>Используйте боковое меню, чтобы перейти к нужному разделу</p>
            </div>
        </>
    )
}

export default MainPage

