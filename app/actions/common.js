import tips from '../utils/tips';
//判断返回状态码
export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status === 401) {
        throw (new Error("对不起，您没有权限访问此资源，请重新登录！"))
    }
    else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}
//页面刷新中
export const loading = () => (
    {
        type: 'LOADING'
    }
)
//页面刷新中
export const loaded = () => (
    {
        type: 'LOADED'
    }
)
//显示错误信息
export const showError = (msg) => ({
    type: 'SHOW_ERROR',
    msg,
})
//关闭错误信息
export const closeError = () => ({
    type: 'CLOSE_ERROR'
})
//显示确认窗口
export const showConfirm = (msg, module, operate) => ({
    type: 'SHOW_CONFIRM',
    msg,
    module,
    operate
})
//选中确认按钮
export const confirm = (module, operate) => ({
    type: 'CONFIRM',
    module,
    operate
})
//关闭确认窗口
export const closeConfirm = () => ({
    type: 'CLOSE_CONFIRM'
})
//显示成功信息
export const showSuccess = (msg) => {
    return ({
        type: 'SHOW_SUCCESS',
        msg,
    })
}
//关闭成功信息
export const closeSuccess = () => ({
    type: 'CLOSE_SUCCESS'
})


//获取列表
export function* getList(){
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    const response=yield call("https://infoapi.greenlandilife.com/CommonData/v2/sl_activity/list", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 25ddbee02c0d17bc9a0f04265ca2d1fdbed72f58',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acttype: 2,
            userType: 2,
            showtype: 2,
            pageindex: 1,
            pagesize: 10
        })
    })
    alert(JSON.stringify(response))
    yield put({type:})
 /*    .then(response => response.json())
        .then(json => {
            const { Status: statusCode, Data: data, Message: message } = json;
            return dispatch(getListResult(json))
        }) */
    /////////////////////////////////////////
    /*  let headers = { 'Content-Type': 'application/json' };
     headers.Authorization = window.sessionStorage.accessToken
     //orderBy
     let body = JSON.stringify({ whereSql, page, size, sort })
     let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
     let getUrl = window.TParams.urls['get_' + module + '_list']
     if (getUrl == undefined || getUrl === '')
         getUrl = window.TParams.defaultUrl + module + '/getByPage'
     return fetch(getUrl, args).then(checkStatus).then(response => response.json())
         .then(json => {
 
             if (json.code !== 0)
                 return dispatch(showError(json.msg + '<br>' + json.data))
             else
                 return dispatch(getListResult(json.data))
         }).catch(e => {
             if (e != undefined)
                 return dispatch(showError(e.message))
             else
                 return dispatch(showError('系统异常，请稍后再试！<br/>'))
         }
         ) */
}
//获取列表回调
export const getListResult = (json) => (
    {
        type: 'GET_LIST',
        data: json
    }
)
export const clearCList = () => (
    { type: 'CLEAR_LIST' }
)
//保存表单
export const saveForm = (values, module) => dispatch => {
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let body = JSON.stringify(values)
    //let body = values
    let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
    let saveUrl = window.TParams.urls['save_' + module]
    if (saveUrl == undefined || saveUrl === '')
        saveUrl = window.TParams.defaultUrl + module + '/save'
    dispatch(loading())
    return fetch(saveUrl, args).then(response => response.json())
        .then(json => {
            dispatch(loaded())
            if (json.code !== 0) {
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                dispatch(showSuccess('保存成功！'))
                //回传添加或修改后的记录    
                dispatch(addToGrid(json.data))
                //回传添加或修改后的记录id,用于页面标识修改痕迹
                //alert(json.data.id)
                //   dispatch(addEditedIds([json.data.id]))
            }
        }).catch(e => {
            dispatch(loaded())
            return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
        }
        )
}

//新增或修改后的记录更新列表
export const addToGrid = (values) => {
    return {
        type: 'ADD_TO_GRID',
        data: values
    }
}

//根据返回
export const fillForm = (json) => (
    {
        type: 'FILL_FORM',
        data: json
    }
)
//获取公告列表
export const getNoticeList = () => (dispatch, getState) => {
    let token = getState().user && getState().user.token;
    let Authorization = token === undefined ? '' : token;
    return fetch("https://infoapi.greenlandilife.com/CommonData/v2/sl_activity/list", {
        method: 'POST',
        headers: {
            Authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acttype: 3,
            userType: 2,
            showtype: 2,
            pageindex: 1,
            pagesize: 10
        })
    }).then(response => response.json())
        .then(json => {
            const { Status: statusCode, Data: data, Message: message } = json;
            return dispatch(getListResult(json))
        })
}