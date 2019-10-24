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
    KeyboardAvoidingView,AsyncStorage,Image,ScrollView,TouchableHighlight
} from 'react-native';
import {Input, Button, Icon,ListItem} from 'react-native-elements';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import {NavigationEvents} from 'react-navigation'
import Tips from '../../utils/tips'
import defaultStyles from '../../res/commonStyle'
//import { Svg,Defs, Stop,Rect,LinearGradient } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {hostUrl} from '../../config/index'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class AwaitPayment extends Component {
    skip=code=>{
        this.props.navigation.navigate('OrderDetails',{code})
    }
    payment=code=>{
        this.props.dispatch({
            type: ActionType.order.payOrder,  
            options: {
              id:code
            },
            extra: {
                navigation:this.props.navigation,
            }
        })
    }
    render() {
        const {list} = this.props
        return (
           <ScrollView style={defaultStyles.container}>
               <NavigationEvents
                    //onDidFocus={payload => !token? this.props.navigation.navigate('Login'): ''}
                    onDidFocus={payload => {
                        this.props.dispatch({
                            type: ActionType.order.getList,  
                            options: {
                                status: "1"
                            }
                        })
                    }}
                />
               {
                   list && list.map((v,i)=>{
                        let status = ""
                        if(v.status=="1"){
                            status = "待付款"
                        }else if(v.status=="2"){
                            status = "待取用"
                        }else if(v.status=="3"){
                            status = "已完成"
                        }else{
                            status = "已取消"
                        }
                       return (
                        <TouchableHighlight key={i} underlayColor='transparent' onPress={this.skip.bind(this,v.code)}>
                            <View style={styles.order}>
                                <View style={[styles.orderDetails,{height:44,alignItems:'center'}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.fontSize12}>订单编号：</Text>
                                        <Text style={{fontSize:12}}>{v.code}</Text>
                                    </View>
                                    <Text style={[styles.fontSize12,{color:'#50B694'}]}>{status}</Text>
                                </View>
                                {
                                    v.data && v.data.map((value,index)=>(
                                        <View key={index} style={[styles.orderDetails,{height:66,marginBottom:10}]}>
                                            <Image source={{uri:value.imageUrl}} style={{height:66,width:66}}/>
                                            <View style={{width:SCREEN_WIDTH-106}}>
                                                <Text numberOfLines={1} style={[styles.fontSize14,{flex:1}]}>{value.name}</Text>
                                                <Text numberOfLines={1} style={[styles.fontSize14,{color:'#9B9B9B'}]}>￥{value.price}/份</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                                <View style={[styles.orderDetails,{height:44,alignItems:'center'}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.fontSize12,{marginRight:10}]}>共<Text style={styles.number}>{v.totalqty}</Text>件</Text>
                                        <Text style={[styles.fontSize12,{color:'#9B9B9B'}]}>合计：<Text style={styles.number}>￥{v.totalmoney}</Text></Text>
                                    </View>
                                    {
                                        v.status=="1"?
                                        <Button
                                            buttonStyle={styles.paymentBut}
                                            title="立即付款"
                                            titleStyle={{fontSize:14}}
                                            onPress={this.payment.bind(this,v.code)}
                                        />
                                        :
                                        null
                                    }
                                    
                                </View>
                            </View>
                        </TouchableHighlight>
                       ) 
                   })
               }
               {
                   list.length==0?
                    <View style={{alignItems:'center',marginTop:50}}>
                        <Text>暂无数据</Text>
                    </View>
                   :
                   null
               }
           </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    let orderList = state.orderList
    let list = []
    orderList && orderList.map((v,i)=>{
        if(v.status=='1'){
            list.push(v)
        }
    })
    return {list}
}
AwaitPayment = connect(mapStateToProps)(AwaitPayment)
export default AwaitPayment;
const styles = StyleSheet.create({
    fontSize12:{
        color:'#9B9B9B',
        fontSize:12
    },
    fontSize14:{
        color:'#4A4A4A',
        fontSize:14
    },
    order:{
        backgroundColor:'#fff',
        
        marginBottom:10
    },
    orderDetails:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:18,
        marginRight:12,
    },
    number:{
        color:'#000',
        fontWeight:'bold'
    },
    paymentBut:{
        width:80,
        height:32,
        backgroundColor:'#FF4400'
    }
})