import React, {Component} from 'react';
import { Text, View, Image,TouchableHighlight } from 'react-native';
import {  createSwitchNavigator} from 'react-navigation';
import { Input, Button, Icon, ListItem, Avatar,Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import MainTabs from './mainTabs'
import Reservation from '../pages/reservation'
import Details from '../pages/reservation/details'
import Setting from '../pages/setting'
import Life from '../pages/life'
import School from '../pages/school'
import Cate from '../pages/cate'
import Drink from '../pages/drink'
import Ps from '../pages/life/ps'
import AllOrders from '../pages/orders/all'
import AwaitPayment from '../pages/orders/awaitPayment'
import AwaitTake from '../pages/orders/awaitTake'
import OrdersAccomplish from '../pages/orders/accomplish'
import OrdersCancel from '../pages/orders/cancel'
import OrderDetails from '../pages/orders/details'
import About from '../pages/about'
import defaultNavigationOptions from './defaultNavigationOptions'
import Register from '../pages/auth/register'
import NewPwd from '../pages/auth/newPwd'
import Iforgot from '../pages/auth/iforgot'
import Login from '../pages/auth/login'
import ChgPwd from '../pages/auth/chgPwd'
import Camera from '../pages/setting/camera'
import TakeOrder from '../pages/drink/takeOrder'
import AccountModify from '../pages/auth/accountModify'
import SchoolIntroduce from '../pages/school/introduce'
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import {hisRouters,shieldRouters} from '../config'
import Agreement from '../pages/static/agreement'
import Privacy from '../pages/static/privacy'
import Dev from '../pages/static/dev'
import Car from '../pages/car'
import Lgc from '../pages/lgc'
import Yxf from '../pages/yxf'
import Xyfw from '../pages/xyfw'
import Sqms from '../pages/sqms'
import Kitchen from '../pages/cate/kitchen'
const But = (props) => {
    const {title,func} = props
    return (
        <Button
            title={title}
            titleStyle={{
                fontSize:15,color:'#fff'
            }}
            type="clear"
            onPress={func}
        />
    )
}
const OrdersTabs = createMaterialTopTabNavigator({
    AllOrders: {
        screen: AllOrders,
        navigationOptions: {
            title: '全部'
        }
    },
    AwaitPayment: {
        screen: AwaitPayment,
        navigationOptions: {
            title: '待付款'
        }
    },
    AwaitTake: {
        screen: AwaitTake,
        navigationOptions: {
            title: '待取用'
        }
    },
    OrdersAccomplish: {
        screen: OrdersAccomplish,
        navigationOptions: {
            title: '已完成'
        }
    },
    OrdersCancel: {
        screen: OrdersCancel,
        navigationOptions: {
            title: '已取消'
        }
    },
}, {
    initialRouteName: 'AllOrders',
    tabBarOptions:{
        activeTintColor:"#50B694",
        inactiveTintColor:"#9B9B9B",
        style:{
            backgroundColor:'#fff'
        },
        indicatorStyle:{
            borderBottomWidth:1,
            backgroundColor:'#50B694'
        },
        labelStyle:{
            fontSize:12
        },
        tabStyle:{
            borderBottomColor:'#50B694',
            borderBottomWidth:1
        }
    },
})
let auth = createStackNavigator({
    Register: {
        navigationOptions:(props)=> {
            return {
                title: '注册',
                headerRight:(
                    <But title="登录" props func={()=>{
                        props.navigation.navigate('Login')
                    }}/>
                )
            }
        },
        screen: Register
    },
    NewPwd: {
        navigationOptions:(props)=> {
            return {
                title: '输入新密码',
                // headerRight:(
                //     <But title="注册" props func={()=>{
                //         props.navigation.replace('Register')
                //     }}/>
                // )
            }
        },
        screen: NewPwd
    },
    Iforgot: {
        navigationOptions:(props)=> {
            return {
                title: '找回密码'
            }
        },
        screen: Iforgot
    },
    Login: {
        navigationOptions:(props)=> {
            return {
                title: '登录',
                headerRight:(
                    <But title="注册" props func={()=>{
                        props.navigation.navigate('Register')
                    }}/>
                ),
                headerLeft:(
                    <Icon
                        name='arrowleft'
                        type='antdesign'
                        color='#fff'
                        size={22}
                        containerStyle={{
                            marginLeft:30
                        }}
                        onPress={()=>{
                            props.navigation.navigate(hisRouters[hisRouters.length-2])
                        }}
                    /> 
                )
            }
        },
        screen: Login
    },
    AuthPrivacy:{
        navigationOptions: {
            title: '隐私条款'
        },
        screen: Privacy
    },
    AuthAgreement:{
        navigationOptions: {
            title: '用户协议'
        },
        screen: Agreement
    },
}, {
    initialRouteName: "Login",
    defaultNavigationOptions
})
let navigator = createStackNavigator({
    Kitchen:{
        navigationOptions: {
            title: '共享厨房'
        },
        screen: Kitchen
    },
    Sqms:{
        navigationOptions: {
            title: '社区美食'
        },
        screen: Sqms
    },
    Xyfw:{
        navigationOptions: {
            title: '洗衣服务'
        },
        screen: Xyfw
    },
    Yxf:{
        navigationOptions: {
            title: '优选坊'
        },
        screen: Yxf
    },
    Lgc:{
        navigationOptions: {
            title: '炼工场'
        },
        screen: Lgc
    },
    Car:{
        navigationOptions: {
            title: '车工坊'
        },
        screen: Car
    },
    Dev:{
        navigationOptions: {
            title: '开发中'
        },
        screen: Dev
    },
    Privacy:{
        navigationOptions: {
            title: '隐私条款'
        },
        screen: Privacy
    },
    Agreement:{
        navigationOptions: {
            title: '用户协议'
        },
        screen: Agreement
    },
    SchoolIntroduce:{
        navigationOptions: {
            title: '详情介绍'
        },
        screen: SchoolIntroduce
    },
    TakeOrder:{
        navigationOptions: {
            title: '确认订单'
        },
        screen: TakeOrder
    },
    Camera:{
        navigationOptions: {
            title: '拍照'
        },
        screen: Camera
    },
    ChgPwd:{
        navigationOptions: {
            title: '密码修改'
        },
        screen: ChgPwd
    },
    AccountModify:{
        navigationOptions: {
            title: '账号变更'
        },
        screen: AccountModify
    },
    About: {
        navigationOptions: {
            title: '关于集家'
        },
        screen: About
    },
    OrderDetails:{
        navigationOptions: {
            title: '订单详情'
        },
        screen: OrderDetails
    },
    OrdersTabs:{
        navigationOptions: {
            title: '我的订单'
        },
        screen: OrdersTabs
    },
    Ps:{
        navigationOptions: {
            title: '物业服务'
        },
        screen: Ps
    },
    Drink:{
        navigationOptions: {
            title: '水吧咖啡'
        },
        screen: Drink
    },
    Cate:{
        navigationOptions: {
            title: '食味坊'
        },
        screen: Cate
    },
    School:{
        navigationOptions: {
            title: '三点学堂'
        },
        screen: School
    },
    Life:{
        navigationOptions: {
            title: '生活汇坊'
        },
        screen: Life
    },
    Setting:{
        navigationOptions: {
            title: '账户管理'
        },
        screen: Setting
    },
    Details:{
        navigationOptions: {
            title: '预约详情'
        },
        screen: Details
    },
    Reservation:{
        navigationOptions: {
            title: '我的预约'
        },
        screen: Reservation
    },
    
    MainTabs: {
        navigationOptions: {
            header: null,
        },
        screen: MainTabs
    }
}, {
    initialRouteName: "MainTabs",
    defaultNavigationOptions
})

let MainNavigator = createSwitchNavigator({
    auth,
    navigator
}, {
    initialRouteName: "navigator",
    defaultNavigationOptions
})

export default MainNavigator