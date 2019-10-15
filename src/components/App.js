import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { setPosition, getPositionByCityName } from '../actions';
import SearchPanel from './searchPanel/SearchPanel';
import WeatherContent from './weatherContent/WeatherContent';

class App extends Component {
    componentDidMount() {
        this.getLocation();
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onPosition);
        }
    };

    onPosition = (position) => {
        const lat = position.coords.latitude; 
        const lon =  position.coords.longitude;
        this.props.setPosition(lat, lon);
    };

    render () {
        const { data, loading, getPositionByCityName } = this.props;

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <SearchPanel
                            getPosition={getPositionByCityName}
                        />
                    </Col>
                    {loading
                        ? <Spinner 
                            color="dark" 
                            style={{ width: '3rem', height: '3rem' }}/>
                        : <Col md={12}>
                            <WeatherContent 
                                data={data}
                            />
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.weather.data,
        loading: state.weather.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPosition: (lat, lon) => dispatch(setPosition(lat, lon)),
        getPositionByCityName: (cityName) => dispatch(getPositionByCityName(cityName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);