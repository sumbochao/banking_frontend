import URL from './URL';
 

const API = {
  // authentication
  // customer
  LOGIN: `${URL}/auth/login`,
  // employee
  LOGIN_EMPLOYEE: `${URL}/auth/admin-login`,
  // refresh token
  REFRESH_TOKEN: `${URL}/auth/refresh-token`,
};

export default API;
