import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "react-bootstrap";
import logo from "./images/logo.png";

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
    toast.success("Logged out successfully");
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/AdminLogin" className="nav-link">
            Admin Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Login" className="nav-link">
            Customer Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/AboutUs" className="nav-link">
            About Us
          </NavLink>
        </li>
      </ul>
    );

    const customerLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/Profile" className="nav-link">
            Customer Portal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Order" className="nav-link">
            Place Order
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/CustomerOrders" className="nav-link">
            Transaction History
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    const adminLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/AdminPortal" className="nav-link">
            Admin Portal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/AdminRegister" className="nav-link">
            Add New Admin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/AdminDeactivate" className="nav-link">
            Deactivate an Admin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/GetAllCustomers" className="nav-link">
            Customers Information
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/CustomersReport" className="nav-link">
            Customers Report
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="150"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          {localStorage.usertoken
            ? localStorage.isAdminLogin
              ? adminLink
              : customerLink
            : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
