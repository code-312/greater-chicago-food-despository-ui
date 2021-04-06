import React, { useMemo } from 'react'
import {Source, Layer} from 'react-map-gl';
import { useSelector } from 'react-redux';
import {county, selectedCounty} from './LayerStyles';
import {colorMap} from './LayerStyles';
import {updateScaleInterval} from './Util';

const CountyLevel = () => {
    /**
     * illinois_counties = County GeoJSON and county level data.
     * filter = hovered/highlight zipcode/county
     */
  const filters = useSelector(state => state.filters)
  const illinois_counties = useSelector(state => state.illinois_counties)
  const selectFeat = useSelector(state => state.select_Feat)
  const county_data = useSelector(state => state.county_data)

  const data = useMemo(() => {
    return county_data.countyData && updateScaleInterval(county_data.countyData, illinois_counties.counties)
  }, [county_data.countyData, illinois_counties.counties])

    return (
      <Source id="counties" type="geojson" data={data}>
        <Layer {...colorMap}></Layer>
        <Layer {...county}></Layer>
        <Layer {...selectedCounty} filter={filters.highlightCounty}></Layer>
      </Source>
  )
}

export default CountyLevel;


// Sample of data format returned by updateScaleInterval()
// const data = {"type":"FeatureCollection","features":[{"type":"Feature",
  //                 "properties":{
  //                               "GEO_ID":"0500000US17069",
  //                               "STATE":"17",
  //                               "COUNTY":"069",
  //                               "NAME":"Hardin",
  //                               "LSAD":"County",
  //                               "CENSUSAREA":177.528000,
  //                               "percentile": 0.12143},
  //                 "geometry":{
  //                             "type":"Polygon",
  //                             "coordinates":[[[-88.358506,37.404817],[-88.361557,37.402931],[-88.365471,37.401663],[-88.371214,37.402730],[-88.373445,37.404342],[-88.377507,37.409825],[-88.387669,37.416482],[-88.397340,37.421644],[-88.404127,37.424146],[-88.408808,37.425216],[-88.413108,37.424468],[-88.414882,37.423666],[-88.415149,37.424863],[-88.412112,37.599912],[-88.375332,37.599563],[-88.179813,37.599164],[-88.152820,37.573799],[-88.133410,37.574273],[-88.133393,37.574235],[-88.131622,37.572968],[-88.121517,37.568166],[-88.114330,37.562189],[-88.105585,37.556180],[-88.101174,37.551330],[-88.092814,37.539637],[-88.088049,37.535124],[-88.086194,37.534186],[-88.078046,37.532029],[-88.072242,37.528826],[-88.069018,37.525297],[-88.063311,37.515755],[-88.062568,37.513563],[-88.062828,37.508123],[-88.061342,37.505327],[-88.061292,37.505232],[-88.062563,37.495951],[-88.064115,37.492013],[-88.062950,37.489385],[-88.062174,37.489057],[-88.062294,37.487837],[-88.064234,37.484548],[-88.067728,37.481593],[-88.068504,37.481921],[-88.072386,37.483563],[-88.077987,37.480146],[-88.084171,37.472699],[-88.087664,37.471059],[-88.090380,37.471059],[-88.091156,37.471715],[-88.091156,37.472699],[-88.095818,37.473025],[-88.109417,37.472369],[-88.128010,37.470507],[-88.132628,37.471555],[-88.135142,37.471626],[-88.157061,37.466937],[-88.171764,37.465612],[-88.175283,37.463790],[-88.188615,37.461896],[-88.206923,37.460188],[-88.225012,37.457390],[-88.237784,37.456811],[-88.255193,37.456748],[-88.281667,37.452596],[-88.297821,37.446816],[-88.312585,37.440591],[-88.317525,37.436178],[-88.321199,37.434705],[-88.330622,37.429316],[-88.333183,37.427210],[-88.348405,37.410726],[-88.358436,37.404860],[-88.358506,37.404817]]]}},
  //               {"type":"Feature",
  //                 "properties":{
  //                               "GEO_ID":"0500000US17079",
  //                               "STATE":"17",
  //                               "COUNTY":"079",
  //                               "NAME":"Jasper",
  //                               "LSAD":"County",
  //                               "CENSUSAREA":494.510000,
  //                               "percentile": 0.72143},
  //                 "geometry":{
  //                             "type":"Polygon",
  //                             "coordinates":[[[-87.950385,39.174882],[-87.948335,39.088545],[-87.946770,39.083854],[-87.945973,38.851041],[-87.945923,38.850108],[-88.258608,38.847521],[-88.361760,38.851949],[-88.361745,38.910847],[-88.360654,39.171118],[-88.007766,39.173925],[-87.950385,39.174882]]]}},
  //               {"type":"Feature",
  //                 "properties":{
  //                               "GEO_ID":"0500000US17081",
  //                               "STATE":"17",
  //                               "COUNTY":"081",
  //                               "NAME":"Jefferson",
  //                               "LSAD":"County",
  //                               "CENSUSAREA":571.169000,
  //                               "percentile": 0.02143},
  //                 "geometry":{
  //                               "type":"Polygon",
  //                               "coordinates":[[[-88.698961,38.474914],[-88.702391,38.256661],[-88.704606,38.125195],[-89.129637,38.124747],[-89.149739,38.124945],[-89.147416,38.212896],[-89.144388,38.473878],[-89.051684,38.474364],[-89.033080,38.473966],[-88.922428,38.476969],[-88.698961,38.474914]]]}
  //               }]}
