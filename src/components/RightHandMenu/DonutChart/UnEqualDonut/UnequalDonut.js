import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Sector } from 'recharts'

import './UnequalDonut.css'
import Legend from '../Legend/Legend'

// Mock Race Data; Similar Data should come in from Redux Slice
// const data = [
//   { key: 'Food Insecurity', value: 251 },
//   { key: 'Total Population', value: (334-251) }
// ]

// SVG and positioning for labels around the donut chart; default props send by Pie
// Mostly same as Donut.js; See Donut.js
const renderLabels = (props) => {
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
    payload
  } = props

  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + outerRadius * cos
  const sy = cy + outerRadius * sin
  // const mx = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)
  //             ? cx + (outerRadius + 30) * cos
  //             : sx 
  const mx = sx
  const my = sy - (outerRadius + 20) * cos
  const ex = mx + (cos >= 0 ? 1 : -1) * 20
  const ey = my
  const textAnchor = cos >= 0 ? 'end' : 'start'
  const tx= ex + (cos >= 0 ? 1 : -1) * 20
  const ty= ey + (sin >= 0 ? 1 : -1) * 16

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
        fill='#2cba42'
      />

      {/* line from pie chart to label name */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke='#2cba42'
        fill='none'
      />

      {/* Circle at the tip of line */}
      <circle cx={ex} cy={ey} r={3} fill='#2cba42' stroke='none' />

      {/* Label name/ text at end tip of line from pie chart */}
      <text
        textLength='30'
        x={tx}
        y={ty}
        textAnchor={textAnchor}
      >
        <tspan 
          fill='#1c752a'
          x={tx}
          y={ty}>{`${payload.payload.key}`}</tspan>
        <tspan
          className='tspan__val'
          x={tx + (cos >= 0 ? -1 : 1) * 6}
          y={ty + 10}>{payload.payload.percent ? `${value} (${payload.payload.percent}%)` : value + ' %'}</tspan>
      </text>
    </g>
  );
};

/*
 * COMPONENT: UnequalDonut
 * for Poverty, Food Insecurity etc, where only 2 data (total and children/smth else) is provided; Green Piechart
 * data slice filtered as per radioSelct and ToggleSelect to be used in place of mockData
 */
function UnequalDonut(props) {
  const [legend, setLegend] = useState([])
  const [sum, setSum] = useState(0)

  // ActiveIndex identifies on which cell index of pie renderActiveShape function is to be called 
  // fixed to 0 as 1st element is the only one requiring label and sector overlay
  const [activeIndex, ] = useState(0)

  const { data, dataType } = props
  useEffect(() => {
    if (data) {
      let sum1 = data.reduce(function (acc, curr) {
        return acc + curr.value
      }, 0)
      const legendData =  [
        { key: data[0].key, 
          value: data[0].value, 
          color: '#2cba42', 
          percent: data[0].percent !== undefined? data[0].percent : '' },
        { key: data[1].key, 
          value: sum1, 
          color: '#124c1b', 
          percent: data[1].percent !== undefined ? data[1].percent : '' }
      ]
      setSum(sum1)
      setLegend([...legendData])
    }
  },[data])

  return (
    <div>
      <div className='donut__chart'>
      <PieChart width={200} height={250}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderLabels}
          data={data}
          cx={100}
          cy={125}
          innerRadius={43}
          outerRadius={52}
          fill='#124c1b'
          paddingAngle={0}
          dataKey='value'
        />
      </PieChart>
        <div className='donut__centerTxt'>
          <h5>Total Population</h5>
          <span>{dataType === 'percentValue'  ? `${sum} (${data[1].percent}%)` : dataType === 'percent' ? sum + ' %' : sum}</span>
        </div>
      </div>
      
      <Legend legend={legend} dataType={dataType} />
    </div>
  )
}

export default UnequalDonut
