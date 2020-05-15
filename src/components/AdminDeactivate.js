import React, { Component } from "react";
import { toast } from "react-toastify";
import { AdministratorDeactivate } from "./UserFunctions";

class AdminDeactivate extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();

    var response = await AdministratorDeactivate(this.state.email);

    if (response !== "Failed") {
      toast.success("Admin deactivated successfully");
      this.props.history.push("/adminportal");
    } else toast.error("Admin deactivation failed");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Admin Deactivate</h1>
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
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Deactivate
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDeactivate;
