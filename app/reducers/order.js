import ActionType from '../config/actionType'
export const orderList = (state = [], action) => {
    if (action.type === ActionType.order.fillList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}
export const orderDetails = (state = [], action) => {
    if (action.type === ActionType.order.fillDetails) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}