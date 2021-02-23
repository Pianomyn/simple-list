import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import AllReminders from "./components/AllReminders";
import axios from "axios";

class App extends Component {
  state = {
    lists: [],
    currentlySelected: "A list hasn't been selected",
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

    var {listElements} = this.state;
    while(listElements.length !==0)
    {
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
      console.log('logging from handleclick method inside http request',listElements);
      this.setState({ listElements});
    });
    this.setState({ currentlySelected});
    
    
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
    console.log('logging from render',this.state.listElements);
    return (
      <div className="App">
        <Sidebar
          lists={this.state.lists}
          onClickedList={(listName) => this.handleClickedList(listName)}
          onAddList={(newName) => this.handleAddList(newName)}
          onDeleteList={(listName) => this.handleDeleteList(listName)}
        />
        <AllReminders currentlySelected={this.state.currentlySelected} listElements={this.state.listElements}/>
      </div>
    );
  }
}

export default App;
