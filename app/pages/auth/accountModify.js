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
    KeyboardAvoidingView,Image,TouchableHighlight
} from 'react-native';
import defaultStyles from '../../res/commonStyle'
import {Input, Button, Icon} from 'react-native-elements';

import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import FieldValidate from '../../utils/FieldValidate'
import Tips from '../../utils/tips'
import crypto from "crypto-js"
import LinearGradient from 'react-native-linear-gradient';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const logoPng = require('../../res/images/logo.png');
const MobilePng = require('../../res/images/mobile.png');
const VerifyPng = require('../../res/images/verify.png');

class AccountModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile:'',
            sms:'',
            isSendSMS:0,
            second:60,
        };
    }
    componentDidUpdate() {
        if (this.props.sms) {
            //短信发送成功，修改短信发送状态
            this.props.dispatch({type: ActionType.common.smsFailure})
            //开始倒计时
            this.bulletincd()
        }
    }
    bulletincd=()=>{
        let timer = setInterval(() => {
            let second = this.state.second
            this.setState({second:--second});
            if(second===0){
            clearInterval(timer);
            this.setState({
                second:60,
                isSendSMS:0
            })
            }
        }, 1000);
        this.setState({
            isSendSMS:1
        });
    }
    sendSms = () =>{
        let {mobile} = this.state
        if(!FieldValidate.mobile(mobile)){
            Tips.toast("手机号格式不正确")
            return
        }
        this.props.dispatch({
            type: ActionType.common.sendsms, 
            options: {
                mobile,
                type:1
            },
            
        })
    }
    submit=()=>{
        let {mobile,sms} = this.state
        if(!FieldValidate.mobile(mobile)){
            Tips.toast("手机号格式不正确")
            return
        }
        if(!sms){
            Tips.toast("请输入验证码")
            return
        } 
        this.props.dispatch({
            type: ActionType.auth.updateMobile, 
            options: {
                mobile,smsCode:sms
            },
            extra:{
                navigation:this.props.navigation
            }
        }) 
    }
    render() {
        let {mobile,sms,isSendSMS,second} = this.state
        return (
            <View style={defaultStyles.container}>
                <KeyboardAvoidingView contentContainerStyle={{alignItems: "center"}} behavior="position">
                <Image source={logoPng} style={styles.logo} />
                
                <View style={styles.inputPortion}>
                    <Input
                        leftIcon={(
                            <Image source={MobilePng} style={styles.inputIcon} />
                        )}
                        containerStyle={styles.input}
                        inputContainerStyle={styles.inputBorder}
                        inputStyle={styles.inputFace}
                        placeholder='请输入手机号码'
                        value={mobile}
                        maxLength={11}
                        keyboardType="numeric"
                        returnKeyType="next"
                        ref={input => (this.mobileInput = input)}
                        onSubmitEditing={() => this.smsInput.focus()
                        }
                        onChangeText={mobile => this.setState({ mobile })}
                    />
                    <Input
                        leftIcon={(
                            <Image source={VerifyPng} style={styles.inputIcon} />
                        )}
                        rightIcon={(
                            !isSendSMS?
                            <Button
                                title="获取验证码"
                                titleStyle={[styles.inputFace,{color:'#6FC3A6'}]}
                                type="clear"
                                onPress={this.sendSms.bind(this)}
                            />
                            :
                            <Text style={{color:"#4A90E2",marginRight:10}}>{second}s</Text>
                        )}
                        containerStyle={[styles.input,{marginTop:5}]}
                        inputContainerStyle={styles.inputBorder}
                        inputStyle={styles.inputFace}
                        placeholder='请输入验证码'
                        value={sms}
                        keyboardType="numeric"
                        returnKeyType='done'
                        ref={input => (this.smsInput = input)}
                        onChangeText={sms => this.setState({ sms })}
                        onSubmitEditing={this.submit}
                    />
                    <TouchableHighlight underlayColor='transparent' onPress={this.submit}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.submitBut}>
                            <Text style={{fontSize:19,color:'#fff'}}>提交</Text>
                        </LinearGradient>
                    </TouchableHighlight>
                </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submitBut:{
        marginTop:40,
        width:SCREEN_WIDTH-32,
        height:44,
        borderRadius:22,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        height:64,
        width:64,
        borderRadius:10,
        marginTop:60
    },
    inputPortion:{
        marginTop:96
    },
    input:{
        backgroundColor:'#fff',
        height:44,
        width:SCREEN_WIDTH-32,
        borderRadius:22
    },
    inputBorder:{
        borderColor:'#fff',
    },
    inputFace:{
        fontSize:14,
        color:'#9B9B9B'
    },
    inputIcon:{
        height:20,
        width:20
    }
})


const mapStateToProps = (state) => {
    let user = state.user
    let sms = state.sms
    return {user,sms}
}
AccountModify = connect(mapStateToProps)(AccountModify)
export default AccountModify;
