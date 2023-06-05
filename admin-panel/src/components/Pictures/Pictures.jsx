import styles from './Pictures.module.scss'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";

const Pictures = () => {
    return (
        <>
            <Header/>
            <Menu/>
            <div className="wrapper">
                <div className={styles.panel}>
                    <a className={styles.panelLink} href="/"> назад</a>
                    <div className={styles.panelRight}>
                        <a className={styles.panelLink} href="">просмотр</a>
                        <a className={styles.panelLink} href="">список</a>
                        <a className={styles.panelLink} href="">удалить пользователя</a>
                    </div>
                </div>
                <h2 className={styles.title}>Редактировать Изображение</h2>
            </div>
        </>
    )
}

export default Pictures