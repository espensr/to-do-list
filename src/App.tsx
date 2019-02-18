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
      hobbyAdded : false
    };
  }
  

  changeInput(event: any) {
    this.setState({
      hobbyInput : event.target.value
    })
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
        return (<li 
                key={index}
                onClick = { () => {this.removeHobby(hobby)} }
                style = {listStyle}
                >
                {index}
                <span>
                {hobby}
                </span>
                </li>)
      }
    );

    let hobbyUpdate = <p>Add some hobbies!</p>;
    if (this.state.hobbyAdded) { 
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
        onChange = {this.changeInput.bind(this)}>
        </input>
        <button onClick = {this.addHobby.bind(this)}>Add Hobby</button>
        <ul>
          {listElements}
        </ul>
      </div>
    );
  }
}

export default App;
