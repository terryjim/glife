import ActionType from '../config/actionType'
export const aboutGLife = (state = {}, action) => {
    if (action.type === ActionType.staticPage.fillAbout) {
        if (action.payload != null) {
            state = Object.assign({}, state, action.payload)
        } else {
            state = {}
        }
    }
    return state;
}  
export const userAgreement = (state = {}, action) => {
    if (action.type === ActionType.staticPage.fillAgreement) {
        if (action.payload != null) {
            state = Object.assign({}, state, action.payload)
        } else {
            state = {}
        }
    }
    return state;
} 
export const privacyPolicy = (state = {}, action) => {
    if (action.type === ActionType.staticPage.fillPrivacy) {
        if (action.payload != null) {
            state = Object.assign({}, state, action.payload)
        } else {
            state = {}
        }
    }
    return state;
} 