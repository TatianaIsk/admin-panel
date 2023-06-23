import styles from './InputLabel.module.scss'
import {useTheme} from "../../../ThemeContext.jsx";
import classnames from "classnames";

const InputLabel = ({label, type, id, value, onChange, placeholder}) => {
    const {isDarkMode} = useTheme();

    return (
        <div className={styles.inputBox}>
            <label className=className={classnames(
                styles.labelCreate, isDarkMode && styles.labelCreateDark
            )}>
                htmlFor={id}>
                {label}
            </label>
            <input className={classnames(styles.inputCreate)}
                   type={type}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
            />
        </div>
    )
}

export default InputLabel