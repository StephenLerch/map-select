import React, {useEffect, useRef, useState} from 'react';
import {select, geoPath, geoMercator, json} from 'd3';
import useResizeObserver from './useResizeObserver';
import './FeatureMap.css';

export const FeatureMap = ({data, property}) => {
    const wrapperRef = useRef();
    const svgRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCounty, setSelectedCounty] = useState(null);

    useEffect(() => {
        let svg = select(svgRef.current);
        const projection = geoMercator();
        const geoGenerator = geoPath().projection(projection);

        svg.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            // .attr("d",path)
            .style("fill", "teal")
            // .join("path")
            // .attr("class", "county")
            .attr("d", feature => geoGenerator(feature));




        // let svg = select(svgRef.current);
        // // const colorScale = scaleLinear()
        // //     .domain([minProp, maxProp])
        // //     .range(["#ccc", "red"]);
        // const {height, width} = dimensions || wrapperRef.current.getBoundingClientRect();
        // const projection = geoMercator()
        //     .fitSize([width, height], selectedCounty || data)
        //     .precision(100);
        // const pathGenerator = geoPath().projection(projection);


        // render each county
        // svg
        //     .selectAll(".county")
        //     .data(data.features)
        //     .join("path")
        //     .on("click", feature => {
        //         setSelectedCounty(selectedCounty === feature ? null : feature);
        //     })
        //     .attr("class", "county")
        //     .transition()
        //     // .attr("fill", feature => colorScale(feature.properties[property]))
        //     .attr("d", feature => pathGenerator(feature));

        // render text
        // svg
        //     .selectAll(".label")
        //     .data([selectedCounty])
        //     .join("text")
        //     .attr("class", "label")
        //     .text(
        //         feature =>
        //             feature &&
        //             feature.properties.name +
        //             ": " +
        //             feature.properties[property].toLocaleString()
        //     )
        //     .attr("x", 10)
        //     .attr("y", 25);
    }, [data, dimensions, property, selectedCounty]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}

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

