import Swal from 'sweetalert2';
import API from '../../Services/API';

export const getListDebt = (token, callBack) => {
  return fetch(API.GET_ALL_DEBT_REMINDER, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res) {
        callBack(res);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const createAdmin = (token, adminInfo, callBack) => {
  return fetch(API.CREATE_NEW_ADMIN, {
    method: 'POST',
    body: JSON.stringify(adminInfo),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res) {
        callBack(res);
      } else {
        Swal.fire("Lỗi", res.err, "error");
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const deleteAdmin = (token, email, callBack) => {
  return fetch(API.DELETE_ADMIN, {
    method: 'DELETE',
    body: JSON.stringify({ email: email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res) {
        callBack(res);
      } else {
        Swal.fire('Thông báo', res.err, 'error');
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};