import React from 'react';


const ZoomToBoundsButton = ({label, newViewport, updateViewport}) => {
    return (
        <button
            onClick={() => updateViewport(newViewport)} 
            style={{backgroundColor:'white', borderColor:'black', borderWidth:1, padding:10}}>
            {label}
        </button>
    )
}

export default ZoomToBoundsButton;