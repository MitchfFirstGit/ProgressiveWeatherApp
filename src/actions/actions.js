import moment from 'moment';
import store from '../store';

import {
    CLEAR_WEATHER_FORECAST,
    GET_WEATHER_FORECAST,
    ERROR_WEATHER_FORECAST,
    SET_SELECTED_DAY,
    SET_SELECTED_HOUR,
    SET_MENU_VISIBILITY,
    ADD_TO_FAVORITE_CITIES_LIST,
    REMOVE_FROM_FAVORITE_CITIES_LIST,
    ADD_TO_LAST_VIEWED_CITIES,
    REMOVE_FROM_LAST_VIEWED_CITIES,
    SET_DARK_MODE,
    INIT_FAVORITE_CITIES_LIST,
    INIT_LAST_VIEWED_CITIES,
} from './constants';

import IDBService from '../services/indexedDB';

const apiKey = 'de1e94c85ef8c5b5b4456417ebd24daf';

export const setSelectedDay = (selectedDay, selectedHour) => dispatch => {
    dispatch({
        type: SET_SELECTED_DAY,
        payload: {
            selectedDay,
            selectedHour
        }
    });
};

export const setSelectedHour = (selectedHour) => dispatch => {
    dispatch({
        type: SET_SELECTED_HOUR,
        payload: {
            selectedHour
        }
    });
}

export const setMenuVisibility = (value) => dispatch => {
    dispatch({
        type: SET_MENU_VISIBILITY,
        payload: {
            value
        }
    });
};

export const initFavoriteCitiesList = favoriteCitiesList => async (dispatch) => {
    dispatch({
        type: INIT_FAVORITE_CITIES_LIST,
        payload: {
            favoriteCitiesList
        }
    });
};

export const initLastViewedCities = lastViewedCities => async (dispatch) => {
    dispatch({
        type: INIT_LAST_VIEWED_CITIES,
        payload: {
            lastViewedCities
        }
    });
};

export const addToFavoriteCitiesList = city => async (dispatch) => {
    const currentWeatherInfo = store.getState().weatherForecast.mainInfo;

    IDBService.set('favoriteCitiesList', city, currentWeatherInfo);

    const keys = await IDBService.getKeys('favoriteCitiesList');

    if (keys.length > 5) {
        const values = await IDBService.getValues('favoriteCitiesList');
        // ascending
        values.sort((a, b) => a.addedToDB - b.addedToDB);
        const { name, country } = values[0].city;
        IDBService.delete('favoriteCitiesList', `${name}, ${country}`);
    }

    const favoriteCitiesList = await IDBService.getKeys('favoriteCitiesList');

    dispatch({
        type: ADD_TO_FAVORITE_CITIES_LIST,
        payload: {
            favoriteCitiesList
        }
    });
}

export const removeFromFavoriteCitiesList = cityToRemove => async (dispatch) => {
    IDBService.delete('favoriteCitiesList', cityToRemove);

    const favoriteCitiesList = await IDBService.getKeys('favoriteCitiesList');

    dispatch({
        type: REMOVE_FROM_FAVORITE_CITIES_LIST,
        payload: {
            favoriteCitiesList
        }
    });
}

export const saveToLastViewedCities = async (city, data, dispatch) => {
    data.addedToDB = new Date().getTime();
    IDBService.set('lastViewedCities', city, data);

    const keys = await IDBService.getKeys('lastViewedCities');

    if (keys.length > 5) {
        const values = await IDBService.getValues('lastViewedCities');
        // ascending
        values.sort((a, b) => a.addedToDB - b.addedToDB);
        const { name, country } = values[0].city;
        IDBService.delete('lastViewedCities', `${name}, ${country}`);
    }

    const lastViewedCities = await IDBService.getKeys('lastViewedCities');

    dispatch({
        type: ADD_TO_LAST_VIEWED_CITIES,
        payload: {
            lastViewedCities
        }
    });
};


export const removeFromLastViewedCities = (city) => async (dispatch) => {
    IDBService.delete('lastViewedCities', city);
    const lastViewedCities = await IDBService.getKeys('lastViewedCities');

    dispatch({
        type: REMOVE_FROM_LAST_VIEWED_CITIES,
        payload: {
            lastViewedCities
        }
    });
};

const setWeatherForecast = (city, dispatch) => {
    dispatch({
        type: GET_WEATHER_FORECAST,
        payload: {
            mainInfo: city,
            selectedDay: moment(city.list[0].dt_txt).format('dddd'),
            selectedHour: moment(city.list[0].dt_txt).format('HH:mm')
        }
    });
};

const cityInIndexedDB = async (city, store, dispatch) => {
    const citiesList = await IDBService.getKeys(store);

    if (!citiesList.length) return 'empty';

    const firstCityMatch = citiesList.filter(item => item.toLowerCase().includes(city.toLowerCase()))[0];

    if (firstCityMatch) {
        const cityData = await IDBService.get(store, firstCityMatch);

        return setWeatherForecast(cityData, dispatch);
    };

    return 'not found';
};

const setErrorMessage = (dispatch, message) => {
    dispatch({
        type: ERROR_WEATHER_FORECAST,
        payload: {
            errorMessage: message,
        }
    });
}

export const getWeatherForecast = (city = 'kyiv') => async dispatch => {
    dispatch({ type: CLEAR_WEATHER_FORECAST });

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Invalid request');
        }

        const data = await res.json();
        const { name, country } = data.city;

        saveToLastViewedCities(`${name}, ${country}`, data, dispatch);
        setWeatherForecast(data, dispatch);
    } catch (err) {
        if (!navigator.onLine) {
            const lastViewedCity = await cityInIndexedDB(city, 'lastViewedCities', dispatch);
            const favoriteCity = await cityInIndexedDB(city, 'favoriteCitiesList', dispatch);

            if (lastViewedCity === "empty" && favoriteCity === "empty") {
                setErrorMessage(dispatch, `You are offline, try to connect to network and type city again`);
            };

            if (lastViewedCity === 'not found' && favoriteCity === 'not found') {
                setErrorMessage(dispatch, `You are offline, select city from favorites or last viewed`);
            }
        } else {
            dispatch({
                type: ERROR_WEATHER_FORECAST,
                payload: {
                    errorMessage: `We don't have ${city} city, try to type another city`,
                }
            });
        }
    }
};

export const setDarkMode = mode => dispatch => {
    dispatch({
        type: SET_DARK_MODE,
        payload: {
            mode
        }
    });
};