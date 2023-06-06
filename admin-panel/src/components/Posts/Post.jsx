import {useTheme} from "../../ThemeContext.jsx";
import styles from "./Post.module.scss"

const Post = ({ post, findUsername }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`${styles.post} ${isDarkMode ? styles.postDark : ''}`} key={post.id}>
            <h4 className={`${styles.title} ${isDarkMode ? styles.titleDark : ''}`}>{findUsername(post.userId)}</h4>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
        </div>
    );
};

export default Post;