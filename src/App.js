// modules
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
// components
import FirstInteraction from './components/FirstInteraction';
import Search from './components/Search';
import MainInfo from './components/MainInfo';
import WeekDays from './components/WeekDays';
import Day from './components/Day';
import Menu from './components/Menu';
// Redux
import { getWeatherForecast, initFavoriteCitiesList, initLastViewedCities } from './actions/actions';
// services
import IDBService from './services/indexedDB';
// styles
import styles from './styles/styles.module.scss'
import "./styles/weather-icons.css";

const App = ({
  getWeatherForecast,
  weatherItems,
  darkMode,
  initFavoriteCitiesList,
  initLastViewedCities,
}) => {
  useEffect(() => {
    let flag = true;

    IDBService.getKeys('lastViewedCities').then((lastViewedCities) => {
      if (lastViewedCities.length) {
        initLastViewedCities(lastViewedCities);
        flag = false;

        getWeatherForecast(lastViewedCities[lastViewedCities.length - 1]);
      }
    });

    IDBService.getKeys('favoriteCitiesList').then((favoriteCitiesList) => {
      if (favoriteCitiesList.length) {
        initFavoriteCitiesList(favoriteCitiesList);

        if (flag) getWeatherForecast(favoriteCitiesList[favoriteCitiesList.length - 1]);
      }
    });
  }, [getWeatherForecast, initFavoriteCitiesList]);

  return (
    <>
      <div className={cx(styles.overlay, { [styles.overlayDark]: darkMode })} />

      <div className={styles.container}>
        <Search />

        {weatherItems
          ? <>
            <MainInfo />
            <WeekDays />
            <Day />
          </>
          : <FirstInteraction />
        }

        <Menu />
      </div>
    </>
  );
}


const mapStateToProps = ({ weatherForecast, darkMode }) => ({
  weatherItems: weatherForecast.mainInfo.list,
  darkMode
});

const mapDispatchToProps = {
  getWeatherForecast,
  initFavoriteCitiesList,
  initLastViewedCities,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
