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

class NewPwd extends Component {
    constructor(props) {
        super(props);
        //获取上一步的参数
        const {mobile,sms} = props.navigation.state.params
        this.state = {
            mobile,
            sms,
            isSendSMS:0,
            second:60,
            pwd:'',
            pwdConfirmation:'',
            secureTextEntry1:true,
            secureTextEntry2:true
        };
    }
    newPwd=()=>{
        let {mobile,pwd,pwdConfirmation,sms} = this.state
        if(!FieldValidate.minLength6(pwd)){
            Tips.toast("请至少输入六位字符")
            return
        }
        if(pwd != pwdConfirmation){
            Tips.toast("密码不一致，请重新输入！")
            return
        }
        this.props.dispatch({
            type: ActionType.auth.resetPassword, 
            options: {
                mobile,password:pwd,smsCode:sms
            },
            extra: {
                navigation:this.props.navigation
            }
        })
    }
    showPassword = type=>{
        type==1?
        this.setState({
            secureTextEntry1:false
        })
        :this.setState({
            secureTextEntry2:false
        })
    }
    hidePassword = type=>{
        type==1?
        this.setState({
            secureTextEntry1:true
        })
        :this.setState({
            secureTextEntry2:true
        })
    }
    render() {
        const {pwd,pwdConfirmation,secureTextEntry1,secureTextEntry2} = this.state
        return (
            <View style={defaultStyles.container}>
                <KeyboardAvoidingView contentContainerStyle={{alignItems: "center"}} behavior="position">
                <Image source={logoPng} style={styles.logo} />
                <View style={styles.inputPortion}>
                    <Input
                        leftIcon={(
                            <Image source={PasswordPng} style={styles.inputIcon} />
                        )}
                        rightIcon={(
                            pwd?
                            secureTextEntry1?
                            <TouchableHighlight underlayColor='transparent' onPress={this.showPassword.bind(this,1)}>
                                <Image source={showPasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor='transparent' onPress={this.hidePassword.bind(this,1)}>
                                <Image source={hidePasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :null
                        )}
                        containerStyle={[styles.input,{marginTop:5}]}
                        inputContainerStyle={styles.inputBorder}
                        inputStyle={styles.inputFace}
                        placeholder='请输入新密码'
                        value={pwd}
                        keyboardType='default'
                        returnKeyType='done'
                        secureTextEntry={secureTextEntry1}
                        ref={input => (this.passwordInput = input)}
                        onChangeText={pwd => this.setState({ pwd })}
                        onSubmitEditing={()=>this.passwordConfirmationInput.focus()}
                    />
                    <Input
                        leftIcon={(
                            <Image source={PasswordPng} style={styles.inputIcon} />
                        )}
                        rightIcon={(
                            pwdConfirmation?
                            secureTextEntry2?
                            <TouchableHighlight underlayColor='transparent' onPress={this.showPassword.bind(this,2)}>
                                <Image source={showPasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :
                            <TouchableHighlight underlayColor='transparent' onPress={this.hidePassword.bind(this,2)}>
                                <Image source={hidePasswordPng} style={styles.inputIcon} />
                            </TouchableHighlight>
                            :
                            null
                        )}
                        containerStyle={[styles.input,{marginTop:5}]}
                        inputContainerStyle={styles.inputBorder}
                        inputStyle={styles.inputFace}
                        placeholder='请再次输入新密码'
                        value={pwdConfirmation}
                        keyboardType='default'
                        returnKeyType='done'
                        secureTextEntry={secureTextEntry2}
                        ref={input => (this.passwordConfirmationInput = input)}
                        onChangeText={pwdConfirmation => this.setState({ pwdConfirmation })}
                        onSubmitEditing={this.newPwd}
                    />
                </View>
                {/* <Button
                    containerStyle={styles.loginButPortion}
                    buttonStyle={[styles.input,{backgroundColor:'#016843'}]}
                    onPress={this.newPwd}
                    title={'提交'}
                    titleStyle={styles.loginButTitle}
                /> */}
                <TouchableHighlight underlayColor='transparent' onPress={this.newPwd}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.submitBut}>
                        <Text style={{fontSize:19,color:'#fff'}}>提交</Text>
                    </LinearGradient>
                </TouchableHighlight>
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
    let sms = state.sms
    return {sms}
}
NewPwd = connect(mapStateToProps)(NewPwd)
export default NewPwd;