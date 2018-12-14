import React, { Component } from "react";
import update from "immutability-helper";
import { id, properCase } from "../utils/utils";
import deleteIcon from "../delete.svg";
import editIcon from "../edit.svg";
import arrowIcon from "../arrow.svg";
import Form from "./Form";
import Button from "./Button";
import "./Participants.css";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newUser: {
        name: "",
        email: "",
        phone: ""
      },
      name: "",
      email: "",
      phone: "",
      currentID: null,
      isEdit: false,
      isAsc: true
    };
    this.sortByName = this.sortByName.bind(this);
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10&nat=us,dk,fr,gb,fi")
      .then(response => {
        return response.json();
      })
      .then(res => {
        res.results.map((item, i, arr) => {
          arr[i].name = item.name.first + " " + item.name.last;
          arr[i].id = id();
          return arr;
        });
        return res;
      })
      .then(res => this.setState({ data: res.results }));
  }

  handleClick(e, account) {
    this.setState({
      isEdit: true,
      name: account.name,
      email: account.email,
      phone: account.phone,
      currentID: account.id
    });
    this.scrollToMyRef();
  }

  handleRemove = account => {
    let { data } = this.state;
    let index = data.findIndex(({ id }) => id === account.id);
    this.setState({
      data: update(data, { $splice: [[index, 1]] })
    });
    this.handleCancel();
  };

  handleChange = (e, type) => {
    const name = e.target.name;
    const value = e.target.value;
    let { newUser } = this.state;
    if (type === "edit") {
      this.setState({
        newUser: update(newUser, {
          [name]: { $set: value }
        })
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleCancel = e => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      isEdit: false
    });
  };

  handleEdit = e => {
    console.log(e);
    e.preventDefault();
    let { email, name, phone, data, currentID } = this.state;
    let index = data.findIndex(({ id }) => id === currentID);
    this.setState({
      data: update(data, {
        [index]: {
          name: { $set: name },
          email: { $set: email },
          phone: { $set: phone }
        }
      })
    });
    this.handleCancel();
  };

  handleAddUser = () => {
    let { newUser, data } = this.state;
    let temp = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      id: id()
    };
    this.setState({
      data: update(data, {
        $unshift: [temp]
      }),
      newUser: {
        name: "",
        email: "",
        phone: ""
      }
    });
  };

  renderListHeader() {
    let { email, name, phone } = this.state.newUser;
    return (
      <div className="form-main">
        <Form
          name={name}
          email={email}
          phone={phone}
          onDataChange={e => this.handleChange(e, "edit")}
          onDataSubmit={e => this.handleAddUser(e)}
        >
          <Button style="default" type="submit">
            Add New
          </Button>
        </Form>
      </div>
    );
  }

  scrollToMyRef = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 1200,
        behavior: "smooth"
      });
    }, 100);
  };

  editForm() {
    let { isEdit, name, phone, email } = this.state;
    if (isEdit) {
      return (
        <div ref={this.myRef}>
          <Form
            name={name}
            email={email}
            phone={phone}
            onDataChange={e => this.handleChange(e, "create")}
            onDataSubmit={e => this.handleEdit(e)}
          >
            <Button style="main" type="submit">
              Save
            </Button>
            <Button style="default" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      );
    } else {
      return null;
    }
  }

  sortByName() {
    this.setState({
      isAsc: (this.state.isAsc = !this.state.isAsc)
    });
    if (this.state.isAsc) {
      this.setState({
        data: this.state.data.sort((a, b) => a.name.localeCompare(b.name))
      });
    } else {
      this.setState({
        data: this.state.data
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse()
      });
    }
  }

  renderList() {
    let { data, currentID } = this.state;
    return data.map((account, index) => {
      let { phone, name, email, id } = account;
      return (
        <tr key={index} className="list-item">
          <td>
            <span>{properCase(name)}</span>
          </td>
          <td>
            <span>{email}</span>
          </td>
          <td>
            <span>{phone}</span>
          </td>
          <td>
            <span className="table__edit">
              <img
                src={editIcon}
                alt="edit"
                onClick={e => this.handleClick(e, account)}
                className="edit__icon"
              />
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => this.handleRemove(account)}
                className="edit__icon"
              />
            </span>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        {this.renderListHeader()}
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span>Name</span>
                  <img
                    src={arrowIcon}
                    alt="edit"
                    onClick={this.sortByName}
                    className={
                      this.state.isAsc ? "edit__icon--down" : "edit__icon--up"
                    }
                  />
                </th>
                <th>
                  <span>E-mail address</span>
                </th>
                <th>
                  <span>Phone number</span>
                </th>
                <th width="100px" />
              </tr>
            </thead>
            <tbody className="table-wrapper">{this.renderList()}</tbody>
          </table>
        </div>
        {this.editForm()}
      </div>
    );
  }
}
