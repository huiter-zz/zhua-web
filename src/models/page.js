import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';
export default {

  namespace: 'page',

  state: {
    snapshots: [],
    total: 0,
    current: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *snapshots({ payload }, { call, put }) {
            console.log('three');
        var page = payload.payload && payload.payload.page;
        let obj = yield call(api.getSnapShots,{
          page: page?page:1,
          count: 5,
          stime:payload.stime,
          etime:payload.etime,
          id:payload.id
        });

        yield put({
          type:'updateLocalSnapShotList',
          payload:obj.data
        });
    },
  },

  reducers: {
    updateLocalSnapShotList(state, {payload}) {
      return {...state, total:payload.total , snapshots :payload.data , current:1};
    },
  },

}
