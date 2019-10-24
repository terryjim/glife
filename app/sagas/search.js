import {
    put,
    takeEvery,
    call,
    all,
    select,
    fork,
    delay
  } from 'redux-saga/effects'
  import ActionType from '../config/actionType'
  import {apiUrl} from '../config'
  import request from './request'
  import Tips from '../utils/tips'
  export function * getKeywordList(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.appKeyword, options, extra)
      yield put({type: ActionType.search.fillKeywordList, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * getSearchList(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      //yield put({type: ActionType.search.clearSearchList});
      const ret = yield call(request, apiUrl.search+'/'+options.keyname, options, extra)
      yield put({type: ActionType.search.fillSearchList, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * cate() {
    yield takeEvery(ActionType.search.getKeywordList, getKeywordList)  
    yield takeEvery(ActionType.search.getSearchList, getSearchList) 
  }
  