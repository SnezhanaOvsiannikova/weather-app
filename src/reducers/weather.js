const initialState = {
    lat: null,
    lon: null,
    data: {},
    loading: true,
    error: null,
    cityName: '',
};

const weather = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSITION':
            return {
                ...state,
                lat: action.payload.lat,
                lon: action.payload.lon,
            };
        case 'GET_WEATHER':
            return {
                ...state,
                data: action.data,
                loading: false,
            };
        case 'GET_WEATHER_LOADING':
            return {
                ...state, 
                loading: true,
            };
        case 'GET_WEATHER_ERROR':
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case 'GET_COORDINATES_BY_CITY_NAME_ERROR':
            return {
                ...state,
                error: action.error,
            };
        case 'GET_POSITION_BY_CITY_NAME':
                return {
                    ...state,
                    cityName: action.cityName,
                };
        default:
            return state;
    }
  }
  
  export default weather;
