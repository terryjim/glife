import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,Image,TouchableOpacity,StatusBar
} from 'react-native';
import { Input,Icon,ListItem,Button} from 'react-native-elements';
import {connect} from 'react-redux'
import defaultStyles, { commonStyle } from '../../res/commonStyle'
import {NavigationEvents, ScrollView} from 'react-navigation'
import Modal from "react-native-modal";
import ActionType from '../../config/actionType'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class TakeOrder extends Component {
    componentDidMount(){
        const data = this.props.navigation.state.params;  
        this.props.dispatch({
            type: ActionType.order.getList,  
            options: {
              code:data.code
            }
        })
    }
    payment=()=>{
        const data = this.props.navigation.state.params;
        this.props.dispatch({
            type: ActionType.order.payOrder,  
            options: {
              id:data.code
            },
            extra: {
                navigation:this.props.navigation
            }
        })
    }
    render() { 
        const {orderDetails} = this.props
        return (
            <View style={defaultStyles.container}>
               <ScrollView style={{marginTop:6,backgroundColor:'#fff',marginBottom:60}}>
                   {
                       orderDetails && orderDetails[0] && orderDetails[0].data && orderDetails[0].data.map((v,i)=>(
                            <View key={i} style={{height:110,justifyContent:'center',marginHorizontal:18}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri:v.imageUrl}} style={{width:80,height:80}}/>
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
               </ScrollView>
               <View style={{
                    position: 'absolute',
                    //top: SCREEN_HEIGHT-60-commonStyle.navHeight,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(1, 1, 1, 0.5)',
                    height:60,
                    justifyContent:'center'
                }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        
                        <Text style={{color:'#fff',fontSize:12,marginLeft:18}}>
                            共{orderDetails&&orderDetails[0]&&orderDetails[0].totalqty}件   <Text style={{height:20}}>合计<Text style={{fontSize:24,fontWeight:'bold'}}>￥{orderDetails&&orderDetails[0]&&orderDetails[0].totalmoney}</Text></Text> 
                        </Text> 
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
                            onPress={this.payment}
                        /> 
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    //let user = state.user
    let orderDetails = state.orderDetails
    return {orderDetails}
}
TakeOrder = connect(mapStateToProps)(TakeOrder)
export default TakeOrder;
