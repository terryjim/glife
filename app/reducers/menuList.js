import ActionType from '../config/actionType'
import {hostUrl} from '../config'
let data = [
    {img:hostUrl+'/glife/app/1.png',ratio:1,height:1,clickNumber:0,key:'shhf',moduleAddress:'Life'},
    {img:hostUrl+'/glife/app/2.png',ratio:1,height:1,clickNumber:0,key:'cgf',moduleAddress:'Car'},
    {img:hostUrl+'/glife/app/3.png',ratio:1,height:1,clickNumber:0,key:'sdxt',moduleAddress:'School'},
    {img:hostUrl+'/glife/app/4.png',ratio:1,height:1,clickNumber:0,key:'mhc',moduleAddress:'Drink'},
    {img:hostUrl+'/glife/app/5.png',ratio:1,height:1,clickNumber:0,key:'swf',moduleAddress:'Cate'},
    {img:hostUrl+'/glife/app/6.png',ratio:1,height:1,clickNumber:0,key:'lgc',moduleAddress:'Lgc'},
    {img:hostUrl+'/glife/app/7.png',ratio:1,height:1,clickNumber:0,key:'syt',moduleAddress:'Dev'},
    {img:hostUrl+'/glife/app/8.png',ratio:1,height:1,clickNumber:0,key:'yxf',moduleAddress:'Yxf'},
]
const menuList = (state = data, action) => {
    if (action.type === ActionType.home.menuClick) {
        let menu = state.find((value)=>action.options.key===value.key)
        menu.clickNumber++
        state = [].concat(state)          
    }
    if (action.type === 'RESET_STORE') {
        state = [].concat(data)          
    }
    return state;

}
export default menuList;