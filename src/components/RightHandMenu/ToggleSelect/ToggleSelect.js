import React, { useState } from 'react';

import './ToggleSelect.css';

/*
 * COMPONENT: ToggleSelect
 * Always has only 2 options data to select which comes in as props from RightHandMenu
 * Some data needs to be filtered here for pie chart (use redux slice as props needs to be hoisted)
 */
function ToggleSelect(props) {
	const [active, setActive] = useState('A');

	const optionClick = (select) => {
		select === 'A'
			? props.setToggSelected(props.data[0])
			: props.setToggSelected(props.data[1]);
		setActive(active === select ? active : select);
	};

	return (
		<div className="toggSel">
			<div
				className={
					active === 'A' ? 'toggOpt ts__a toggSelect' : 'toggOpt ts__a'
				}
				onClick={() => optionClick('A')}>
				{props.data[0]}
			</div>
			<div
				className={
					active === 'B' ? 'toggOpt ts__b toggSelect' : 'toggOpt ts__b'
				}
				onClick={() => optionClick('B')}>
				{props.data[1]}
			</div>
		</div>
	);
}

export default ToggleSelect;
