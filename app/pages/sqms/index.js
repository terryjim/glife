import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,SectionList, ScrollView,FlatList,Image
} from 'react-native';
import { Button } from 'react-native-elements';
import defaultStyles, { commonStyle } from '../../res/commonStyle'
import LinearGradient from 'react-native-linear-gradient';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import SpecModal from './specModal';
import Tips from '../../utils/tips'

const add = require('../../res/images/add.png')
const reduce = require('../../res/images/reduce.png')
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = 100
const HEADER_HEIGHT = 20
const menuDatas=['口碑产品','当季产品','牛乳奶茶']
class Sqms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        //selectItem:0
        isVisible:false,
        par:{}
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type: ActionType.drink.getList,  
      options: {
        pagesize:9999,
        pageindex:0,
        serviceid:51
      }
    })
    this.props.dispatch({
      type: ActionType.drink.getSpecprod,  
      options: {
        serviceid:51
      },
      extra: {
        method:'GET'
      }
    })
  }
  scrollBegin= false
  items= []
  selectItem = 0
  last={}
  clickOnItem(index){
    this.items&&this.items.map((data,i)=>{
      let style=[styles.menuStyle]
      if(index===i){
        style.push(styles.menuSelectedStyle)
      }else{
        style.push(styles.menuNormalStyle)
      }
      if(data){
        data.setNativeProps({style})
      }
    })
    if(this.sectionList){
      this.sectionList.scrollToLocation({sectionIndex:index,itemIndex:0,viewPosition:0});
    }
  }
  renderItemTitle = ({ section: { targetId,targetName } })=>{
    return (
      <Text style={{ fontWeight: "bold",height:HEADER_HEIGHT,marginTop:10 }}>{targetName}</Text>
    )
  }
  renderItem = ({item,index})=>{
    let drinkOrder = this.props.drinkOrder
    let number = 0
    if(drinkOrder[item.targetId]){
      let findVal = drinkOrder[item.targetId].find(item1=>{return item1.id===item.id})
      if(findVal){
        number = findVal.number
      }
    }
    return (
      <View style={{flexDirection:'row',marginTop:10,height:ITEM_HEIGHT,marginBottom:item.id==this.last.id?70:0}}>
        <Image
            source={{uri:item&&item.imageUrl}}
            style={{height:100,width:100,borderRadius:10}}
        />
        <View style={{marginHorizontal:10,justifyContent:'space-between',width:SCREEN_WIDTH-239}}>
          <Text numberOfLines={2} style={{marginTop:15,fontSize:14,color:'#4A4A4A'}}>{item&&item.name}</Text>
          <View style={{marginBottom:8,flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{color:'#FF4400',fontSize:18}}>￥{item&&item.price}</Text>
           <View style={{flexDirection:'row',alignItems:'center'}}>
                {
                  number!=0?
                    <React.Fragment>
                      <TouchableOpacity onPress={this.minus.bind(this,item&&item)}>
                        <Image source={reduce} style={{width:15,height:15}}/>
                      </TouchableOpacity>
                      <Text style={{marginHorizontal:6}}>{number}</Text>
                    </React.Fragment>
                  :
                  null
                }
                <TouchableOpacity onPress={this.add.bind(this,item&&item)}>
                  <Image source={add} style={{width:15,height:15}}/>
                </TouchableOpacity>
           </View>
          </View>
        </View>
      </View>
    )
  }
  getItemLayout = (data, index) => {
    let sectioinIndex = 0;
    let offset = 0;      // 这里为什么是-20？大概是因为首个SectionHeader占用20？
    let item = {type: 'header'};
    for (let i = 0; i < index; ++i) {
        switch (item.type) {
            case 'header': {
                let sectionData = data[sectioinIndex].data;
                offset += HEADER_HEIGHT;
                sectionData.length === 0 ? item = {type: 'footer'} : item = {type: 'row', index: 0};
            }break;
            case 'row': {
                let sectionData = data[sectioinIndex].data;
                offset += ITEM_HEIGHT+20;
                ++item.index;
                if (item.index === sectionData.length) {
                    item = {type: 'footer'};
                }
            }break;
            case 'footer':
                item = {type: 'header'};
                ++sectioinIndex;
                break;
            default:
                console.log('err');
        }
    }

    let length = 0;
    switch (item.type) {
        case 'header':
            length = HEADER_HEIGHT;
            break;
        case 'row':
            length = ITEM_HEIGHT;
            break;
        case 'footer':
            length = 0;
            break;
    }
    return {length: length, offset: offset, index}
  }
  itemOnChanged = ({viewableItems, changed}) => {
    if (!this.scrollBegin) {
      return;
    }
    
    let firstItem = viewableItems[0];
    if (firstItem && firstItem.item) {
        // 这里可以直接取到section的title
        let name = firstItem.item.targetName
        let index = this.props.CarList.tarlist.findIndex(item=>{return item.name===name})
        //let index = menuDatas.indexOf(name)
        this.items&&this.items.map((data,i)=>{
          let style=[styles.menuStyle]
          if(index===i){
            style.push(styles.menuSelectedStyle)
          }else{
            style.push(styles.menuNormalStyle)
          }
          if(data){
            data.setNativeProps({style})
          }
        })
        this.selectItem = index;
    }
  }
  addItemsRef(o,idx){
    // 这里加判断是为了保证this.items不会出现内存泄漏
    if(idx < this.items.length){
        this.items[idx] = o;
    }else{
        this.items.push(o);
    }
  }

  _renderMenuItem = (item, index) => {
      let drinkOrder = this.props.drinkOrder
      let orderDetail = drinkOrder[item.targetId]
      let number = 0
      orderDetail && orderDetail.map((v,i)=>{
        number += v.number
      })
      let textstyle = styles.menuStyle
      if(index === this.selectItem){
        textstyle = [textstyle,styles.menuSelectedStyle];
      }
      return (
        <TouchableOpacity key={index} onPress={()=>this.clickOnItem(index)}>
          <View ref={o => this.addItemsRef(o,index)} style={textstyle}>
            <Text style={{color:'#50B694'}}>{item.targetName}</Text>
            {
              number>0?
                <View style={{backgroundColor:'#FF4400',width:10,height:10,borderRadius:50,alignItems:'center',marginBottom:20}}>
                  <Text style={{color:'#fff',fontSize:7}}>{number}</Text>
                </View>
              :
                null
            }
            
          </View>
        </TouchableOpacity>
      )
  }
  add = data =>{
//     this.props.dispatch({
//       type: ActionType.drink.add,  
//       payload: {
//         targetId:data.targetId,
//         detail:{
//           id:data.id,
//           number:1,
//           specification:['156955129532917358','156955129532917357']
//         },
//       }
//     })
    const {drinkOrder,specprodList,user} = this.props
    if(user&&user.token){
      let number = 0
      let specificationPar = {}
      if(drinkOrder[data.targetId]){
        let findVal = drinkOrder[data.targetId].find(item=>{return item.id===data.id})
        if(findVal){
          number = findVal.number
          specificationPar = findVal.specificationPar
        }
      }
      if(number==0){
        specprodList && specprodList.map((v,i)=>{
          specificationPar[v.data[0].targetId] = v.data[0].id
        })
      }
      let par = {
        ...data,
        number,
        specificationPar
      }
      this.setState({isVisible:true,par})
    }else{
      this.props.navigation.navigate('Login')
    }
  }
  minus = data =>{
    this.props.dispatch({
      type: ActionType.drink.minus,  
      payload: {
        targetId:data.targetId,
        id:data.id
      }
    })
  }
  submit=(data,number,specificationPar)=>{
    this.props.dispatch({
      type: ActionType.drink.add,  
      payload: {
          targetId:data.targetId,
          detail:{
              id:data.id,
              number,
              price:data.price,
              specificationPar
          },
      }
    })
    this.setState({isVisible:false})
  }
  clearing=()=>{
    let data =[]
    const {drinkOrder,user,CarList} = this.props
    const {prodlist} = CarList
    for(let i in drinkOrder){
      let index = prodlist&&prodlist.findIndex(item=>{return item.targetId===i})
      if(index>=0){
        drinkOrder[i] && drinkOrder[i].map((v,index)=>{
          let ide = prodlist[index].data.findIndex(item=>{return item.id===v.id})
            if(ide>=0){
              let l =[]
              for(let specIndex in v.specificationPar){
                l.push(v.specificationPar[specIndex])
              }
              data.push({
                id:v.id,
                qty:v.number,
                l
              })
            }
        })
      }
    }
    console.log(data)
    /*if(data.length>0){
      if(user && user.token){
        this.props.dispatch({
          type: ActionType.drink.takeOrder,  
          options: data,
          extra:{
            navigation:this.props.navigation
          }
        })
      }else{
        this.props.navigation.navigate('Login')
      }
      
    }else{
      Tips.toast("请至少选择一样产品！！")
    }*/
  }
  render() {
    const {isVisible,par} = this.state
    const {CarList,specprodList,drinkOrder} = this.props
    const {prodlist,reclist,tarlist} = CarList
    if(CarList&&prodlist&&prodlist[prodlist.length-1]){
      let data = prodlist[prodlist.length-1].data
      if(data){
        this.last = data[data.length-1]
      }
    }
    let total = 0
    for(let i in drinkOrder){
        let index = prodlist&&prodlist.findIndex(item=>{return item.targetId===i})
        if(index>=0){
          drinkOrder[i] && drinkOrder[i].map((v,ii)=>{
            let ide = prodlist[index].data.findIndex(item=>{return item.id===v.id})
            if(ide>=0){
              total+=(v.number*parseFloat(v.price))
            }
          })
        }
    }
    return (
      <View style={defaultStyles.container}>
        {
          isVisible?
          <SpecModal 
            //isVisible={isVisible} 
            onBackdropPress={()=>this.setState({isVisible:false})}
            specprodList={specprodList}
            data={par}
            submitFunc={this.submit}
          />
          :
          null
        }
        
        <View style={{height:44,marginTop:27,marginLeft:18}}>
            <Text style={{fontSize:19,fontWeight:'bold',color:'#4A4A4A'}}>每日特惠</Text>
        </View>
        <View>
            <ScrollView horizontal style={{marginLeft:18}}>
              {
                reclist && reclist.map((v,i)=>{
                  let number = 0
                  if(drinkOrder[v.targetId]){
                    let findVal = drinkOrder[v.targetId].find(item=>{return item.id===v.id})
                    if(findVal){
                      number = findVal.number
                    }
                  }
                  return (
                    <View key={i} style={{height:165,width:121,backgroundColor:'#fff',borderRadius:15,marginRight:10}}>
                        <Image source={{uri:v.imageUrl}} style={{width:121,height:121}}/>
                        <Text numberOfLines={1} style={{fontSize:12,color:'#4A4A4A',marginLeft:10,marginTop:5}}>{v.name}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:12,color:'#FF4400',marginLeft:10,flex:1}}>￥{v.price}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginRight:5}}>
                                {
                                  number!=0?
                                    <React.Fragment>
                                      <TouchableOpacity onPress={this.minus.bind(this,v)}>
                                        <Image source={reduce} style={{width:15,height:15}}/>
                                      </TouchableOpacity>
                                      <Text style={{marginHorizontal:6}}>{number}</Text>
                                    </React.Fragment>
                                  :
                                  null
                                }
                                <TouchableOpacity onPress={this.add.bind(this,v)}>
                                  <Image source={add} style={{width:15,height:15}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                  )
                })
              }
                
            </ScrollView>
        </View>
        <View style={styles.shelf}>
            <View style={styles.menuList}>
            <ScrollView>
                {
                    prodlist && prodlist.map((data, idx) => this._renderMenuItem(data, idx))
                }
            </ScrollView>
            </View>
            <View style={styles.itemList}>
            <SectionList
                ref={o=>this.sectionList = o}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderItemTitle}
                stickySectionHeadersEnabled={false}
                sections={prodlist}
                keyExtractor={(item, index) => index + ''}
                //getItemLayout={this.getItemLayout}
                //onViewableItemsChanged={this.itemOnChanged}
                onMomentumScrollBegin={() => {this.scrollBegin = true;}}
                onMomentumScrollEnd={()=>{this.scrollBegin = false}}
                //extraData={this.state}
            />
            </View>
        </View>
        <View style={{
          position: 'absolute',
          //top: SCREEN_HEIGHT-60-commonStyle.navHeight,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(1, 1, 1, 0.5)',
          height:60,
          justifyContent:'center'
        }}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color:'#fff',marginLeft:24,fontSize:18}}>￥<Text style={{fontSize:24,fontWeight:'bold'}}>{total.toFixed(2)}</Text></Text>  
            <Button
              buttonStyle={{
                backgroundColor:'#FF4400',
                width:88,
                height:44,
                marginRight:28
              }}
              title="去结算"
              titleStyle={{
                fontSize:18,
                fontWeight:'bold',
                color:'#fff'
              }}
              type="clear"
              onPress={this.clearing}
            /> 
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  let user = state.user
  let drinkList = state.drinkList
  let drinkOrder = state.drinkOrder
  let specprodList = state.specprodList
  let CarList = {}
  if(drinkList&&drinkList.serviceid==51){
    CarList=drinkList
  }
  return {CarList,drinkOrder,specprodList,user}
}
Sqms = connect(mapStateToProps)(Sqms)
export default Sqms;
const styles = StyleSheet.create({
  shelf:{
    flex:1,
    flexDirection:'row',
    marginTop:18,
    backgroundColor:'#fff'
  },
  menuList:{
    width:99,
    backgroundColor:'#F6FBF7',
  },
  itemList:{
    marginLeft:10,
    width:SCREEN_WIDTH-70
  },
  menuStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:44,
    flexDirection:'row'
  },
  menuNormalStyle:{
    backgroundColor:'rgba(255, 255, 255, 0)'
  },
  menuSelectedStyle:{
    backgroundColor:'white'
  }
})