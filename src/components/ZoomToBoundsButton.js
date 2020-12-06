import React from 'react';
import './SharedStyles.css';


const ZoomToBoundsButton = ({label, newViewport, updateViewport}) => {

    return (
        <button
            className="zoom_button"
            onClick={() => updateViewport(newViewport)}
            data-testid={"zoom_to_bounds_button: " + label}
        >{label}</button>
    )
}

export default ZoomToBoundsButton;