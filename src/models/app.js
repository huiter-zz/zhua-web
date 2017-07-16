import { routerRedux } from 'dva/router';
import { message } from 'antd';
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
        if ((location.pathname.indexOf('login')>-1) || (location.pathname.indexOf('register')>-1)||(location.pathname.indexOf('welcome')>-1)||(location.pathname == '/')) {
          
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
    *resetPassword({payload}, { call , put}) {
      const { data } = yield call(api.resetPassword, payload);
      if (data && data.result) { 
        message.success('修改成功', 3); 
      }
    },
    *isLogin(payload, { call, put, select }) {

      try{
        var user = JSON.parse(decodeURIComponent(cookie.getCookie('user')));
      }
      catch(e){
        message.warning('您的登陆信息已过期，请重新登录！', 3);
        yield put(routerRedux.push('/login'));
        return;
      } 
      
   
      if (!user.email) {
        message.warning('您的登陆信息已过期，请重新登录！', 3);
        yield put(routerRedux.push('/login'));
      } else {
        yield put({
          type: 'updateInfo',
          payload: {
            info: user
          }
        });
      }
      
    },
    *updateProfile({payload}, { call, put, select }) {
      const { data,err} = yield call(api.updateUserInfo, {nickname:payload.nickname,phone:payload.phone? +payload.phone: undefined,avatar:payload.avatar});

      if (data) {
        message.success('修改成功', 3);
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
