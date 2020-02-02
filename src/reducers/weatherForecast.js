import {
    GET_WEATHER_FORECAST,
    SET_WEATHER_FORECAST_LOADING,
    ERROR_WEATHER_FORECAST,
    SET_SELECTED_DAY,
    SET_SELECTED_HOUR,
} from "../actions/constants";

export const initialState = {
    mainInfo: {},
    loading: true,
    error: {},
    selectedDay: '',
    selectedHour: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_WEATHER_FORECAST:
            return {
                ...state,
                mainInfo: payload.mainInfo,
                selectedDay: payload.selectedDay,
                selectedHour: payload.selectedHour,
                loading: false,
            };

        case SET_WEATHER_FORECAST_LOADING:
            return {
                ...state,
                loading: payload.loading,
                error: {}
            }

        case ERROR_WEATHER_FORECAST:
            return {
                ...state,
                error: { message: payload.errorMessage },
                loading: false,
            };

        case SET_SELECTED_DAY:
            return {
                ...state,
                selectedDay: payload.selectedDay,
                selectedHour: payload.selectedHour
            };

        case SET_SELECTED_HOUR:
            return {
                ...state,
                selectedHour: payload.selectedHour
            };

        default:
            return state
    }
};
