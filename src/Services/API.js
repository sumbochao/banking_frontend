import URL from './URL';


const API = {
  // authentication
  // customer
  LOGIN: `${URL}/auth/login`,
  GET_ALL_PARTNERS: `${URL}/partner/get-partners`,
  GET_ALL_RECEIVER: `${URL}/receivers`,
  // employee
  LOGIN_EMPLOYEE: `${URL}/auth/admin-login`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
  // get all account
  GET_ALL_ACCOUNT: `${URL}/payments/all`,


  // Transaction history
  // customer
  CUSTOMER_TRANSACTION: `${URL}/customers/history`,
  // employee one + admin

  // employee all + admin

  // admin (foreign)

};

export default API;
