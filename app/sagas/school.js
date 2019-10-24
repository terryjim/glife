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
      const ret = yield call(request, apiUrl.studentPage+'/'+options.id, options, extra)
      yield put({type: ActionType.school.fillList, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * preBooking(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.preBooking, options, extra)
      Tips.toast("预约成功")
      extra.navigation.goBack()
      
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * getIsBooked(payload){
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.isbooked+'/'+options.id, options, extra)
      yield put({type: ActionType.school.fillIsBooked, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * school() {
    yield takeEvery(ActionType.school.getList, getList)  
    yield takeEvery(ActionType.school.preBooking, preBooking)  
    yield takeEvery(ActionType.school.getIsBooked, getIsBooked)  
  }
  