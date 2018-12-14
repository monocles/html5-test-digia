import React, { Component } from "react";
import { ValidatorForm } from "react-form-validator-core";
import TextValidator from "./TextValidator";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onDataChange(e);
  }

  handleSubmit(e) {
    this.props.onDataSubmit(e);
  }

  render() {
    let { name, email, phone, type } = this.props;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        instantValidate="false"
        className="form"
      >
        <TextValidator
          className="form__section"
          onChange={e => this.handleChange(e)}
          name="name"
          instantValidate="false"
          placeholder="name"
          value={name}
          validators={["required", "isString"]}
          errorMessages={["this field is required", "name is not valid"]}
        />
        <TextValidator
          className="form__section"
          onChange={e => this.handleChange(e)}
          name="email"
          placeholder="email"
          instantValidate="false"
          value={email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <TextValidator
          className="form__section"
          onChange={e => this.handleChange(e)}
          name="phone"
          placeholder="phone"
          instantValidate="false"
          value={phone}
          validators={["required", "matchRegexp:^(?=.*[0-9])[- +()0-9]+$"]}
          errorMessages={["this field is required", "phone is not valid"]}
        />
        {this.props.children}
      </ValidatorForm>
    );
  }
}
