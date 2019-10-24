import ActionType from '../config/actionType'
export const catePageList = (state = [], action) => {
    if (action.type === ActionType.cate.fillList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}