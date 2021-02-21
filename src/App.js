import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import axios from 'axios'

class App extends Component {
  state = { lists: [] };

  componentDidMount()
  {
    axios.get('/initialise')
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

    //Need to add new list name to the database
    //this.postData(newName);
    axios.post('/add_list',{newName:newName})
      
    //fetch('http://localhost:5000/').then(response => { return response.text()}).then(data => console.log(data))
  }

  handleDeleteList(listName) {
    console.log("Delete List 1", listName);
    let lists = this.state.lists.filter((l) => l !== listName);
    this.setState({ lists: lists });

    axios.post('/delete_list', {listName:listName})
  }

  render() {

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
