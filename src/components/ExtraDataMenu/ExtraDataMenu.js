import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import RadioSelect from "../Utility/RadioSelect/RadioSelect";
import "./ExtraDataMenu.css";

export function MapExtraDataMenu({title = "Show data for:", options}) {
  function handleSelection(optionSelected) {
    //TODO dispatch something
  }
  return (
    <ExtraDataMenu title={title} options={options} onChange={handleSelection} />
  );
}
export default function ExtraDataMenu({title = "Title", options, onChange}) {
  return (
    <div id="extra-data-menu" className="side-menu shadow">
      <h5 className="side-menu-title">{title + ":"}</h5>
      <RadioSelect
        data={options}
        handleChange={(optionIndex) => {
          onChange(options[optionIndex]);
        }}
        alignment={"column"}
      />
    </div>
  );
}
