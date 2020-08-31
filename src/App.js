import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import GeoChart from "./components/GeoChart";

export default function App(){
  return(
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/map'><GeoChart /></Route>
      </Switch>
  );
}
