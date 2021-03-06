// modules
import React, { useEffect, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
// components
import FirstInteraction from './components/FirstInteraction';
import Search from './components/Search';
import MainInfo from './components/MainInfo';
import WeekDays from './components/WeekDays';
import Day from './components/Day';
import Menu from './components/Menu';
import Loader from './components/Loader';
// Redux
import { getWeatherForecast, initFavoriteCitiesList, initLastViewedCities, removeLoading } from './actions/actions';
// services
import IDBService from './services/indexedDB';
// styles
import styles from './styles/styles.module.scss'
import "./styles/weather-icons.css";

const App = memo(({
  getWeatherForecast,
  weatherItems,
  darkMode,
  initFavoriteCitiesList,
  initLastViewedCities,
  loading,
  removeLoading,
}) => {
  const findCityInIndexedDB = useCallback(async () => {
    let isInIndexedDB = false;
    const lastViewedCities = await IDBService.getKeys('lastViewedCities');
    const favoriteCitiesList = await IDBService.getKeys('favoriteCitiesList');
    const lastViewedCitiesLength = lastViewedCities.length;
    const favoriteCitiesLength = favoriteCitiesList.length;

    if (lastViewedCitiesLength) {
      isInIndexedDB = true;

      initLastViewedCities(lastViewedCities);
      getWeatherForecast(lastViewedCities[lastViewedCitiesLength - 1]);
    }

    if (favoriteCitiesLength) {
      initFavoriteCitiesList(favoriteCitiesList);

      if (!isInIndexedDB) getWeatherForecast(favoriteCitiesList[favoriteCitiesLength - 1]);
    }

    if (!lastViewedCitiesLength && !favoriteCitiesLength) removeLoading(false);
  }, [getWeatherForecast, initFavoriteCitiesList, initLastViewedCities, removeLoading]);

  useEffect(() => {
    findCityInIndexedDB();
  }, [findCityInIndexedDB]);

  const renderContent = () => {
    if (loading) return <Loader />;

    if (weatherItems) return <>
      <MainInfo />
      <WeekDays />
      <Day />
    </>;

    return <FirstInteraction />;
  }

  return (
    <>
      <div className={cx(styles.overlay, { [styles.overlayDark]: darkMode })} />

      <div className={styles.container}>
        <Search />

        {renderContent()}

        <Menu />
      </div>
    </>
  );
})

const mapStateToProps = ({ weatherForecast, darkMode }) => ({
  weatherItems: weatherForecast.mainInfo.list,
  darkMode,
  loading: weatherForecast.loading,
});

const mapDispatchToProps = {
  getWeatherForecast,
  initFavoriteCitiesList,
  initLastViewedCities,
  removeLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
