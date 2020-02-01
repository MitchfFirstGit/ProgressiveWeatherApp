// modules
import React, { useState, useRef, useCallback, useEffect } from 'react';
import cx from 'classnames';
import AnimateHeight from 'react-animate-height';
import { connect } from 'react-redux';
// components
import Icon from '../Icon';
// Redux
import {
    removeFromFavoriteCitiesList,
    removeFromLastViewedCities,
    getWeatherForecast,
    setMenuVisibility,
    setDarkMode
} from '../../actions/actions';
// hooks
import useOutsideClick from '../../hooks/useOutsideClick';
// styles
import styles from './styles.module.scss';

const Menu = ({
    menuVisibility,
    favoriteCitiesList,
    removeFromFavoriteCitiesList,
    lastViewedCities,
    removeFromLastViewedCities,
    getWeatherForecast,
    setMenuVisibility,
    setDarkMode,
    darkMode
}) => {
    const [showFavoriteCities, setShowFavoriteCities] = useState(0);
    const [showRecentlyViewedCities, setRecentlyViewedCities] = useState(0);
    const [installEvent, setInstallEvent] = useState(null);
    const ref = useRef();

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();

            setInstallEvent(event);
        });
    }, []);

    useOutsideClick(ref, () => {
        setMenuVisibility(false);
        if (showFavoriteCities === 'auto') setShowFavoriteCities(0);
        if (showRecentlyViewedCities === 'auto') setRecentlyViewedCities(0);
    });

    const handleInstallAppClick = () => {
        installEvent.prompt();

        installEvent.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setInstallEvent(null);
                }
            });
    };

    const handleMenuClose = () => {
        if (showFavoriteCities === 'auto') setShowFavoriteCities(0);
        if (showRecentlyViewedCities === 'auto') setRecentlyViewedCities(0);

        setMenuVisibility(!menuVisibility);
    }

    const handleFavoriteCitiesClick = () => {
        setShowFavoriteCities(showFavoriteCities === 0 ? 'auto' : 0);
    }

    const handleRecentlyViewedCitiesClick = () => {
        setRecentlyViewedCities(showRecentlyViewedCities === 0 ? 'auto' : 0);
    }

    const handleRemoveFavoriteCity = useCallback(({ currentTarget }) => {
        removeFromFavoriteCitiesList(currentTarget.id);
    }, [removeFromFavoriteCitiesList]);

    const handleRemoveLastViewedCity = useCallback(({ currentTarget }) => {
        removeFromLastViewedCities(currentTarget.id);
    }, [removeFromLastViewedCities]);

    const handleCityClick = ({ currentTarget, target }) => {
        if (currentTarget === target) {
            handleMenuClose();
            getWeatherForecast(currentTarget.id);
        }
    }

    const renderFavoriteCities = () => {
        if (favoriteCitiesList.length) return favoriteCitiesList.map(city => (
            <div
                className={cx(styles.city, { [styles.darkCity]: darkMode })}
                key={city}
                id={city}
                onClick={handleCityClick}
            >
                {city}

                <Icon
                    className={cx(styles.removeIcon, { [styles.darkRemoveIcon]: darkMode })}
                    iconName="remove"
                    onClick={handleRemoveFavoriteCity}
                    id={city}
                />
            </div>
        ))

        return <div className={cx(styles.noCities, { [styles.noCitiesDark]: darkMode })}>
            Oops, empty here, click heart button to add a city
        </div>
    }

    const renderLastViewedCities = () => {
        if (lastViewedCities.length) return lastViewedCities.map(city => (
            <div
                className={cx(styles.city, { [styles.darkCity]: darkMode })}
                key={city}
                id={city}
                onClick={handleCityClick}
            >
                {city}

                <Icon
                    className={cx(styles.removeIcon, { [styles.darkRemoveIcon]: darkMode })}
                    iconName="remove"
                    onClick={handleRemoveLastViewedCity}
                    id={city}
                />
            </div>
        ))

        return <div className={cx(styles.noCities, { [styles.noCitiesDark]: darkMode })}>
            Oops, empty here, click search button to add a city
        </div>
    }

    const handleModeChange = () => {
        setDarkMode(!darkMode)
    }

    return (
        <>
            <div className={cx({ [styles.overlay]: menuVisibility, [styles.overlayDarkMode]: darkMode })} />

            <div
                className={cx(
                    styles.menuContainer,
                    {
                        [styles.menuContainerOpen]: menuVisibility,
                        [styles.menuContainerOpenDarkMode]: darkMode
                    }
                )}
                ref={ref}
            >
                <button className={styles.button} onClick={handleMenuClose}>
                    <Icon className={cx(styles.closeIcon, { [styles.darkCloseIcon]: darkMode })} iconName="close" />
                </button>

                <ul className={cx(styles.menuList, { [styles.darkMenuList]: darkMode })}>
                    <li onClick={handleFavoriteCitiesClick}>
                        Favorite cities list
                    </li>

                    <AnimateHeight
                        duration={300}
                        height={showFavoriteCities}

                    >
                        <div className={styles.dropDown}>
                            {renderFavoriteCities()}
                        </div>
                    </AnimateHeight>

                    <li onClick={handleRecentlyViewedCitiesClick}>
                        Recently viewed cities
                        </li>

                    <AnimateHeight
                        duration={300}
                        height={showRecentlyViewedCities}
                    >
                        <div className={styles.dropDown}>
                            {renderLastViewedCities()}
                        </div>
                    </AnimateHeight>

                    <li onClick={handleModeChange}>
                        {darkMode ? 'Disable dark mode' : 'Enable dark mode'}
                    </li>

                    {installEvent && <li onClick={handleInstallAppClick}>
                        Install app
                    </li>}
                </ul>
            </div>
        </>
    );
}

const mapStateToProps = ({ menuVisibility, favoriteCitiesList, lastViewedCities, darkMode }) => ({
    menuVisibility,
    favoriteCitiesList,
    lastViewedCities,
    darkMode
});

const mapDispatchToProps = {
    removeFromFavoriteCitiesList,
    removeFromLastViewedCities,
    getWeatherForecast,
    setMenuVisibility,
    setDarkMode
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
