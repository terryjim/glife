import ActionType from '../config/actionType'
export const keywordList = (state = [], action) => {
    if (action.type === ActionType.search.fillKeywordList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}
export const searchList = (state = [], action) => {
    if (action.type === ActionType.search.fillSearchList) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    if (action.type === ActionType.search.clearSearchList) {
        state = []
    }
    return state;
}