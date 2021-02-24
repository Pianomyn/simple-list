import React, { Component } from "react";
import "./Sidebar.css";
import AllLists from "./AllLists";
import AddList from "./AddList";

class Sidebar extends Component {

  render() {
    return (
      <div className = "sideBarBox">
        <AllLists currentlySelected = {this.props.currentlySelected} lists={this.props.lists} onDeleteList={(listName) => this.props.onDeleteList(listName)} onClickedList = {(listName) => this.props.onClickedList(listName)}/>
        <AddList onAddList={(newName) => this.props.onAddList(newName)} />
      </div>
    );
  }
}

export default Sidebar;
