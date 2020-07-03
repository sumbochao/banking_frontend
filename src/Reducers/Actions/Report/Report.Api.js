import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const getReportCompanyData = (body, callBack) => {
  return fetch(API.REPORT_LIST, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf8mb4'
    }
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
};

export const setBlocked = (params, callBack)  => {
  return fetch(API.SET_BLOCK(params.id), {
    method: 'GET'
    // body: JSON.stringify(params),
    // headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    // },
  })
    .then(response => response.json())
    .then(res => {
      callBack(res);
    })
    .finally(() => {});
};
