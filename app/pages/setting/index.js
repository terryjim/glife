import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,Image,TouchableOpacity,StatusBar
} from 'react-native';
import { Input,Icon,ListItem,Button} from 'react-native-elements';
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'
import {NavigationEvents} from 'react-navigation'
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import ActionType from '../../config/actionType'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Item = props =>{
    const {title,rightElement,onPress} = props
    return (
        <ListItem
            containerStyle={{
                height:50
            }}
            rightElement={rightElement}
            title={title}
            titleStyle={{
                color:'#4A4A4A',
                fontSize:17
            }}
            onPress={onPress}
        />
    )
    
}
class Setting extends Component {
    componentDidMount(){
        if(this.props.user && this.props.user.token){
            this.props.dispatch({
                type: ActionType.order.getList,  
                options: {
                    status: "0"
                }
            })
        }else{
            this.props.navigation.navigate('mainTabs_glife')
        }
        
    }
    constructor(props) {
        super(props); 
        this.state={
            isVisible:false 
        }
    }
    skip=name=>{
        this.setState({isVisible:false})
        this.props.navigation.navigate(name)
    }
    headerImg=()=>{
        this.setState({isVisible:true})
    }
    camera = ()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
              this.props.dispatch({type: ActionType.auth.uploadHeader,faceUri:image.path,extra:{timeout:30000}})
              this.setState({isVisible:false})
              console.log(image);
             
          });
    }
    picker = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              this.props.dispatch({type: ActionType.auth.uploadHeader,faceUri:image.path,extra:{timeout:30000}})
              this.setState({isVisible:false})
              console.log(image);
          });
    }
    render() {
        const {isVisible} = this.state
        const {token,mobile,headerurl} = this.props.user
        return (
            <View style={defaultStyles.container}>
                <Modal 
                    deviceWidth={SCREEN_WIDTH}
                    deviceHeight={SCREEN_HEIGHT}
                    isVisible={isVisible} 
                    onBackdropPress ={()=>this.setState({isVisible:false})}
                >
                    <View style={{ flex: 1,justifyContent:'flex-end',alignItems:'center' }}>
                        <View style={{ borderRadius:10,backgroundColor:'#fff',width:SCREEN_WIDTH-20,}}>
                            <View style={{
                                height:44,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <Button
                                    title="拍 照"
                                    titleStyle={{color:'red'}}
                                    type="clear"
                                    buttonStyle={{width:SCREEN_WIDTH-20}}
                                    onPress={this.camera.bind(this)}
                                />
                            </View>
                            <View style={{
                                height:44,
                                alignItems:'center',
                                justifyContent:'center',
                                borderTopWidth:1,
                                borderTopColor:'#b5b5b5'
                            }}>
                                <Button
                                    title="从相册选择"
                                    type="clear"
                                    buttonStyle={{width:SCREEN_WIDTH-20}}
                                    onPress={this.picker.bind(this)}
                                />
                            </View>
                        </View>
                        
                        <View style={{
                            height:44,
                            width:SCREEN_WIDTH-20,
                            backgroundColor:'#fff',
                            borderRadius:10,
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:10
                        }}>
                            <Button
                                title="取消"
                                type="clear"
                                buttonStyle={{width:SCREEN_WIDTH-20}}
                                onPress={()=>this.setState({isVisible:false})}
                            />
                        </View>
                    </View>
                </Modal>
                <NavigationEvents
                    //onDidFocus={payload => !token? this.props.navigation.navigate('Login'): ''}
                    onDidFocus={payload => {
                        //!token? this.props.navigation.navigate('Login'): ''
                        StatusBar.setBarStyle('light-content')
                    }}
                />
                {/* <Item 
                    title='头像'
                    rightElement={(
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../res/images/img.png')} style={{width:30,height:30,marginRight:10}}/>
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        </View>
                    )}
                /> */}
                <ListItem
                    containerStyle={{
                        height:50
                    }}
                    rightElement={(
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {
                                headerurl?
                                <Image source={{uri:headerurl}} style={{width:30,height:30,marginRight:10,borderRadius:50}}/>
                                :
                                <Image source={require('../../res/images/img.png')} style={{width:30,height:30,marginRight:10,borderRadius:50}}/>
                            }
                            {/* <Image source={require('../../res/images/img.png')} style={{width:30,height:30,marginRight:10}}/> */}
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        </View>
                    )}
                    title='头像'
                    titleStyle={{
                        color:'#4A4A4A',
                        fontSize:17
                    }}
                    onPress={this.headerImg}
                />
                <ListItem
                    containerStyle={{
                        height:50
                    }}
                    rightElement={(
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{marginRight:10,color:'#9B9B9B',fontSize:14}}>{mobile}</Text>
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        </View>
                    )}
                    title='账号'
                    titleStyle={{
                        color:'#4A4A4A',
                        fontSize:17
                    }}
                    onPress={this.skip.bind(this,'AccountModify')}
                />
                <ListItem
                    containerStyle={{
                        height:50
                    }}
                    rightElement={(
                        <Icon
                            name='right'
                            type='antdesign'
                            color='#9b9b9b'
                            size={17}
                        /> 
                    )}
                    title='密码'
                    titleStyle={{
                        color:'#4A4A4A',
                        fontSize:17
                    }}
                    onPress={this.skip.bind(this,'ChgPwd')}
                />
                <ListItem
                    containerStyle={{
                        height:50
                    }}
                    rightElement={( 
                        <Icon
                            name='right'
                            type='antdesign'
                            color='#9b9b9b'
                            size={17}
                        /> 
                    )}
                    title='退出'
                    titleStyle={{
                        color:'#4A4A4A',
                        fontSize:17
                    }}
                    onPress={()=>{
                        this.props.dispatch({
                            type: ActionType.auth.loginOut,
                            extra: {
                                method:'GET',
                                navigation:this.props.navigation
                            }
                        })
                        //this.props.dispatch({type: 'RESET_STORE'});
                        //this.props.navigation.navigate('mainTabs_glife')
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    let user = state.user
    return {user}
}
Setting = connect(mapStateToProps)(Setting)
export default Setting;
