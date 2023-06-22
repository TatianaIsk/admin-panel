import { useTheme } from '../../../ThemeContext.jsx';
import logo from '../../../assets/logo.png';
import darkLogo from '../../../assets/darkAssets/dark-logo.png'
import style from './Header.module.scss';
import classnames from "classnames";
import {Link} from "react-router-dom";

const Header = () => {
    const { isDarkMode, setDarkMode } = useTheme();

    const handleToggleTheme = () => {
        setDarkMode(!isDarkMode);

    };

    return (
        <header className={classnames(
            `${style.header} ${isDarkMode ? style.dark : ''}`
        )}>
            <Link to="/">
                <img className={classnames(style.logo)}
                     src={`${isDarkMode ? darkLogo : logo}`}
                     alt=""
                />
            </Link>
            <div className={style.panel}>
                <button className={classnames(
                    `${style.btnDark} ${isDarkMode ? style.btnOpenDark : ''}`
                )}
                        onClick={handleToggleTheme}
                ></button>
                <Link to="/login">
                    <button className={classnames(
                        `${style.btnUser} ${isDarkMode ? style.btnUserDark : ''}`
                    )}></button>
                </Link>
            </div>
        </header>
    );
};

export default Header;