import Swal from 'sweetalert2';
import API from '../../Services/API';

export const getListAdmins = callBack => {
  return fetch(API.GET_LIST_ADMIN, {
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

export const createAdmin = (adminInfo, callBack) => {
  return fetch(API.CREATE_NEW_ADMIN, {
    method: 'POST',
    body: JSON.stringify(adminInfo),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
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

export const deleteAdmin = (admin, callBack) => {
  return fetch(API.DELETE_ADMIN, {
    method: 'POST',
    body: JSON.stringify(admin),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
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

export const updateAdmin = (adminInfo, callBack) => {
  return fetch(API.UPDATE_ADMIN, {
    method: 'POST',
    body: JSON.stringify(adminInfo),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
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

export const resetPassword = ({ id, password }, callBack) => {
  return fetch(API.RESET_PASS_ADMIN, {
    method: 'POST',
    body: JSON.stringify({ id, password }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
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
