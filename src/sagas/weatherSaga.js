import { put, call, takeLatest } from "redux-saga/effects";
import { fetchWeatherData, fetchLatLonByCityName } from "../api";
import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  GET_POSITION_BY_CITY_NAME_REQUEST,
  GET_COORDINATES_BY_CITY_NAME_FAILED
} from "../actions/actionsType";

function* getWeather({ payload }) {
  const { lat, lon } = payload;

  try {
    const weatherData = yield call(fetchWeatherData, { lat, lon });
    yield put({ type: GET_WEATHER_SUCCESS, payload: weatherData });
  } catch (error) {
    yield put({ type: GET_WEATHER_FAILED, payload: error });
  }
}

function* getWeatherDataByCityName({ cityName }) {
  try {
    const coordinates = yield call(fetchLatLonByCityName, cityName);
    const { lat, lng } = coordinates.results[0].geometry.location;
    yield put({ type: GET_WEATHER_REQUEST, payload: { lat, lon: lng } });
  } catch (error) {
    yield put({ type: GET_COORDINATES_BY_CITY_NAME_FAILED, payload: error });
  }
}

export function* watchWeather() {
  yield takeLatest(GET_WEATHER_REQUEST, getWeather);
  yield takeLatest(GET_POSITION_BY_CITY_NAME_REQUEST, getWeatherDataByCityName);
}
