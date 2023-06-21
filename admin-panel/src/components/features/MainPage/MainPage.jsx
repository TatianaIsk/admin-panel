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
                        `${styles.mainTitle} ${isDarkMode ? styles.mainTitleDark : ''}`
                    )}>
                    M-Social
                </h2>
                <h3
                    className={classnames(
                        `${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`
                    )}>
                    Добро пожаловать в админ-панель M-Social!</h3>
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

