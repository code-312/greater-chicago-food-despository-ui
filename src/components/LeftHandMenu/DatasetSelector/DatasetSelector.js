import React from 'react';
import RadioSelect from '../../RadioSelect/RadioSelect';

import './DatasetSelector.css';

function DatasetSelector(props) {
	/* For testing - remove later. These will either be passed in as props or come from the store. */
	const options = [
		'Poverty Rates',
		'Food Insecurity',
		'WIC Usage',
		'Snap Usage',
		'Census',
	];

	// const { options } = props
	const handleSelection = (idx) => {
		console.log(`Selected: ${options[idx]}`);
	};

	/* For later - When state changes, update the store */
	// const onSelectChange = useEffect() ...

	/* Don't load this bar if there are no dataset options */
	return !options ? null : (
		<div id="data-selector">
			<h3>Show data for:</h3>
			<RadioSelect
				data={options}
				handleChange={handleSelection}
				alignment={'column'}
			/>
		</div>
	);
}

export default DatasetSelector;
