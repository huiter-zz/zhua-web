import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';

export default {

  namespace: 'admin',

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
        if (location.pathname.indexOf('admin')>-1) {
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
      const pageSize = yield select(state => state.admin.pageSize);

      let obj = yield call(api.getAdminUserList,{
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
    * adjust({ payload },{ call, put}){
      let newPage = yield call(api.adminAdjust,payload);
      /*
      yield put({
        type:'addLocalPage',
        payload: newPage.data
      })
      */
      message.success('操作成功');
    },
  },

  reducers: {
    updateLocalPageList(state, {payload}) {
      return {...state, total:payload.total , pages :payload.data , current:payload.current};
    },
    updateLocalPagination(state, {payload}){
      return {...state, pageSize:payload.pageSize}; 
    }
  },

}
