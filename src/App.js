import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";

class App extends Component {
  state = { lists: ["Reminders", "Daily"] };

  handleAddList() {}

  render() {
    return (
      <div>
        <Sidebar lists={this.state.lists} onAddList={() => this.handleAddList()} />
      </div>
    );
  }
}

export default App;
