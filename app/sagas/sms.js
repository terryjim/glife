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
export function * sendSms(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    const ret = yield call(request, apiUrl.sendSms, options, extra)
    Tips.toast("短信发送成功")
    yield put({type: ActionType.common.smsSucceed, payload:ret});
  } catch (e) {
    Tips.toast(e.message)
  }
}
export default function * sms() {
  yield takeEvery(ActionType.common.sendsms, sendSms)
  //yield takeEvery(ActionType.auth.loginOut, loginOut)

}