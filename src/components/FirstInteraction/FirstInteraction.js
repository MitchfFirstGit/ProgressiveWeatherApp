// modules
import React from 'react';
// styles
import styles from './styles.module.scss';

const FirstInteraction = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome to Progressive Weather App</h1>

            <p className={styles.text}>
                Just type your sity in the search bar and find out what's the weather today.
            </p>
            <p className={styles.text}>
                You can add a city to your favorites cities to save time in the future, just click on the heart button to do it.
            </p>

            <p className={styles.text}>
                The list of favorite cities is in the menu. The menu also has a list of recently viewed cities
            </p>

            <p className={styles.text}>
                You can use this application without Internet connection.
                This application will take up a small amount of memory on your device,
                so just install it by clicking the <span className={styles.install}>Install button</span> in the menu.
            </p>
        </div>
    );
}

export default FirstInteraction;
