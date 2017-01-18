import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';
export default {

  namespace: 'page',

  state: {
    snapshots: [],
    total: 0,
    current: 1,
    pageSize: 6
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(function (location) {
        console.log(location);
        if (location.pathname.indexOf('/page')>-1) {
            dispatch({
                type: 'query',
                payload:{
                  page:location.query.page,
                  id:location.query.id,
                },
            })
        } 
      });
    },
  },

  effects: {
    *snapshots({ payload }, { call, put, select}) {
        var page = payload && payload.page;
        const pageSize = yield select(state => state.page.pageSize);
        let obj = yield call(api.getSnapShots,{
          page: page?page:1,
          count: pageSize,
          id:payload.id
        });

        if (!obj.err) {
          var data = obj.data;
          data.current = page?page:1;
          yield put({
            type:'updateLocalSnapShotList',
            payload:data
          });
        }
    },
  },

  reducers: {
    updateLocalSnapShotList(state, {payload}) {
      return {...state, total:payload.total , snapshots :payload.data , current:payload.current};
    },
  },

}
