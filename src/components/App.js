import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import SearchPanel from './searchPanel/SearchPanel.js';
import WeatherContent from './weatherContent/WeatherContent.js';

const mapsApiKey = 'AIzaSyAJZR7Mgk1xo7kg8pvVma4cl-yRkyEy3K0';
const weatherApiKey = '8469f05daa6022b487e84e3fbb386992';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            cityValue: '',
        }
    }
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
        this.getWeather(lat, lon);
    };

    getPosition = (cityValue) => {
        if(cityValue) {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityValue}&key=${mapsApiKey}`;
            fetch(apiUrl).then(res => res.json()).then(res => {
                if(res.status === 'ZERO_RESULTS') return;
                const { lat, lng } = res.results[0].geometry.location;
                this.getWeather(lat, lng);
            });
        }
    };

    getWeather = (lat, lon) => {
        const getWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}`;
        fetch(getWeatherApiUrl).then(res => res.json()).then(res => this.setState({data: res}));
    };

    render () {
        const { data } = this.state;

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <SearchPanel
                            getPosition={this.getPosition}
                        />
                    </Col>
                    {Object.entries(data).length ? 
                        <Col md={12}>
                            <WeatherContent 
                                data={data}
                            />
                        </Col> :
                        <Spinner 
                            color="dark" 
                            style={{ width: '3rem', height: '3rem' }}/> 
                    }
                </Row>
            </Container>
        )
    }
}