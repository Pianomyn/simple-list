import React, { Component } from "react";
import "./AddReminder.css";

class AddReminder extends Component {
  state = { reminderName: "" };

  handleChange = (event) => {
    this.setState({ reminderName: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.props.onAddReminder(this.state.reminderName);
      this.setState({
        reminderName: "",
      });
    }
  };

  handleClick = () => {
    this.props.onAddReminder(this.state.reminderName);
    this.setState({
      reminderName: "",
    });
  };

  render() {
    return (
      <div className="inLine">
        <button
          onClick={this.handleClick}
          className="btn btn-primary addButton deleteButton"
        >
          ✓
        </button>
        <input
          value={this.state.reminderName}
          type="text"
          placeholder="Type reminder here"
          onChange={(c) => this.handleChange(c)}
          onKeyPress={this.handleKeyPress}
          className="inputBox"
        ></input>
      </div>
    );
  }
}

export default AddReminder;
