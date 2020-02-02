import {
    ADD_TO_FAVORITE_CITIES_LIST,
    REMOVE_FROM_FAVORITE_CITIES_LIST,
    INIT_FAVORITE_CITIES_LIST
} from "../actions/constants";

export default (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case INIT_FAVORITE_CITIES_LIST:
        case REMOVE_FROM_FAVORITE_CITIES_LIST:
        case ADD_TO_FAVORITE_CITIES_LIST:
            return payload.favoriteCitiesList

        default:
            return state
    }
};
