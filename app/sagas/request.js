import NetInfo from "@react-native-community/netinfo"
import {
    put,
    takeEvery,
    call,
    all,
    select,
    race,
    fork,
    delay
} from 'redux-saga/effects'
import {
    netTimeout,
    delayLoadingTime,
    navigation
} from '../config'
import Tips from '../utils/tips'
export const checkInternetConnectivity = () => NetInfo
    .fetch()
    .then(state => state.isConnected)

export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status === 401) {
        throw (new Error("对不起，您没有权限访问此资源，请重新登录！"))
    }
    if (response.status === 404) {
        throw (new Error("对不起，未找到相应资源！"))
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

/**延时加载遮罩，delayLoadingTime（缺省0.5s）之内加载完成则不显示加载状态 */
export function* delayLoading(hideLoading) {
    yield delay(delayLoadingTime)
    if (!hideLoading)
        yield put({
            type: ActionType.common.loading
        })
    yield delay(60000) //任意值，大于最长加载时间即可
}
// option为传递到后台参数，extra为特殊控制，包含网络超时时间、是否显示loading等
export default function* request(url, options = {}, extra = {}) {

    try {
        let connected = yield call(checkInternetConnectivity)
        if (!connected)
            throw new Error('没有网络连接，请先连接网络')
        let timeout = netTimeout
        if (extra.timeout)
            timeout = extra.timeout
        let method = 'POST'
        if (extra.method)
            method = extra.method
        let args = {
            method,
            params: options,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const user = yield select(state => state.user)
        if (user && user.token) {
            args.headers = {
                ...args.headers,
                Authorization: 'Bearer '+user.token
            }
        }

        const {
            payload,
            fetchTimeout
        } = yield race({
            dd: call(delayLoading, extra.hideLoading),
            payload: call(request_impl, url, args),
            fetchTimeout: delay(timeout)
        })
        if (fetchTimeout)
            throw new Error('网络超时，请稍后再试')
        return payload
    } catch (e) {
        if(e.message=='登录已过期，请重新登录！'){
            yield put({type: 'RESET_STORE'});
        }
        throw e
    } finally {
        yield put({
            type: ActionType.common.loaded
        })
    }
}

function request_impl(url, args = {}) {
   
    let options={
        method: args.method,       
        headers: args.headers
    }
    if(args.method&&args.method==='POST')
        options.body=JSON.stringify(args.params)
    return fetch(url, options)
        .then(response => checkStatus(response))
        .then(res => res.json())
        .then(json => {
            //const {Status: status, Data: data, Message: message} = json;
            //alert(JSON.stringify(json))
            const {
                code: status,
                data,
                msg: message
            } = json;
            if (status == 700){
                if(navigation[0]){
                    navigation[0].navigate('Login')
                }
                throw new Error('登录已过期，请重新登录！')
            }
            if (status !== 200)
                throw new Error(message)
            return data;
        })
        .catch(e => {
            throw e
        })
}