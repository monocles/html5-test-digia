import React, { Component } from "react";
import logo from "./logo.svg";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" className="header__logo" />
        <span className="header__name">Nord Software</span>
      </div>
    );
  }
}
