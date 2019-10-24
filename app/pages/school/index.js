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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class School extends Component {
    constructor(props) {
        super(props); 
    }
    componentDidMount(){
        // this.props.dispatch({
        //     type: ActionType.school.getList,  
        //     options: {
        //         id:3
        //     },
        //     extra: {
        //         method:"GET"
        //     }   
        // })
    }
    skip = data =>{
        this.props.navigation.navigate('SchoolIntroduce',{data})
    }
    render() {
        const {schoolPageList} = this.props
        console.log(this.props.schoolPageList)
        return (
           <View style={defaultStyles.container}>
               <NavigationEvents
                    //onDidFocus={payload => !token? this.props.navigation.navigate('Login'): ''}
                    onDidFocus={payload => {
                        this.props.dispatch({
                            type: ActionType.school.getList,  
                            options: {
                                id:3
                            },
                            extra: {
                                method:"GET"
                            }   
                        })
                    }}
                />
                <View style={styles.container}>
                    {
                        schoolPageList && schoolPageList.map((v,i)=>(
                            <TouchableHighlight key={i} underlayColor='transparent' onPress={this.skip.bind(this,v)}>
                                <View style={styles.module}>
                                    <Image source={{uri:v.imageUrl}} style={styles.moduleImg}/>
                                    <Text style={styles.moduleName}>{v.name}</Text>
                                    <Text style={styles.moduleDescribe}>{v.subTitle}</Text>
                                </View>
                            </TouchableHighlight>
                        ))
                    }
                </View>
           </View>
        );
    }
}

const mapStateToProps = (state) => {
    let schoolPageList = state.schoolPageList
    return {schoolPageList}
}
School = connect(mapStateToProps)(School)
export default School;
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    module:{
        backgroundColor:'#fff',
        height:223,
        width:SCREEN_WIDTH/2-18-9,
        marginLeft:18,
        marginTop:18,
        borderRadius:15
    },
    moduleImg:{
        width:SCREEN_WIDTH/2-18-9,
        height:157,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    moduleName:{
        fontSize:16,
        color:'#4A4A4A',
        marginTop:10,
        marginLeft:10
    },
    moduleDescribe:{
        fontSize:12,
        color:'#9B9B9B',
        marginTop:5,
        marginLeft:10
    }
})