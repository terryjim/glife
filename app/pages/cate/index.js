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
class Cate extends Component {
    constructor(props) {
        super(props); 
    }
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.cate.getList,  
            options: {
                id:5
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
        console.log(this.props.catePageList)
        return (
           <View style={[defaultStyles.container,{alignItems:'center'}]}>
                <TouchableHighlight underlayColor='transparent' onPress={this.skip.bind(this,'Sqms')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.linearGradient}>
                        <Image source={require('../../res/images/cate01.png')} style={styles.serviceImg}/>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameFont}>社区美食</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={this.skip.bind(this,'Kitchen')}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.linearGradient}>
                        <Image source={require('../../res/images/cate02.png')} style={styles.serviceImg}/>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameFont}>共享厨房</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    let catePageList = state.catePageList
    return {catePageList}
}
Cate = connect(mapStateToProps)(Cate)
export default Cate;
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