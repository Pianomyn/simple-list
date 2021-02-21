import React, { Component } from "react";
import "./AllLists.css";

class AllLists extends Component {
  state = {};

  renderListNames() {
    if (this.props.lists.length === 0)
      return <p>There are currently no lists!</p>;

    return (
      <div className="list-group ">
        {this.props.lists.map((list) => (
          <div key={list}>
            <button onClick={() => this.props.onClickedList(list)} className="sideBarList btn btn-dark">{list}</button>
            <button
              onClick={() => this.props.onDeleteList(list)}
              className="deleteButton btn btn-danger"
            >
              X
            </button>
            <br />
          </div>
        ))}
        <br />
      </div>
    );
  }

  render() {
    return <span>{this.renderListNames()}</span>;
  }
}

export default AllLists;
