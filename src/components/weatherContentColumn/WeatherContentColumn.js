import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import './style.css';

const days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const WeatherContentColumn = ({dayWeather, tempUnit}) => {
    const { main, weather, } = dayWeather;
    const imgIcon = weather[0].icon;

    const setDayOfSWeek = () => {
        const numberOfDay = new Date(dayWeather.dt_txt).getDay();
        return days[numberOfDay];
    };

    const setDateOfWeek = () => {
        const getDay = new Date(dayWeather.dt_txt).getDate();
        const getMonth = new Date(dayWeather.dt_txt).getMonth();
        return `${monthNames[getMonth]} ${getDay}`;
    };

    const kToF = kelvin => {
        const temp = (((kelvin - 273.15) * 1.8) + 32).toFixed();
        return `${temp}°F`;
    } 
    const kToC = kelvin => {
        const temp = (kelvin - 273.15).toFixed();
        return `${temp}°C`
    }
    
    const setTemp = temp => tempUnit === 'Fahrenheit' ? kToF(temp) : kToC(temp);

    return (
        <>
            <Card className={dayWeather.isToday && 'current-day'}>
                <CardBody>
                    <CardTitle>{setDayOfSWeek()}</CardTitle>
                    <CardSubtitle>{setDateOfWeek()}</CardSubtitle>
                    <div>{weather[0].main}</div>
                    <CardImg top width="100%" src={`http://openweathermap.org/img/wn/${imgIcon}@2x.png`} alt="weather icon" />
                    <div>
                        <i className="fa fa-thermometer-2"></i>
                        {setTemp(main.temp)}
                    </div>
                    <div>
                        <div>{`Min: ${setTemp(main.temp_min)}`}</div>
                        <div>{`Max: ${setTemp(main.temp_max)}`}</div> 
                        <div><i className="fa fa-tint"></i> {main.humidity}%</div> 
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

WeatherContentColumn.propTypes = {
    day: PropTypes.number,
    tempUnit: PropTypes.string,
};

export default WeatherContentColumn;