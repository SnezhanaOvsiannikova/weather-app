const weatherApiKey = "e3563a067a3857d663121e35bf3401ed";
const mapsApiKey = "AIzaSyAJZR7Mgk1xo7kg8pvVma4cl-yRkyEy3K0";

export const fetchWeatherData = ({ lat, lon }) => {
  const getWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}`;
  return fetch(getWeatherApiUrl).then(res => res.json());
};

export const fetchLatLonByCityName = cityValue => {
  if (cityValue) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityValue}&key=${mapsApiKey}`;
    return fetch(apiUrl).then(res => res.json());
  }
};
