import React, { Component } from "react";
import { GetAllCustomers, DeleteCustomer } from "./UserFunctions";
import { toast } from "react-toastify";

class AllCustomers extends Component {
  constructor() {
    super();
    this.state = {
      customers: null,
    };
  }

  componentDidMount = async () => {
    var response = await GetAllCustomers();

    if (response !== "Failed") this.setState({ customers: response });
    else toast.error("Unable to get customers data");
  };

  handleGetOrders = (email) => {
    localStorage.setItem("selectedCustomerForOrders", email); // Created a global variable to store customer for getting orders of that customer
    this.props.history.push("/CustomerOrders");
  };

  handleDeleteCustomer = async (email) => {
    var response = await DeleteCustomer(email);
    if (response !== "Failed") {
      window.location.reload(false); // reload page
    } else toast.error("Unable to delete customer");
  };

  renderTableData() {
    if (this.state.customers === null) return;

    return this.state.customers.map((customer) => {
      const { first_name, last_name, email } = customer; //destructuring
      return (
        <tr key={email}>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{email}</td>
          <td>
            <button
              className="btn btn-info btn-sm"
              onClick={() => this.handleGetOrders(email)}
            >
              View Orders
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.handleDeleteCustomer(email)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h1>Customers</h1>
        <br />
        <table className="table" id="customers">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default AllCustomers;
