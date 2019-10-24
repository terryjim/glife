import ActionType from '../config/actionType'
const bookingList = (state = {}, action) => {
    if (action.type === ActionType.reservation.fillList) {
        state = Object.assign({}, state, action.payload)
    }
    return state;

}
export default bookingList;