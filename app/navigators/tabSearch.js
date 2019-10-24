import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import Search from '../pages/search'
import defaultNavigationOptions from './defaultNavigationOptions'

let TabSearch = createSwitchNavigator({
    tabSearch_index: {
        navigationOptions: {
            title: '首页'
        },
        screen: Search
    }
}, {
    initialRouteName: "tabSearch_index",
    defaultNavigationOptions
})

export default TabSearch
