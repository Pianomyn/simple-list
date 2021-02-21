import React, { Component } from "react";
import './App.css'
import Sidebar from "./components/Sidebar";
import AllReminders from "./components/AllReminders";
import axios from "axios";

class App extends Component {
  state = { lists: [], currentlySelected: "A list hasn't been selected" };

  componentDidMount() {
    axios.get("http://localhost:5000/initialise").then((res) => {
      console.log("logging res", res);
      var initialLists = this.state.lists;
      res.data.forEach((l) => {
        console.log(l.name);
        initialLists.push(l.name);
      });
      this.setState({ initialLists: this.state.lists });
    });
  }

  handleClickedList(listName) {
    console.log(listName)
    var { currentlySelected } = this.state;
    currentlySelected = listName;
    this.setState({ currentlySelected: currentlySelected });

    //Retrieve all list elements for this list title
    var config = {params: {
      listName: listName
    }}
    axios.get('http://localhost:5000/get_items', config).then((res) => {
      console.log("logging res", res)})
    
  }

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

    axios.post("/add_list", { newName: newName });
  }

  handleDeleteList(listName) {
    console.log("Delete List 1", listName);
    let lists = this.state.lists.filter((l) => l !== listName);
    this.setState({ lists: lists });

    axios.post("/delete_list", { listName: listName });
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          lists={this.state.lists}
          onClickedList={(listName) => this.handleClickedList(listName)}
          onAddList={(newName) => this.handleAddList(newName)}
          onDeleteList={(listName) => this.handleDeleteList(listName)}
        />
        <AllReminders currentlySelected={this.state.currentlySelected} />
      </div>
    );
  }
}

export default App;
