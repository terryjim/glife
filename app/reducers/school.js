import ActionType from '../config/actionType'
export const schoolPageList = (state = [], action) => {
    if (action.type === ActionType.school.fillList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}
export const isBooked = (state = '0', action) => {
    if (action.type === ActionType.school.fillIsBooked) {
        if (action.payload != null) {
            state = action.payload
        } else {
            state = '0'
        }
    }
    return state;
}