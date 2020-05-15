import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      errors: {},
    };
  }

  // This method is invoked immetiately after a component is mounted.
  // In our case, this method will get the information of user from usertoken object (which is used as global variable)
  // and set the values of first_name, last_name and email in this component from the usertoken object
  componentDidMount() {
    const token = localStorage.usertoken;
    const { identity } = jwt_decode(token);
    this.setState({
      first_name: identity.first_name,
      last_name: identity.last_name,
      email: identity.email,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Customer Portal</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
