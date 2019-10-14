import { combineReducers } from 'redux';
import weatherReducer from './weather.js';

export const getLatLon = (state) => {
    return {
        lat: state.weather.lat,
        lon: state.weather.lon,
    };
};

export const getCityName = (state) => {
    return state.weather.cityName;
};

export default combineReducers({
    weather: weatherReducer,
});