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
	return (
		<>
			<label className="align-self-center radio">
				<RadioButton />
                <span className="radio__label">{props.option}</span>
			</label>
		</>
	);
}

function RadioButton(props) {
	return (
		<span className="radio__input">
			<input
				type="radio"
                name="radio"
				className="align-self-center"></input>
			<span className="radio__control"></span>
		</span>
	);
}

export default DatasetSelector;
