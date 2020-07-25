import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CMap from './CMap';
import Header from './Header';
import './Home.css';
import wi from '../data/us-states-wi.json';
import states from '../data/us-states.json';
import states_list from '../data/states_list.json';

function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const INITIAL_STATE = '--Select--';
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [centerLat, setCenterLat] = useState(null);
  const [centerLon, setCenterLon] = useState(null);
  const [features, setFeatures] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [stateValue, setStateValue] = useState(INITIAL_STATE);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (stateValue !== INITIAL_STATE) {
      makeGetRequest();
    }
  });

  const handleClick = () => {
    setShowMap(true);
    setFeatures();
  };

  const handleSelection = (e) => {
    const {value} = e.target;
    const name = states_list[value];
    const state = states.features.filter(feature => feature.properties.name === name);

    setStateValue(value);
    setButtonDisabled(value === stateValue);

    if (state && state.length > 0) {
      setCenterLat(state[0].properties.centerLat);
      setCenterLon(state[0].properties.centerLon);
    }
  };

  function makeGetRequest() {
    const geoJSONUrl = `http://api.willowbend.com/api/maps/counties/v1/key/${API_KEY}/state/${stateValue}/`;
    let res = axios.get(geoJSONUrl);
    let data = res.data;
    setFeatures(data);
  }

  function onUpdate(amount) {
    if(amount === 0) {
      setTotal(0);
    } else {
      setTotal(prev => prev + amount);
    }
  }

  return (
    <>
      <Header />
      <div className="option-bar">
        <Button className="map-button" disabled={buttonDisabled} variant="primary" size="lg" onClick={handleClick}>
          Show Map
        </Button>
        <select className="select" onChange={handleSelection} value={stateValue}>
          <option key="00" value="--Select--">--Select--</option>
          {
            Object.keys(states_list).map(key => {
              let value = states_list[key];
              return <option key={key} value={key}>{value}</option>;
            })
          }
        </select>
        <div className="total">
          Total Selected: <span className="total-value">{total}</span>
        </div>
      </div>
      {showMap ? <CMap features={wi.features} onUpdate={onUpdate} stateValue={stateValue} centerLat={centerLat} centerLon={centerLon} /> : null}
      <hr />
      {hasError ? <span>Error message: {JSON.stringify(hasError.message)}</span> : null}
    </>
  );
}

export default Home;
