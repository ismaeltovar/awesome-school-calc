import React from "react";
import { NavLink } from "react-router-dom";
import HelpButton from "../CalcForm/HelpButton";
import CalcHeader from "../CalcForm/CalcHeader";

export default function GPACalc() {
  let helpMsg = `Help currently unavailable.`;
  // `There are two GPA calculator types:\n 
  //   - Default: Uses the default settings to calculate GPA. The default settings are:\n GPA Scale: 4.0\n\t4.0 == 100 3.0 == 90, 2.0 == 80, 1.0 == 70, < 1.0 == 0\n\n 
  //   - Custom: Uses your custom settings that you can set to calculate GPA. Customizable settings include: `;

  return (
    <div className="calculator-body">
      <CalcHeader navTo='/' txt='GPA Calc'/>
      <h3 className="recommended-gpa-calc-notice"> Note: For more accurate results, use the <strong>Custom</strong> calculator.</h3>
      <div className="label-and-help-container">
        <label className="txt-field-label" htmlFor="gpa-calc-type">Select GPA calculator type:</label>
        <HelpButton itemName='gpa-calc' msg={helpMsg}/>
      </div>
      <div className="gpa-calc-types-container">
        <NavLink id="gpa-calc-option" to="/gpa/weighted">Weighted GPA</NavLink>
        <NavLink id="gpa-calc-option" to="/gpa/un-weighted">Un-Weighted GPA</NavLink>
        <NavLink id="gpa-calc-option" to="/gpa/custom">Custom</NavLink>
      </div>
    </div>
  );
}