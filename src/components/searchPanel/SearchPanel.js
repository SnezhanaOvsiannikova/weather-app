import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './style.css';

const SearchPanel = ({getPosition}) => {
    const [ cityValue, setCityValue ] = useState('');
    const clickHandler = () => getPosition(cityValue);

    return (
        <>
            <InputGroup>
                <Input placeholder="Enter location" value={cityValue} onChange={(e) => setCityValue(e.target.value)}/>
                <InputGroupAddon addonType="append">
                <InputGroupText onClick={clickHandler}>Search</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </>
    );
}

SearchPanel.propTypes = {
    getPosition: PropTypes.func,
};

export default SearchPanel;