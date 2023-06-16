import styles from './Album.module.scss'
import {useTheme} from "../../../ThemeContext.jsx";
import {Link} from "react-router-dom";

const Album = ({ album, username }) => {
    const {isDarkMode} = useTheme();

    return (
        <tr key={album.id}>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album.id}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{username}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album.title}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>
                <Link to={`/albums/view/${album.title}`} className={`${styles.btn} ${isDarkMode ? styles.btnDark : ''}`}>Просмотр</Link>
            </td>
        </tr>
    )
}

export default Album