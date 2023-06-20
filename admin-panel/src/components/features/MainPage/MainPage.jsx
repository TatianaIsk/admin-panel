import Header from "../../ui/Header/Header.jsx";
import Menu from "../../ui/Menu/Menu.jsx";
import {useTheme} from "../../../ThemeContext.jsx";
import classnames from "classnames";
import styles from "./MainPage.module.scss";

const MainPage = () => {
    const {isDarkMode} = useTheme();

    return (
        <>
            <div className={classnames(
                `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
            )}>
                <h2
                    className={classnames(
                        isDarkMode ? styles.mainTitleDark : styles.mainTitle
                    )}>
                    M-Social
                </h2>
                <h3>Добро пожаловать в админ-панель M-Social!</h3>
                <p
                    className={classnames(
                        isDarkMode ? styles.textDark : styles.text
                    )}>
                    Используйте боковое меню, чтобы перейти к нужному разделу
                </p>
            </div>
        </>
    )
}

export default MainPage

