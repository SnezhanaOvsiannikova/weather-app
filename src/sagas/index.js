import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { getLatLon, getCityName } from '../reducers';
import {
    fetchWeatherData,
    receiveWeather,
    setWeatherIsLoading,
    fetchLatLonByCityName,
    setPosition,
    getWeatherError,
    getCoordinatesByCityNameError,
} from '../actions';

export function* getWeather() {
    const { lat, lon } = yield select(getLatLon);
    try {
        const weatherData = yield call(fetchWeatherData, { lat, lon });
        yield put(receiveWeather(weatherData));
    }
    catch (error) {
        yield put(getWeatherError(error));
    }
};

export function* watchPosition() {
    while(true) {
        yield take('SET_POSITION');
        yield put(setWeatherIsLoading());
        yield call(getWeather);
    }
};

export function* getWeatherDataByCityName() {
    const cityName = yield select(getCityName);
    try {
        const coordinates = yield call(fetchLatLonByCityName, cityName);
        
        if(coordinates.status === 'ZERO_RESULTS') return;
        const { lat, lng } = coordinates.results[0].geometry.location;
        yield put(setPosition(lat, lng));
    }
    catch (error) {
        yield put(getCoordinatesByCityNameError(error));
    }
};

export function* watchCityName() {
    while(true) {
        yield take('GET_POSITION_BY_CITY_NAME');
        yield call(getWeatherDataByCityName);
    }
};

export default function* root() {
    yield all([fork(watchPosition), fork(watchCityName)]);
};