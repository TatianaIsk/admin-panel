import Modal from "react-modal";
import {useTheme} from "../../ThemeContext.jsx";
import styles from './ModalDelete.module.scss'

const ModalDelete = ({ isOpen, onClose, onDelete }) => {
    const { isDarkMode } = useTheme();

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        content: {
            width: '300px',
            height: '180px',
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#191919' : '#f3f2f2',
            color: isDarkMode ? '#f3f2f2' : '#191919',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)',
            borderRadius: '16px',
            margin: 'auto',
            padding: '20px',
        },
    };

    return (
        <div className={styles.modalWrapper}>
            <Modal isOpen={isOpen}
                   onRequestClose={onClose}
                   style={customStyles}
                   contentLabel="Modal"
            >
                <h2 className={styles.title}>
                    Подтвердите удаление
                </h2>
                <p className={styles.subtitle}>
                    Вы действительно хотите удалить пользователя?
                </p>
                <div className="modal-buttons">
                    <button onClick={onDelete}
                            className={styles.btn}
                    >
                        Удалить
                    </button>
                    <button onClick={onClose}
                            className={styles.btn}
                    >
                        Отмена
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalDelete;
