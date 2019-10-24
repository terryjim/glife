import ActionType from '../config/actionType'
const user = (state = {
    //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6IjE4OTc4OTY1NzI3NjM3MzQ3MyIsInR5cGUiOiJhcHAiLCJ0aW1lc3RhbXAiOiIxNTY1OTI1ODk1NTY4In0.MmAYZwRd2FEryKSkdeVZ5Pw8BZpey3G1Y1D3ddLn8hU'
}, action) => {
    if (action.type === ActionType.auth.logined) {
        /*  alert(JSON.stringify(action)) */
        // state = Object.assign({}, { token: action.token, userName: action.userName,
        // expired: action.expired, propertyId: action.propertyId, propertyProjectId:
        // action.propertyProjectId, companyName: action.companyName })
        state = Object.assign({}, state, action.payload)
    }
    // if (action.type === ActionType.auth.loginOut) {
    //     state = Object.assign({}, null)
    // }
   /*  if (action.type === 'LOGIN_FAILURE') {
        state = Object.assign({}, null)
    }
    if (action.type === 'RESET_USER_PASSWORD') {
        if (action.data != null) 
            state = Object.assign({}, action.data)
        else 
            state = Object.assign({}, {})
    }
    if (action.type === 'USER_VERIFT_STATUS') {
        if (action.data != null) 
            state = Object.assign({}, action.data)
        else 
            state = Object.assign({}, {})
    } */
    return state;

}
export default user;