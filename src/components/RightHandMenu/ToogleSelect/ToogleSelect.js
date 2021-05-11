import React, { useState } from 'react'

import './ToogleSelect.css'

function ToogleSelect() {
const [active, setActive] = useState('A')

const optionClick = (select) => {
  console.log(active, select)
  setActive(active === select ? active : select)
}

  return (
    <div className='toogSel'>
      <div className={active === 'A' ? 'toogOpt ts__a toogSelect' : 'toogOpt ts__a'} onClick={() => optionClick('A')}>A</div>
      <div className={active === 'B' ? 'toogOpt ts__b toogSelect' : 'toogOpt ts__b'} onClick={() => optionClick('B')}>B</div>
    </div>
  )
}

export default ToogleSelect
