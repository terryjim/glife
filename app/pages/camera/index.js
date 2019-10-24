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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = 100
const HEADER_HEIGHT = 20
const menuDatas=['Title1','Title2','Title3','Title4','Title5','Title6','Title7','Title8']
export default class Camera extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        //selectItem:0
    }
  }
  scrollBegin= false
  items= []
  selectItem = 0
  clickOnItem(index){
    this.items&&this.items.map((data,i)=>{
      let style=[styles.menuStyle]
      if(index===i){
        style.push(styles.menuSelectedStyle)
      }else{
        style.push(styles.menuNormalStyle)
      }
      data.setNativeProps({style})
    })
    if(this.sectionList){
      this.sectionList.scrollToLocation({sectionIndex:index,itemIndex:0,viewPosition:0});
    }
  }
  renderItemTitle = ({item,index})=>{
    return (
      <Text key={index}>{item}</Text>
    )
  }
  renderItem = ({item,index})=>{
    return (
      <View style={{flexDirection:'row',marginTop:10,height:ITEM_HEIGHT }}>
        <Image
            source={{ uri: 'http://118.31.73.141:8081/Images/RZLC/636930117610577734.jpg' }}
            style={{height:100,width:100,borderRadius:10}}
        />
        <View style={{marginHorizontal:10,justifyContent:'space-between',width:SCREEN_WIDTH-239}}>
          <Text numberOfLines={2} style={{marginTop:15}}>意大利进口咖啡豆500g意式浓缩阿拉比卡豆</Text>
          <View style={{marginBottom:8,flexDirection:'row',justifyContent:'space-around'}}>
           <Text>￥0.00</Text>
           <View style={{flexDirection:'row'}}>
              <Image
                source={{ uri: 'http://118.31.73.141:8081/Images/RZLC/636930117610577734.jpg' }}
                style={{height:15,width:15,borderRadius:50}}
              />
              <Text style={{marginHorizontal:6}}>2</Text>
              <Image
                source={{ uri: 'http://118.31.73.141:8081/Images/RZLC/636930117610577734.jpg' }}
                style={{height:15,width:15,borderRadius:50}}
              />
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
                offset += ITEM_HEIGHT+10;
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
    if (firstItem && firstItem.section) {
        // 这里可以直接取到section的title
        let name = firstItem.section.title
        let index = menuDatas.indexOf(name)
        this.items&&this.items.map((data,i)=>{
          let style=[styles.menuStyle]
          if(index===i){
            style.push(styles.menuSelectedStyle)
          }else{
            style.push(styles.menuNormalStyle)
          }
          data.setNativeProps({style})
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
      let textstyle = styles.menuStyle
      if(index === this.selectItem){
        textstyle = [textstyle,styles.menuSelectedStyle];
      }
      return (
        <TouchableOpacity key={index} onPress={()=>this.clickOnItem(index)}>
          <View ref={o => this.addItemsRef(o,index)} style={textstyle}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )
  }
  render() {
    return (
      <View style={{marginTop:30,flex:1}}>
        <View style={styles.shelf}>
          <View style={styles.menuList}>
            <ScrollView>
              {
                  menuDatas.map((data, idx) => this._renderMenuItem(data, idx))
              }
            </ScrollView>
          </View>
          <View style={styles.itemList}>
            <SectionList
              ref={o=>this.sectionList = o}
              renderItem={this.renderItem}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: "bold",height:HEADER_HEIGHT }}>{title}</Text>
              )}
              sections={[
                { title: "Title1", data: ["item1", "item2"] },
                { title: "Title2", data: ["item3", "item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4","item4","item3", "item4",] },
                { title: "Title3", data: ["item5", "item6"] },
                { title: "Title4", data: ["item5", "item6"] },
                { title: "Title5", data: ["item5", "item6"] },
                { title: "Title6", data: ["item5", "item6","item5", "item6","item5", "item6","item5", "item6","item5", "item6","item5", "item6","item5", "item6","item5", "item6","item5", "item6",] },
                { title: "Title7", data: ["item5", "item6"] },
                { title: "Title8", data: ["item5", "item6"] },
              ]}
              keyExtractor={(item, index) => index + ''}
              getItemLayout={this.getItemLayout}
              onViewableItemsChanged={this.itemOnChanged}
              onMomentumScrollBegin={() => {this.scrollBegin = true;}}
              onMomentumScrollEnd={()=>{this.scrollBegin = false}}
            />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  shelf:{
    flex:1,
    flexDirection:'row',
  },
  menuList:{
    width:99,
    backgroundColor:'#e2e2e2',
  },
  itemList:{
    marginLeft:10,
    width:SCREEN_WIDTH-70
  },
  menuStyle:{
    height:44
  },
  menuNormalStyle:{
    backgroundColor:'rgba(255, 255, 255, 0)'
  },
  menuSelectedStyle:{
    backgroundColor:'white'
  }
})