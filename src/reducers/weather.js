import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILED,
  GET_COORDINATES_BY_CITY_NAME_FAILED
} from "../actions/actionsType";

const initialState = {
  data: {},
  loading: true,
  error: null
};

const weather = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case GET_WEATHER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null
      };
    case GET_COORDINATES_BY_CITY_NAME_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null
      };
    default:
      return state;
  }
};

export default weather;
