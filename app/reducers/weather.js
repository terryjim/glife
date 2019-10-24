import ActionType from '../config/actionType'
const weather = (state = {}, action) => {
    if (action.type === ActionType.common.fillWeather) {
        state = Object.assign({}, state, action.payload)
    }
    return state;

}
export default weather;