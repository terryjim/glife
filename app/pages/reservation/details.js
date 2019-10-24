import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,Image
} from 'react-native';
import { Input,Icon,ListItem  } from 'react-native-elements';
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'
import {hostUrl} from '../../config'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Details extends Component {
    render() {
        const {data}=this.props.navigation.state.params; 
        return (
            <View style={defaultStyles.container}>
                <View style={{height:44,justifyContent:'center',marginLeft:18}}>
                    <Text style={{fontSize:19,color:'#4A4A4A',fontWeight:'bold'}}>预订信息</Text>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{height:44,borderBottomColor:'#B2B2B2',borderBottomWidth:1,justifyContent:'center'}}>
                        <Text style={{marginLeft:18,fontSize:19,color:'#4A4A4A',fontWeight:'bold'}}>三点学堂</Text>
                    </View>
                    <View style={{height:132,flexDirection:'row'}}>
                        <Image source={{uri:hostUrl+data.imageUrl}} style={{width:96,height:96,marginLeft:18,marginTop:(132-96)/2}}/>
                        <View style={{marginLeft:18,marginTop:(132-96)/2}}>
                            <Text style={{marginTop:5,fontSize:14,color:'#4A4A4A'}}>{data.name}</Text>
                            <Text numberOfLines={1} style={{width:SCREEN_WIDTH-96-18*3,marginTop:10,fontSize:14,color:'#9B9B9B'}}>地址:{data.address}</Text>
                            <Text style={{marginTop:21,fontSize:14,color:'#9B9B9B'}}>￥{data.price}</Text>
                        </View>
                    </View>
                    <ListItem
                        containerStyle={{
                            height:44
                        }}
                        title='预约时间'
                        rightElement={(
                            <Text>
                                {data.createTime}
                            </Text>
                        )}
                    />
                    <ListItem
                        containerStyle={{
                            height:44
                        }}
                        title='预约联系人'
                        rightElement={(
                            <Text>
                                {data.createUser}
                            </Text>
                        )}
                    />
                    <ListItem
                        containerStyle={{
                            height:44
                        }}
                        title='联系电话'
                        rightElement={(
                            <Text>
                                {data.tel}
                            </Text>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {return {}}
Details = connect(mapStateToProps)(Details)
export default Details;
