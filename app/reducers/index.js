import {combineReducers} from 'redux'
import user from './user'
import loading from './loading'
import sms from './sms'
import menuList from './menuList'
import {lifePageList} from './life'
import {catePageList} from './cate'
import {schoolPageList,isBooked} from './school'
import {searchList,keywordList} from './search'
import {drinkList,drinkOrder,specprodList} from './drink'
import {orderList,orderDetails} from './order'
import bookingList from './bookingList'
import weather from './weather'
import {aboutGLife,userAgreement,privacyPolicy} from './staticPage'
import agreement from './agreement'
/* import err from './err'
import success from './success'
import confirm from './confirm'  */
/* import cList from './cList'
import announcementList from './announcementList'
import activitiesList from './activitiesList'
import gateList from './gateList'
import sms from './sms'
import loading from './loading'
import localGates from './localGates' */
/* import cForm from './cForm'
import loading from './loading'
import inhabitantList from './inhabitantList' */
/* import propertyList from './propertyList' */
/* import buildingList from './buildingList'
import { reducer as formReducer } from 'redux-form' */
// export default combineReducers({user,form:formReducer,sms}) export default
// combineReducers({loading,buildingList,inhabitantList,cList,cForm,confirm,user,
// err,success,form: formReducer })

const appReducer = combineReducers({
    user, loading, sms,menuList,lifePageList,catePageList,schoolPageList,searchList,keywordList,drinkList,drinkOrder,specprodList,
    orderList,orderDetails,weather,bookingList,aboutGLife,userAgreement,privacyPolicy,agreement,isBooked
})
const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer
