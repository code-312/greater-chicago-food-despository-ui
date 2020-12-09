import React from 'react'
import './SharedStyles.css'

 /**
  * Overlay that displays information and metrics regarding the currently selected county.
  * @param countyProperties => County information and metrics.
  * @param x => Left-aligned pixel-coordinate of where to display the overlay.
  * @param y => Top-aligned pixel-coordinate of where to display the overlay.
  */
const CountySnapshotOverlay = ({countyProperties,x,y}) => {
    if (countyProperties) {
        return (
            <div className="snapshot_overlay" data-testid="county_level_snapshot_overlay" style={{left: x, top:y}}>
                <h2>County: {countyProperties.NAME}</h2>
                <h3>FIPS: {countyProperties.STATE + countyProperties.COUNTY}</h3>
            </div>
        )
    } else {
        return null;
    }
}

export default CountySnapshotOverlay;