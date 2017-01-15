import { routerRedux } from 'dva/router';
import { Message } from 'antd';
import * as api from '../services/base.js';
import cookie from '../utils/cookie';

export default {

  namespace: 'app',

  state: {
    user: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(function (location) {
        if ((location.pathname.indexOf('login')>-1) || (location.pathname.indexOf('register')>-1)) {
          
        } else {
          dispatch({ type: 'isLogin', payload: {} });
        }
      });
    },
  },

  effects: {
    *register(payload, { call, put }) {
      yield put({ type: 'updateInfo' });
      const { data } = yield call(api.register, {
        nickname: payload.payload && payload.payload.nickname,
        email: payload.payload && payload.payload.email,
        password: payload.payload && payload.payload.password,
      });

      if (!data) {
        Message.warning('网络错误', 3);
        return;
      }

      if (!data.errcode) {
        yield put({
          type: 'updateInfo',
          payload: {
            info: data
          }
        });

        yield put(routerRedux.push('/home'));
        return;
      }

      if (data.errcode == 40001) {
        Message.warning('邮件地址不合法', 3);
        return;
      }

      if (data.errcode == 40002) {
        Message.warning('密码长度必须大于 6 位并小于 50 位', 3);
        return;
      }
      Message.warning('系统错误', 3);
      
    }, 
    *login(payload, { call, put }) {
      yield put({ type: 'updateInfo' });
      const { data } = yield call(api.login, {
        email: payload.payload && payload.payload.email,
        password: payload.payload && payload.payload.password,
      });

      if (!data) {
        Message.warning('网络错误', 3);
        return;
      }

      if (!data.errcode) {
        yield put({
          type: 'updateInfo',
          payload: {
            info: data
          }
        });

        document.cookie = 'user=' + encodeURIComponent(JSON.stringify(data));
        yield put(routerRedux.push('/home'));
        return;
      }

      if (data.errcode == 40011) {
        Message.warning('邮箱或密码错误', 3);
        return;
      }

      Message.warning('系统错误', 3);

    }, 
    *logout(payload, { call , put}) {
      const { data } = yield call(api.logout, {});
      cookie.delCookie('user');
      yield put({
        type: 'updateInfo',
        payload: {
          info: {}
        }
      });
      yield put(routerRedux.push('/login'));

    },
    *isLogin(payload, { call, put, select }) {
      const flag = !!cookie.getCookie('user');
      if (!flag) {
        Message.warning('您的登陆信息已过期，请重新登录！', 3);
        yield put(routerRedux.push('/login'));
      } else {
        let userInfo = cookie.getCookie('user');
        if (typeof userInfo === 'string') {
          yield put({
            type: 'updateInfo',
            payload: {
              info: JSON.parse(decodeURIComponent(userInfo))
            }
          });
        }
      }
    },
    *updateProfile({payload}, { call, put, select }) {
      const { data } = yield call(api.updateUserInfo, {nickname:payload.nickname,phone:payload.phone? +payload.phone: undefined,avatar:payload.avatar});
      if (!data) {
        Message.warning('网络错误', 3);
        return;
      }

      if (!data.errcode) {
        Message.success('修改成功', 3);
        yield put({
          type: 'updateInfo',
          payload: {
            info: data
          }
        });
        return;
      }
    },
  },

  reducers: {
    updateInfo(state, action) {
      let user = action.payload && action.payload.info;
    document.cookie = 'user=' + encodeURIComponent(JSON.stringify(user));
      return {...state,user:user};
    }
  },

}
