import React from "react";
import gradesNeeded from "./logic";
import { Calc, CalcForm, CalcHeader, GPAResultTxt, Results, Notice} from "..";
import helpData from "./helpData";

export default class GPAWeightedCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentGPA: '', classesTaken: '', desiredGPA: '', nextSemClasses: '', usrSubmit: false, gradeNeededEachClass: ''};
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
      <Calc>
        <CalcHeader navTo='/gpa' txt='Un-Weighted GPA'/>
        <Notice>Warning: This calc will give an estimate that may be off by A LOT of points. If you want a more exact calculation, use the Custom GPA calc.</Notice>
        <CalcForm onsubmit={this.handleSubmit} onchange={this.handleChange} itemData={itemData} helpData={helpData} submitText='Submit'/> 
        <Results>
          <GPAResultTxt desiredGPA={this.state.desiredGPA} gradeNeededEachClass={this.state.gradeNeededEachClass} usrSubmit={this.state.usrSubmit} weighted={false}/>
        </Results>
      </Calc>
    );
  }
}