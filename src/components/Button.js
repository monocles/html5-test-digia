import React, { Component } from "react";
import "./button.css";
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className={"btn-" + this.props.style}>
        {this.props.children}
      </button>
    );
  }
}
