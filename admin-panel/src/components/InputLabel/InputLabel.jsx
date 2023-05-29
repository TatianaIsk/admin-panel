import styles from './InputLabel.module.scss'

const InputLabel = ({label, type, id, value, onChange, placeholder}) => {
  return (
      <div className={styles.inputBox}>
          <label className={styles.labelCreate}
                 htmlFor={id}>
                 {label}
          </label>
          <input className={styles.inputCreate}
                 type={type}
                 value={value}
                 onChange={onChange}
                 placeholder={placeholder}
          />
      </div>
  )
}

export default InputLabel