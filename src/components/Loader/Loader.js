// modules
import React from 'react';
// styles
import styles from './styles.module.scss';

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.firstTriangle}></div>
            <div className={styles.secondTriangle}></div>
            <h4 className={styles.text}>Loading...</h4>
        </div>
    );
}

export default Loader;
