export default ActionType = {
    auth: {
        login: Symbol('login'),
        loginOut: Symbol('loginOut'),
        logined: Symbol('logined'),
        chgPwd: Symbol('chgPwd'),
        register: Symbol('register'),
        resetPassword: Symbol('resetPassword'),
        updateMobile: Symbol('updateMobile'),
        uploadHeader: Symbol('uploadHeader'),
    },
    common: {
        loading: Symbol('loading'),
        loaded: Symbol('loaded'),
        sendsms: Symbol('sendsms'),
        smsSucceed: Symbol('smsSucceed'),
        smsFailure: Symbol('smsFailure'),
        getWeather: Symbol('getWeather'),
        fillWeather: Symbol('fillWeather'),
        agreeUserAgreement: Symbol('agreeUserAgreement')
    },
    home: {
        menuClick:Symbol('home_menuClick')
    },
    life:{
        getList: Symbol('life_getList'),
        fillList: Symbol('life_fillList')
    },
    cate:{
        getList: Symbol('cate_getList'),
        fillList: Symbol('cate_fillList')
    },
    school:{
        getList: Symbol('school_getList'),
        fillList: Symbol('school_fillList'),
        preBooking: Symbol('school_preBooking'),
        getIsBooked: Symbol('school_getIsBooked'),
        fillIsBooked: Symbol('school_getfillIsBooked'),
    },
    search:{
        getSearchList: Symbol('search_getSearchList'),
        fillSearchList: Symbol('search_fillSearchList'),
        getKeywordList: Symbol('search_getKeywordList'),
        fillKeywordList: Symbol('search_fillKeywordList'),
        clearSearchList: Symbol('search_clearSearchList')
    },
    drink:{
        getList: Symbol('drink_getList'),
        fillList: Symbol('drink_fillList'),
        add: Symbol('drink_add'),
        minus: Symbol('drink_minus'),
        getSpecprod: Symbol('drink_getSpecprod'),
        fillSpecprod: Symbol('drink_fillSpecprod'),
        orderClear: Symbol('drink_orderClear'),
        takeOrder: Symbol('drink_takeOrder')
    },
    order:{
        getList: Symbol('order_getList'),
        fillList: Symbol('order_fillList'),
        fillDetails: Symbol('order_fillDetails'),
        payOrder: Symbol('order_payOrder')
    },
    reservation:{
        getList: Symbol('reservation_getList'),
        fillList: Symbol('reservation_fillList')
    },
    staticPage:{
        getstaticPage: Symbol('staticPage_getstaticPage'),
        fillAbout: Symbol('staticPage_fillAbout'),
        fillPrivacy: Symbol('staticPage_fillPrivacy'),
        fillAgreement: Symbol('staticPage_fillAgreement')
    }
}