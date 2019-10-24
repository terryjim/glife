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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class Life extends Component {
    constructor(props) {
        super(props); 
    }
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.life.getList,  
            options: {
                id:1
            },
            extra: {
                method:"GET"
            }   
        })
    }
    skip=moduleAddress=>{
        this.props.navigation.navigate(moduleAddress)
      }
    render() {
        console.log(this.props.lifePageList)
        return (
           <View style={[defaultStyles.container,{alignItems:'center'}]}>
                <TouchableHighlight underlayColor='transparent' onPress={this.skip.bind(this,'Xyfw')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.linearGradient}>
                        <Image source={require('../../res/images/life01.png')} style={styles.serviceImg}/>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameFont}>洗衣服务</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={this.skip.bind(this,'Ps')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.linearGradient}>
                        <Image source={require('../../res/images/life02.png')} style={styles.serviceImg}/>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameFont}>物业服务</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    let lifePageList = state.lifePageList
    return {lifePageList}
}
Life = connect(mapStateToProps)(Life)
export default Life;
const styles = StyleSheet.create({
    linearGradient: {
        width:SCREEN_WIDTH-18*2,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        flexDirection:'row',
        marginTop:18
    },
    serviceImg:{
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        width:SCREEN_WIDTH-18*2-96,
        height:145,
    },
    serviceName:{
        width:96,
        alignItems:'center',
        justifyContent:'center',
    },
    serviceNameFont:{
        fontWeight:'bold',
        color:'#fff',
        fontSize:14
    },
})