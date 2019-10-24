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
import upload from './upload'
import Tips from '../utils/tips'
import crypto from "crypto-js"
import { NavigationActions } from 'react-navigation'
export function * uploadHeader(payload){
  try {
    const {faceUri, extra} = {
      ...payload
    }
    let formData = new FormData();
    //获取用户openid
    const user = yield select(state => state.user)
    let file = {uri:faceUri,type: 'image/jpeg',name:user.userUuid+'.jpg'}
    formData.append("file",file)
    const ret = yield call(upload, apiUrl.uploadHeader, formData, extra)
    Tips.toast('上传成功')
    user.headerurl=ret
    yield put({type: ActionType.auth.logined, payload:user});
  } catch (e) {
    Tips.toast(e.message)
  }
}
export function * login(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    //options.pwd = crypto.MD5(options.pwd).toString()
    const ret = yield call(request, apiUrl.login, options, extra)
    //const {userUuid,header_address,userName,token} = ret
    //验证是否是同一用户登录，如果不是清空缓存
    const user = yield select(state => state.user)
    if (Object.keys(user).length!=0 && user.userid!=ret.userid) {
      yield put({type: 'RESET_STORE'});
    }
    yield put({type: ActionType.auth.logined, payload:ret});
  } catch (e) {
    Tips.toast(e.message)
  }
}
export function * register(payload) {
  try {
    
    const {options, extra} = {
      ...payload
    }
    //options.pwd = crypto.MD5(options.pwd).toString()
    const ret = yield call(request, apiUrl.appRegister, options, extra)
    //const {userUuid,header_address,userName,token} = ret
    //options.loginMethod=1
    //yield put({type: ActionType.auth.login, options:options});
    yield put({type: ActionType.auth.logined, payload:ret});
  } catch (e) {
    Tips.toast(e.message)
  }
}

export function * resetPassword(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    //alert(NavigationActions.navigate.toString())
    const ret = yield call(request, apiUrl.resetPassword, options, extra)
    Tips.toast("操作成功")
    extra.navigation.popToTop()
  } catch (e) {
    Tips.toast(e.message)
  }
}
export function * loginOut(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    const ret = yield call(request, apiUrl.loginOut, options, extra)
    yield put({type: 'RESET_STORE'});
    extra.navigation.navigate('mainTabs_glife')
  } catch (e) {
    Tips.toast(e.message)
  }
}
export function * updateMobile(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    const ret = yield call(request, apiUrl.updateMobile, options, extra)
    //更新账号，清除token为了让用户重新登陆，保留用户id与新登陆的账号进行匹配是否是同一用户
    const user = yield select(state => state.user)
    if (user) {
      user.token = ''
      user.headerurl = ''
      user.mobile = ''
    }
    yield put({type: ActionType.auth.logined, payload:user});
    extra.navigation.navigate('Login')
  } catch (e) {
    Tips.toast(e.message)
  }
}
export function * chgPwd(payload) {
  try {
    const {options, extra} = {
      ...payload
    }
    const ret = yield call(request, apiUrl.chgPwd, options, extra)
    //更新账号，清除token为了让用户重新登陆，保留用户id与新登陆的账号进行匹配是否是同一用户
    const user = yield select(state => state.user)
    if (user) {
      user.token = ''
      user.headerurl = ''
      user.mobile = ''
    }
    yield put({type: ActionType.auth.logined, payload:user});
    extra.navigation.navigate('Login')
  } catch (e) {
    Tips.toast(e.message)
  }
}

export default function * auth() {
  yield takeEvery(ActionType.auth.login, login)
  yield takeEvery(ActionType.auth.register, register)
  yield takeEvery(ActionType.auth.resetPassword, resetPassword)
  yield takeEvery(ActionType.auth.loginOut, loginOut)
  yield takeEvery(ActionType.auth.updateMobile, updateMobile)
  yield takeEvery(ActionType.auth.chgPwd, chgPwd)
  yield takeEvery(ActionType.auth.uploadHeader, uploadHeader)
}
/*export function * login(action) {
  const {username, password} = action.payload
  //获取当前时间戳
  let date = new Date();
  let time = date.getTime();
  //获取登陆签名值
  let sign = getSign({secret: appSecret, _aop_timestamp: time, username, password})
  //请求参数
  let data = {
    new: "1",
    grant_type: "password",
    _aop_signature: sign,
    _aop_timestamp: time,
    username: username,
    password: password,
    response_type: "token"
  }
  let aliParams = []
  Object
    .keys(data)
    .forEach((key, index) => {
      aliParams.push(key + "=" + data[key])
    })
  let body = aliParams.join('&')
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  let args = {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: body,
    cache: 'reload'
  }
    return fetch(apiUrl.login, args).then(response => response.json())
        .then(json => {
            if (!json.status) {
                dispatch(loaded())
                return dispatch(logined(
                    {
                        token: 'Bearer '+json.access_token,
                        username:json.user.username,
                        realname:json.user.realname,
                        openid:json.user.openid,
                        userStatus:json.user.userStatus,
                        expired: time + 1000000000
                    }
                ))
            }else{
                dispatch(loaded())
                tips.toast(json.message)

            }

        }).catch(e => {
            dispatch(loaded())
            tips.toast('网络异常，请稍后再试！')
        }) 

  try {
    let payload = {
      token: 'Bearer 460f16e4f65c227b6226c9fc259c07794e52b84a', //json.access_token,
      username: 'terry', //'json.user.username',
      realname: '金', //'json.user.realname',
      openid: '190068326953343457', //json.user.openid
      userStatus: 15, //json.user.userStatus
      expired: time + 1000000000
    }
    yield put({type: ActionType.auth.logined, payload});
  } catch (e) {
    Tips.toast(e.message)
    return null
  }
}*/



//app签名，登陆需要使用
const getSign = ({secret, _aop_timestamp, username, password}) => {
  let key = appKey; //对应的oclient
  let appSecret = secret; //'clientid对应的数据表的secret字段值
  let apiInfo = key; //此处请用具体api进行替换
  //配置参数，请用apiInfo对应的api参数进行替换
  let code_arr = {
    grant_type: 'password',
    response_type: 'token',
    _aop_timestamp: _aop_timestamp,
    username,
    password
  }
  let aliParams = []
  Object
    .keys(code_arr)
    .forEach((key, index) => {
      aliParams.push(key + code_arr[key])
    })
  let aliParams2 = aliParams
    .sort()
    .join('')
  let sign_str = apiInfo + aliParams2
  let code_sign = crypto
    .HmacSHA1(sign_str, appSecret)
    .toString()
    .toUpperCase()
  return code_sign
}