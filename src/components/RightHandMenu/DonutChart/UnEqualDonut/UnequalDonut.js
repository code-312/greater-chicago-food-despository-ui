import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

import './UnequalDonut.css';
import Legend from '../Legend/Legend';

// Mock Race Data; Similar Data should come in from Redux Slice
const data = [
	{ key: 'Food Insecurity', value: 251 },
	{ key: 'Total Population', value: 334 - 251 },
];

// SVG and positioning for labels around the donut chart; default props send by Pie
// Mostly same as Donut.js; See Donut.js
const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		startAngle,
		endAngle,
		midAngle,
		innerRadius,
		outerRadius,
		value,
		name,
	} = props;

	const myCalc = (midAngle, sin, sy) => {
		if (
			midAngle <= 10 ||
			midAngle >= 350 ||
			(midAngle >= 170 && midAngle <= 190)
		) {
			return sy;
		} else if (midAngle >= 340 || (midAngle >= 180 && midAngle <= 220)) {
			return cy + (outerRadius + 30) * sin + 20;
		} else if (midAngle <= 20 || (midAngle >= 140 && midAngle <= 180)) {
			return cy + (outerRadius + 30) * sin - 20;
		} else {
			return cy + (outerRadius + 30) * sin;
		}
	};

	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + outerRadius * cos;
	const sy = cy + outerRadius * sin;
	const mx =
		midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)
			? cx + (outerRadius + 30) * cos
			: sx;
	const my = myCalc(midAngle, sin, sy);
	const ex =
		midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)
			? mx
			: mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'end' : 'start';
	const tx = ex + (cos >= 0 ? 1 : -1) * 12;
	const ty = ey + (sin >= 0 ? 1 : -1) * 16;

	return (
		<g>
			{/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
        </text> */}

			{/* Create a sector on top of pie chart with larger width (inner and outer radius) to create visual effect that it is a cell of pie */}
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius - 2}
				outerRadius={outerRadius + 2}
				startAngle={startAngle}
				endAngle={endAngle}
				fill="#2cba42"
			/>

			{/* line from pie chart to label name */}
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke="#2cba42"
				fill="none"
			/>

			{/* Circle at the tip of line */}
			<circle cx={ex} cy={ey} r={3} fill="#2cba42" stroke="none" />

			{/* Label name/ text at end tip of line from pie chart */}
			<text textLength="30" x={tx} y={ty} textAnchor={textAnchor}>
				<tspan fill="#1c752a" x={tx} y={ty}>{`${data[name].key}`}</tspan>
				<tspan
					className="tspan__val"
					x={tx + (cos >= 0 ? -1 : 1) * 6}
					y={ty + 10}>{`${value}`}</tspan>
			</text>
		</g>
	);
};

/*
 * COMPONENT: UnequalDonut
 * for Poverty, Food Insecurity etc, where only 2 data (total and children/smth else) is provided; Green Piechart
 * data slice filtered as per radioSelct and ToggleSelect to be used in place of mockData
 */
function UnequalDonut() {
	const [legend, setLegend] = useState([]);
	const [sum, setSum] = useState(0);

	// ActiveIndex identifies on which cell index of pie renderActiveShape function is to be called
	// fixed to 0 as 1st element is the only one requiring label and sector overlay
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		let sum1 = data.reduce(function (a, b) {
			return a + b.value;
		}, 0);
		const l = [
			{ key: 'Food Insecurity', value: data[0].value, color: '#2cba42' },
			{ key: 'Total Population', value: sum1, color: '#124c1b' },
		];
		setSum(sum1);
		setLegend([...l]);
	}, [data]);

	return (
		<div>
			<div className="donut__chart">
				<PieChart width={200} height={250}>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={data}
						cx={100}
						cy={125}
						innerRadius={43}
						outerRadius={52}
						fill="#124c1b"
						paddingAngle={0}
						dataKey="value"
					/>
				</PieChart>
				<div className="donut__centerTxt">
					<h5>Total Population</h5>
					<span>{sum}</span>
				</div>
			</div>
			<Legend legend={legend} />
		</div>
	);
}

export default UnequalDonut;
