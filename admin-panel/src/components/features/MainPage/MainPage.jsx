import  './MainPage.scss'
import Header from "../../ui/Header/Header.jsx";
import Menu from "../../ui/Menu/Menu.jsx";
import {useTheme} from "../../../ThemeContext.jsx";

const MainPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <>
            <Header/>
            <Menu/>
            <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                <h2 className={`mainTitle ${isDarkMode ? 'mainTitleDark' : ''}`}>M-Social</h2>
                <h3>Добро пожаловать в админ-панель M-Social!</h3>
                <p className="text">Используйте боковое меню, чтобы перейти к нужному разделу</p>
            </div>
        </>
    )
}

export default MainPage

