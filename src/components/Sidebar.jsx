import React, { Component } from "react";
import "./Sidebar.css";
import AllLists from "./AllLists";
import AddList from "./AddList";

class Sidebar extends Component {

  render() {
    return (
      <div className = "sideBarBox">
        <AllLists lists={this.props.lists} onDeleteList={(listName) => this.props.onDeleteList(listName)}/>
        <AddList onAddList={(newName) => this.props.onAddList(newName)} />
      </div>
    );
  }
}

export default Sidebar;
