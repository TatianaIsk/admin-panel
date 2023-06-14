import {useState, useRef} from 'react';
import styles from './ImageUploader.module.scss';
import photo from './../../../assets/photo-image-uploader.png'
import {useTheme} from "../../../ThemeContext.jsx";

const ImageUploader = () => {
    const { isDarkMode } = useTheme();
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage({file, imageUrl});
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleContainerClick = () => {
        inputRef.current.click();
    };

    return (
        <div className={styles.container} onClick={handleContainerClick}>
            {!selectedImage && (
                <div className={styles.block}>
                    <label htmlFor="image" className={`${styles.label} ${isDarkMode ? styles.labelDark : ''}`}>
                        <label className={styles.subLabel}>
                            Перетащите сюда или нажмите для выбора >>>
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept=".png, .jpg, .jpeg, .webp"
                            onChange={handleImageChange}
                            ref={inputRef}
                        />
                    </label>
                    <img src={photo} alt='cat' className={styles.photo}/>
                </div>
            )}
            {selectedImage && (
                <div className={styles.preview}>
                    <img src={selectedImage.imageUrl} alt="Selected" className={styles.image}/>
                    <button onClick={handleRemoveImage} className={styles.removeButton}>
                        Удалить
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;