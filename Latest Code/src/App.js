import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AdminPortal from "./components/AdminPortal";
import AdminRegister from "./components/AdminRegister";
import AdminDeactivate from "./components/AdminDeactivate";
import AllCustomers from "./components/AllCustomers";
import CustomerOrders from "./components/CustomerOrders";
import Order from "./components/Order";
import OrderPayment from "./components/OrderPayment";
import CustomersReport from "./components/CustomersReport";
import AboutUs from "./components/AboutUs";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ToastContainer />
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Switch>
              <Route path="/Register" component={Register} />
              <Route path="/Login" component={Login} />
              <Route path="/Profile" component={Profile} />
              <Route path="/AdminLogin" component={AdminLogin} />
              <Route path="/AdminPortal" component={AdminPortal} />
              <Route path="/AdminRegister" component={AdminRegister} />
              <Route path="/AdminDeactivate" component={AdminDeactivate} />
              <Route path="/GetAllCustomers" component={AllCustomers} />
              <Route path="/Order" component={Order} />
              <Route path="/OrderPayment" component={OrderPayment} />
              <Route path="/AboutUs" component={AboutUs} />
              <Route path="/CustomerOrders" component={CustomerOrders} />
              <Route path="/CustomersReport" component={CustomersReport} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
