'use strict';

import fetch from 'dva/fetch';
import cookie from './cookie';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  return response;
}

//全局添加headers，及 sessionID 票据
function optionsAppend(options){
  var headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');


  let userInfo = cookie.getCookie('user');
  if (userInfo && (typeof userInfo === 'string' && userInfo!='undefined')) {
    userInfo = JSON.parse(decodeURIComponent(userInfo));
    if (userInfo.sessionID) {
      headers.set('x-session-id', userInfo.sessionID);
    }
  }

  var customOptions={
    method:'GET',
    credentials: 'include',
    headers:headers
  };

  return  Object.assign(customOptions, options);  //{...customOptions,...options};
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options = optionsAppend(options);
  return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => ({ data }))
      .catch((err) => ({ err }));
}
