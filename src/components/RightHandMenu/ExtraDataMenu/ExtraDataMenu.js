import React, {useState} from "react";

import RadioSelect from "../../Utility/RadioSelect/RadioSelect";
import "./ExtraDataMenu.css";

export default function ExtraDataMenu({title = "Title", options, onChange}) {
  return (
    <div className="side-menu shadow-sm">
      <h5 className="side-menu-title">{title + ":"}</h5>
      <RadioSelect
        data={options}
        handleChange={onChange}
        alignment={"column"}
      />
    </div>
  );
}
