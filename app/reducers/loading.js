import ActionType from '../config/actionType'
export default loading = (state = false, action) => {
    switch (action.type) {
        case ActionType.common.loading:{
           // alert('loading')
            return true
        }
        case ActionType.common.loaded:{
           // alert('loaded')
            return false
        }
        default:
            return false
    }
}