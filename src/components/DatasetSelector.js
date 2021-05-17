import React, { useState } from 'react';

function DatasetSelector(props) {
    
    /* For testing - remove later. These will either be passed in as props or come from the store. */
    const options = [
        'Poverty Rates',
        'Food Insecurity',
        'WIC Usage',
        'Snap Usage',
        'Census',
    ];

	// const { options } = props;

    const [selectedOption, setSelectedOptions] = useState(
		options[0] ? options[0] : null,
	);

	const handleSelection = (e, index) => {
		setSelectedOptions(options[index]);
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
								handleSelection={handleSelection}
								option={option}
								selected={selected}
								index={i}
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
	const { selected, index } = props;

	const handleClick = (e) => {
		props.handleSelection(e, index);
		e.preventDefault();
	};

	return (
		<>
			<label className="align-self-center radio">
				<span className="radio__input">
					<input
						type="radio"
						name="radio"
						className={`align-self-center${
							selected ? ' checked' : ''
						}`}></input>
					<span className="radio__control" onClick={handleClick}></span>
				</span>
				<span className="radio__label">{props.option}</span>
			</label>
		</>
	);
}

export default DatasetSelector;
