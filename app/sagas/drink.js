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
      const ret = yield call(request, apiUrl.product, options, extra)
      ret['serviceid']=options.serviceid
      yield put({type: ActionType.drink.fillList, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * getSpecprod(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.specprod+'/'+options.serviceid, options, extra)
      yield put({type: ActionType.drink.fillSpecprod, payload:ret});
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * takeOrder(payload){
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.takeOrder, options, extra)
      yield put({type: ActionType.drink.orderClear});
      extra.navigation.navigate('TakeOrder',{code:ret})
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * drink() {
    yield takeEvery(ActionType.drink.getList, getList) 
    yield takeEvery(ActionType.drink.getSpecprod, getSpecprod)   
    yield takeEvery(ActionType.drink.takeOrder, takeOrder)   
  }
  