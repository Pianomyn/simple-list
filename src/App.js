import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import DB from "./db";

class App extends Component {
  state = { lists: [] };

  handleAddList(newName) {
    console.log(newName);
    if (newName === "") {
      console.log("A list must have a name");
      return;
    }
    const { lists } = this.state;
    lists.map((l) => l.toLowerCase()).includes(newName.toLowerCase())
      ? console.log("A list with this name already exists")
      : lists.push(newName);
    this.setState({ lists: lists });
  }

  handleDeleteList(listName) {
    console.log("Delete List 1", listName);
    let lists = this.state.lists.filter((l) => l !== listName);
    this.setState({ lists: lists });
  }

  render() {
    const db = new DB();
    //db.connect();
    //db.getListNames();
    


    return (
      <div className="App">
        <Sidebar
          lists={this.state.lists}
          onAddList={(newName) => this.handleAddList(newName)}
          onDeleteList={(listName) => this.handleDeleteList(listName)}
        />
      </div>
    );
  }
}

export default App;
