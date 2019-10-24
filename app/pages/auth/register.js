import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Icon} from 'react-native-elements';
import {
    StyleSheet,
    View,
    Text,Image,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,TouchableHighlight
} from 'react-native';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import FieldValidate from '../../utils/FieldValidate'
import Tips from '../../utils/tips'
import crypto from "crypto-js"
import LinearGradient from 'react-native-linear-gradient';
import defaultStyles from '../../res/commonStyle'

const logoPng = require('../../res/images/logo.png');
const MobilePng = require('../../res/images/mobile.png');
const VerifyPng = require('../../res/images/verify.png');
const PasswordPng = require('../../res/images/password.png');
const hidePasswordPng = require('../../res/images/hide_password.png');
const showPasswordPng = require('../../res/images/show_password.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile:'',
            pwd:'',
            sms:'',
            isSendSMS:0,
            second:60,
            secureTextEntry:true
        };
    }
    componentDidUpdate() {
        if (this.props.user && this.props.user.token) {
            this.props.navigation.navigate('MainTabs')
        }
        if (this.props.sms) {
            //短信发送成功，修改短信发送状态
            this.props.dispatch({type: ActionType.common.smsFailure})
            //开始倒计时
            this.bulletincd()
        }
    }
    //发送短信
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
            }
        })
    }
    //倒计时
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
    register=()=>{
        let {mobile,pwd,sms} = this.state
        if(!FieldValidate.mobile(mobile)){
            Tips.toast("手机号格式不正确")
            return
        }
        if(!sms){
            Tips.toast("请输入验证码")
            return
        }
        if(!FieldValidate.minLength6(pwd)){
            Tips.toast("请至少输入六位字符")
            return
        }
        this.props.dispatch({
            type: ActionType.auth.register, 
            options: {
                mobile,password:pwd,smsCode:sms
            }
        })
    }
    showPassword = ()=>{
        this.setState({
            secureTextEntry:false
        })
    }
    hidePassword = ()=>{
        this.setState({
            secureTextEntry:true
        })
    }
    render() {
        let {mobile,pwd,sms,isSendSMS,second,secureTextEntry} = this.state
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
                        onSubmitEditing={() => this.smsInput.focus()}
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
                        returnKeyType='next'
                        ref={input => (this.smsInput = input)}
                        onChangeText={sms => this.setState({ sms })}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <Input
                        leftIcon={(
                            <Image source={PasswordPng} style={styles.inputIcon} />
                        )}
                        rightIcon={(
                            pwd?
                            secureTextEntry?
                            <TouchableHighlight underlayColor='transparent' onPress={this.showPassword}>
                                <Image source={showPasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor='transparent' onPress={this.hidePassword}>
                                <Image source={hidePasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :
                            null
                        )}
                        containerStyle={[styles.input,{marginTop:5}]}
                        inputContainerStyle={styles.inputBorder}
                        inputStyle={styles.inputFace}
                        placeholder='请设置登录密码'
                        value={pwd}
                        keyboardType='default'
                        returnKeyType='done'
                        secureTextEntry={secureTextEntry}
                        ref={input => (this.passwordInput = input)}
                        onChangeText={pwd => this.setState({ pwd })}
                        onSubmitEditing={this.register}
                    />
                </View>
                {/* <Button
                    containerStyle={styles.loginButPortion}
                    buttonStyle={[styles.input,{backgroundColor:'#016843'}]}
                    onPress={this.register}
                    title={'提交'}
                    titleStyle={styles.loginButTitle}
                /> */}
                <TouchableHighlight underlayColor='transparent' onPress={this.register}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.submitBut}>
                        <Text style={{fontSize:19,color:'#fff'}}>提交并注册</Text>
                    </LinearGradient>
                </TouchableHighlight>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bottomFont}>点击 "注册" 表示你已同意 </Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.navigation.navigate('AuthAgreement')}>
                        <Text style={[styles.bottomFont,styles.bottomLink]}>《集家用户协议》</Text>
                    </TouchableHighlight>
                    <Text style={styles.bottomFont}>、</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.navigation.navigate('AuthPrivacy')}>
                        <Text style={[styles.bottomFont,styles.bottomLink]}>《隐私条款》</Text>
                    </TouchableHighlight>
                </View>
                
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bottomLink:{
        color:'#6FC3A6'
    },
    bottomFont:{
        fontSize:10,
        color:'#9B9B9B',
        marginTop:19
    },
    submitBut:{
        marginTop:40,
        width:SCREEN_WIDTH-32,
        height:44,
        borderRadius:22,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomBut:{
        fontSize:12,
        color:'#4a4a4a'
    },
    bottomView:{
        marginTop:29,
        flexDirection:'row',
        width:SCREEN_WIDTH-32,
        justifyContent:'space-between'
    },
    loginButTitle:{
        fontSize:19,
        color:'#fff'
    },
    loginButPortion:{
        marginTop:40
    },
    container:{
        flex: 1,
        //alignItems: "center"
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
Register = connect(mapStateToProps)(Register)
export default Register;