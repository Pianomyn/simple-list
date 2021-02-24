import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import AllReminders from "./components/AllReminders";
import axios from "axios";

class App extends Component {
  state = {
    lists: [],
    currentlySelected: "",
    listElements: [],
  };

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
    console.log(listName);
    var { currentlySelected } = this.state;
    currentlySelected = listName;

    var { listElements } = this.state;
    while (listElements.length !== 0) {
      listElements.pop();
    }

    var config = {
      params: {
        listName: listName,
      },
    };

    axios.get("http://localhost:5000/get_items", config).then((res) => {
      console.log("logging res", res);
      res.data.forEach((l) => {
        listElements.push(l.list_item);
      });
      console.log(
        "logging from handleclick method inside http request",
        listElements
      );
      this.setState({ listElements });
    });
    this.setState({ currentlySelected });
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
    var {currentlySelected} = this.state;
    var {listElements} = this.state;
    currentlySelected = ""
    listElements = [];
    var lists = this.state.lists.filter((l) => l !== listName);
    this.setState({ lists: lists });
    this.setState({currentlySelected})
    this.setState({listElements})
    axios.post("/delete_list", { listName: listName });
  }

  handleAddReminder(reminderName) {
    if (reminderName === "") {
      console.log("A reminder cannot be empty");
      return;
    }
    var { listElements } = this.state;

    listElements
      .map((l) => l.toLowerCase())
      .includes(reminderName.toLowerCase())
      ? console.log("A list with this name already exists")
      : listElements.push(reminderName);
    //var config = {}
    this.setState({ listElements });
    axios.post("/add_reminder", {
      listName: this.state.currentlySelected,
      reminderName: reminderName,
    });
  }

  handleDeleteReminder(reminderName) {
    var listElements = this.state.listElements.filter((r) => r !== reminderName)
    this.setState({ listElements });

    axios.post("/delete_reminder", { listName:this.state.currentlySelected,reminderName: reminderName });
  }

  render() {
    console.log("logging from render", this.state.listElements);
    return (
      <div className="App">
        <Sidebar
          currentlySelected = {this.state.currentlySelected}
          lists={this.state.lists}
          onClickedList={(listName) => this.handleClickedList(listName)}
          onAddList={(newName) => this.handleAddList(newName)}
          onDeleteList={(listName) => this.handleDeleteList(listName)}
        />
        <AllReminders
          currentlySelected={this.state.currentlySelected}
          listElements={this.state.listElements}
          onAddReminder={(reminderName) => this.handleAddReminder(reminderName)}
          onDeleteReminder={(reminderName) =>
            this.handleDeleteReminder(reminderName)
          }
        />
      </div>
    );
  }
}

export default App;
