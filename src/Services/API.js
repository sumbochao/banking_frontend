import PROURL from './URL';

const API = {
  // login
  // LOGIN_SUBMIT_USERNAME: `${PROURL.URL}/auth/login`
  // admin

  GET_LIST_ADMIN: `${PROURL.URL}/admin`,
  CREATE_NEW_ADMIN: `${PROURL.URL}/admin`,
  DELETE_ADMIN: `${PROURL.URL}/admin/delete`,
  UPDATE_ADMIN: `${PROURL.URL}/admin/update`,
  RESET_PASS_ADMIN: `${PROURL.URL}/admin/resetpassword`,
  // get list of users
  // GET_LIST_USER: `${URL}/users`,
  GET_TOTAL_USER: `${PROURL.URL}/users/getUserList`,
  GET_LIST_USER: `${PROURL.URL}/users`,
  GET_LIST_USER_REPORTED: `${PROURL.URL}/users/reported`,
  GET_LIST_USER_BLOCKED: `${PROURL.URL}/users/blocked`,
  CHANGE_STATUS_USER: userId => `${PROURL.URL}/users/${userId}`,
  GET_TOTAL_REVENUE: `${PROURL.URL}/revenues/getTotalRevenue`,

  BLOCK_USER: `${PROURL.URL}/users/block`,
  UNBLOCK_USER: `${PROURL.URL}/users/unblock`,
  LOGIN: `${PROURL.URL}/auth/login`,
  // login
  LOGIN_SUBMIT_USERNAME: `${PROURL.URL}/auth/login`,
  // company
  COMPANY_REPORT: `${PROURL.URL}/companies/report`,
  COMPANY_LIST: `${PROURL.URL}/companies/find`,
  SET_AUTH_COMPANY: id => `${PROURL.URL}/companies/${id}/setAuth`,
  SET_AUTHENTICATED: id => `${PROURL.URL}/companies/${id}/setAuthStatus`,
  SET_BLOCK_COMPANY: id => `${PROURL.URL}/companies/${id}/setBlock`,
  DELETE_COMPANY: id => `${PROURL.URL}/companies/${id}/deleteCompany`,
  GET_COMPANY_NAME: `${PROURL.URL}/companies/getCompanyName`,
  ADD_COMPANY: `${PROURL.URL}/companies`,
  UPDATE_COMPANY: `${PROURL.URL}/companies`,
  UPDATE_AVATAR: `${PROURL.URL}/companies/update-avatar`,
  UPDATE_COVER: `${PROURL.URL}/companies/update-cover`,
  // post
  GET_LIST_POST: `${PROURL.URL}/posts`,
  GET_LIST_POST_REPORTED: `${PROURL.URL}/posts/reported`,
  GET_LIST_POST_BLOCKED: `${PROURL.URL}/posts/blocked`,
  CHANGE_STATUS_POST: postId => `${PROURL.URL}/posts/${postId}`,
  DELETE_POST: postId => `${PROURL.URL}/posts/${postId}`,
  SEND_NOTIFICATION_TO_USER: `${PROURL.CLIENTURL}/notifications/reportPost`,
  SEND_NOTIFICATION_BLOCKED_TO_USER: `${PROURL.CLIENTURL}/notifications/blockUser`,
  // history activity user
  GET_LIST_ACTIVITY_USER: userId => `${PROURL.URL}/allactivityuser/${userId}`,
  // chart
  GET_TOTAL_STATISTIC: `${PROURL.URL}/statistics/getTotalStatistic`,
  // job
  JOB_LIST: `${PROURL.URL}/jobs/find`,
  ADD_JOB: `${PROURL.URL}/jobs`,
  DELETE_JOB: id => `${PROURL.URL}/jobs/${id}/deleteJob`,
  UPDATE_JOB: `${PROURL.URL}/jobs`,
  ACCEPT_JOB: id => `${PROURL.URL}/jobs/${id}/acceptJob`,
  // field
  FIELD_LIST: `${PROURL.URL}/fields/find`,
  ADD_FIELD: `${PROURL.URL}/fields`,
  DELETE_FIELD: id => `${PROURL.URL}/fields/${id}/deleteField`,
  UPDATE_FIELD: `${PROURL.URL}/fields`,
  GET_FIELD: `${PROURL.URL}/fields/getDropdown`,
  // hashtag
  HASHTAG_LIST: `${PROURL.URL}/hashtags/find`,
  ADD_HASHTAG: `${PROURL.URL}/hashtags`,
  UPDATE_HASHTAG: `${PROURL.URL}/hashtags`,
  // post
  POST_LIST: `${PROURL.URL}/posts`,

  // blackList
  EMAIL_LIST: `${PROURL.URL}/emails/find`,
  ADD_EMAIL: `${PROURL.URL}/emails`,
  DELETE_EMAIL: id => `${PROURL.URL}/emails/${id}`,

  // payment
  GET_ALL_PAYMENT: `${PROURL.URL}/payment`,
  GET_ALL_PAYMENT_REPORT: `${PROURL.URL}/report-payment`,
  COUNT_PAYMENTS: `${PROURL.URL}/payment/count`,
  COUNT_SUCCEEDED_PAYMENTS: `${PROURL.URL}/payment/count/succeeded`,
  COUNT_FAILED_PAYMENTS: `${PROURL.URL}/payment/count/failed`,
  COUNT_TODAY_PAYMENTS: `${PROURL.URL}/payment/count/today`,
  UPDATE_STATUS_PAYMENT: `${PROURL.URL}/payment/update/status`,
  STATISTIC_TYPE_PAYMENT: `${PROURL.URL}/payment/count/type`,

  SET_ADMIN_RESOLVED_PAYMENT_REPORT: id => `${PROURL.URL}/report-payment/${id}`
};

export default API;
