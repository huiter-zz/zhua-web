import { routerRedux } from 'dva/router';
import { Message } from 'antd';
import * as api from '../services/base.js';
import cookie from '../utils/cookie';

export default {

  namespace: 'app',

  state: {
    user: {},
    balances:{}
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
      const { data,err } = yield call(api.register, {
        nickname: payload.payload && payload.payload.nickname,
        email: payload.payload && payload.payload.email,
        password: payload.payload && payload.payload.password,
        referralsCode: payload.payload && payload.payload.referralsCode,
      });

      if (data) {
        yield put({
          type: 'updateInfo',
          payload: {
            info: data
          }
        });

        yield put(routerRedux.push('/home'));
        return;
      }      
    }, 
    *login(payload, { call, put }) {
      yield put({ type: 'updateInfo' });
      const { data ,err} = yield call(api.login, {
        email: payload.payload && payload.payload.email,
        password: payload.payload && payload.payload.password,
      });

      if (data) {
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
      
      var user = cookie.getCookie('user');
      if (!user || user === 'undefined') {
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
      const { data,err} = yield call(api.updateUserInfo, {nickname:payload.nickname,phone:payload.phone? +payload.phone: undefined,avatar:payload.avatar});

      if (data) {
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
