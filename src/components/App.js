import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col, Spinner } from "reactstrap";
import { setCoordinates, getPositionByCityName } from "../actions";
import SearchPanel from "./searchPanel/SearchPanel";
import WeatherContent from "./weatherContent/WeatherContent";

class App extends Component {
  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPosition);
    }
  };

  onPosition = position => {
    const { setCoordinates } = this.props;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setCoordinates(lat, lon);
  };

  renderWeatherContent = () => {
    const { data } = this.props;

    return data ? (
      <Col md={12}>
        <WeatherContent data={data} />
      </Col>
    ) : (
      <Col>No result</Col>
    );
  };

  render() {
    const { loading, getPositionByCityName } = this.props;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <SearchPanel getPosition={getPositionByCityName} />
          </Col>
          {loading ? (
            <Spinner color="dark" style={{ width: "3rem", height: "3rem" }} />
          ) : (
            this.renderWeatherContent()
          )}
        </Row>
      </Container>
    );
  }
}

App.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  setCoordinates: PropTypes.func,
  getPositionByCityName: PropTypes.func
};

const mapStateToProps = state => {
  return {
    data: state.weather.data,
    loading: state.weather.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCoordinates: (lat, lon) => dispatch(setCoordinates(lat, lon)),
    getPositionByCityName: cityName => dispatch(getPositionByCityName(cityName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
