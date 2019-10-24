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
import {apiUrl, appKey, appSecret} from '../config'
import request from './request'
import Tips from '../utils/tips'
import crypto from "crypto-js"
export function * getWeather(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    const ret = yield call(request, apiUrl.weather, options, extra)
    yield put({type: ActionType.common.fillWeather, payload:ret});
  } catch (e) {
    Tips.toast(e.message)
  }
}
export default function * weather() {
  yield takeEvery(ActionType.common.getWeather, getWeather)
}