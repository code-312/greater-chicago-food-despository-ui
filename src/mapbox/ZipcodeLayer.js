import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Source, Layer} from 'react-map-gl';
import {zipcode, selectedZipcode} from './LayerStyles';

  /**
   * illinois_zipcodes = Zip-code GeoJSON and zip-code level data.
   * filter = hovered/highlight zipcode/county
   */
const mapStateToProps = state => {
    const { filters, illinois_zipcodes } = state;
    return { filters, illinois_zipcodes }
  }

class ZipcodeLevel extends Component {
  render() {
    return (
      <Source id="zipcodes" type="geojson" data={this.props.illinois_zipcodes.zipcodes}>
       <Layer {...zipcode} filter={this.props.filters.filterZipcodeByCounty}></Layer>
       <Layer {...selectedZipcode} filter={this.props.filters.highlightZipcode}></Layer>
      </Source>
    )
  }
}

export default connect(mapStateToProps)(ZipcodeLevel)
