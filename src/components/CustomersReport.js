import React, { Component } from "react";
import { GetAllCustomerOrders } from "./UserFunctions";
import { toast } from "react-toastify";

class CustomersReport extends Component {
  state = {
    selectedReportType: "",
    orders: null,
  };

  handleChange = (e) => {
    if (e.target.id === "reportType")
      this.setState({ selectedReportType: e.target.value });
  };

  handleGenerateReport = async (e) => {
    e.preventDefault();

    if (this.state.selectedReportType === "") {
      return;
    }

    var response = await GetAllCustomerOrders(this.state.selectedReportType);

    if (response !== "Failed") {
      this.setState({ orders: response });
    } else toast.error("Unable to load customer orders");
  };

  renderTableData() {
    return this.state.orders.map((orders) => {
      const {
        Id,
        first_name,
        last_name,
        email,
        PaperColor,
        PaperType,
        CoverColor,
        CoverText,
        OrderDate,
        DeliveryOption,
        Comments,
      } = orders; //destructuring

      const htmltext = (
        <tr key={Math.random()}>
          <td>{Id}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{email}</td>
          <td>{PaperColor}</td>
          <td>{PaperType}</td>
          <td>{CoverColor}</td>
          <td>{CoverText}</td>
          <td>{OrderDate}</td>
          <td>{DeliveryOption}</td>
          <td>{Comments}</td>
        </tr>
      );

      return htmltext;
    });
  }

  renderTable() {
    return (
      this.state.orders !== null && (
        <table className="table my-4" id="customers">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Paper Color</th>
              <th>Paper Type</th>
              <th>Cover Color</th>
              <th>Cover Text</th>
              <th>Order Date</th>
              <th>Delivery Option</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      )
    );
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-md-8 mt-12 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal text-center">
              Customers Report
            </h1>
            <form onSubmit={this.handleGenerateReport}>
              <div className="form-group">
                <br />
                <label htmlFor="reportType">Report Type</label>
                <select
                  id="reportType"
                  className="custom-select m-2"
                  value={this.state.selectedReportType}
                  onChange={this.handleChange}
                  required
                >
                  <option key="0"></option>
                  <option key="1">Monthly</option>
                  <option key="2">Weekly</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Generate Report
                </button>
              </div>
            </form>
          </div>
          <br />
          {this.renderTable()}
        </div>
      </div>
    );
  }
}

export default CustomersReport;
