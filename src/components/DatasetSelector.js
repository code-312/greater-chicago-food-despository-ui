import React, { useState } from 'react';

function DatasetSelector(props) {
	const { options } = props;
	const [selectedOption, setSelectedOptions] = useState(
		options[0] ? options[0] : null,
	);

	const handleSelection = (e) => {
		const indexOfSelection = options.indexOf(e.target.id);
		setSelectedOptions(options[indexOfSelection]);
	};

	/* For later - When state changes, update the store */
	// const onSelectChange = useEffect() ...

	/* Don't load this bar if there are no dataset options */
	return !options ? null : (
		<div id="data-selector">
			<h3>Show data for:</h3>
			<ul className="flex-list">
				{options.map((option, i) => {
					const selected = selectedOption === option;
					return (
						<li key={i}>
							<DatasetOption
								option={option}
								selected={selected}
								handleSelection={handleSelection}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

/* COMPONENT: DatasetOption */
function DatasetOption(props) {
	const handleChange = (e) => {
		props.handleSelection(e);
	};
	return (
		<>
			<input
				type="radio"
				id={props.option}
				onChange={handleChange}
				checked={props.selected}
				data-index={props['data-index']}
				className="align-self-center"></input>
			<label htmlFor={props.option} className="align-self-center">
				{props.option}
			</label>
		</>
	);
}

export default DatasetSelector;
