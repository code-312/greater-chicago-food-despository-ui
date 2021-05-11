import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

import './Donut.css'
import Legend from './Legend/Legend'

const data = [
  { key: 'White', value: 400 },
  { key: 'Asian', value: 300 },
  { key: 'Black', value: 300 },
  { key: 'Hispanic/Latino', value: 200 },
  { key: 'Pacific', value: 300 },
  { key: 'Two+', value: 300 },
  { key: 'Other', value: 200 }
]
const COLORS = ['#2cba42', '#f3ad1c', '#534588', '#ff6833', '#92dbdd', '#ff0000', '#cc27b0']

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    value,
    name
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
  const mx = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)
              ? cx + (outerRadius + 30) * cos
              : sx;
  const my = myCalc(midAngle, sin, sy);
  const ex = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)
              ? mx
              : mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "end" : "start";
  const tx= ex + (cos >= 0 ? 1 : -1) * 12
  const ty= ey + (sin >= 0 ? 1 : -1) * 16


  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
        </text> */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        textLength='30'
        x={tx}
        y={ty}
        textAnchor={textAnchor}
      >
        <tspan 
          fill='#1c752a'
          x={tx}
          y={ty} >{`${data[name].key}`}</tspan>
        <tspan
          className='tspan__val'
          x={tx + (cos >= 0 ? -1 : 1) * 6}
          y={ty + 10}>{`${value}`}</tspan>
      </text>
    </g>
  );
};

function Donut() {
  const [legend, setLegend] = useState([])

  useEffect(() => {
    const l = []
    data.map((entry, index) => (l.push({ 'key' : entry.key, 'color' : COLORS[index % COLORS.length], 'value' : entry.value  })))
    setLegend( [...l])
  },[data])

  return (
    <div>
      <div className='donut__chart'>
        <PieChart width={200} height={250}>
          <Pie
            data={data}
            cx={100}
            cy={125}
            innerRadius={40}
            outerRadius={55}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
            label={renderActiveShape}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className='donut__centerTxt'><h5>Total Population</h5><span>334 (100%)</span></div>
      </div>
      <Legend legend={legend} />
    </div>
  )
}

export default Donut
