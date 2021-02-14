import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Source, Layer} from 'react-map-gl';
import {county, selectedCounty} from './LayerStyles';

  /**
   * illinois_counties = County GeoJSON and county level data.
   * filter = hovered/highlight zipcode/county
   */
const mapStateToProps = state => {
    const { filters, illinois_counties } = state;
    return { filters, illinois_counties }
  }

class CountyLevel extends Component {
  render() {
    return (
      <Source id="counties" type="geojson" data={this.props.illinois_counties.counties}>
        <Layer {...county}></Layer>
        <Layer {...selectedCounty} filter={this.props.filters.highlightCounty}></Layer>
      </Source>
  )
  }
}

export default connect(mapStateToProps)(CountyLevel)
