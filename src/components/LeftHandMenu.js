import React from 'react';
import ZoomToBoundsMenu from '../components/LeftHandMenu/ZoomToBoundsMenu';
import DatasetSelector from '../components/LeftHandMenu/DatasetSelector/DatasetSelector'

function LeftHandMenu() {
	return (
		<div id="left-menu">
			<ZoomToBoundsMenu />
			<DatasetSelector />
		</div>
	);
}

export default LeftHandMenu;
