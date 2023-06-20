import {useTheme} from "../../../ThemeContext.jsx";
import styles from './Comment.module.scss'
import classnames from "classnames";

const Comment = ({ comments, postTitle }) => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className={classnames(
                `${styles.commentWrapper} ${isDarkMode ? styles.commentWrapperDark : ''}`
            )}>
            <h4
                className={classnames(
                    `${styles.titleFirst} ${isDarkMode ? styles.titleFirstDark : ''}`
                )}>
                Пост: {postTitle}
            </h4>
            <h4
                className={classnames(
                    `${styles.titleSecond} ${isDarkMode ? styles.titleSecondDark : ''}`
                )}>
                Email: {comments.email}
            </h4>
            <p
                className={classnames(
                    `${styles.subtitle} ${isDarkMode ? styles.subtitleDark : ''}`
                )}>
                {comments.name}
            </p>
            <p
                className={classnames(
                    `${styles.text} ${isDarkMode ? styles.textDark : ''}`
                )}>
                {comments.body}
            </p>
        </div>
    )
}
export default Comment