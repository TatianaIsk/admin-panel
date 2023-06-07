import styles from "./CreateComment.module.scss"
import {useTheme} from "../../../ThemeContext.jsx";
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
const CreateComment = () => {
    const { isDarkMode } = useTheme();

    return (
        <>
            <Header/>
            <Menu/>
            <div className={`wrapper ${isDarkMode ? "wrapperDark" : ""}`}>
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/users"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="">просмотр</a>
                        <a className={styles.panelLink} href="">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>создание комментария</h2>
            </div>
        </>
    )
}

export default CreateComment