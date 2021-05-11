import React from 'react';
import { useSelector } from 'react-redux';

import './RightHandMenu.css'
import ToogleSelect from './ToogleSelect/ToogleSelect'
import RadioSelect from './RadioSelect/RadioSelect'
import Donut from './DonutChart/Donut'
/**
 * COMPONENT: RightHandMenu
 */

const mockProps = {
  'title': 'Census Data',
  'desc': 'Lorem ipsum dolor sit amet, conse ct etur adi pis cing elit',
  'name': 'County Name'
}
const RightHandMenu = () => {
  //useSelector gets viewport state from Redux store
  const currentViewport = useSelector(state => state.viewport);
  return (
    <div className='rtMenu'>
      <h1 className='rt__title'>{mockProps.title}</h1>
      <p className='rt__desc'>{mockProps.desc}</p>
      <h3 className='rt__name'>{mockProps.name}</h3>
      <div className='rt__toogleSelect'>
        <ToogleSelect />
      </div>
      <div className='rt__radioSelect'>
        <RadioSelect data='WIC' />
      </div>
      <div className='rt__donut'>
        <Donut />
      </div>
      <div className='rt__footer'>
        <a alt='link to surce' href='#a' className='rt__link'>Link to source</a>  
      </div>
    </div>
  )
}
export default RightHandMenu;
