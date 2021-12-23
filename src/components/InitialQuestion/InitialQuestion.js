import React from "react";
import { NavLink } from "react-router-dom";
import "./InitialQuestion.css";

export default function InitialQuestion() {
  return (
    <>
      <h2>Select Calculator Type:</h2>
      <div id="calc-types">
        <NavLink id="calc-option" to="/semester-exam">Semester Exam</NavLink>
        {/* <NavLink to="/test-grade">Test Grade</NavLink> */}
      </div>
    </>
  );
}