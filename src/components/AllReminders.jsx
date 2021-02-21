import React, { Component } from "react";
import "./AllReminders.css";

class AllReminders extends Component {
  state = { reminders: [] };
  render() {
    return (
      <div className="listBox">
        <h1 className = 'listHeading'>{this.props.currentlySelected}</h1>
      </div>
    );
  }
}

export default AllReminders;
