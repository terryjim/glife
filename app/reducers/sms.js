import ActionType from '../config/actionType'
export default sms = (state = false, action) => {
    switch (action.type) {
        case ActionType.common.smsSucceed:{
           // alert('loading')
            return true
        }
        case ActionType.common.smsFailure:{
           // alert('loaded')
            return false
        }
        default:
            return false
    }
}