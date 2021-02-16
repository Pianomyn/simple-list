import React, { Component } from 'react';
import '../App.css';
import AllLists from './AllLists';
import AddList from './AddList';

class Sidebar extends Component {
    state = {  }
    render() { 
        return ( <div><h1> this is the sidebar</h1><AllLists/><AddList onAddList = {() => this.props.onAddList}/></div> );
    }
}

 
export default Sidebar;