import React, { useEffect, useState } from "react";
import CalcForm from "../CalcForm/CalcForm";
import gradesNeeded from "./logic";
import Results from "./Results";

export default class GPAWeightedCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentGPA: '', classesTaken: '', desiredGPA: '', nextSemClasses: '', usrSubmit: false, gradeNeededEachClass: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload(e) {
    let displayPrompt = false;

    Object.keys(this.state).forEach((key, index) => {
      let val = this.state[key];
      console.log(val);
      if (val != true && val != false) {
        console.log(key);
        if (val || val.length != 0)
          displayPrompt = true;
      }
    });

    if (displayPrompt) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  handleChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;

    if (this.state.usrSubmit)
      this.setState({usrSubmit: false});
    if (id === 'current-gpa')
      this.setState({currentGPA: value});
    if (id === 'classes-taken')
      this.setState({classesTaken: value});
    if (id === 'desired-gpa')
      this.setState({desiredGPA: value});
    if (id === 'next-semester-classes')
      this.setState({nextSemClasses: value});
  }
  
  handleClick = (e) => {
    let name = e.target.name;

    if (e.target.id === 'help-button') {
      if (name === "current-gpa-hp") {
        let msg = `Help currently unavailable.`;
        alert(msg);
      }
      if (name === "current-credits-hp") {
        let msg = `Help currently unavailable.`;
        alert(msg);
      }
      if (name === "desired-gpa-hp") {
        let msg = `Help currently unavailable.`;
        alert(msg);
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.setState({gradeNeededEachClass: gradesNeeded(false, this.state.currentGPA, this.state.classesTaken, this.state.desiredGPA, this.state.nextSemClasses)});
    this.setState({usrSubmit: true});
  }

  render() {
    let itemData = [
      ["current-gpa", "Current GPA:", '2', '4', this.state.currentGPA, '.01'], 
      ["classes-taken", 'Current amount of classes taken so far:', '0', '200', this.state.classesTaken, '1'],
      ["desired-gpa", 'Desired GPA:', '2', '4', this.state.desiredGPA, '.01'],
      ["next-semester-classes", 'Amount of classes you will take next semester:', '0', '20', this.state.nextSemClasses, '1']
    ];
    return (
      <div className="calculator-body">
        <p className="warning-notice"><em>Warning: This calc will give an estimate that may be off by A LOT of points. Please use the Custom GPA calc if you want an exact calculation.</em></p>
        <CalcForm onsubmit={this.handleSubmit} onclick={this.handleClick} onchange={this.handleChange} itemData={itemData} submitText='Submit'/>
        <Results desiredGPA={this.state.desiredGPA} gradeNeededEachClass={this.state.gradeNeededEachClass} usrSubmit={this.state.usrSubmit} weighted={false}/>
      </div>
    );
  }
}