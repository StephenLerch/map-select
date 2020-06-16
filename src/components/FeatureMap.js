// import React, {useState} from 'react';
// import L from './leaflet';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import * as mapData from '../data/us-states-wi.json';
// import './FeatureMap.css';
//
// const LIGHTBLUE = '#89D1FE';
// const DARKBLUE = '#1034A6';
//
// const style = ({ properties }) => ({
//   fillColor: LIGHTBLUE,
//   weight: 2,
//   opacity: 1,
//   color: 'white',
//   dashArray: '3',
//   fillOpacity: 0.7,
// });
//
// function FeatureMap() {
//   //const [activePark, setActivePark] = React.useState(null);
//   const [amount, setAmount] = useState(0);
//   const {items} = this.props;
//
//   const handleFeatureSelection = (target) => {
//     const {feature, options} = target;
//     const colorToSet = options.fillColor === LIGHTBLUE ? DARKBLUE : LIGHTBLUE;
//     const increment = options.fillColor === LIGHTBLUE;
//
//     target.setStyle({
//       fillColor: colorToSet,
//       weight: 2,
//       opacity: 1,
//       color: 'white',
//       dashArray: '3',
//       fillOpacity: 0.7,
//     });
//
//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//       target.bringToFront();
//     }
//
//     // let newCount = increment ? this.state.amount+feature.properties.density : this.state.amount-feature.properties.density;
//     // this.setState({amount: newCount});
//     //
//     // this.info.update(feature.properties);
//     // this.legend.update();
//     // console.log('amount', newCount);
//   };
//
//   const onEachFeature = (feature, layer) => {
//     layer.on({
//       click: this.handleFeatureSelection,
//     });
//   };
//
//   return (
//     <Map center={[45, -89]} zoom={7}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Layer type="geoJSON"
//              value={items}
//              options={{style, onEachFeature: onEachFeature}}
//       />
//
//     </Map>
//   );
// }
//
// export default FeatureMap;
