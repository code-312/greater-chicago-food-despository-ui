import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import RadioSelect from "../Utility/RadioSelect/RadioSelect";
import "./ExtraDataMenu.css";

export function MapExtraDataMenu({title = "Show data for:", options}) {
  const dispatch = useDispatch();
  const currentViewport = useSelector((state) => state.viewport);

  const isExtraDataShowing = useSelector((state) => state.viewport);
  function handleSelection(optionSelected) {
    //TODO dispatch something
  }

  if (isExtraDataShowing) {
    return (
      <ExtraDataMenu
        title={title}
        options={options}
        onChange={handleSelection}
      />
    );
  }

  return null;
}
export default function ExtraDataMenu({title = "Title", options, onChange}) {
  return (
    <div className="side-menu shadow">
      <h5 className="side-menu-title">{title + ":"}</h5>
      <RadioSelect
        data={options}
        handleChange={onChange}
        alignment={"column"}
      />
    </div>
  );
}
