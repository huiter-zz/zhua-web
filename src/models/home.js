import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';

export default {

  namespace: 'home',

  state: {
    pages: [],
    total: 0,
    current: 1,
    pageSize: 5
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
    * query({ payload }, { call, put, select }) {
      var page = payload && payload.page;
      page = page? (+page) :1;
      const pageSize = yield select(state => state.home.pageSize);
      console.log('222',pageSize);
      let obj = yield call(api.getPageList,{
        page: page,
        count: pageSize?pageSize:5
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
      return {...state, total:payload.total , pages :payload.data , current:payload.current};
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
    },
    updateLocalPagination(state, {payload}){
      return {...state, pageSize:payload.pageSize}; 
    }

  },

}
