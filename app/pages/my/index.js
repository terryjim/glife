import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,AsyncStorage,Image,ScrollView,TouchableHighlight,StatusBar
} from 'react-native';
import {Input, Button, Icon,ListItem} from 'react-native-elements';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import {NavigationEvents} from 'react-navigation'
import Tips from '../../utils/tips'
import defaultStyles from '../../res/commonStyle'

const SCREEN_WIDTH = Dimensions
    .get('window')
    .width;
const SCREEN_HEIGHT = Dimensions
    .get('window')
    .height;
const BG_IMAGE = require('../../res/images/bg.png');
class My extends Component {
    constructor(props) {
        super(props); 
    }
    
    render() {
        const {token,mobile,headerurl} = this.props.user
        return (
           <View style={defaultStyles.container}>
               <NavigationEvents
                    //onDidFocus={payload => !token? this.props.navigation.navigate('Login'): ''}
                    onDidFocus={payload => {
                        !token? this.props.navigation.navigate('Login'): ''
                        StatusBar.setBarStyle('light-content')
                    }}
                />
               <ImageBackground style={styles.bgImage} source={BG_IMAGE}>
                   <View style={{height:120,width:150,marginTop:39,marginLeft:18,alignItems:'center'}}>
                       {
                           headerurl?
                           <Image source={{uri:headerurl}} style={styles.headImg}/>
                           :
                           <Image source={require('../../res/images/img.png')} style={styles.headImg}/>
                       }
                       <Text style={styles.headName}>{mobile}</Text>     
                   </View>
               </ImageBackground>
               <View style={{marginTop:18,alignItems:'center'}}>
                    <ListItem
                        containerStyle={{
                            width:SCREEN_WIDTH-18*2,height:66,backgroundColor:'#fff',borderRadius:15,borderWidth:1,borderColor:'#f5f5f5'
                        }}
                        leftElement={(
                            <View style={{width:46,height:46,borderRadius:50,backgroundColor:'#F6FBF7',alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../res/images/order.png')} style={{width:29,height:29}}/>
                            </View>
                        )}
                        rightElement={(
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        )}
                        title='我的订单'
                        titleStyle={{
                            color:'#4A4A4A',
                            fontSize:19
                        }}
                        onPress={()=>{
                            this.props.navigation.navigate('OrdersTabs')
                        }}
                    />
                   <ListItem
                        containerStyle={{
                            width:SCREEN_WIDTH-18*2,height:66,backgroundColor:'#fff',borderRadius:15,borderWidth:1,borderColor:'#f5f5f5'
                        }}
                        leftElement={(
                            <View style={{width:46,height:46,borderRadius:50,backgroundColor:'#F6FBF7',alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../res/images/reservation.png')} style={{width:29,height:29}}/>
                            </View>
                        )}
                        rightElement={(
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        )}
                        title='我的预约'
                        titleStyle={{
                            color:'#4A4A4A',
                            fontSize:19
                        }}
                        onPress={()=>{
                            this.props.navigation.navigate('Reservation')
                        }}
                    />
                    <ListItem
                        containerStyle={{
                            width:SCREEN_WIDTH-18*2,height:66,backgroundColor:'#fff',borderRadius:15,borderWidth:1,borderColor:'#f5f5f5'
                        }}
                        leftElement={(
                            <View style={{width:46,height:46,borderRadius:50,backgroundColor:'#F6FBF7',alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../res/images/introduce.png')} style={{width:29,height:29}}/>
                            </View>
                        )}
                        rightElement={(
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        )}
                        title='关于集家'
                        titleStyle={{
                            color:'#4A4A4A',
                            fontSize:19
                        }}
                        onPress={()=>{
                            this.props.navigation.navigate('About')
                        }}
                    />
                    <ListItem
                        containerStyle={{
                            width:SCREEN_WIDTH-18*2,height:66,backgroundColor:'#fff',borderRadius:15,borderWidth:1,borderColor:'#f5f5f5'
                        }}
                        leftElement={(
                            <View style={{width:46,height:46,borderRadius:50,backgroundColor:'#F6FBF7',alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../../res/images/setting.png')} style={{width:29,height:29}}/>
                            </View>
                        )}
                        rightElement={(
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        )}
                        title='设置'
                        titleStyle={{
                            color:'#4A4A4A',
                            fontSize:19
                        }}
                        onPress={()=>{
                            this.props.navigation.navigate('Setting')
                        }}
                    />
               </View>
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    let user = state.user
    return {user}
}
My = connect(mapStateToProps)(My)
export default My;
const styles = StyleSheet.create({
    bgImage:{
        width: SCREEN_WIDTH,
        height: 199,
    },
    headImg:{
        height:90,
        width:90,
        borderRadius:50
    },
    headName:{
        marginTop:15,
        color:'#fff',
        fontSize:19
    }
})