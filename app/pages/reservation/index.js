import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,Image,TouchableOpacity,ScrollView
} from 'react-native';
import { Input,Icon } from 'react-native-elements';
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'
import ActionType from '../../config/actionType'
import {hostUrl} from '../../config'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Reservation extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.reservation.getList,  
            options: {
                pagesize:'999',
                pageindex:'0'
            }
          })
    }
    render() {
        const {bookingList} = this.props
        console.log(bookingList)
        return (
            <ScrollView style={defaultStyles.container}>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{height:44,borderBottomColor:'#B2B2B2',borderBottomWidth:1,justifyContent:'center'}}>
                        <Text style={{marginLeft:18,fontSize:19,color:'#4A4A4A',fontWeight:'bold'}}>三点学堂</Text>
                    </View>
                    {
                        bookingList && bookingList.l && bookingList.l.map((v,i)=>(
                            <TouchableOpacity key={i} onPress={()=>{this.props.navigation.navigate('Details',{data:v})}}>
                                <View style={{height:132,flexDirection:'row',borderBottomColor:'#4A4A4A',borderBottomWidth:1}}>
                                    <Image source={{uri:hostUrl+v.imageUrl}} style={{width:96,height:96,marginLeft:18,marginTop:(132-96)/2}}/>
                                    <View style={{marginLeft:18,marginTop:(132-96)/2}}>
                                        <Text style={{marginTop:5,fontSize:14,color:'#4A4A4A'}}>{v.name}</Text>
                                        <Text numberOfLines={1} style={{width:SCREEN_WIDTH-96-18*3,marginTop:10,fontSize:14,color:'#9B9B9B'}}>地址:{v.address}</Text>
                                        <Text style={{marginTop:21,fontSize:14,color:'#9B9B9B'}}>￥{v.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>  
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const bookingList = state.bookingList
    return {bookingList}
}
Reservation = connect(mapStateToProps)(Reservation)
export default Reservation;
