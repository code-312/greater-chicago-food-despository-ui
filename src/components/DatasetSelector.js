import React, { useState } from 'react';

function DatasetSelector(props) {
	const { options } = props;
	const [selectedOption, setSelectedOptions] = useState(
		options[0] ? options[0] : null,
	);

	const handleSelection = (e) => {
        const indexOfSelection = options.indexOf(e.target.id)
		setSelectedOptions(options[indexOfSelection]);
	};

    /* For later - When state changes, update the store */
    // const onSelectChange = useEffect() ... 

	/* Don't load this bar if there are no dataset options */
	return !options ? null : (
		<div id="data-selector">
			{options.map((option, i) => {
				const selected = selectedOption === option;
				return (
					<DatasetOption
						option={option}
						key={i}
						selected={selected}
						handleSelection={handleSelection}
					/>
				);
			})}
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
				data-index={props['data-index']}></input>
			<label htmlFor={props.option}>{props.option}</label>
		</>
	);
}

export default DatasetSelector;
