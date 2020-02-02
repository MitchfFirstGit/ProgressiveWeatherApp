// modules
import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
// styles
import styles from './styles.module.scss';

const Loader = ({ darkMode }) => {
    return (
        <div className={styles.container}>
            <div className={cx(styles.firstTriangle, { [styles.firstTriangleDarkMode]: darkMode })}></div>
            <div className={cx(styles.secondTriangle, { [styles.secondTriangleDarkMode]: darkMode })}></div>
            <h4 className={styles.text}>Loading...</h4>
        </div>
    );
};

const mapStateToProps = ({ darkMode }) => ({
    darkMode,
});

export default connect(mapStateToProps)(Loader);
