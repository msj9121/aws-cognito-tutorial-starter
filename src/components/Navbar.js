import React, { Component } from "react";
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
  _handleLogOut = event => {
    const { _setAuthStatus, _setUser } = this.props.auth;
    event.preventDefault();
    try {
      Auth.signOut();
      _setAuthStatus(true);
      _setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src="hexal-logo.png"
              width="112"
              height="28"
              alt="hexal logo"
            />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isAuthenticated && user ? (
                <div className="logout">
                  <div className="user">Hello! {user}</div>
                  <div className="button is-light btn-logout" onClick={this._handleLogOut}>Logout</div>
                </div>
              ) : (
                <div className="buttons">
                  <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
