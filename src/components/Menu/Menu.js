// modules
import React, { useState } from 'react';
import cx from 'classnames';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import AnimateHeight from 'react-animate-height';
import { connect } from 'react-redux';
// styles
import styles from './styles.module.scss';

const Menu = ({
    menuVisibility
}) => {
    const [showFavoriteCities, setShowFavoriteCities] = useState(0);
    const [showRecentlyViewedCities, setRecentlyViewedCities] = useState(0);

    const handleFavoriteCitiesClick = () => {
        setShowFavoriteCities(showFavoriteCities === 0 ? 'auto' : 0);
    }

    const handleRecentlyViewedCitiesClick = () => {
        setRecentlyViewedCities(showRecentlyViewedCities === 0 ? 'auto' : 0);
    }

    return (
        <div className={ menuVisibility && styles.overlay}>
            <div className={cx(styles.menuContainer, { [styles.menuContainerOpen]: menuVisibility })}>
                <ul className={styles.menuList}>
                    <li className={styles.item} onClick={handleFavoriteCitiesClick}>
                        Favorite cities list
                    </li>

                    <AnimateHeight
                        duration={300}
                        height={showFavoriteCities}

                    >
                        <div className={styles.dropDown}>
                            <div className={styles.city}>
                                City1

                                <Icon path={mdiDelete} />
                            </div>

                            <div className={styles.city}>
                                City2

                                <Icon path={mdiDelete} />
                            </div>

                            <div className={styles.city}>
                                City3

                                <Icon path={mdiDelete} />
                            </div>
                        </div>
                    </AnimateHeight>

                    <li className={styles.item} onClick={handleRecentlyViewedCitiesClick}>
                        Recently viewed cities
                        </li>

                    <AnimateHeight
                        duration={300}
                        height={showRecentlyViewedCities}
                    >
                        <div className={styles.dropDown}>
                            <div className={styles.city}>
                                City1

                                <Icon path={mdiDelete} />
                            </div>

                            <div className={styles.city}>
                                City2

                                <Icon path={mdiDelete} />
                            </div>

                            <div className={styles.city}>
                                City3

                                <Icon path={mdiDelete} />
                            </div>
                        </div>
                    </AnimateHeight>

                    <li className={styles.item}>
                        Enable dark mode
                    </li>

                    <li className={styles.item}>
                        Install app
                    </li>
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    menuVisibility: state.menuVisibility,
  });
  
  export default connect(
    mapStateToProps
  )(Menu);
