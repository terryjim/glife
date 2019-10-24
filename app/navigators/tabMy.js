import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import My from '../pages/my'
import defaultNavigationOptions from './defaultNavigationOptions'
let TabMy = createSwitchNavigator({
    tabMy_my: {
        /*  navigationOptions: {
            header: null
        },*/
        navigationOptions: {
            title: '首页'
        },
        screen: My
    }
}, {
    initialRouteName: "tabMy_my",
    defaultNavigationOptions
})

export default TabMy
