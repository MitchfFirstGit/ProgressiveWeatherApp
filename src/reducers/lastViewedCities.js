import {
    ADD_TO_LAST_VIEWED_CITIES,
    REMOVE_FROM_LAST_VIEWED_CITIES,
    INIT_LAST_VIEWED_CITIES,
} from "../actions/constants";

export default (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case INIT_LAST_VIEWED_CITIES:
        case ADD_TO_LAST_VIEWED_CITIES:
        case REMOVE_FROM_LAST_VIEWED_CITIES:
            return payload.lastViewedCities

        default:
            return state
    }
};
