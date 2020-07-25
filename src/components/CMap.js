import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import './CMap.css';
import * as constants from '../utils/index';

function CMap(props) {
  const [featureName, setFeatureName] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const {centerLat, centerLon, features} = props;
  let layerRef = useRef(null);
  let mapRef = useRef(null);

  useEffect(() => {
    // const container = L.DomUtil.get('map');
    //
    // if(container != null){
    //   container._leaflet_id = null;
    // }

    mapRef.current = L.map('map', {
      center: [centerLat, centerLon],
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
    L.control.scale().addTo(mapRef.current);
    // L.Path.mergeOptions(constants.defaultStyle);
    // L.Polygon.mergeOptions(constants.defaultStyle);

    // handle clicks on the map that didn't hit a feature
    // mapRef.current.addEventListener('click', function(e) {
    //     resetHighlight(e);
    // });
  }, [centerLat, centerLon]);

  useEffect(() => {
    const add = id => setSelectedIds(prevState => ([...prevState, id]));
    const remove = index => {
      setSelectedIds([
        ...selectedIds.slice(0, index),
        ...selectedIds.slice(index + 1)
      ]);
    };

    layerRef.current = new L.GeoJSON(features, {
      clipTiles: true,
      onEachFeature: countyOnEachFeature,
      style: style,
      unique: feature => feature.id
    }).addTo(mapRef.current);

    if (features) {
      mapRef.current.fitBounds(layerRef.current.getBounds());
    }

    function buildSummaryLabel(currentFeature){
      const featureName = currentFeature.properties.name || "Unnamed feature";
      setFeatureName(featureName);
    }

    function countyOnEachFeature(feature, layer){
      let amount = 0;

      layer.on({
        click: function(e) {
          const id = e.target.feature.id;
          const value = feature.properties.value;
          const selected = selectedIds.some(val => val === id);
          let index, style;

          if (selected) {
            index = selectedIds.indexOf(id);
            remove(index);
            amount = value ? -value : 0;
            style = constants.defaultStyle;
          } else {
            add(id);
            amount = value ? value : 0;
            style = constants.selectedStyle;
          }

          layer.setStyle(style);
          buildSummaryLabel(feature);
          props.onUpdate(amount);
          L.DomEvent.stopPropagation(e); // stop click event from being propagated further
        }
      });
    }

    function getColor (id) {
      return id && selectedIds.some(val => val === id) ? constants.DARKBLUE : constants.LIGHTBLUE;
    }

    function style(feature) {
      return {
        color: 'white',
        fillColor: getColor(feature.id),
        fillOpacity: 0.5,
        opacity: 0.5,
        weight: 2
      };
    }
  }, [features, props, selectedIds]);

  return (
    <>
      <div id="map"></div>
      <p className="summary-label">{featureName}</p>
    </>
  );
}

export default CMap;
