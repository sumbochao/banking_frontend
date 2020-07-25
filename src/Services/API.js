import URL from './URL';
 

const API = {
  // authentication
  // customer
  LOGIN: `${URL}/auth/login`,
  GET_ALL_PARTNERS: `${URL}/partner/get-partners`,
  // employee
  LOGIN_EMPLOYEE: `${URL}/auth/admin-login`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
};

export default API;
