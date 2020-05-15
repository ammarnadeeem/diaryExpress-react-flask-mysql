import React, { Component } from "react";
import { CustomerLogin } from "./UserFunctions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const customer = {
      email: this.state.email,
      password: this.state.password,
    };

    CustomerLogin(customer).then((res) => {
      if (res !== "Failed") {
        localStorage.setItem("selectedCustomerForOrders", this.state.email); // Created a global variable to store customer for getting orders of that customer
        this.props.history.push("/profile");
        toast.success("Customer login successful");
      } else toast.error("Customer login failed");
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Customer sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
              <div className="form-group">
                <label htmlFor="register">
                  Need An Account? <Link to="/register">Click here</Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
