import React, {Component} from 'react';
import './App.css';

import { connect } from 'react-redux';
import { countyFetch } from './redux/countyReducer';
import { zipFetch } from './redux/zipReducer';

import ZoomToBoundsMenu from './components/ZoomToBoundsMenu';
import RightHandMenu from './components/RightHandMenu';
import Map from './mapbox/Map'

class App extends Component {

  componentDidMount() {
    //dispatch is added to props automatically when connect is used without mapDispatchToProps
    //countyFetch and zipFetch are both async thunks from countyReducer.js and zipReducer.js, respectively
    //They dispatch the most current API call to the Redux store
    this.props.dispatch(countyFetch());
    this.props.dispatch(zipFetch());
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          {/*Column 1: Left-hand menu (Zoom Control)*/}
          <nav className="menu col-2 pl-0 pr-0">
            <ZoomToBoundsMenu /> 
          </nav>

          {/*Column 2: MapBox map */}
          <div className="col pl-0 pr-0">
            <Map />
          </div>

          {/* Column 3: Right-hand menu */}
          { /* <nav className="menu col-2 pl-0 pre-0">
            <RightHandMenu />
          </nav> */
          }
        </div>
      </div>
    );
  }
}

export default connect()(App);