import styles from "./CreateComment.module.scss"
import {useTheme} from "../../../ThemeContext.jsx";
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../store.jsx";
const CreateComment = () => {
    const { isDarkMode } = useTheme();
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState("");

    useEffect(() => {
        async function fetchData() {
            await store.fetchPosts();
            setPosts(store.state.posts);
        }

        fetchData();
    }, []);

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
                <section className={styles.inpContainer}>
                    <div className={styles.selectBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="user"> пост
                        </label>
                        <select
                            className={`${styles.selectCreate} ${isDarkMode ? styles.selectCreateDark : ''}`}
                            id="user"
                            name="user"
                            value={selectedPost}
                            onChange={(e) => setSelectedPost(e.target.value)}
                        >
                            <option className={styles.optionFirst} value="">Выберите пост</option>
                            {posts
                                .map((post) => post.title)
                                .filter((value, index, self) =>
                                    self.indexOf(value) === index && value !== "")
                                .map((title) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className={styles.inputBox}>
                        <label className={`${styles.labelCreate} ${isDarkMode ? styles.labelCreateDark : ''}`}
                               htmlFor="username"> заголовок
                        </label>
                        <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                               id="username"
                               name="username"
                               type="text"
                               placeholder="Введите данные"
                        />
                    </div>
                </section>
                <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Текст комментария</p>
                <textarea placeholder="Enter text here" className={`${styles.textArea} ${isDarkMode ? styles.textAreaDark : ''}`}/>
                <button className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`}>создать >>></button>
            </div>
        </>
    )
}

export default CreateComment