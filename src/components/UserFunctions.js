import axios from "axios"; // Axios is a light-weight Http client

// This method is used to post a customer register request using Axios (Http Client)
export const CustomerRegister = async (newCustomer) => {
  var { data } = await axios.post("Customer/Register", newCustomer);
  return data;
};

// This method is used to post a customer login request using Axios (Http Client)
export const CustomerLogin = async (customer) => {
  var { data } = await axios.post("Customer/Login", customer);

  if (data !== "Failed") {
    // Set the response of the request in usertoken object
    localStorage.setItem("usertoken", data); // Created a global variable called usertoken to store user information
    localStorage.setItem("isAdminLogin", ""); // Created a global variable called isAdminLogin which stores true if usertoken contains admin user information and false if it contains customer user information
  }
  return data;
};

// This method is used to post a admin register request using Axios (Http Client)
export const AdministratorRegister = async (newAdmin) => {
  var { data } = await axios.post("Admin/Register", newAdmin);
  return data;
};

// This method is used to post a admin login request using Axios (Http Client)
export const AdministrationLogin = async (admin) => {
  var { data } = await axios.post("Admin/Login", admin);

  if (data !== "Failed") {
    // Set the response of the request in usertoken object
    localStorage.setItem("usertoken", data); // Created a global variable called usertoken to store admin information
    localStorage.setItem("isAdminLogin", "yes"); // Created a global variable called isAdminLogin which stores true if usertoken contains admin user information and false if it contains customer user information
  }
  return data;
};

// This method is used to post a admin deactivate request using Axios (Http Client)
export const AdministratorDeactivate = async (email) => {
  var { data } = await axios.post("Admin/AdminDeactivate", { email: email });
  return data;
};

export const UpdateParameters = async (customizationParameters) => {
  var { data } = await axios.post(
    "CustomizationParameters/Update",
    customizationParameters
  );
  return data;
};

// This method is used to post a admin login request using Axios (Http Client)
export const GetParameters = async () => {
  var { data } = await axios.post("CustomizationParameters/Get", {});
  return data;
};

// This method is used to post a get all customers request using Axios (Http Client)
export const GetAllCustomers = async () => {
  var { data } = await axios.post("Admin/AllCustomers", {});
  return data;
};

// This method is used to post a get customer orders request using Axios (Http Client)
export const GetCustomerOrders = async (email) => {
  var { data } = await axios.post("Admin/GetCustomerOrders", {
    email: email,
  });
  return data;
};

// This method is used to post a get all customer orders request using Axios (Http Client)
export const GetAllCustomerOrders = async (reportType) => {
  var { data } = await axios.post("Admin/GetAllCustomerOrders", {
    reportType: reportType,
  });
  return data;
};

// This method is used to post a delete customer request using Axios (Http Client)
export const DeleteCustomer = async (email) => {
  var { data } = await axios.post("Admin/DeleteCustomer", {
    email: email,
  });
  return data;
};

// This method is used to post a delete customer request using Axios (Http Client)
export const RemoveCustomerOrderComment = async (order) => {
  var { data } = await axios.post("Admin/RemoveCustomerOrderComment", order);
  return data;
};

// This method is used to post a insert customer order request using Axios (Http Client)
export const PlaceCustomerOrder = async (order) => {
  var { data } = await axios.post("Admin/PlaceCustomerOrder", order);
  return data;
};
