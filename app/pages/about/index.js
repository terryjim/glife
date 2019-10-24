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

const SCREEN_WIDTH = Dimensions
    .get('window')
    .width;
const SCREEN_HEIGHT = Dimensions
    .get('window')
    .height;
const LOGO_IMAGE = require('../../res/images/logo.png');
class About extends Component {
    constructor(props) {
        super(props); 
    }
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.staticPage.getstaticPage,  
            options: {
              id:102
            },
            extra: {
              method:'GET'
            }
          })
    }
    render() {
        const {aboutGLife} = this.props
        return (
           <View style={defaultStyles.container}>
               <View style={{flex:1,alignItems:'center',marginTop:60}}>
                    <Image source={LOGO_IMAGE} style={{height:67,width:67}} />
                    <Text style={{marginTop:15,fontSize:14,color:'#4A4A4A'}}>集家</Text>
                    <Text style={{fontSize:14,color:'#4A4A4A'}}>v1.0</Text>
                    <ScrollView>
                        <Text style={{marginTop:20,marginHorizontal:18}}>
                            {
                                aboutGLife && aboutGLife.content
                            }
                        </Text>
                    </ScrollView>
               </View>
               <ListItem
                    containerStyle={{
                        height:50
                    }}
                    rightElement={(
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#9B9B9B',fontSize:14}}>已是最新</Text>
                            <Icon
                                name='right'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                            /> 
                        </View>
                    )}
                    title='检测更新'
                    titleStyle={{
                        color:'#4A4A4A',
                        fontSize:14
                    }}
                />
                <View style={{alignItems:'center',marginVertical:15}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight onPress={()=>this.props.navigation.navigate('Privacy')}>
                            <Text style={{fontSize:14,color:'#50B694'}}>《隐私条款》</Text>
                        </TouchableHighlight>
                        <Text>和</Text>
                        <TouchableHighlight onPress={()=>this.props.navigation.navigate('Agreement')}>
                            <Text style={{fontSize:14,color:'#50B694'}}>《用户协议》</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    const aboutGLife = state.aboutGLife
    return {aboutGLife}
}
About = connect(mapStateToProps)(About)
export default About;
const styles = StyleSheet.create({
})