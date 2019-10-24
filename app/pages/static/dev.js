import React, { Component } from 'react';
import {  
    Text,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import {hostUrl} from '../../config/index'

export default class Dev extends Component {
    render() {       
        return (   
            <WebView 
                source={{uri: hostUrl+'/glife/app/dev.html'}}
                //startInLoadingState={data.loading?false:true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
            >
            </WebView>
        )
    }
}

