'use strict';

import request from '../utils/request';
import config from '../config.js';

// API 地址
let BASE_URL = config.baseUrl;

// 注册
export async function register(params) {
  let url = BASE_URL + '/users/register';
  let req = request(url,{
    method: 'post',
    body: JSON.stringify(params)
  });
  return req;
}

// 登录
export async function login(params) {
  let url = BASE_URL + '/users/login';
  let req = request(url,{
    method: 'post',
    body: JSON.stringify(params)
  });
  return req;
}

// 获取余额
export async function getBalances(params){
  let url = BASE_URL + '/users/balances';
  let req = request(url,{
    method: 'get'
  });
  return req;
}

// 修改用户信息
export async function updateUserInfo(params){
  let url = BASE_URL + '/users/me';
  let req = request(url,{
    method: 'put',
    body: JSON.stringify(params)
  });

  return req;
}

// 修改密码
export async function updateUserPassword(params){
  let url = BASE_URL + '/users/me/password';
  let req = request(url,{
    method: 'put',
    body: JSON.stringify(params)
  });

  return req;
}

// 退出
export async function logout(params) {
  let url = BASE_URL + '/users/logout';
  let req = request(url,{
    method: 'delete'
  });
  return req;
}








// 获取页面
export async function getPageList(params) {
  var url = BASE_URL + '/pages';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      _query += ( k + '=' + params[k] + '&');
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}


// 创建页面
export async function createPage(params){
  let url = BASE_URL + `/pages`;
  let req = request(url,{
    method: 'post',
    body: JSON.stringify(params)
  });

  return req;
}

// 更新页面
export async function updatePage(params){
  let url = BASE_URL + `/pages/${params.id}`;
  let req = request(url,{
    method: 'put',
    body: JSON.stringify(params)
  });

  return req;
}

// 删除页面
export async function deletePageByID(id){
  let url = BASE_URL + `/pages/${id}`;
  let req = request(url,{
    method: 'delete'
  });
  return req;
}

// 重新抓取
export async function refreshPageByID(id){
  let url = BASE_URL + `/pages/${id}/fetch/snapshots`;
  let req = request(url,{
    method: 'post'
  });
  return req;
}


// 获取被邀请者列表
export async function getnvitations(params){
  var url = BASE_URL + '/users/invitations';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      if (k !== 'id') {
         _query += ( k + '=' + params[k] + '&');
       }
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}

// 获取页面快照列表
export async function getSnapShots(params){
  var url = BASE_URL + '/pages/' +`${params.id}` +'/snapshots';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      if (k !== 'id') {
         _query += ( k + '=' + params[k] + '&');
       }
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}


// 获取邀请用户
export async function getInvitedUserList(params) {
  var url = BASE_URL + '/users/invitations';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      _query += ( k + '=' + params[k] + '&');
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}

// 获取所有用户
export async function getAdminUserList(params) {
  var url = BASE_URL + '/admins/users/list';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      _query += ( k + '=' + params[k] + '&');
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}

// 充值赠送
export async function adminAdjust(params) {
  let url = BASE_URL + '/admins/adjustment';
  let req = request(url,{
    method: 'post',
    body: JSON.stringify(params)
  });
  return req;
}

// 获取日志
export async function getUserLogList(params) {
  var url = BASE_URL + '/users/logs';
  var _query = '';
  for (var k in params) {
    if (params[k]) {
      _query += ( k + '=' + params[k] + '&');
    }
  }

  if (_query) {
    url = url + '?' + _query;
  }
  return request(url);
}



