import React from 'react'
import './SharedStyles.css'

/**
  * Overlay that displays information and metrics regarding the currently selected zip code.
  * @param zipCodeProperties => Zip code information and metrics.
  * @param x => Left-aligned pixel-coordinate of where to display the overlay.
  * @param y => Top-aligned pixel-coordinate of where to display the overlay.
  */
const ZipCodeSnapshotOverlay = ({zipCodeProperties, x, y}) => {
    if (zipCodeProperties) {
        return (
            <div className="snapshot_overlay" data-testid="zipcode_level_snapshot_overlay" style={{left: x, top:y}}>
                <h2>Zip Code: {zipCodeProperties.ZCTA}</h2>
            </div>
        )
    } else {
        return null;
    }
}

export default ZipCodeSnapshotOverlay;