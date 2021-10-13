import React, { useEffect, useState, useCallback } from 'react'
import { PieChart, Pie, Cell, Sector } from 'recharts'

import './Donut.css'
import Legend from './Legend/Legend'

// Mock Race Data; Similar Data should come in for pie chart
// const data = [
//   { key: 'White', value: 400 },
//   { key: 'Asian', value: 300 },
//   { key: 'Black', value: 300 },
//   { key: 'Hispanic/Latino', value: 200 },
//   { key: 'Pacific', value: 300 },
//   { key: 'Two+', value: 300 },
//   { key: 'Other', value: 200 }
// ]

// Color for various sectors in pie chart
const COLORS = ['#2cba42', '#f3ad1c', '#534588', '#ff6833', '#964B00', '#92dbdd', '#ff0000', '#cc27b0']

// Attempt 1: SVG and positioning for labels around the donut chart; default props send by Pie
// const renderLabels = (props) => {
//   const RADIAN = Math.PI / 180
//   const {
//     cx,
//     cy,
//     midAngle,
//     outerRadius,
//     fill,
//     value,
//     payload
//   } = props

//   const myCalc = (midAngle, sin, sy) => {
//     if (
//       midAngle <= 10 ||
//       midAngle >= 350 ||
//       (midAngle >= 170 && midAngle <= 190)
//     ) {
//       return sy
//     } else if (midAngle >= 340 || (midAngle >= 180 && midAngle <= 220)) {
//       return cy + (outerRadius + 30) * sin + 20
//     } else if (midAngle <= 20 || (midAngle >= 140 && midAngle <= 180)) {
//       return cy + (outerRadius + 30) * sin - 20
//     } else {
//       return cy + (outerRadius + 30) * sin
//     }
//   }

//   const sin = Math.sin(-RADIAN * midAngle)  //convert degree to radian units and find sin value of it
//   const cos = Math.cos(-RADIAN * midAngle)  //convert degree to radian units and find cos value of it
//   const sx = cx + outerRadius * cos         //start coordinates (sx,sy) for line
//   const sy = cy + outerRadius * sin
//   const mx = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190) //mid coordinates (mx,my) for line
//               ? cx + (outerRadius + 30) * cos
//               : sx
//   const my = myCalc(midAngle, sin, sy)
//   const ex = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)  //end coordinates (ex,ey) for line
//               ? mx
//               : mx + (cos >= 0 ? 1 : -1) * 22   //1st and 4th quadrant cos is +ve ; 1st and 2nd quadrant sin is +ve
//   const ey = my
//   const textAnchor = cos >= 0 ? 'end' : 'start' //where to anchor text tag
//   const tx= ex + (cos >= 0 ? 1 : -1) * 12       //coordinates (tx,ty) on which text tag is placed
//   const ty= ey + (sin >= 0 ? 1 : -1) * 16

//   return (
//     <g>
//       {/* centers text in middle of pie chart */}
//       {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//         {payload.name}
//         </text> */}

//       {/* line from pie chart to label name */}
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill='none'
//       />

//       {/* Circle at the tip of line */}
//       <circle cx={ex} cy={ey} r={3} fill={fill} stroke='none' />

//       {/* Label name/ text at end tip of line from pie chart */}
//       <text
//         textLength='30'
//         x={tx}
//         y={ty}
//         textAnchor={textAnchor}
//       >
//         <tspan 
//           fill='#1c752a'
//           x={tx}
//           y={ty} >{`${payload.payload.key}`}</tspan>
//         <tspan
//           className='tspan__val'
//           x={tx + (cos >= 0 ? -1 : 1) * 6}
//           y={ty + 10}>{payload.payload.percent ? `${value} (${payload.payload.percent}%)` : value}</tspan>
//       </text>
//     </g>
//   )
// }

// Attempt 2: labels on hover
const renderLabelonHover = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    startAngle,
    midAngle,
    endAngle,
    innerRadius,
    outerRadius,
    fill,
    value,
    payload
  } = props

  const myCalc = (midAngle, sin, sy) => {
    if (
      midAngle <= 10 ||
      midAngle >= 350 ||
      (midAngle >= 170 && midAngle <= 190)
    ) {
      return sy
    } else if (midAngle >= 340 || (midAngle >= 180 && midAngle <= 220)) {
      return cy + (outerRadius + 30) * sin + 30
    } else if (midAngle <= 20 || (midAngle >= 140 && midAngle <= 180)) {
      return cy + (outerRadius + 30) * sin - 30
    } else {
      return cy + (outerRadius + 27) * sin
    }
  }

  const sin = Math.sin(-RADIAN * midAngle)  //convert degree to radian units and find sin value of it
  const cos = Math.cos(-RADIAN * midAngle)  //convert degree to radian units and find cos value of it
  const sx = cx + (outerRadius + 4) * cos         //start coordinates (sx,sy) for line
  const sy = cy + (outerRadius + 6) * sin
  const mx = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190) //mid coordinates (mx,my) for line
              ? cx + (outerRadius + 37) * cos
              : sx
  const my = myCalc(midAngle, sin, sy)
  const ex = midAngle <= 10 || midAngle >= 350 || (midAngle >= 170 && midAngle <= 190)  //end coordinates (ex,ey) for line
              ? mx
              : mx + (cos >= 0 ? 1 : -1) * 50   //1st and 4th quadrant cos is +ve ; 1st and 2nd quadrant sin is +ve
  const ey = my
  const textAnchor = cos >= 0 ? 'end' : 'start' //where to anchor text tag
  const tx= ex + (cos >= 0 ? 1 : -1) * 12       //coordinates (tx,ty) on which text tag is placed
  const ty= ey + (sin >= 0 ? 1 : -1) * 16

  return (
    <g>
      {/* centers text in middle of pie chart */}
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
        </text> */}
      
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 6}
        fill={fill}
      />

      {/* line from pie chart to label name */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />

      {/* Circle at the tip of line */}
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke='none' />

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
          y={ty} >{`${payload.payload.key}`}</tspan>
        <tspan
          className='tspan__val'
          x={tx + (cos >= 0 ? -1 : 1) * 6}
          y={ty + 10}>{payload.payload.percent ? `${value} (${payload.payload.percent}%)` : value}</tspan>
      </text>
    </g>
  )
}


/*
 * COMPONENT: Donut
 * for Race and similar type data
 * data slice filtered as per radioSelct and ToggleSelect to be used in place of mockData
 */
function Donut(props) {
  const [legend, setLegend] = useState([])
  const [sum, setSum] = useState(0)

  const [activeLabel, setActiveLabel] = useState(0)

  const onPieEnter = useCallback(
    (_, idx) => {
      setActiveLabel(idx)
    }, [setActiveLabel]
  )

  const { data, dataType } = props

  useEffect(() => {
    const legendData = []
    let sum1 = data.reduce(function (acc, curr) {
      return acc + curr.value
    }, 0)
    data.map((entry, index) => (legendData.push({ key : entry.key, 
                                                  color : COLORS[index % COLORS.length], 
                                                  value : entry.value, 
                                                  percent: entry.percent !== undefined ? entry.percent : null  })
                                )
            )
    setSum(sum1)
    setLegend( [...legendData])
  },[data])

  return (
    data ? (
      <div>
        <div className='donut__chart'>
          <PieChart width={273} height={250}>
            <Pie
              activeIndex={activeLabel}
              activeShape={renderLabelonHover}
              onMouseEnter={onPieEnter}
              data={data}
              cx={130}
              cy={121}
              innerRadius={54}
              outerRadius={69}
              fill='#8884d8'
              paddingAngle={1}
              dataKey='value'
              // label={renderLabels}
              labelLine={false}
            >
              {/* for each cell in pie fill color separate */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
          </PieChart>
          <div className='donut__centerTxt'>
            <h5>Total</h5>
            <span>{dataType === 'percentValue'  ? `${sum} (${data[1].percent}%)` : dataType === 'percent' ? sum + ' %' : sum}</span>
          </div>
        </div>
        <Legend legend={legend} dataType={dataType} />
      </div>
    ) : ''
  )
}

export default Donut
