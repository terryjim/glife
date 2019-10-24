import ActionType from '../config/actionType'
import {hostUrl} from '../config'
const agreement = (state = true, action) => {
    if (action.type === ActionType.common.agreeUserAgreement) {
        state = false          
    }
    if (action.type === 'RESET_STORE') {
        state = false          
    }
    return state;

}
export default agreement;