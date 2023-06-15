import styles from './Picture.module.scss'
import {useTheme} from "../../ThemeContext.jsx";
import {Link} from "react-router-dom";

const Picture = ({picture, album}) => {
    const {isDarkMode} = useTheme();

    return (
        <tr key={picture.id}>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{picture.id}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{picture.title}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                <img className={`${styles.img} ${isDarkMode ? styles.imgDark : ''}`}
                     src={picture.thumbnailUrl} alt=''/>
            </td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                <Link to={`/pictures/edit/${picture.id}`}
                      className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>Редактировать</Link>
            </td>
        </tr>
    )
}

export default Picture