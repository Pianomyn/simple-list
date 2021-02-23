import React, { Component } from "react";
import "./AllReminders.css";

class AllReminders extends Component {
  state = { reminders: [], previouslySelected: "" };
  render() {
    console.log('Logging from AllReminders',this.props.listElements)
    return (
      <div className="listBox">
        <h1 className = 'listHeading'>{this.props.currentlySelected}</h1>
        <div className="list-group">
        {this.props.listElements.map((list) => (
          <div key={list}>
            <button className="sideBarList btn btn-dark listElements">{list}</button>
            <button
              className="deleteButton btn btn-danger listElementsDelete"
            >
              X
            </button>
            <br />
          </div>
        ))}
        <br />
      </div>
      </div>
    );
  }
}

export default AllReminders;
