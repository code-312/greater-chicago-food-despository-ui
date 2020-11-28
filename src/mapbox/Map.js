import React, {Component} from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import {county, selectedCounty, zipcode, selectedZipcode} from './LayerStyles';
import CountySnapshotOverlay from '../components/CountySnapshotOverlay';
import ZipCodeSnapshotOverlay from '../components/ZipCodeSnapshotOverlay';

// TEMPORARY: State should be managed through Redux
import illinois_counties from '../mock_data/illinois_counties.json';
import illinois_zipcodes from '../mock_data/illinois_zipcodes.json';

export default class Map extends Component {
    /**
     * TEMPORARY: State should be managed through Redux
     * 
     * illinois_counties = County GeoJSON and county level data.
     * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
     * highlightCounty = filter used to select the county that the mouse is hovered on
     * highlightZipcode = filter used to select the zipcode that the mouse is hovered on
     * filterZipcodeByCounty = filter used to only display counties within the currently selected county
     * viewport = Determines the size of the map, and initial centered position and zoom-level
     * x,y = current location of mouse over the map
     * hoveredCounty = county feature currently being hovered over by the mouse
     * hoveredZipcode = zipcode feature currently being hovered over by the mouse
     */
    state = {
        illinois_counties: null,
        illinois_zipcodes: null,
        highlightCounty: ['in', 'COUNTY', ''],
        highlightZipcode: ['in', 'ZCTA', ''],
        filterZipcodeByCounty: ['in', 'COUNTY', ''],
        viewport: {
            latitude: 40.150196,
            longitude: -89.367848, 
            zoom: 6,
            width: "50vw",
            height: "100vh"
        },
        x: null,
        y: null,
        hoveredCounty: null,
        hoveredZipCode: null,
    }

    /**
     * Fires before "constructor" and "getDerivedStateFromProps" methods, but after the "render" method.
     */
    componentDidMount() {
        // TEMPORARY: State should be managed through Redux
        this.setState({illinois_counties: illinois_counties})
        this.setState({illinois_zipcodes: illinois_zipcodes})
    }

    /**
     * Called by ReactMapGL's onHover function when the mouse hovers over the MapBox map.
     * Updates the application's state based on the position of the mouse and the underlying features.
     * 
     * @param event = Information related to hover-event.
     * event.x,event.y = coordinates of mouse over the map
     * event.features = List of the features that are currently being hovered over. 
     */
    onHover = event => {
        // Extract the list of features and x,y coords from the event parameter
        const {features, srcEvent: {offsetX, offsetY}} = event;

        // Select the feature and corresponding countyId from the list of features if one exists
        const hoveredCounty = features && features.find(f => f.layer.id === 'county');
        const hoveredZipCode = features && features.find(f => f.layer.id === 'zipcode');

        // Given the currently hovered features, determine the zipcode and county filters:
        var zipcodeFilter = '';
        var county = '';
        var zipcode = '';
        if (hoveredCounty) {
            county = hoveredCounty.properties.COUNTY;
            zipcodeFilter = hoveredCounty.properties.STATE + county;
        }
        if (hoveredZipCode) {zipcode = hoveredZipCode.properties.ZCTA}

        // Set state with the updated information
        this.setState({
            hoveredCounty: hoveredCounty, 
            hoveredZipCode: hoveredZipCode,
            x: offsetX, 
            y: offsetY, 
            highlightCounty: ['in', 'COUNTY', county],
            highlightZipcode: ['in', 'ZCTA', zipcode],
            filterZipcodeByCounty: ['in', 'COUNTY', zipcodeFilter]
        });
    };

    /**
     * Returns a component that displays either...  
     *      - County name, and FIPS number of the highlighted county
     *      - Zipcode of the highlighted zipcode
     */
    renderOverlay() {
        const {hoveredCounty, hoveredZipCode, x, y, viewport} = this.state;
        if (viewport.zoom >= 7 && hoveredZipCode) {
            // Only returns overlay if there is a currently hovered zipcode and is zoomed-in:
            return (<ZipCodeSnapshotOverlay zipCodeProperties={hoveredZipCode.properties} x={x} y={y}/>);
        } else if (viewport.zoom < 7 && hoveredCounty) {
            // Only returns overlay if there is a currently hovered zip code and is zoomed-out:
            return (<CountySnapshotOverlay countyProperties={hoveredCounty.properties} x={x} y={y}/>);
        }
    }

    /**
     * Fires after the "constructor" and "getDerivedStateFromProps" methods, but before "componentDidMount."
     * Returns the HTML object to be rendered by App component.
     */
    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
                onHover={this.onHover}
            >
                {/*County Level*/}
                <Source id="counties" type="geojson" data={this.state.illinois_counties}>
                    <Layer {...county}></Layer>
                    <Layer {...selectedCounty} filter={this.state.highlightCounty}></Layer>
                </Source>

                {/*Zip-Code Level (only displays if zoom is greater than 7)*/}
                {this.state.viewport.zoom > 7 && (
                    <Source id="zipcodes" type="geojson" data={this.state.illinois_zipcodes}>
                        <Layer {...zipcode} filter={this.state.filterZipcodeByCounty}></Layer>
                        <Layer {...selectedZipcode} filter={this.state.highlightZipcode}></Layer>
                    </Source>
                )} 

                {/*Tool-tip*/}
                {this.renderTooltip()} 
            </ReactMapGL>
        );
    }
}

  