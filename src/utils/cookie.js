'use strict';

export function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
}

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie= name + '=xxx' + ';expires='+ exp.toGMTString();
}

export default {
  getCookie: getCookie,
  delCookie: delCookie
};