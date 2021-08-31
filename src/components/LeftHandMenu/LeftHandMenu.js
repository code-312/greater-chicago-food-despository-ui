import React from 'react';
import ZoomToBoundsMenu from './ZoomToBoundsMenu';
import DatasetSelector from './DatasetSelector/DatasetSelector'
import ExtraDataMenu from '../ExtraDataRightMenu/ExtraDataMenu';

import './LeftHandMenu.css'

function LeftHandMenu() {
	return (
		<div className="left-menu">
      <DatasetSelector />
			<ExtraDataMenu />
			<ZoomToBoundsMenu />
		</div>
	);
}

export default LeftHandMenu;
