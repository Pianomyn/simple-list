import React, { Component } from "react";
import "./AddList.css";

class AddList extends Component {
  state = { listName: "" };

  handleChange = (event) => {
    this.setState({ listName: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.props.onAddList(this.state.listName);
      this.setState({
        listName: "",
      });
    }
  };

  handleClick = () => {
    this.props.onAddList(this.state.listName);
    this.setState({
      listName: "",
    });
  };

  render() {
    return (
      <div className="inLine">
        <button
          onClick={this.handleClick}
          className="btn btn-primary addButton"
        >
          ✓
        </button>
        <input
          value={this.state.listName}
          type="text"
          placeholder="Type list name here"
          onChange={(c) => this.handleChange(c)}
          onKeyPress={this.handleKeyPress}
          className="textBox"
        ></input>
      </div>
    );
  }
}

export default AddList;
