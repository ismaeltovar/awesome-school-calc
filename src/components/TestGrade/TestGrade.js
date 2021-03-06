import React, {useState} from "react";
import calculateTestScoreNeeded from "./logic";
import { Calc, CalcForm, CalcHeader, Results, TestResultTxt} from "..";

export default class TestGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classAvg: '', testWeight: '', desiredClassAvg: '', usrSubmit: false, gradeNeeded: ''};
    this.handleChange = this.handleChange.bind(this);
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
      if (val != true && val != false) {
        if (val || val.length != 0)
          displayPrompt = true;
      }
    });

    if (displayPrompt) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({gradeNeeded: calculateTestScoreNeeded(this.state.classAvg, this.state.testWeight, this.state.desiredClassAvg)});
    this.setState({usrSubmit: true});
  }

  handleChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;

    if (this.state.usrSubmit)
      this.setState({usrSubmit : false});
    if (id === "current-average")
      this.setState({classAvg : value});
    if (id === "test-weight")
      this.setState({testWeight : value});
    if (id === "desired-average")
      this.setState({desiredClassAvg : value});
  }
  
  render() {
    let itemData = [
      ["current-average", "Current Class Average:", '0', '110', this.state.classAvg, '.01'],
      ["test-weight", "Overall weight of test on grade:", '0', '100', this.state.testWeight, '.01'],
      ["desired-average", "Desired class average after test:", '0', '110', this.state.desiredClassAvg, '.01']
    ];
    let helpData = [
      'Your current class average before the test is taken.',
      'The overall effect of the test (as a percentage) on your grade.',
      'The class average that you would like to have after the score of the test is accounted for.',
    ];
    return (
      <Calc>
        <CalcHeader navTo='/' txt='Test Grade'/>
        <CalcForm onsubmit={this.handleSubmit} onchange={this.handleChange} itemData={itemData} helpData={helpData} submitText='Submit'/>
        <Results>
          <TestResultTxt usrSubmit={this.state.usrSubmit} desiredClassAvg={this.state.desiredClassAvg} gradeNeeded={this.state.gradeNeeded}/>
        </Results>
      </Calc>
    );
  }
}