import React, { useState } from "react";
import PropTypes from "prop-types";
import WeatherContentColumn from "../weatherContentColumn/WeatherContentColumn";
import { Row, Col, CardTitle, Button } from "reactstrap";
import "./style.css";

const WeatherContent = ({ data }) => {
  const [tempUnit, setTempUnit] = useState("Celsius");
  const setDaysOfWeek = () => {
    const { list } = data;
    const daysOfweek = [];
    const closestWeatherDate = list[0];
    const nextDayDate = new Date();

    nextDayDate.setDate(nextDayDate.getDate() + 1);
    nextDayDate.setHours(12, 0, 0, 0);

    daysOfweek.push({
      ...closestWeatherDate,
      isToday: true
    });

    list.forEach(date => {
      const itemListDate = new Date(date.dt_txt);

      if (itemListDate.getTime() === nextDayDate.getTime()) {
        daysOfweek.push(date);
        nextDayDate.setDate(nextDayDate.getDate() + 1);
      }
    });

    return daysOfweek.map(day => (
      <WeatherContentColumn key={day.dt} dayWeather={day} tempUnit={tempUnit} />
    ));
  };

  const setTempUnitValue = () =>
    tempUnit === "Celsius" ? setTempUnit("Fahrenheit") : setTempUnit("Celsius");

  return (
    <>
      <Row>
        <Col md={{ size: 3, offset: 9 }} className="button-wrap">
          <Button onClick={setTempUnitValue}>
            {tempUnit === "Celsius" ? "Fahrenheit" : "Celsius"}
          </Button>
        </Col>
      </Row>
      <CardTitle>{`Weather in ${data.city.name}, ${data.city.country}`}</CardTitle>
      <div className="content-wrapper">{setDaysOfWeek()}</div>
    </>
  );
};

WeatherContent.propTypes = {
  data: PropTypes.object
};

export default WeatherContent;
