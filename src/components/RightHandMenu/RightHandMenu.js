import React, {useState,useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedFeat } from  '../../redux/selectedFeatReducer'

import './RightHandMenu.css'
import ToggleSelect from './ToggleSelect/ToggleSelect'
import Donut from './DonutChart/Donut'
import UnequalDonut from './DonutChart/UnEqualDonut/UnequalDonut'
import LinkToSource from './LinkToSource/LinkToSource'

import {filterFeatChart} from '../Utility/filterFeatChart'
import {dataOptions} from './dataOptions'
import {DataContext} from '../../App'
import '../../AllieAwesomeCSS.css'
import CardHeader from '../Utility/CardHeader/CardHeader'

/*
 * COMPONENT: RightHandMenu
 */

const RightHandMenu = () => {
  const dispatch = useDispatch();

  // get all County features data and selected feature option from redux store
  const {countyData} = useContext(DataContext);
  const selectedFeat = useSelector(state => state.selectedFeat);

  const [dropDownValue, setDropDownValue] = useState(0)

  const { selectedCounty, selectedfilterFeat } = selectedFeat;

  // Pass all data and selected data to filterFeatChart function which will filter out data and give data as required by chart
  let pieData = filterFeatChart(countyData, selectedFeat);

  // To keep track of which toggleSelect option is selected, so that respective radioSelect Options can be rendered
  const initalToggleState = () =>
    dataOptions[selectedfilterFeat].toggleSelect
      ? dataOptions[selectedfilterFeat].toggleSelect[0]
      : null;
  const initialToggleIdxState = () =>
    dataOptions[selectedfilterFeat].toggleSelect ? 0 : null;
  const [toggSelected, setToggSelected] = useState(initalToggleState());
  const [toggIdxSelected, setToggIdxSelected] = useState(
    initialToggleIdxState()
  );

  const radioClick = idx => {
    if (dataOptions[selectedfilterFeat].radioSelect[toggSelected + 'Keys']) {
      setDropDownValue(idx)
      dispatch(
        updateSelectedFeat({
          ...selectedFeat,
          ...{
            selectedfilterSubfeat:
              dataOptions[selectedfilterFeat].radioSelect[
                toggSelected + 'Keys'
              ][idx],
            featLabel:
              dataOptions[selectedfilterFeat].legendLabels[toggIdxSelected]
          }
        })
      );
      pieData = filterFeatChart(countyData, selectedFeat);
    }
  };

  return (
    <div>
      {selectedCounty && dataOptions[selectedfilterFeat] ? (
        <div className='rtMenu'>
          <div className='rtBody'>
            {dataOptions[selectedfilterFeat].title === 'Race/Ethnicity' ? (
                <CardHeader text={"Race/Ethnicity"} styleOverride={{ width: "297px", marginLeft: "-12px", marginTop: "-12px"}} />
              ) : (
                <CardHeader text={
                  dataOptions[selectedfilterFeat].title} styleOverride={{ width: "297px", marginLeft: "-12px", marginTop: "-12px"}} />
              )}
            <p className='font-small black rt__desc'>{dataOptions[selectedfilterFeat].desc}</p>
            <h3 className='rt__name'>
              {selectedCounty ? selectedCounty.name + ' County' : ''}
            </h3>

            {dataOptions[selectedfilterFeat].toggleSelect ? (
              <div className='rt__toggleSelect'>
                <ToggleSelect
                  data={dataOptions[selectedfilterFeat].toggleSelect}
                  dataID={dataOptions[selectedfilterFeat].toggleSelectKeys}
                  dataLabel={dataOptions[selectedfilterFeat].legendLabels}
                  setToggSelected={setToggSelected}
                  setToggIdxSelected={setToggIdxSelected}
                />
              </div>
            ) : (
              ''
            )}

            {/* WIC data and Census Data has race type pie chart; others have a different pie chart */}
            <div className='rt__donut'>
              {selectedfilterFeat === 'poverty_data' ||
              selectedfilterFeat === 'insecurity_data' ? (
                <UnequalDonut
                  data={pieData}
                  dataType={dataOptions[selectedfilterFeat].dataType}
                  radioSelect={dataOptions[selectedfilterFeat].radioSelect}
                  toggSelected={toggSelected}
                  radioClick={idx => radioClick(idx)}
                  dropDownValue={dropDownValue}
                />
              ) : (
                <Donut
                  data={pieData}
                  dataType={dataOptions[selectedfilterFeat].dataType}
                  radioSelect={dataOptions[selectedfilterFeat].radioSelect}
                  toggSelected={toggSelected}
                  radioClick={idx => radioClick(idx)}
                  dropDownValue={dropDownValue}
                />
              )}
            </div>
          </div>
          <div className='rt__footer'>
            <LinkToSource data={selectedFeat}/>
          </div>
        </div>
      ) : (
        <div className='rtMenu noCounty'>
          <p className='rt__noCounty font-large'>
            Select a county to view {dataOptions[selectedfilterFeat].title}
          </p>
        </div>
      )}
    </div>
  );
};
export default RightHandMenu;
