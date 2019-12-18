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
} from './constants';

import { LocalStorageService } from '../services/storage';

const apiKey = 'de1e94c85ef8c5b5b4456417ebd24daf';

export const getWeatherForecast = (city = 'kyiv') => async dispatch => {
    dispatch({ type: CLEAR_WEATHER_FORECAST });

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Invalid request');
        }

        const data = await res.json();

        dispatch({
            type: GET_WEATHER_FORECAST,
            payload: {
                weatherItems: data.list,
                mainInfo: data,
                selectedDay: moment(data.list[0].dt_txt).format('dddd'),
                selectedHour: moment(data.list[0].dt_txt).format('h a')
            }
        });
    } catch (err) {
        dispatch({
            type: ERROR_WEATHER_FORECAST,
            payload: {
                errorMessage: err.message,
            }
        });
    }
};

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

    LocalStorageService.setItem(key, uniqueCities);

    return uniqueCities;
}

const removeCityFromLocalStorage = (city, key) => {
    const citiesList = LocalStorageService.getItem(key);
    citiesList.push(city);
    const uniqueCities = [...new Set(citiesList)];

    LocalStorageService.setItem(key, uniqueCities);

    return uniqueCities;
}

export const addToFavoriteCitiesList = (city) => dispatch => {
    // const favoriteCitiesList = LocalStorageService.getItem('favoriteCitiesList');
    // favoriteCitiesList.push(city);
    // const uniqueCities = [...new Set(favoriteCitiesList)];

    // LocalStorageService.setItem('favoriteCitiesList', uniqueCities);

    const favoriteCities = addCityToLocalStorage(city, 'favoriteCitiesList')

    dispatch({
        type: ADD_TO_FAVORITE_CITIES_LIST,
        payload: {
            favoriteCities
        }
    });
};

export const removeFromFavoriteCitiesList = (cityToRemove) => dispatch => {
 lm 

    dispatch({
        type: REMOVE_FROM_FAVORITE_CITIES_LIST,
        payload: {
            filteredCities
        }
    });
};



// export const addToLastViewed = (city) => dispatch => {
//     // const favoriteCitiesList = LocalStorageService.getItem('favoriteCitiesList');
//     // favoriteCitiesList.push(city);
//     // const uniqueCities = [...new Set(favoriteCitiesList)];

//     // LocalStorageService.setItem('favoriteCitiesList', uniqueCities);
//     addCityToLocalStorage(city, )

//     dispatch({
//         type: ADD_TO_LAST_VIEWED_CITIES,
//         payload: {
//             uniqueCities
//         }
//     });
// };

// export const removeFromLastViewed = (cityToRemove) => dispatch => {
//     const favoriteCitiesList = LocalStorageService.getItem('favoriteCitiesList');
//     const filteredCities = favoriteCitiesList.filter(city => city !==cityToRemove);

//     LocalStorageService.setItem('favoriteCitiesList', filteredCities);

//     dispatch({
//         type: REMOVE_FROM_LAST_VIEWED_CITIES,
//         payload: {
//             filteredCities
//         }
//     });
// };
