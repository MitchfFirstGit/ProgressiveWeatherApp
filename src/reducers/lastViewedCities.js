import {
    ADD_TO_LAST_VIEWED_CITIES,
    REMOVE_FROM_LAST_VIEWED_CITIES,
} from "../actions/constants";

import { LocalStorageService } from '../services/storage';

import IDBService from '../services/indexedDB';


// const localStorageLastViewedCities = LocalStorageService.getItem('lastViewedCities');

export default (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_TO_LAST_VIEWED_CITIES:
            return payload.lastViewedCities

        case REMOVE_FROM_LAST_VIEWED_CITIES:
            return payload.lastViewedCities;

        default:
            return state
    }
};
