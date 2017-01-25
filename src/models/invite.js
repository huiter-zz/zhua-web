import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';

export default {

  namespace: 'invite',

  state: {
    pages: [],
    total: 0,
    current: 1,
    pageSize: 5,
    keyword:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(function (location) {
        if (location.pathname.indexOf('invite')>-1) {
            dispatch({
                type: 'query',
                payload: location.query,
            })
        } 
      });
    },
  },

  effects: {
    * query({ payload }, { call, put, select }) {


      var page = payload && payload.page;
      page = page? (+page) :1;
      const pageSize = yield select(state => state.invite.pageSize);

      let obj = yield call(api.getInvitedUserList,{
        page: page,
        count: pageSize?pageSize:5,
      });
      
      if (!obj.err) {
        var data = obj.data;
        data.current = page;
        yield put({
          type:'updateLocalPageList',
          payload:data
        });
      }

    },
  },

  reducers: {
    updateLocalPageList(state, {payload}) {
      console.log(payload);
      return {...state, total:payload.total , pages :payload.data , current:payload.current};
    },
    updateLocalPagination(state, {payload}){
      return {...state, pageSize:payload.pageSize}; 
    }
  },

}
