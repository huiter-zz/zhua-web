import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as api from '../services/base.js';

export default {

  namespace: 'home',

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
      const keyword = yield select(state => state.home.keyword);

      let obj = yield call(api.getPageList,{
        page: page,
        count: pageSize?pageSize:5,
        keyword: keyword
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
    * editPage({ payload },{ call, put}){
      let obj = yield call(api.updatePage,payload);
      yield put({
        type: 'updateLocalPage',
        payload: obj.data
      })
    },
    * deletePage({ payload },{ call, put}){
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
    updateLocalPage(state, {payload}) {
      let pages = _.map(state.pages,(item)=>{
        if (item.id === payload.id) {
          return payload
        }
        else{
          return item;
        }
      })

      return {...state, pages: pages}; 
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
    },
    updateLocalKeyword(state, {payload}){
      return {...state, keyword:payload.keyword}; 
    }

  },

}
