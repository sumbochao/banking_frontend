import URL from './URL';


const API = {
  // authentication
  // customer
  LOGIN: `${URL}/auth/login`,
  // employee
  LOGIN_EMPLOYEE: `${URL}/auth/admin-login`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
  // get all account
  GET_ALL_ACCOUNT: `${URL}/payments/all`,


  // Transaction history
  // customer
  CUSTOMER_TRANSACTION: `${URL}/customers/history`,
  // employee + admin : one
  TRANSACTION_HISTORY: `${URL}/employees/history/customer`,
  // admin : all

  // admin (foreign)

};

export default API;
