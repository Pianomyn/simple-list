import React, { Component } from "react";
import "./AllLists.css";

class AllLists extends Component {
  state = {};

  renderClassName(listName) {
    let cName = "btn btn-";

    listName === this.props.currentlySelected
      ? (cName += "light")
      : (cName += "dark");

    cName += " sideBarList";
    return cName;
  }

  renderListNames() {
    if (this.props.lists.length === 0)
      return <p>There are currently no lists!</p>;

    return (
      <div className="list-group">
        {this.props.lists.map((list) => (
          <div key={list} className="inLine">
            <button
              onClick={() => this.props.onDeleteList(list)}
              className=" btn btn-danger deleteListButton"
            >
              X
            </button>
            <button
              onClick={() => {
                this.props.onClickedList(list);
              }}
              className={this.renderClassName(list)}
              style={{ "box-shadow": "none" }}
            >
              {list}
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
