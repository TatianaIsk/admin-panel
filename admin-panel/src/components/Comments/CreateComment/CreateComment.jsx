import styles from "./CreateComment.module.scss"
import {useTheme} from "../../../ThemeContext.jsx";
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import React, {useEffect, useState} from "react";
import store from "../../../store.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const CreateComment = () => {
    const { isDarkMode } = useTheme();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchData() {
            await store.fetchPosts();
            setPosts(store.state.posts);
        }

        fetchData();
    }, []);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        post: '',
        title: '',
        textComment: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/comments', formValues);
            store.state.comments.push(response.data);
            navigate('/comments');
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header/>
            <Menu/>
            <div className={`wrapper ${isDarkMode ? "wrapperDark" : ""}`} onSubmit={handleSubmit}>
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
                               htmlFor="post"> пост
                        </label>
                        <select
                            className={`${styles.selectCreate} ${isDarkMode ? styles.selectCreateDark : ''}`}
                            id="post"
                            name="post"
                            value={formValues.post}
                            onChange={handleInputChange}
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
                               htmlFor="title"> заголовок
                        </label>
                        <input className={`${styles.inputCreate} ${isDarkMode ? styles.inputCreateDark : ''}`}
                               id="title"
                               name="title"
                               type="text"
                               value={formValues.title}
                               placeholder="Введите данные"
                               onChange={handleInputChange}
                        />
                    </div>
                </section>
                <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>Текст комментария</p>
                <textarea placeholder="Enter text here"
                          className={`${styles.textArea} ${isDarkMode ? styles.textAreaDark : ''}`}
                          name="textComment"
                          value={formValues.textComment}
                          onChange={handleInputChange}
                />
                <button className={`${styles.btnSub} ${isDarkMode ? styles.btnSubDark : ''}`} onClick={handleSubmit}>создать >>></button>
            </div>
        </>
    )
}

export default CreateComment