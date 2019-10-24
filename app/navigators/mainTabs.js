import React from 'react';
import {Text, View, Image} from 'react-native';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import TabGLife from './tabGLife'
import TabMy from './tabMy'
import TabSearch from './tabSearch'
import { createBottomTabNavigator } from 'react-navigation-tabs';

const MainTabs = createBottomTabNavigator({
    mainTabs_glife: {
        screen: TabGLife,
        navigationOptions: {
            title: '集家',
            tabBarIcon: ({focused, tintColor}) => (<Image
                source={focused
                ? require('../res/images/glife_hover.png')
                : require('../res/images/glife.png')}
                style={{
                width: 26,
                height: 26,
              /*   tintColor: tintColor */
            }}/>)
        }
    },
    mainTabs_search: {
        screen: TabSearch,
        navigationOptions: {
            title: '搜索',
            tabBarIcon: ({focused, tintColor}) => (<Image
                source={focused
                ? require('../res/images/search_hover.png')
                : require('../res/images/search.png')}
                style={{
                width: 26,
                height: 26,
            /*     tintColor: tintColor */
            }}/>)
        }
    },
    mainTabs_my: {
        screen: TabMy,
        navigationOptions: {
            title: '我的',
            tabBarIcon: ({focused, tintColor}) => (<Image
                source={focused
                ? require('../res/images/my_hover.png')
                : require('../res/images/my.png')}
                style={{
                width: 26,
                height: 26,
              /*   tintColor: tintColor */
            }}/>)
        }
    }
}, {
    tabBarOptions: {
        activeTintColor :'green',
        style: {            
            backgroundColor: '#fff',
            paddingBottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: '#25869A', 
            //height:40
        }
    }
})

export default MainTabs