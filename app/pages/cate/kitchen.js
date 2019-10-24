import React, { Component } from 'react';
import {  
    Text,
    View
} from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo"
import { Button } from "react-native-elements";
export default class Kitchen extends Component {
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
    }
    render() {         
        let {isConnected} = this.state  
        return (   
            <View style={defaultStyles.container}>
                {
                    isConnected?
                        <WebView 
                            source={{uri: 'http://192.168.3.160:8090/html/152'}}
                            //startInLoadingState={data.loading?false:true}
                            domStorageEnabled={true}
                            javaScriptEnabled={true}
                        >
                        </WebView>
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

