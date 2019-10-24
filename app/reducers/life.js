import ActionType from '../config/actionType'
export const lifePageList = (state = [], action) => {
    if (action.type === ActionType.life.fillList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}