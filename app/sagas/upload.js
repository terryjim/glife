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
    delayLoadingTime
} from '../config'
import {checkInternetConnectivity,delayLoading,checkStatus} from './request'
// option为传递到后台参数，extra为特殊控制，包含网络超时时间、是否显示loading等
export default function* request(url, options = {}, extra = {}) {
    try {
        let connected = yield call(checkInternetConnectivity)
        if (!connected)
            throw new Error('没有网络连接，请先连接网络')
        let timeout = netTimeout
        if (extra.timeout)
            timeout = extra.timeout
        let args = {
            method: 'POST',
            body: options,
            headers: {
                'Content-Type': 'multipart/form-data'
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
        throw e
    } finally {
        yield put({
            type: ActionType.common.loaded
        })
    }
}

function request_impl(url, args = {}) {
    return fetch(url, args)
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
            if (status !== 200)
                throw new Error(message)
            return data;
        })
        .catch(e => {
            throw e
        })
}