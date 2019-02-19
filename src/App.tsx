import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hobbies : [],
      hobbyInput : "",
      hobbyRemoved : false,
      hobbyAdded : false,
      inputLength: "number",
      inputApproved: true
    };
  }
  

  changeInput(event: any) {
    const input = event.target.value;
    const length = input.length;
    this.setState({
      hobbyInput : input,
      inputLength: length
    })
  }

  handleKeyPress = (event: any) => {
    if(event.key == 'Enter') {
      this.checkLength();
    }
  }

  checkLength() {
    if (this.state.inputLength <= 20) {
      this.addHobby();
      this.setState({
        inputApproved: true
      })
    } else {
      this.setState({
        inputApproved: false
      })  
    }
  }

  addHobby() {
    const oldHobbies = this.state.hobbies;
    this.setState({
      hobbies : oldHobbies.concat(this.state.hobbyInput),
      hobbyAdded : true,
      hobbyRemoved : false
    })
  }

  removeHobby(hobby: number) {
    const oldHobbies = this.state.hobbies;
    const position = oldHobbies.indexOf(hobby);
    this.setState({
      hobbies : oldHobbies.filter(
        (el: number, index: number) => { return index !== position}
      ),
      hobbyRemoved : true, 
      hobbyAdded : false
    });
  }

  render() {
    let listElements = this.state.hobbies.map(
      (hobby: number, index: number) => {
        let listStyle = {
          backgroundColor: index % 2 == 0 ? "#dedede" : "#cdcdcd"
        };
        let newIndex = index + 1;
        let liNumber = index < 9 ? '0'+newIndex.toString() : newIndex.toString();
        return (<li 
                key={index}
                > 
                <span className = "liIndex">
                {liNumber}
                </span>
                <span className = "liContent" style = {listStyle}>
                {hobby}
                </span>
                <span className = "liInfo" onClick = { () => {this.removeHobby(hobby)} }>delete</span>
                </li>)
      }
    );

    let hobbyUpdate = <p>Add some hobbies!</p>;
    if (!this.state.inputApproved) {
      hobbyUpdate = <p style = {{color:"red"}}>Hobby is too long!</p>;
    } else if (this.state.hobbyAdded) { 
      hobbyUpdate = <p style = {{color:"green"}}>Hobby Added!</p>;
    } else if (this.state.hobbyRemoved) { 
      hobbyUpdate = <p style = {{color:"red"}}>Hobby Deleted!</p>;
    }

    let hobbyCounter = <p>Hobby Count: {this.state.hobbies.length}</p>;

      return (
      <div>
        <h1>My Hobbies</h1>
        {hobbyUpdate}
        {hobbyCounter}
        <input 
        type="text"
        value = {this.state.hobbyInput}
        onChange = {this.changeInput.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}>
        </input>
        <button id = "addHobby" onClick = {this.checkLength.bind(this)}>Add Hobby</button>
        <ul>
          {listElements}
        </ul>
      </div>
    );
  }
}

export default App;
