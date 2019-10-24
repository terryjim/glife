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
class Ps extends Component {
    render() {
        return (
           <View style={defaultStyles.container}>
                <View style={styles.container}>
                    <View style={[styles.module,{borderRightColor:'#50B694',borderRightWidth:1,borderBottomColor:'#50B694',borderBottomWidth:1}]}>
                        <Image source={require('../../res/images/ps01.png')} style={styles.moduleImg}/>
                        <Text style={styles.moduleName}>物业公共</Text>
                    </View>
                    <View style={[styles.module,{borderBottomColor:'#50B694',borderBottomWidth:1}]}>
                        <Image source={require('../../res/images/ps02.png')} style={styles.moduleImg}/>
                        <Text style={styles.moduleName}>联系物业</Text>
                    </View>
                    <View style={[styles.module,{borderRightColor:'#50B694',borderRightWidth:1,borderBottomColor:'#50B694',borderBottomWidth:1}]}>
                        <Image source={require('../../res/images/ps03.png')} style={styles.moduleImg}/>
                        <Text style={styles.moduleName}>报事报修</Text>
                    </View>
                    <View style={[styles.module,{borderBottomColor:'#50B694',borderBottomWidth:1}]}>
                        <Image source={require('../../res/images/ps04.png')} style={styles.moduleImg}/>
                        <Text style={styles.moduleName}>投诉建议</Text>
                    </View>
                </View>
                
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}
Ps = connect(mapStateToProps)(Ps)
export default Ps;
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    module:{
        width:SCREEN_WIDTH/2,
        height:SCREEN_WIDTH/2,
        alignItems:'center',
        justifyContent:'center',
    },
    moduleImg:{
        width:66,
        height:66
    },
    moduleName:{
        fontSize:24,
        color:'#4A4A4A',
        marginTop:15
    }
})