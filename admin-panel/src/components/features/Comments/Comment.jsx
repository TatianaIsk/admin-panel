import {useTheme} from "../../../ThemeContext.jsx";
import styles from './Comment.module.scss'

const Comment = ({ comments, postTitle }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`${styles.commentWrapper} ${isDarkMode ? styles.commentWrapperDark : ''}`}>
            <h4 className={`${styles.titleFirst} ${isDarkMode ? styles.titleFirstDark : ''}`}>
                Пост: {postTitle}
            </h4>
            <h4 className={`${styles.titleSecond} ${isDarkMode ? styles.titleSecondDark : ''}`}>
                Email: {comments.email}
            </h4>
            <p className={`${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`}>
                {comments.name}
            </p>
            <p className={`${styles.text} ${isDarkMode ? styles.textDark : ''}`}>{comments.body}</p>
        </div>
    )
}
export default Comment