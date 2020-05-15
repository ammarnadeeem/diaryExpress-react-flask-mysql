import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { UpdateParameters, GetParameters } from "./UserFunctions";

class AdminPortal extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      errors: {},
      paper_color1_availability: "0",
      paper_color1_text: "Blue",
      paper_color2_availability: "0",
      paper_color2_text: "Yellow",
      paper_color3_availability: "0",
      paper_color3_text: "Orange",
      paper_type1_availability: "0",
      paper_type1_text: "Plain",
      paper_type2_availability: "0",
      paper_type2_text: "Dotted",
      paper_type3_availability: "0",
      paper_type3_text: "Lined",
      cover_color1_availability: "0",
      cover_color1_text: "Red",
      cover_color2_availability: "0",
      cover_color2_text: "Green",
      cover_color3_availability: "0",
      cover_color3_text: "Black",
      cover_text_availability: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      first_name: decoded.identity.first_name,
      last_name: decoded.identity.last_name,
      email: decoded.identity.email,
    });

    this.initializeCustomizationParameters();
  }

  initializeCustomizationParameters = async () => {
    var res = await GetParameters();

    if (res !== "Failed") {
      this.setState({
        paper_color1_availability: res.paper_color1_availability,
        paper_color2_availability: res.paper_color2_availability,
        paper_color3_availability: res.paper_color3_availability,
        paper_type1_availability: res.paper_type1_availability,
        paper_type2_availability: res.paper_type2_availability,
        paper_type3_availability: res.paper_type3_availability,
        cover_color1_availability: res.paper_color1_availability,
        cover_color2_availability: res.paper_color2_availability,
        cover_color3_availability: res.paper_color3_availability,
        cover_text_availability: res.cover_text_availability,
      });
    } else toast.error("Unable to get customization parameters");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdateParameters = async (e) => {
    e.preventDefault();

    const customizationParameters = {
      paper_color1_availability: this.state.paper_color1_availability,
      paper_color1_text: this.state.paper_color1_text,
      paper_color2_availability: this.state.paper_color2_availability,
      paper_color2_text: this.state.paper_color2_text,
      paper_color3_availability: this.state.paper_color3_availability,
      paper_color3_text: this.state.paper_color3_text,

      paper_type1_availability: this.state.paper_type1_availability,
      paper_type1_text: this.state.paper_type1_text,
      paper_type2_availability: this.state.paper_type2_availability,
      paper_type2_text: this.state.paper_type2_text,
      paper_type3_availability: this.state.paper_type3_availability,
      paper_type3_text: this.state.paper_type3_text,

      cover_color1_availability: this.state.cover_color1_availability,
      cover_color1_text: this.state.cover_color1_text,
      cover_color2_availability: this.state.cover_color2_availability,
      cover_color2_text: this.state.cover_color2_text,
      cover_color3_availability: this.state.cover_color3_availability,
      cover_color3_text: this.state.cover_color3_text,

      cover_text: this.state.cover_text_availability,
    };

    var response = await UpdateParameters(customizationParameters);

    if (response !== "Failed") {
      toast.success("Update successful");
    } else toast.error("Update failed");
  };

  // Method to change availability of Customization Parameter 1
  handleToggleParameterAvailability = (parameter) => {
    if (parameter === "PaperColor1")
      this.setState({
        paper_color1_availability:
          this.state.paper_color1_availability === "0" ? "1" : "0",
      });

    if (parameter === "PaperColor2")
      this.setState({
        paper_color2_availability:
          this.state.paper_color2_availability === "0" ? "1" : "0",
      });

    if (parameter === "PaperColor3")
      this.setState({
        paper_color3_availability:
          this.state.paper_color3_availability === "0" ? "1" : "0",
      });

    if (parameter === "PaperType1")
      this.setState({
        paper_type1_availability:
          this.state.paper_type1_availability === "0" ? "1" : "0",
      });

    if (parameter === "PaperType2")
      this.setState({
        paper_type2_availability:
          this.state.paper_type2_availability === "0" ? "1" : "0",
      });

    if (parameter === "PaperType3")
      this.setState({
        paper_type3_availability:
          this.state.paper_type3_availability === "0" ? "1" : "0",
      });

    if (parameter === "CoverColor1")
      this.setState({
        cover_color1_availability:
          this.state.cover_color1_availability === "0" ? "1" : "0",
      });

    if (parameter === "CoverColor2")
      this.setState({
        cover_color2_availability:
          this.state.cover_color2_availability === "0" ? "1" : "0",
      });

    if (parameter === "CoverColor3")
      this.setState({
        cover_color3_availability:
          this.state.cover_color3_availability === "0" ? "1" : "0",
      });

    if (parameter === "CoverText")
      this.setState({
        cover_text_availability:
          this.state.cover_text_availability === "0" ? "1" : "0",
      });
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Admin Portal</h1>
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

          <br />
          <div className="panel-heading">
            <br />
            <h3 className="panel-title">Edit Customization Parameters</h3>
          </div>
          <br />

          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr key="PaperColor">
                <td>Paper Color</td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperColor1")
                    }
                    className={this.getButtonClass("PaperColor1")}
                  >
                    {this.state.paper_color1_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperColor2")
                    }
                    className={this.getButtonClass("PaperColor2")}
                  >
                    {this.state.paper_color2_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperColor3")
                    }
                    className={this.getButtonClass("PaperColor3")}
                  >
                    {this.state.paper_color3_text}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Paper Type</td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperType1")
                    }
                    className={this.getButtonClass("PaperType1")}
                  >
                    {this.state.paper_type1_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperType2")
                    }
                    className={this.getButtonClass("PaperType2")}
                  >
                    {this.state.paper_type2_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("PaperType3")
                    }
                    className={this.getButtonClass("PaperType3")}
                  >
                    {this.state.paper_type3_text}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Cover Color</td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("CoverColor1")
                    }
                    className={this.getButtonClass("CoverColor1")}
                  >
                    {this.state.cover_color1_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("CoverColor2")
                    }
                    className={this.getButtonClass("CoverColor2")}
                  >
                    {this.state.cover_color2_text}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("CoverColor3")
                    }
                    className={this.getButtonClass("CoverColor3")}
                  >
                    {this.state.cover_color3_text}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Cover Text</td>
                <td>
                  <button
                    onClick={() =>
                      this.handleToggleParameterAvailability("CoverText")
                    }
                    className={this.getButtonClass("CoverText")}
                  >
                    Cover Text
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    onClick={this.handleUpdateParameters}
                    className="btn m-2 badge-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  getButtonClass = (parameter) => {
    let classes = "btn m-2 badge-";

    if (parameter === "PaperColor1")
      classes +=
        this.state.paper_color1_availability === "0" ? "danger" : "success";

    if (parameter === "PaperColor2")
      classes +=
        this.state.paper_color2_availability === "0" ? "danger" : "success";

    if (parameter === "PaperColor3")
      classes +=
        this.state.paper_color3_availability === "0" ? "danger" : "success";

    if (parameter === "PaperType1")
      classes +=
        this.state.paper_type1_availability === "0" ? "danger" : "success";

    if (parameter === "PaperType2")
      classes +=
        this.state.paper_type2_availability === "0" ? "danger" : "success";

    if (parameter === "PaperType3")
      classes +=
        this.state.paper_type3_availability === "0" ? "danger" : "success";

    if (parameter === "CoverColor1")
      classes +=
        this.state.cover_color1_availability === "0" ? "danger" : "success";

    if (parameter === "CoverColor2")
      classes +=
        this.state.cover_color2_availability === "0" ? "danger" : "success";

    if (parameter === "CoverColor3")
      classes +=
        this.state.cover_color3_availability === "0" ? "danger" : "success";

    if (parameter === "CoverText")
      classes +=
        this.state.cover_text_availability === "0" ? "danger" : "success";

    return classes;
  };
}

export default AdminPortal;
