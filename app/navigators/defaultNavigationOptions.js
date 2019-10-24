import React, {Component} from 'react';
import { Text, View, Image,TouchableHighlight } from 'react-native';
import {commonStyle} from '../res/commonStyle'
import LinearGradient from 'react-native-linear-gradient';
export default defaultNavigationOptions = {
    headerStyle: {
        //backgroundColor: commonStyle.navThemeColor,
        elevation: 0.5,
        height:commonStyle.navHeight,
        paddingTop:commonStyle.navStatusBarHeight
    },
    headerBackTitle:null,
    headerTintColor: commonStyle.navTitleColor,
    headerTitleStyle: {
        fontWeight: 'bold',flex:1,textAlign:'center'
    },
    headerRight: <View style={{width: 40, height: 1,}}/>,
    headerBackground: <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={{flex:1}}></LinearGradient>
}