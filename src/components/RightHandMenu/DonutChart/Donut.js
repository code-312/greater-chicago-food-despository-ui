import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

import './Donut.css'
import Legend from './Legend/Legend'

const data = [
  { key: 'Group A', value: 400 },
  { key: 'Group B', value: 300 },
  { key: 'Group C', value: 300 },
  { key: 'Group D', value: 200 }
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

function Donut() {
  const [legend, setLegend] = useState([])

  useEffect(() => {
    const l = []
    data.map((entry, index) => (l.push({ 'key' : entry.key, 'color' : COLORS[index % COLORS.length], 'value' : entry.value  })))
    setLegend( [...l])
  },[data])

  console.log(legend)
  return (
    <div>
       <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={40}
          outerRadius={55}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Legend legend={legend} />
    </div>
  )
}

export default Donut
