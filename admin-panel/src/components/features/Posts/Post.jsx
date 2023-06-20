import {useTheme} from "../../../ThemeContext.jsx";
import styles from "./Post.module.scss"
import {Link} from "react-router-dom";
import classnames from "classnames";

const Post = ({post, findUsername}) => {
    const {isDarkMode} = useTheme();

    return (
        <div className={`${styles.post} ${isDarkMode ? styles.postDark : ''}`} key={post.id}>
            <h4
                className={classnames(
                    `${styles.title} ${isDarkMode ? styles.titleDark : ''}`
                )}>
                {findUsername(post.userId)}
            </h4>
            <h5
                className={classnames(
                    `${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`
                )}>
                {post.title}
            </h5>
            <p
                className={classnames(
                    `${styles.text} ${isDarkMode ? styles.textDark : ''}`
                )}>
                {post.body}
            </p>
            <div className={styles.btns}>
                <Link to={`/posts/view/${post.id}`}
                      className={classnames(
                          `${styles.btnView} ${isDarkMode ? styles.btnViewDark : ''}`
                      )}/>
                <Link to='/comments/create'
                      className={classnames(`${styles.btnWrite} ${isDarkMode ? styles.btnWriteDark : ''}`
                      )}/>
            </div>
        </div>
    );
};

export default Post;