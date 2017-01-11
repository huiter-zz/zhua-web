import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';

export default {

  namespace: 'home',

  state: {
    pages: [],
    total: 0,
    current: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(function (location) {
        if (location.pathname.indexOf('home')>-1) {
            dispatch({
                type: 'query',
                payload: location.query,
            })
        } 
      });
    },
  },

  effects: {
    * query({ payload }, { call, put }) {
      var page = payload.payload && payload.payload.page;
      let obj = yield call(api.getPageList,{
        page: page?page:1,
        count: 5
      });

      yield put({
        type:'updateLocalPageList',
        payload:obj.data
      });
    },
    * createPage({ payload },{ call, put}){
      let newPage = yield call(api.createPage,payload);
      yield put({
        type:'addLocalPage',
        payload: newPage.data
      })
      message.success('成功添加');
    },
    * deletePage({ payload },{ call, put}){
      console.log(payload);
      yield call(api.deletePageByID,payload);
      yield put({
        type: 'deleteLocalPage',
        payload: payload
      })

    }

  },

  reducers: {
    updateLocalPageList(state, {payload}) {
      return {...state, total:payload.total , pages :payload.data , current:1};
    },
    addLocalPage(state, {payload}) {
      state.pages.unshift(payload);
      return {...state, total:state.total + 1 , pages: state.pages};    
    },
    deleteLocalPage(state, {payload}){
      var pages = _.filter(state.pages,function(item){
        if (item.id === payload) {
          return false;
        }
        return item;
      });
      
      return {...state, total:state.total - 1, pages: pages};   
    }

  },

}
