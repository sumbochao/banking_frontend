import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const getUsersList = callBack => {
  return fetch(API.GET_TOTAL_USER, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.message, 'error');
    });
};
export const getTotalRevenue = callBack => {
  return fetch(API.GET_TOTAL_REVENUE, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
export const getTotalStatistic = callBack => {
  return fetch(API.GET_TOTAL_STATISTIC, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
};

export const getCompanyData = callBack => {
  return fetch(API.COMPANY_REPORT, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
};
