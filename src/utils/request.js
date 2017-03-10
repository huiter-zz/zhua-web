'use strict';

import fetch from 'dva/fetch';
import { routerRedux } from 'dva/router';
import cookie from './cookie';
import { Message } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.statusCode = response.status;


  return response.json().then((err) => {
    error.response = err;

    switch (error.response.errcode)
    {
      case -2:
        Message.warning('没有权限', 3);
        break;
      case 40001:
        Message.warning('请检查邮件地址', 3);
        break;
      case 40002:
        Message.warning('密码长度必须大于 6 位并小于 50 位', 3);
        break;
      case 40003:
        Message.warning('用户昵', 3);
        break;
      case 40004:
        Message.warning('手机号码不合法', 3);
        break;
      case 40005:
        Message.warning('原始密码不合法', 3);
        break;
      case 40006:
        Message.warning('此邮件地址已存在，您可以直接登录或更换邮件地址', 3);
        break;
      case 40007:
        Message.warning('生成邀请码出错', 3);
        break;
      case 40008:
        Message.warning('用户不存在', 3);
        break;
      case 40011:
        Message.warning('邮箱或密码错误', 3);
        break;
      case 40021:
        Message.warning('页面地址不正确，必须是以 http 或 https 开头的页面地址。比如：http://www.baidu.com', 3);
        break;
      case 40022:
        Message.warning('页面标签数量不能超过 5 个', 3);
        break;
      case 40023:
        Message.warning('标签内容长度不能超过 20 个字符', 3);
        break;
      case 40024:
        Message.warning('页面不存在', 3);
        break;
      case 40025:
        Message.warning('页面配置 size 格式不合法，格式应该为 1920x780 样式', 3);
        break;
      case 40026:
        Message.warning('页面抓取延时时间不能超过 10 秒', 3);
        break;
      case 40027:
        Message.warning('页面标题不能为空，长度不能大于 50 位', 3);
        break;
      case 40031:
        Message.warning('调账类型不合法', 3);
        break;
      case 40032:
        Message.warning('调账金额必须大于 0', 3);
        break;
      case 40033:
        Message.warning('调账失败', 3);
        break;
      case 40081:
        Message.warning('上传文件失败，请重新上传', 3);
        break;
    }

    throw error;
  });
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
      .catch((err) => ({ err }))
}
