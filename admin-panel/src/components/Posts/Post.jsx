import {useTheme} from "../../ThemeContext.jsx";
import styles from "./Post.module.scss"
import {Link} from "react-router-dom";

const Post = ({ post, findUsername }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`${styles.post} ${isDarkMode ? styles.postDark : ''}`} key={post.id}>
            <h4 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>{findUsername(post.userId)}</h4>
            <h5 className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>{post.title}</h5>
            <p className={`${styles.text} ${isDarkMode ? styles.textDark : ''}`}>{post.body}</p>
            <div className={styles.btns}>
                <Link to={`/posts/view/${post.id}`} className={`${styles.btnView} ${isDarkMode ? styles.btnViewDark : ''}`}/>
                <a href='/comments/create' className={`${styles.btnWrite} ${isDarkMode ? styles.btnWriteDark : ''}`}/>
            </div>
        </div>
    );
};

export default Post;