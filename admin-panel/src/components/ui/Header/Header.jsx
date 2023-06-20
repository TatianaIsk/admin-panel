import { useTheme } from '../../../ThemeContext.jsx';
import logo from '../../../assets/logo.png';
import darkLogo from '../../../assets/darkAssets/dark-logo.png'
import style from './Header.module.scss';
import classnames from "classnames";

const Header = () => {
    const { isDarkMode, setDarkMode } = useTheme();

    const handleToggleTheme = () => {
        setDarkMode(!isDarkMode);

    };

    return (
        <header className={classnames(
            `${style.header} ${isDarkMode ? style.dark : ''}`
        )}>
            <a href="/">
                <img className={classnames(style.logo)}
                     src={`${isDarkMode ? darkLogo : logo}`}
                     alt=""
                />
            </a>
            <div className={style.panel}>
                <button className={classnames(
                    `${style.btnDark} ${isDarkMode ? style.btnOpenDark : ''}`
                )}
                        onClick={handleToggleTheme}
                ></button>
                <a href="/login">
                    <button className={classnames(
                        `${style.btnUser} ${isDarkMode ? style.btnUserDark : ''}`
                    )}></button>
                </a>
            </div>
        </header>
    );
};

export default Header;