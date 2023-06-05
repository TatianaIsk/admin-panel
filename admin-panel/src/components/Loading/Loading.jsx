import React from 'react';
import styles from './Loading.module.scss'

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
            <div className={styles.loaderBar}></div>
        </div>
    );
};

export default Loader;