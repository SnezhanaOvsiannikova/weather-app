const weatherApiKey = '8469f05daa6022b487e84e3fbb386992';
const mapsApiKey = 'AIzaSyAJZR7Mgk1xo7kg8pvVma4cl-yRkyEy3K0';

export const setPosition = (lat, lon) => ({ type: 'SET_POSITION', payload: { lat, lon } });
export const receiveWeather = (data) => ({ type: 'GET_WEATHER', data });
export const setWeatherIsLoading = () => ({ type: 'GET_WEATHER_LOADING' });
export const getPositionByCityName = (cityName) => ({ type: 'GET_POSITION_BY_CITY_NAME', cityName });
export const getWeatherError = (error) => ({ type: 'GET_WEATHER_ERROR', error });
export const getCoordinatesByCityNameError = (error) => ({ type: 'GET_COORDINATES_BY_CITY_NAME_ERROR', error });

export const fetchWeatherData = ({ lat, lon }) => {
    const getWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}`;
    return fetch(getWeatherApiUrl).then(res => res.json());
};

export const fetchLatLonByCityName = (cityValue) => {
    if(cityValue) {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityValue}&key=${mapsApiKey}`;
       return fetch(apiUrl).then(res => res.json());
    }
};