import React from 'react';
import ZoomToBoundsMenu from './ZoomToBoundsMenu';
import DatasetSelector from './DatasetSelector/DatasetSelector'

import './LeftHandMenu.css'

function LeftHandMenu() {
	return (
		<div className="left-menu">
			<ZoomToBoundsMenu />
			<DatasetSelector />
		</div>
	);
}

export default LeftHandMenu;
