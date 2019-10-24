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
      const ret = yield call(request, apiUrl.myOrder, options, extra)
      if(options.status){
        yield put({type: ActionType.order.fillList, payload:ret});
      }else{
        yield put({type: ActionType.order.fillDetails, payload:ret});
      }
      
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export function * payOrder(payload){
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.payOrder, options, extra)
      if(extra.navigation.state.routeName=="AllOrders"){
        extra.navigation.navigate('OrderDetails',{code:options.id})
      }else{
        extra.navigation.replace('OrderDetails',{code:options.id})
      }
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * order() {
    yield takeEvery(ActionType.order.getList, getList) 
    yield takeEvery(ActionType.order.payOrder, payOrder) 
  }
  