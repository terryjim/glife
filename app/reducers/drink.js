import ActionType from '../config/actionType'
export const drinkList = (state = {}, action) => {
    if (action.type === ActionType.drink.fillList) {
        if (action.payload != null) {
            state = Object.assign({}, state, action.payload)
        } else {
            state = {}
        }
    }
    return state;
}  
//规格列表
export const specprodList = (state = [], action) => {
    if (action.type === ActionType.drink.fillSpecprod) {
        if (action.payload != null) {
            state = [].concat(action.payload)
        } else {
            state = []
        }
    }
    return state;
}
export const drinkOrder = (state = {}, action) => {
    if (action.type === ActionType.drink.add) {
        let product = state[action.payload.targetId]
        if(product){
            let findVal = product.find(item=>{return item.id===action.payload.detail.id})
            if(findVal){
                let i = product.findIndex(item=>{return item.id===action.payload.detail.id})
                product.splice(i, 1)
            }
            product.push(action.payload.detail)
        }else{
            state[action.payload.targetId]=[
                action.payload.detail
            ]
        }
        state = Object.assign({}, state)       
    }
    if(action.type === ActionType.drink.minus){
        let product = state[action.payload.targetId]
        let findVal = product.find(item=>{return item.id===action.payload.id})
        let i = product.findIndex(item=>{return item.id===action.payload.id})
        let number = findVal.number-1
        if(number==0){
            product.splice(i, 1)
        }else{
            product[i].number = number
        }
        state = Object.assign({}, state)
    }
    if(action.type === ActionType.drink.orderClear){
        state = {}
    }
    if (action.type === 'RESET_STORE') {
        state = {}          
    }
    return state;

}