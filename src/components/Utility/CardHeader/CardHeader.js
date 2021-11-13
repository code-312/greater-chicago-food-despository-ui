import React from 'react';
import './CardHeader.css';
import './../../../AllieAwesomeCSS.css';

function CardHeader(props) {
	return (
		<div className="cardheader-container">
			<h3 className="font-bold primary-color">{props.text}</h3>
		</div>
	);
}

export default CardHeader;
