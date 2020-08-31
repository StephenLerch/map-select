import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import axios from 'axios';
import {Button} from 'carbon-components-react';
import {Map20} from '@carbon/icons-react';
import Header from './SiteHeader';
import data from '../data/gz_2010_us_050_00_5m.json';
import states from '../data/us-states.json';
import states_list from '../data/states_list.json';
import GeoChart from "./GeoChart";
import './Home.css';

export default function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const INITIAL_STATE = '--Select--';
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [mapData, setMapData] = useState({});
  const [hasError, setErrors] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [stateValue, setStateValue] = useState(INITIAL_STATE);
  const [total, setTotal] = useState(0);
  const property = 'value';

  useEffect(() => {
    if (stateValue !== INITIAL_STATE) {
      //makeGetRequest();
    }
  }, [stateValue]);

  const handleClick = () => {
    setShowMap(true);
  };

  const handleSelection = (e) => {
    const {value} = e.target;
    const name = states_list[value];
    const state = states.features.filter(feature => feature.properties.name === name);
    let id;

    setStateValue(value);
    setButtonDisabled(value === stateValue);

    if (state && state.length > 0) {
      id = state[0].id;

      const counties = data.features.filter(f => f.properties.STATE === id);
      const newData = {
        "type": "FeatureCollection",
        "features": counties
      };

      setMapData(newData);
    }
  };

  function makeGetRequest() {
    const geoJSONUrl = `http://api.willowbend.com/api/maps/counties/v1/key/${API_KEY}/state/${stateValue}/`;
    let res = axios.get(geoJSONUrl);
    let data = res.data;
    setMapData(data);
  }

  function handleFeatureSelection(currentData) {
    //const {state, county, name, amount} = f;
    let result = currentData.reduce(function(tot, arr) {
      return _.round(tot + arr.amount, 2);
    }, 0.00);

    if(result < 0) {
      result = 0.00;
    }

    setTotal(result);
  }

  return (
    <div className="home-container">
      <Header />
      <div className="option-bar">
        <span>
          <label>Select Area</label>
          <select className="select" onChange={handleSelection} value={stateValue}>
            <option key="00" value="--Select--">--Select--</option>
            {
              Object.keys(states_list).map(key => {
                let name = states_list[key];
                return <option key={key} value={key}>{name}</option>;
              })
            }
          </select>
        </span>
        <Button className="map-button"
                disabled={buttonDisabled}
                kind="primary"
                onClick={handleClick}
                iconDescription="Map"
                renderIcon={Map20}>
          Show Map
        </Button>
        <div className="total">
          Total Selected: <span className="total-value">{total}</span>
        </div>
      </div>
      <hr />
      <div>
        {showMap ?
            <GeoChart data={mapData} onUpdate={handleFeatureSelection} />
        : null}
        {hasError ? <span>Error message: {JSON.stringify(hasError.message)}</span> : null}
      </div>
    </div>
  );
}
