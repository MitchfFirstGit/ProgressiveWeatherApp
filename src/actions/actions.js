import moment from 'moment';

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
    SET_DARK_MODE
} from './constants';

import { LocalStorageService } from '../services/storage';
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

const addCityToLocalStorage = (city, key) => {
    const citiesList = LocalStorageService.getItem(key);
    citiesList.push(city);
    const uniqueCities = [...new Set(citiesList)];

    if (uniqueCities.length <= 5) {
        LocalStorageService.setItem(key, uniqueCities);
    } else {
        uniqueCities.shift();
        LocalStorageService.setItem(key, uniqueCities);
    }

    LocalStorageService.setItem(key, uniqueCities);

    return uniqueCities;
}

const removeCityFromLocalStorage = (cityToRemove, key) => {
    const citiesList = LocalStorageService.getItem(key);
    const filteredCitiesList = citiesList.filter(city => city !== cityToRemove);

    LocalStorageService.setItem(key, filteredCitiesList);

    return filteredCitiesList;
}

export const addToFavoriteCitiesList = city => dispatch => {
    const citiesList = addCityToLocalStorage(city, 'favoriteCitiesList');

    dispatch({
        type: ADD_TO_FAVORITE_CITIES_LIST,
        payload: {
            citiesList
        }
    });
};

export const removeFromFavoriteCitiesList = cityToRemove => dispatch => {
    const citiesList = removeCityFromLocalStorage(cityToRemove, 'favoriteCitiesList');

    dispatch({
        type: REMOVE_FROM_FAVORITE_CITIES_LIST,
        payload: {
            citiesList
        }
    });
};

// const addToLastViewedCities = (city, dispatch) => {
//     const lastViewedCities = addCityToLocalStorage(city, 'lastViewedCities')

//     dispatch({
//         type: ADD_TO_LAST_VIEWED_CITIES,
//         payload: {
//             lastViewedCities
//         }
//     });
// };

// export const removeFromLastViewedCities = cityToRemove => dispatch => {
//     const lastViewedCities = removeCityFromLocalStorage(cityToRemove, 'lastViewedCities');

//     dispatch({
//         type: REMOVE_FROM_LAST_VIEWED_CITIES,
//         payload: {
//             lastViewedCities
//         }
//     });
// };

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


        // addToLastViewedCities(`${name}, ${country}`, dispatch);

        saveToLastViewedCities(`${name}, ${country}`, data, dispatch);

        dispatch({
            type: GET_WEATHER_FORECAST,
            payload: {
                mainInfo: data,
                selectedDay: moment(data.list[0].dt_txt).format('dddd'),
                selectedHour: moment(data.list[0].dt_txt).format('HH:mm')
            }
        });
    } catch (err) {
        dispatch({
            type: ERROR_WEATHER_FORECAST,
            payload: {
                errorMessage: `We don't have ${city} city, try to type another city`,
            }
        });
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