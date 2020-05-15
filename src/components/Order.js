import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { GetParameters } from "./UserFunctions";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      coverText: "",
      paperColors: [""],
      paperTypes: [""],
      coverColors: [""],
      deliveryOption: ["", "Standard", "Express"],

      selectedCoverText: "",
      selectedPaperColor: "",
      selectedPaperType: "",
      selectedCoverColor: "",
      selectedDeliveryOption: "",
      comments: "",

      paperColor1Availability: "",
      paperColor2Availability: "",
      paperColor3Availability: "",
      paperType1Availability: "",
      paperType2Availability: "",
      paperType3Availability: "",
      coverColor1Availability: "",
      coverColor2Availability: "",
      coverColor3Availability: "",
      coverTextAvailability: "",
    };
  }

  componentDidMount() {
    this.initializeCustomizationParameters();
  }

  initializeCustomizationParameters = () => {
    GetParameters().then((res) => {
      this.setState({
        paperColor1Availability: res.paper_color1_availability,
      });
      this.setState({
        paperColor2Availability: res.paper_color2_availability,
      });
      this.setState({
        paperColor3Availability: res.paper_color3_availability,
      });
      this.setState({
        paperType1Availability: res.paper_type1_availability,
      });
      this.setState({
        paperType2Availability: res.paper_type2_availability,
      });
      this.setState({
        paperType3Availability: res.paper_type3_availability,
      });
      this.setState({
        coverColor1Availability: res.paper_color1_availability,
      });
      this.setState({
        coverColor2Availability: res.paper_color2_availability,
      });
      this.setState({
        coverColor3Availability: res.paper_color3_availability,
      });
      this.setState({
        coverTextAvailability: res.cover_text_availability,
      });

      if (res.paper_color1_availability === "1")
        this.setState({
          paperColors: this.state.paperColors.concat("Blue"),
        });

      if (res.paper_color2_availability === "1")
        this.setState({
          paperColors: this.state.paperColors.concat("Yellow"),
        });

      if (res.paper_color3_availability === "1")
        this.setState({
          paperColors: this.state.paperColors.concat("Orange"),
        });

      if (res.paper_type1_availability === "1")
        this.setState({
          paperTypes: this.state.paperTypes.concat("Plain"),
        });

      if (res.paper_type2_availability === "1")
        this.setState({
          paperTypes: this.state.paperTypes.concat("Dotted"),
        });

      if (res.paper_type3_availability === "1")
        this.setState({
          paperTypes: this.state.paperTypes.concat("Lined"),
        });

      if (res.cover_color1_availability === "1")
        this.setState({
          coverColors: this.state.coverColors.concat("Red"),
        });

      if (res.cover_color2_availability === "1")
        this.setState({
          coverColors: this.state.coverColors.concat("Green"),
        });

      if (res.cover_color3_availability === "1")
        this.setState({
          coverColors: this.state.coverColors.concat("Black"),
        });
    });
  };

  handleChange = (e) => {
    if (e.target.id === "coverText" || e.target.id === "comments")
      this.setState({ [e.target.name]: e.target.value });

    if (e.target.id === "paperColor")
      this.setState({ selectedPaperColor: e.target.value });

    if (e.target.id === "paperType")
      this.setState({ selectedPaperType: e.target.value });

    if (e.target.id === "coverColor")
      this.setState({ selectedCoverColor: e.target.value });

    if (e.target.id === "deliveryOption")
      this.setState({ selectedDeliveryOption: e.target.value });

    if (e.target.id === "comments") this.setState({ comments: e.target.value });
  };

  handleProceedToPayment = (e) => {
    e.preventDefault();

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    let customerEmail = decoded.identity.email;

    const customerOrder = {
      email: customerEmail,
      coverText: this.state.selectedCoverText,
      paperColor: this.state.selectedPaperColor,
      paperType: this.state.selectedPaperType,
      coverColor: this.state.selectedCoverColor,
      deliveryOption: this.state.selectedDeliveryOption,
      comments: this.state.comments,
    };

    this.props.history.push({
      pathname: "/OrderPayment",
      state: { customerOrder: customerOrder },
    });
  };

  renderCoverText() {
    if (this.state.coverTextAvailability === "1") {
      return (
        <div>
          <label htmlFor="coverText">Cover Text</label>
          <input
            id="coverText"
            name="coverText"
            className="form-control m-2"
            value={this.state.coverText}
            onChange={this.handleChange}
          />
        </div>
      );
    } else return "";
  }

  renderPaperColorSelectOptions() {
    var returnValue = "";

    returnValue += (
      <option key={this.state.paperColors[0]}>
        {this.state.paperColors[0]}
      </option>
    );

    if (this.state.coverColor1Availability === "1")
      returnValue += (
        <option key={this.state.paperColors[1]}>
          {this.state.paperColors[1]}
        </option>
      );

    if (this.state.coverColor2Availability === "1")
      returnValue += (
        <option key={this.state.paperColors[2]}>
          {this.state.paperColors[2]}
        </option>
      );

    if (this.state.coverColor3Availability === "1")
      returnValue += (
        <option key={this.state.paperColors[3]}>
          {this.state.paperColors[3]}
        </option>
      );

    return returnValue;
  }

  render() {
    return (
      <div>
        <br />
        <h1>Place an Order</h1>
        <form onSubmit={this.handleProceedToPayment}>
          <div className="form-group">
            <br />
            {this.renderCoverText()}
            <label htmlFor="paperColor">Paper Color</label>
            <select
              id="paperColor"
              className="custom-select m-2"
              value={this.state.selectedPaperColor}
              onChange={this.handleChange}
              required
            >
              {this.state.paperColors.map((color) => (
                <option key={color}>{color}</option>
              ))}
              ;
            </select>
            <label htmlFor="paperType">Paper Type</label>
            <select
              id="paperType"
              className="custom-select m-2"
              value={this.state.selectedPaperType}
              onChange={this.handleChange}
              required
            >
              {this.state.paperTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
              ;
            </select>
            <label htmlFor="coverColor">Cover Color</label>
            <select
              id="coverColor"
              className="custom-select m-2"
              value={this.state.selectedCoverColor}
              onChange={this.handleChange}
              required
            >
              {this.state.coverColors.map((color) => (
                <option key={color}>{color}</option>
              ))}
              ;
            </select>
            <label htmlFor="deliveryOption">Delivery Option</label>
            <select
              id="deliveryOption"
              className="custom-select m-2"
              value={this.state.selectedDeliveryOption}
              onChange={this.handleChange}
              required
            >
              {this.state.deliveryOption.map((option) => (
                <option key={option}>{option}</option>
              ))}
              ;
            </select>
            <label htmlFor="comments">Comments</label>
            <input
              id="comments"
              name="comments"
              className="form-control m-2"
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Proceed to Payment
          </button>
        </form>
      </div>
    );
  }
}

export default Order;
