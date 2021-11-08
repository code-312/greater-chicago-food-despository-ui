import React from "react";

import "./Legend.css";

/*
 * COMPONENT: Legend
 * Legend list for pie chart
 * data with color value and name comes as props from donut or unequalDonut component
 */
let getDisplayValue;
function Legend(props) {
  return (
    <div className="legend">
      <h3 className="leg__title font-bold primary-color">
        {props.legend[0] && props.legend[0].key === "Food Insecurity"
          ? "Out of Total Population:"
          : "Select data to display:"}
      </h3>
      {props.legend.map((item, idx) => (
        <div
          className={`${
            idx === props.selectedIndex ? "selected_item": ""
          } leg__item`}
          key={idx}
          onClick={() => props.onClickLegend(idx)}
        >
          <LegendItem
            legendItem={item}
            index={idx}
            displayValue={getDisplayValue(item, props.dataType)}
          />
        </div>
      ))}
    </div>
  );
}

function LegendItem({legendItem, index, displayValue}) {
  const item = legendItem;

  if (item.value !== 0) {
    return (
      <>
        <div className="leg__left">
          <div
            className="leg__color"
            style={{backgroundColor: item.color}}
          ></div>
          <div className="font-normal primary-color">{item.key}</div>
        </div>
        <div className="leg__rt">{displayValue}</div>
      </>
    );
  }
  return (
    <>
      <div className="leg__left">
        <div
          className="leg__color"
          disabled="true"
          style={{backgroundColor: "lightgrey"}}
        ></div>
        <div className="font-normal primary-color" disabled="true" style={{color: "lightgrey"}}>
          {item.key}
        </div>
      </div>
      <div className="leg__rt" disabled="true" style={{color: "lightgrey"}}>
        {displayValue}
      </div>
    </>
  );
}

getDisplayValue = (item, dataType) =>
  dataType === "percentValue"
    ? `${item.value} (${item.percent}%)`
    : dataType === "percent"
    ? item.value + " %"
    : item.value;
export default Legend;
