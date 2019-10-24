import React, { Component } from 'react';
import {  
    Text,
    View,Dimensions,TouchableOpacity,StyleSheet,Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import {RoutersParams} from '../../config'
import NetInfo from "@react-native-community/netinfo"
import { Button } from "react-native-elements";
import {NavigationEvents} from 'react-navigation'
class Introduce extends Component {
    //构造函数
  constructor(props) {
    super(props);
    this.state = {
        isConnected: null
    };
  }
  componentDidMount(){
      //检测网络是否连接
      NetInfo.isConnected.fetch().done((isConnected) => {
        this.setState({isConnected});
        });
        //监听网络变化事件
        NetInfo.addEventListener('change', (networkType) => {
        this.setState({isConnected: networkType})
        })
        let data = {}
        const params = this.props.navigation.state.params;   
        if(params){
            data = params.data
        }else{
            if(RoutersParams&&RoutersParams[0]){
                data = RoutersParams[0].data
            } 
        }
        this.props.dispatch({
            type: ActionType.school.getIsBooked,  
            options: {
                id:data.id
            },
            extra: {
                method:"GET"
            }   
        })
  }
    booking=id=>{ 
        const {user} = this.props
        if(user && user.token){
            this.props.dispatch({
                type: ActionType.school.preBooking,  
                options: {
                    id
                },
                extra: {
                    navigation:this.props.navigation
                }   
            })
        }else{
            this.props.navigation.navigate('Login')
        }
    }
    render() {  
        const {isBooked} = this.props
        let {isConnected} = this.state  
        //const {data} = this.state.data
        let data = {}
        const params = this.props.navigation.state.params;   
        if(params){
            data = params.data
        }else{
            if(RoutersParams&&RoutersParams[0]){
                data = RoutersParams[0].data
            } 
        }
        //data.htmlUrl='http://118.31.73.141:8081/commondata/viewpage/1c3274da-7156-48e7-b14a-5f2f1627260e'
        return (   
            <View style={defaultStyles.container}>
                {
                    isConnected?
                    <React.Fragment>
                        <WebView 
                            source={{uri: data.htmlUrl}}
                            //startInLoadingState={data.loading?false:true}
                            domStorageEnabled={true}
                            javaScriptEnabled={true}
                        />
                        <View style={{height:50,flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{Linking.openURL('tel:'+data.tel)}}>
                            <View style={{backgroundColor:'#fff',height:50,width:SCREEN_WIDTH/2,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:18,color:'#50B694'}}>电话咨询</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            isBooked=='1'?
                            <TouchableOpacity onPress={this.booking.bind(this,data.id)}>
                                <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.specification}>
                                    <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>立即预约</Text>
                                </LinearGradient> 
                            </TouchableOpacity>
                            :
                            <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A1A1A1', '#A1A1A1']} style={styles.specification}>
                                <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>已预约</Text>
                            </LinearGradient> 
                        }
                        
                        </View>
                        </React.Fragment>
                    :
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text>网络正在开小差</Text> 
                            <Button
                                title="刷新"
                                onPress={()=>{
                                NetInfo.isConnected.fetch().done((isConnected) => {
                                    this.setState({isConnected});
                                });
                                }}
                            />
                        </View> 
                    }
                
                
            </View>
            
        )
    }
}
const mapStateToProps = (state) => {
    const user = state.user
    const isBooked = state.isBooked
    return {user,isBooked}
}
Introduce = connect(mapStateToProps)(Introduce)
export default Introduce;
const styles = StyleSheet.create({
    specification:{
        width:SCREEN_WIDTH/2,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    }
})

