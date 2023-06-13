import styles from './Picture.module.scss'
import {useTheme} from "../../ThemeContext.jsx";
import {Link} from "react-router-dom";

const Picture = ({ picture, album }) => {
    const { isDarkMode } = useTheme();

    return (
        <div>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{picture.id}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{picture.title}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                <img src={picture.url} alt=''/>
            </td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                <Link to={`/pictures/edit/${picture.id}`} className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>Редактировать</Link>
            </td>
        </div>
    )
}

export default Picture