import React, { Component } from "react";
import Login from "./Login";
import Posts from "./Posts";
import AppBar from "./AppBar";
import Register from "./Register";
import Cookies from "js-cookie";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) || null,
      register: false
    };
  }

  handleSetUser = user => {
    this.setState({ user: user });
    let serializedUser = JSON.stringify(user);
    localStorage.setItem("user", serializedUser);
  };

  handleRegister = value => {
    this.setState({ register: value });
  };

  handleLogout = () => {
    this.setState({ user: null });
    localStorage.setItem("user", null);
  };

  render() {
    console.log(this.state.user);
    return (
      <div style={{ marginTop: "120px" }}>
        <AppBar user={this.state.user} logout={this.handleLogout} />
        {!this.state.user && !this.state.register ? (
          <Login
            handler={this.handleSetUser}
            handleRegister={this.handleRegister}
          />
        ) : this.state.register && !this.state.user ? (
          <Register handleRegister={this.handleRegister} />
        ) : (
          <Posts user={this.state.user} />
        )}
      </div>
    );
  }
}

export default Container;
