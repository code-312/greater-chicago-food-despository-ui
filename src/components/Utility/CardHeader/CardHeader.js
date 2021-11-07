import React from 'react';
import './CardHeader.css';
import './../../../AllieAwesomeCSS.css';

function CardHeader(props) {

	let styles;

	// Allows for the component to receive "override styles" that will be added on an element level.
	// So although the component has class level styling, this can be tweaked when needed.
	if(props.styleOverride) {
		styles = {...props.styleOverride};
	}

	return (
		<div className="cardheader-container" style={styles}>
			<h3 className="font-bold primary-color">{props.text}</h3>
		</div>
	);
}

export default CardHeader;
