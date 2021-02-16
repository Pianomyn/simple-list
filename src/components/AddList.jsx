import React, { Component } from "react";
import '../App.css';

class AddList extends Component {
  state = {listName:"test"};

  handleInput(newName)
  {
    let {listName} = this.state;
    listName = newName;
    this.setState({listName:listName});
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Type list name here" onChange= {(c)=>this.handleInput(c)}></input>
        <button className="btn btn-success btn-lg" onClick = {() =>this.props.onAddList()}>Add</button>
      </div>
    );
  }
}

export default AddList;
