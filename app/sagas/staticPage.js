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
  export function * getstaticPage(payload) {
    try {
      const {options, extra} = {
        ...payload
      }
      const ret = yield call(request, apiUrl.staticPage+'/'+options.id, options, extra)
      if(options.id==101){
        yield put({type: ActionType.staticPage.fillAgreement, payload:ret});
      }else if(options.id==102){
        yield put({type: ActionType.staticPage.fillAbout, payload:ret});
      }else{
        yield put({type: ActionType.staticPage.fillPrivacy, payload:ret});
      }
      
    } catch (e) {
      Tips.toast(e.message)
    }
  }
  export default function * staticPage() {
    yield takeEvery(ActionType.staticPage.getstaticPage, getstaticPage)  
  }
  