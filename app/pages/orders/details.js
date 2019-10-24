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
import defaultStyles, { commonStyle } from '../../res/commonStyle'
//import { Svg,Defs, Stop,Rect,LinearGradient } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {hostUrl} from '../../config/index'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class Details extends Component {
    constructor(props) {
        super(props); 
    }
    componentDidMount(){
        const data = this.props.navigation.state.params;  
        this.props.dispatch({
            type: ActionType.order.getList,  
            options: {
              code:data.code
            }
        })
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
        const {orderDetails} = this.props
        return (
           <View style={defaultStyles.container}>
               <ScrollView>
               {
                   orderDetails[0]&&orderDetails[0].status!="1"?
                    <View style={{marginTop:6,backgroundColor:'#fff',}}>
                        <View style={{height:44,justifyContent:'center',borderBottomColor:'#9B9B9B',borderBottomWidth:1}}>
                            <Text style={{color:'#4A4A4A',fontSize:19,marginLeft:18}}>就饮编号</Text>
                        </View>
                        {/* <View style={{height:92,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#50B694',fontSize:50,fontWeight:'bold'}}>{orderDetails[0]&&orderDetails[0].appointmentno}<Text style={{fontSize:14,color:'#9B9B9B'}}>  号</Text></Text>
                            <Text style={{color:'#9B9B9B',fontSize:12}}>请稍作等待，您前面还有{orderDetails[0]&&orderDetails[0].beforecount}个号</Text>
                        </View> */}
                        {
                            orderDetails[0].status!='3'&&orderDetails[0].status!='4'?
                            <View style={{height:92,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#50B694',fontSize:50,fontWeight:'bold'}}>{orderDetails[0]&&orderDetails[0].appointmentno}<Text style={{fontSize:14,color:'#9B9B9B'}}>  号</Text></Text>
                                <Text style={{color:'#9B9B9B',fontSize:12}}>请稍作等待，您前面还有{orderDetails[0]&&orderDetails[0].beforecount}个号</Text>
                            </View>
                            :null
                        }
                        {
                            orderDetails[0].status=='3'?
                            <View style={{height:92,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../res/images/orderAccon.png')} style={{width:160,height:55}}/>
                            </View>
                            :null
                        }
                        {
                            orderDetails[0].status=='4'?
                            <View style={{height:92,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../../res/images/orderCancel.png')} style={{width:160,height:55}}/>
                            </View>
                            :null
                        }
                    </View>
                    :
                    null
               }
               <View style={{marginTop:6,backgroundColor:'#fff',}}>
                    <View style={{height:44,justifyContent:'center',borderBottomColor:'#9B9B9B',borderBottomWidth:1}}>
                        <Text style={{color:'#4A4A4A',fontSize:19,marginLeft:18}}>就饮内容</Text>
                    </View>
                    {
                       orderDetails && orderDetails[0] && orderDetails[0].data && orderDetails[0].data.map((v,i)=>(
                            <View key={i} style={{height:110,justifyContent:'center',marginHorizontal:18}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri:v.imageUrl}} style={{height:80,width:80}}/>
                                    <View style={{marginLeft:10,justifyContent:'space-between',flex:1}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                            <Text style={{color:'#4A4A4A',fontSize:14}}>{v.name}</Text>
                                            <Text style={{color:'#4A4A4A',fontSize:14}}>{v.price}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1}}>
                                            <Text style={{color:'#9B9B9B',fontSize:14}}>x{v.qty}</Text>
                                        </View>
                                        <Text style={{color:'#9B9B9B',fontSize:12}}>{v.prodspec}</Text>
                                    </View>
                                </View>
                            </View>
                       ))
                   }
                    <View style={{height:44,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:18}}>
                        <Text style={{color:'#4A4A4A',fontSize:19}}>实付金额</Text>
                        <Text style={{color:'#FF4400',fontSize:19}}>￥{orderDetails[0]&&orderDetails[0].totalmoney}</Text>
                    </View>
               </View>
               <View style={{marginTop:6,backgroundColor:'#fff',}}>
                    <View style={{height:44,justifyContent:'center',borderBottomColor:'#9B9B9B',borderBottomWidth:1}}>
                        <Text style={{color:'#4A4A4A',fontSize:19,marginLeft:18}}>订单信息</Text>
                    </View>
                    <View style={{height:44,justifyContent:'center'}}>
                        <Text style={{color:'#4A4A4A',fontSize:14,marginLeft:18}}>订单编号：{orderDetails[0]&&orderDetails[0].code}</Text>
                    </View>
                    <View style={{height:44,justifyContent:'center'}}>
                        <Text style={{color:'#4A4A4A',fontSize:14,marginLeft:18}}>创建时间：{orderDetails[0]&&orderDetails[0].createTime}</Text>
                    </View>
               </View>
               </ScrollView>
               {
                   orderDetails[0]&&orderDetails[0].status=="1"?
                    <View style={{
                        // position: 'absolute',
                        // //top: SCREEN_HEIGHT-60-commonStyle.navHeight,
                        // //left: 0,
                        // bottom: 0,
                        // right: 0,
                        backgroundColor: 'rgba(1, 1, 1, 0.5)',
                        height:60,
                        justifyContent:'center',
                        width:SCREEN_WIDTH
                    }}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                            <Button
                                buttonStyle={{
                                    backgroundColor:'#FF4400',
                                    width:114,
                                    height:44,
                                    marginRight:28
                                }}
                                title="立即付款"
                                titleStyle={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#fff'
                                }}
                                type="clear"
                                onPress={this.payment.bind(this,orderDetails[0]&&orderDetails[0].code)}
                            /> 
                        </View>
                    </View>
                    :
                    null
               }
               
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    let orderDetails = state.orderDetails
    return {orderDetails}
}
Details = connect(mapStateToProps)(Details)
export default Details;
const styles = StyleSheet.create({
})