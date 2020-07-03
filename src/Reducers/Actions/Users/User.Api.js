import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const getListUsers = callBack => {
  return fetch(API.GET_LIST_USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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

export const login = (username, password, callBack) => {
  return fetch(API.LOGIN, {
    method: 'POST',
    body: `username=${username}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.accessToken) {
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

export const blockUser = (id, callBack) => {
  return fetch(API.BLOCK_USER, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'OK') {
        callBack(res.id);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const unBlockUser = (id, callBack) => {
  return fetch(API.UNBLOCK_USER, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'OK') {
        callBack(res.id);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};
