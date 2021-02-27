import React, { Component } from "react";
import "./AllReminders.css";
import AddReminder from "./AddReminder";

class AllReminders extends Component {
  state = { reminders: [], previouslySelected: "" };

  renderAddReminders() {
    if (this.props.currentlySelected !== "") {
      return (
        <AddReminder
          onAddReminder={(reminderName) => {
            this.props.onAddReminder(reminderName);
          }}
        ></AddReminder>
      );
    }
  }
  render() {
    return (
      <div className="listBox">
        <h1 className="listHeading">{this.props.currentlySelected}</h1>
        <div className="list-group">
          {this.props.listElements.map((reminder) => (
            <div key={reminder}>
              <button
                className="btn btn-danger listElementsDelete"
                onClick={() => this.props.onDeleteReminder(reminder)}
              >
                X
              </button>
              <button className="btn btn-dark listElements">{reminder}</button>
              
              <br />
            </div>
          ))}
          <br />
        </div>
        {this.renderAddReminders()}
      </div>
    );
  }
}

export default AllReminders;
