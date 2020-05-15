import React, { Component } from "react";
import { toast } from "react-toastify";
import { GetCustomerOrders, RemoveCustomerOrderComment } from "./UserFunctions";

class CustomerOrders extends Component {
  constructor() {
    super();
    this.state = {
      customer_email: localStorage.selectedCustomerForOrders,
      orders: null,
    };
  }

  componentDidMount = async () => {
    var response = await GetCustomerOrders(this.state.customer_email);

    if (response !== "Failed") {
      this.setState({ orders: response });
    } else toast.error("Unable to load customer orders");
  };

  handleRemoveCustomerOrderComment = async (id, email) => {
    var order = { id: id, email: email };

    var response = await RemoveCustomerOrderComment(order);

    // reload the page
    if (response !== "Failed") window.location.reload(false);
    else toast.error("Delete comment failed");
  };

  renderTableData() {
    if (this.state.orders === null) return;

    return this.state.orders.map((orders) => {
      const {
        Id,
        PaperColor,
        PaperType,
        CoverColor,
        CoverText,
        OrderDate,
        DeliveryOption,
        Comments,
        email,
      } = orders; //destructuring

      const htmltext = (
        <tr key={Id}>
          <td>{Id}</td>
          <td>{PaperColor}</td>
          <td>{PaperType}</td>
          <td>{CoverColor}</td>
          <td>{CoverText}</td>
          <td>{OrderDate}</td>
          <td>{DeliveryOption}</td>
          <td>{Comments}</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.handleRemoveCustomerOrderComment(Id, email)}
            >
              Remove Comment
            </button>
          </td>
        </tr>
      );

      return htmltext;
    });
  }

  render() {
    return (
      <div>
        <div className="panel-heading">
          <br />
          <h1>Orders</h1>
        </div>
        <br />
        <table className="table" id="customers">
          <thead>
            <tr>
              <th>Order ID</th>
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
      </div>
    );
  }
}

export default CustomerOrders;
