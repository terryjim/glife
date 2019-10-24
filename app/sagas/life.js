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
  export function * getList(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.secondPage+'/'+options.id, options, extra)
      yield put({type: ActionType.life.fillList, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * life() {
    yield takeEvery(ActionType.life.getList, getList)  
  }
  