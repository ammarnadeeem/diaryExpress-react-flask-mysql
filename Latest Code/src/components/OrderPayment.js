import React, { Component } from "react";
import { toast } from "react-toastify";
import { PlaceCustomerOrder } from "./UserFunctions";

class OrderPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: "",
      cardNumber: "",
      expiryDate: "",
      cvCode: "",
      payPalEmail: "",
      payPalPassword: "",
    };
  }

  handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === "cardNumber") this.setState({ cardNumber: value });
    else if (id === "expiryDate") this.setState({ expiryDate: value });
    else if (id === "cvCode") this.setState({ cvCode: value });
    else if (id === "paymentOption") this.setState({ paymentOption: value });
    else if (id === "payPalEmail") this.setState({ payPalEmail: value });
    else if (id === "payPalPassword") this.setState({ payPalPassword: value });
  };

  handlePlaceOrder = async (e) => {
    e.preventDefault();

    const customerOrder = this.props.location.state.customerOrder;

    var response = await PlaceCustomerOrder(customerOrder);

    if (response !== "Failed") {
      toast.success("Order Placed Successfully");
      this.props.history.push("/Order");
    } else toast.success("Unable to place order");
  };

  renderCardInputs = () => {
    if (this.state.paymentOption === "Credit Card") {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <div className="input-group">
              <input
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                placeholder="Valid Card Number"
                required
                autoFocus
                value={this.state.cardNumber}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-7 col-md-7">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <div className="col-xs-6 col-lg-6 pl-ziro">
                  <input
                    className="form-control"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                    value={this.state.expiryDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-5 col-md-5 pull-right">
              <div className="form-group">
                <label htmlFor="cvCode">CV Code</label>
                <input
                  className="form-control"
                  id="cvCode"
                  name="cvCode"
                  placeholder="CV"
                  required
                  value={this.state.cvCode}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.paymentOption === "PayPal") {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="payPalEmail">Email</label>
            <div className="input-group">
              <input
                className="form-control"
                id="payPalEmail"
                name="payPalEmail"
                placeholder="PayPal Email"
                required
                autoFocus
                value={this.state.payPalEmail}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="payPalPassword">Password</label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="payPalPassword"
                name="payPalPassword"
                placeholder="PayPal Password"
                required
                value={this.state.payPalPassword}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      );
    } else return <div></div>;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <br />
                <h3 className="panel-title">Payment Details</h3>
              </div>
              <br />
              <div className="panel-body">
                <form onSubmit={this.handlePlaceOrder}>
                  <div className="form-group">
                    <label htmlFor="paymentOption">Payment Option</label>
                    <select
                      id="paymentOption"
                      name="paymentOption"
                      className="form-control"
                      value={this.state.paymentOption}
                      onChange={this.handleChange}
                      required
                    >
                      <option key="1"></option>
                      <option key="2">Credit Card</option>
                      <option key="3">PayPal</option>
                    </select>
                  </div>
                  {this.renderCardInputs()}
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderPayment;
