import fetch from 'cross-fetch';
import API from '../../Services/API';

export const getAllPartners = (token) => {
  return fetch(API.GET_ALL_PARTNERS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    
};
