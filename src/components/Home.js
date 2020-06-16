import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import CMap from './CMap';
import Header from './Header';
import './Home.css';
import wi from '../data/us-states-wi.json';
import states from '../data/us-states.json';
import states_list from '../data/states_list.json';

function Home() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [centerLat, setCenterLat] = useState(null);
  const [centerLon, setCenterLon] = useState(null);
  const [hasError, setErrors] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [stateValue, setStateValue] = useState('--Select--');
  const [total, setTotal] = useState(0);

  const handleClick = () => {
    setShowMap(true);
  };

  const handleSelection = (e) => {
    const {value} = e.target;
    const name = states_list[value];
    const state = states.features.filter(feature => feature.properties.name === name);

    setStateValue(value);
    setButtonDisabled(value === '--Select--');

    if (state && state.length > 0) {
      setCenterLat(state[0].properties.centerLat);
      setCenterLon(state[0].properties.centerLon);
    }
  };

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
