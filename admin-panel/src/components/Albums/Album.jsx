import styles from './Album.module.scss'
import {useTheme} from "../../ThemeContext.jsx";

const Album = ({ album, username }) => {
    const {isDarkMode} = useTheme();

    return (
        <tr key={album.id}>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album.id}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{username}</td>
            <td className={`${styles.td} ${isDarkMode ? styles.tdDark : ''}`}>{album.title}</td>
        </tr>
    )
}

export default Album