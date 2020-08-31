import React, { useRef, useEffect, useState } from "react";
import {select, geoPath, geoMercator} from "d3";
import _ from 'lodash';
import useWindowDimensions from './useWindowDimensions';

function GeoChart(props) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    let {height, width} = useWindowDimensions();

    height -= 140;
    width -= 20;

    useEffect(() => {
        const projection = geoMercator()
            .fitSize([width, height], props.data)
            .precision(100);
        const path = geoPath().projection(projection);
        let svg = select(svgRef.current);

        svg.selectAll("path")
            .data(props.data.features)
            .join("path")
            .attr("d", feature => path(feature))
            .on("click", feature => handleFeatureClick(feature))
            .attr("class", "county")
            .transition()
            .attr("fill", feature => isSelectedFeature(feature) ? "lightblue" : "white")
            .attr('stroke', "black");

        let labels = svg.selectAll("text")
            .data(props.data.features);

        labels.enter().append('text');
        labels.text(d => d.properties.NAME)
            .attr("class", "feature-label")
            .attr('text-anchor','middle')
            .attr("x", function(d){
                return path.centroid(d)[0];
            })
            .attr("y", function(d){
                return  path.centroid(d)[1];
            })
            .attr('font-size', d => isFontSizeSmall(d))
            .attr("font-family", "sans-serif");
        labels.exit().remove(".feature-label");

        function handleFeatureClick (feature) {
            // debugger;
            const f = feature.target.__data__;
            const name = f.properties.NAME;
            const state = f.properties.STATE;
            const county = f.properties.COUNTY;
            let amount = f.properties.CENSUSAREA;
            let currentData = selectedFeatures;
            let results = {state, county, name, amount};


            if (_.some(currentData, {state: state, county: county})) {
                results = _.filter(currentData, function(x) {
                    return !(x.state === state  && x.county === county);
                });
                currentData = results;
            } else {
                currentData.push(results);
            }


            setSelectedFeatures(currentData);

            props.onUpdate(currentData);
        }

        function isSelectedFeature(element) {
            return selectedFeatures && _.some(selectedFeatures, {state: element.properties.STATE, county: element.properties.COUNTY})
        }

        function isFontSizeSmall(d) {
            const size = props && props.data && props.data.features ? props.data.features.length : 0;
            return size > 40 ? '6pt' : '8pt';
        }
    }, [height, width, props, selectedFeatures]);

    useEffect(() => {
        setSelectedFeatures([]);
        props.onUpdate([]);
    }, [props.data]);

    function update(data) {
        const svg = select(svgRef.current);

        // DATA JOIN
        // Join new data with old elements, if any.
        let text = svg.selectAll("text")
            .data(data);

        // UPDATE
        // Update old elements as needed.
        text.attr("class", "update");

        // ENTER
        // Create new elements as needed.
        text.enter().append("text")
            .attr("class", "enter")
            .attr("x", function(d, i) { return i * 32; })
            .attr("dy", ".35em");

        // ENTER + UPDATE
        // Appending to the enter selection expands the update selection to include
        // entering elements; so, operations on the update selection after appending to
        // the enter selection will apply to both entering and updating nodes.
        text.text(function(d) { return d; });

        // EXIT
        // Remove old elements as needed.
        //     text.exit().transition().duration(2000).attr('transform',
        //         rotation = 25;
        //     return 'translate(' + d.x + ',' + d.y + ') rotate('+ rotation +' 30 30)';
        // }).remove();
    }

    return (
        <div className="svg-container" ref={wrapperRef}>
            <svg version="1.1" ref={svgRef} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin meet" className="svg-content" />
        </div>
    );
}

export default GeoChart;
