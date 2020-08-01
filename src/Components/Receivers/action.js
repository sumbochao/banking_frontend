import API from "../../Services/API"

export const getAllReceiver = (token) =>{
    return fetch(API.GET_ALL_RECEIVER, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

  }