import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,StatusBar,TouchableHighlight,Image,ScrollView
} from 'react-native';
import { Input,Icon } from 'react-native-elements';
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'
import {NavigationEvents} from 'react-navigation'
import ActionType from '../../config/actionType'
import { Button } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo"

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const menu = {1:'Life',2:'Car',3:'School',4:'Drink',5:'Cate',6:'Lgc',7:'Dev',8:'Yxf',}
class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyname:'',
            isClickSearch:false,
            oldKeyname:'',
            showTitle:true,
            isConnected:true
        }
      }
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.search.getKeywordList,
            extra: {
                method:"GET"
            }   
        })
    }
    hotSearch=keyname=>{
        this.props.dispatch({
            type: ActionType.search.getSearchList,
            options:{
                keyname
            },
            extra: {
                method:"GET"
            }   
        })
    }
    search = keyname=>{
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                //this.props.dispatch({type: ActionType.search.clearSearchList})
                //this.setState({isClickSearch:true,oldKeyname:keyname,keyname})
                this.state.isClickSearch = true
                this.state.oldKeyname = keyname
                this.state.keyname = keyname
                if(keyname){
                    this.props.dispatch({
                        type: ActionType.search.getSearchList,
                        options:{
                            keyname
                        },
                        extra: {
                            method:"GET"
                        }   
                    })
                }
            }
        })
        
        
    }
    skip=prodtype=>{
        if(menu[prodtype]){
            this.props.navigation.navigate(menu[prodtype])
        }
    }
    render() {
        let {keyname,isClickSearch,oldKeyname,showTitle,isConnected} = this.state
        let {keywordList,searchList} = this.props
        //console.log(this.props)
        return (
            <View style={defaultStyles.container}>
                <NavigationEvents
                    onDidFocus={payload => {
                        StatusBar.setBarStyle('dark-content')
                    }}
                    onWillBlur={
                        payload => {
                            this.setState({
                                keyname:'',
                                isClickSearch:false,
                                oldKeyname:''
                            })
                        }
                    }
                />
                <View style={{marginHorizontal:18,marginBottom:10}}>
                    <Text style={styles.searchTitle}>搜索</Text>
                    {/* {
                        showTitle?
                        <Text style={styles.searchTitle}>搜索</Text>
                        :
                        <Text></Text>
                    } */}
                    
                    <Input
                        containerStyle={styles.searchInputContainer}
                        inputContainerStyle={{
                            borderColor:'#F5F5F5',
                        }}
                        inputStyle={{
                            fontSize:10,
                            //color:'#E0E0E0'
                        }}
                        value={keyname}
                        placeholder='请输入关键词'
                        rightIcon={(
                            <Icon
                                name='search1'
                                type='antdesign'
                                color='#9b9b9b'
                                size={17}
                                onPress={this.search.bind(this,keyname)}
                            /> 
                        )}
                        onChangeText={keyname => {this.setState({ keyname, oldKeyname:'',isClickSearch:false})}}
                        onSubmitEditing={this.search.bind(this,keyname)}
                        onFocus={()=>this.setState({ showTitle:false})}
                    />
                </View>
                {
                    !keyname?
                    <View style={{marginHorizontal:18,marginTop:30}}>
                        <View style={styles.searchListContainer}>
                            <Text style={[styles.searchListFont,{color:'#000',fontWeight:'bold'}]}>热门搜索</Text>
                        </View>
                        {
                            keywordList && keywordList.map((value,i)=>(
                                <TouchableHighlight key={i} underlayColor='transparent' onPress={this.search.bind(this,value.name)}>
                                    <View style={styles.searchListContainer}>
                                        <Text style={styles.searchListFont}>{value.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                    :
                    null
                }
                {
                    isClickSearch&&keyname&&searchList.length==0&&oldKeyname?
                    <View style={{marginTop:83,alignItems:'center'}}>
                        <Text style={{fontSize:48,color:'#4A4A4A'}}>无结果</Text>
                        <Text style={{fontSize:24,color:'#4A4A4A',marginTop:70}}>没有找到与 “{oldKeyname}” 相关</Text>
                    </View>
                    :
                    null
                }
                {
                    isClickSearch&&keyname&&searchList.length>0?
                        <ScrollView>
                            {searchList.map((v,i)=>(
                                <View key={i} style={{marginHorizontal:18,backgroundColor:'#fff',marginBottom:10,borderRadius:10}}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:18,marginTop:6}}>
                                        <Text>{v.name}</Text>
                                        <Button
                                            title="进入"
                                            titleStyle={{
                                                color:'#50B694',
                                                fontSize:13
                                            }}
                                            type="outline"
                                            buttonStyle={{
                                                borderRadius:16,
                                                width:62,
                                                height:32,
                                                borderColor:'#50B694',
                                                borderWidth:1
                                            }}
                                            onPress={this.skip.bind(this,v.prodtype)}
                                        />
                                    </View>
                                    <View style={{margin:18,flexDirection:'row',justifyContent:'space-between'}}>
                                        {
                                            v.imageUrl?
                                            <Image 
                                                source={{uri:v.imageUrl}} 
                                                style={{
                                                    height:(SCREEN_WIDTH-(18*5))/2,
                                                    width:(SCREEN_WIDTH-(18*5))/2
                                                }}
                                            />
                                            :
                                            null
                                        }
                                        {
                                            v.imageUrl2?
                                            <Image 
                                                source={{uri:v.imageUrl2}} 
                                                style={{
                                                    height:(SCREEN_WIDTH-(18*5))/2,
                                                    width:(SCREEN_WIDTH-(18*5))/2
                                                }}
                                            />
                                            :
                                            null
                                        }
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchListFont:{
        fontSize:14,
        color:'#50B694'
    },
    searchListContainer:{
        height:44,
        width:SCREEN_WIDTH-2*18,
        borderBottomColor:'#E0E0E0',
        borderBottomWidth:1,
        justifyContent:'center'
    },
    searchTitle:{
        fontSize:19,
        color:'#000',
        fontWeight:'bold',
        marginTop:38
    },
    searchInputContainer:{
        height:36,
        width:SCREEN_WIDTH-2*18,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:6
    }
})

const mapStateToProps = (state) => {
    let searchList = state.searchList
    let keywordList = state.keywordList
    console.log(searchList)
    return {searchList,keywordList}
}
Search = connect(mapStateToProps)(Search)
export default Search;
