import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,Image,ImageBackground,TouchableHighlight,Fragment,ScrollView,StatusBar, ShadowPropTypesIOS
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon,Overlay,CheckBox,Button  } from 'react-native-elements'
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'
import {menuList,hisRouters,navigation} from '../../config/index'
import {NavigationEvents} from 'react-navigation'
import ActionType from '../../config/actionType'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMG_WIDTH = (SCREEN_WIDTH-18*3)/2
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      imgSta:0,
      rightMenuList:[],
      leftMenuList:[],
      checked:false
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps.menuList)
  //   console.log(nextProps.menuList[0].ratio)
  //   //console.log(nextProps.menuList!==this.props.menuList)
  //   return nextState.a;
  // }
  componentDidMount(){
    navigation.push(this.props.navigation)
    this.props.dispatch({
      type: ActionType.staticPage.getstaticPage,  
      options: {
        id:101
      },
      extra: {
        method:'GET'
      }
    })
    const {menuList} = this.props
    let leftMenuHeight = 0
    let rightMenuHeight = 0
    let {leftMenuList,rightMenuList} = this.state
    // let leftMenuList = []
    // let rightMenuList = []
    //排序
    menuList.sort(this.compare('clickNumber'))
    menuList && menuList.map((value,index)=>{
      Image.getSize(value.img,(width,height)=>{
        value['ratio']=height/width
        value['height']=height
        if(leftMenuHeight>rightMenuHeight){
          rightMenuList.push(value)
          rightMenuHeight += (value.height+18)
          this.setState({rightMenuList})
        }else{
          leftMenuList.push(value)
          leftMenuHeight += (value.height+18)
          this.setState({leftMenuList})
        }
      })
    })
  }
  skip=data=>{
    this.props.dispatch({
      type: ActionType.home.menuClick,  
      options: {
        key:data.key
      } 
    })
    this.props.navigation.navigate(data.moduleAddress)
  }
  //排序
  compare(propertyName){
    return (object1,object2)=>{
      if(object1.key=='shhf'){
        return 1
      }
      if(object2.key=='shhf'){
        return 1
      }
      let value1 = object1[propertyName]
      let value2 = object2[propertyName]
      if(value2>value1){
        return 1
      }else if(value2<value1){
        return -1
      }else{
        return 0
      }
    }
  }
  
  imgSkip=()=>{
    const {user} = this.props
    if(user && user.token){
      this.props.navigation.navigate('Setting')
    }else{
      hisRouters.push('Setting')
      if(hisRouters.length>3){
        hisRouters.shift() 
      }
      this.props.navigation.navigate('Login')
    }
    //this.props.navigation.navigate('Setting')
  }
  agreementClick=()=>{
    this.props.dispatch({type: ActionType.common.agreeUserAgreement})
  }
  render() {
    let leftMenuHeight = 0
    let rightMenuHeight = 0
    let { leftMenuList,rightMenuList} = this.state
    const {menuList,weather,user,userAgreement,agreement} = this.props
    return (
      <ScrollView style={defaultStyles.container}>
        <Overlay isVisible={agreement}>  
            <View style={{flex:1}}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:19,marginVertical:15}}>用户协议</Text>
              </View>
              <ScrollView style={{marginHorizontal:10}}>
                <Text style={{fontSize:14,color:'#9B9B9B'}}>{userAgreement&&userAgreement.content}</Text>
              </ScrollView>
              <CheckBox
                title='我已阅读并同意《用户协议》'
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
                containerStyle={{
                  backgroundColor:'#fff',
                  borderWidth:0,
                  marginLeft:0
                }}
              />
              <Button
                title="继续"
                disabled={!this.state.checked}
                buttonStyle={{
                  borderRadius:30
                }}
                onPress={this.agreementClick.bind(this)}
              />
            </View> 
        </Overlay>
        <NavigationEvents
          //onDidFocus={payload => !token? this.props.navigation.navigate('Login'): ''}
          onDidFocus={payload => {
            StatusBar.setBarStyle('dark-content')
            this.props.dispatch({
              type: ActionType.common.getWeather,  
              extra: {
                method:'GET'
              }
            })
            if(menuList.length==(leftMenuList.length+rightMenuList.length)){
              rightMenuList=[]
              leftMenuList=[]
              menuList.sort(this.compare('clickNumber'))
              menuList && menuList.map((value,index)=>{
                if(leftMenuHeight>rightMenuHeight){
                  rightMenuList.push(value)
                  rightMenuHeight += (value.height+18)
                }else{
                  leftMenuList.push(value)
                  leftMenuHeight += (value.height+18)
                }
              })
              this.setState({rightMenuList,leftMenuList})
            }
          }}
        />
        <View style={styles.partOne}>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherDate}>{weather&&weather.month_day} {weather&&weather.week_day}</Text>
            <View style={styles.weather}>
              <Image source={{uri:weather&&weather.wea_url}} style={{height:33,width:33,marginRight:6}}/>
              <Text style={{fontSize:24,color:'#4A4A4A'}}>{weather&&weather.tem}℃</Text>
            </View>
          </View>
          <TouchableHighlight underlayColor='transparent' onPress={this.imgSkip}>
            {
                user&&user.headerurl?
                <Image source={{uri:user.headerurl}} style={styles.headImg}/>
                :
                <Image source={require('../../res/images/img.png')} style={styles.headImg}/>
            }
            {/* <Image source={require('../../res/images/img.png')} style={styles.headImg}/> */}
          </TouchableHighlight>
        </View>
        <View style={styles.partTwo}>
          <View style={{flex:1,marginRight:9}}>
            {
              leftMenuList.map((v,i)=>(
                <TouchableHighlight key={i} underlayColor='transparent' onPress={this.skip.bind(this,v)}>
                  <Image source={{uri:v.img}} resizeMode='stretch' style={{height:v.ratio*IMG_WIDTH,width:IMG_WIDTH,marginBottom:18}}/>
                </TouchableHighlight>
              ))
            }
          </View>
          <View style={{flex:1,marginLeft:9}}>
            {
              rightMenuList.map((v,i)=>(
                <TouchableHighlight key={i} underlayColor='transparent' onPress={this.skip.bind(this,v)}>
                  <Image key={i} source={{uri:v.img}} resizeMode='stretch' style={{height:v.ratio*IMG_WIDTH,width:IMG_WIDTH,marginBottom:18}}/>
                </TouchableHighlight>
              ))
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  let menuList = state.menuList
  let weather = state.weather
  let user = state.user
  const userAgreement = state.userAgreement
  const agreement = state.agreement
  return {menuList,weather,user,userAgreement,agreement}
}
Home = connect(mapStateToProps)(Home)
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partOne:{
    marginTop:39,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:18,
  },
  weatherContainer:{
    //alignItems:'center'
  },
  weatherDate:{
    color:'#9B9B9B',
    fontSize:13
  },
  weather:{
    flexDirection:'row'
  },
  headImg:{
    height:45,
    width:45,
    borderRadius:50
  },
  partTwo:{
    flex:1,
    flexDirection:'row',
    marginTop:13,
    marginHorizontal:18,
  } 
})