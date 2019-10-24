export const netTimeout = 20000 //缺省网络超时设定20s
export const delayLoadingTime = 300 //缺省0.3s之内加载完成则不显示加载状态

// 请求连接前缀
export const baseUrl = 'http://192.168.3.160:8055'
//export const baseUrl = 'http://116.62.234.141:8056'

// 输出日志信息
export const noConsole = false
export const defaultPageSize = 20

//首页图片地址前缀
export const hostUrl = 'http://192.168.3.160'
//export const hostUrl = 'http://shop.greenlandilife.com/upImages'

export const apiUrl = {
    //登陆
    login: baseUrl + '/app/common/loginApp',
    //注册
    appRegister: baseUrl + '/app/common/registerApp',
    //忘记密码
    resetPassword: baseUrl + '/app/common/findPD',
    //修改密码
    chgPwd: baseUrl + '/app/user/updatePD',
    //退出登陆
    loginOut: baseUrl + '/app/user/loginOut',
    //更新账户
    updateMobile: baseUrl + '/app/user/updateMobile',
    //二级列表获取
    secondPage: baseUrl + '/app/common/getSecPage',
    //三点学堂
    studentPage: baseUrl + '/app/common/getStudentPage',
    //发送短信
    sendSms: baseUrl + '/app/common/sms',
    //热门搜索关键词
    appKeyword: baseUrl + '/app/common/getAppKeyword',
    //热门搜索列表
    search: baseUrl + '/app/common/search',
    //获取指定服务产品列表
    product: baseUrl + '/app/common/prodlist/paging',
    //获取指定服务产品规格列表
    specprod: baseUrl + '/app/common/specprod',
    //去结算
    takeOrder: baseUrl + '/app/order/takeOrder',
    //获取我的订单列表
    myOrder: baseUrl + '/app/order/myorder/paging',
    //订单付款
    payOrder: baseUrl + '/app/order/payOrder',
    //天气预报
    weather: baseUrl + '/app/common/Tianqi',
    //预约
    preBooking: baseUrl + '/app/order/preBooking',
    //我的预约列表
    myBooking: baseUrl + '/app/order/myBooking/paging',
    //关于集家、隐私条款、用户协议
    staticPage: baseUrl + '/app/common/getStaticPage',
    //上传个人图像
    uploadHeader: baseUrl + '/app/user/uploadHeader',
    //检查产品当天是否已预订
    isbooked: baseUrl + '/app/order/isbooked',

}
export const hisRouters=['mainTabs_glife']   //历史路由
export const shieldRouters=['Register','NewPwd','Iforgot','Login','ChgPwd','Privacy','Agreement','AccountModify','AuthPrivacy','AuthAgreement']
export const RoutersParams=[]
export const navigation=[]