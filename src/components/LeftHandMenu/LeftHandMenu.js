import React from 'react';
import ZoomToBoundsMenu from './ZoomToBoundsMenu';
import DatasetSelector from './DatasetSelector/DatasetSelector'

function LeftHandMenu() {
	return (
		<div id="left-menu">
			<ZoomToBoundsMenu />
			<DatasetSelector />
		</div>
	);
}

export default LeftHandMenu;
