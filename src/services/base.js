'use strict';

import request from '../utils/request';

let BASE_URL = 'http://127.0.0.1:3000';

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

// 获取被邀请者列表
export async function getInvitedUsersList(params){
  let url = BASE_URL + `/notifications?limit=${params.limit}`;
  let req = request(url,{
    method: 'get'
  });
  return req;
}





