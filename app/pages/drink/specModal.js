import React, { Component,PureComponent } from 'react';
import {  
    Text,
    View, WebView,Dimensions,Image,TouchableOpacity,StyleSheet
} from 'react-native';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const add = require('../../res/images/add.png')
const reduce = require('../../res/images/reduce.png')
export default class SpecModal extends Component {
    constructor(props) {
        super(props); 
        this.state={
            number:props.data.number+1,
            specificationPar:props.data.specificationPar
        }
    }
    add = () =>{
        this.setState({
            number:this.state.number+1
        })
    }
    minus = () =>{
        if(this.state.number>1){
            this.setState({
                number:this.state.number-1
            })
        }
       
    }
    click = data=>{
        const {specificationPar} = this.state
        specificationPar[data.targetId] = data.id
        this.setState({specificationPar})
    }
    submit=()=>{
        const {data} = this.props
        const {number,specificationPar} = this.state
        this.props.submitFunc(data,number,specificationPar)
        //this.props.onBackdropPress()
    }
    render() {  
        const {number,specificationPar} = this.state
        const {isVisible,onBackdropPress,specprodList,data} = this.props   
        
        return (  
            <Modal 
                    deviceWidth={SCREEN_WIDTH}
                    deviceHeight={SCREEN_HEIGHT}
                    isVisible={true} 
                    onBackdropPress ={onBackdropPress}
                    style={{
                        justifyContent:'flex-end',
                        margin:0
                    }}
            >
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{marginHorizontal:18}}>
                        <View style={{flexDirection:'row',marginTop:18}}>
                            <Image source={{uri:data.imageUrl}} style={{width:100,height:100}}/>
                            <View style={{justifyContent:'space-between',marginVertical:15,marginLeft:10}}>
                                <Text style={{fontSize:14,color:'#4A4A4A'}}>{data.name}</Text>
                                <Text style={{fontSize:18,color:'#FF4400'}}>￥{data.price}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
                            <Text>数量</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginRight:5}}>
                                {
                                    number!=0?
                                        <React.Fragment>
                                        <TouchableOpacity onPress={this.minus.bind(this)}>
                                            <Image source={reduce} style={{width:15,height:15}}/>
                                        </TouchableOpacity>
                                        <Text style={{marginHorizontal:6}}>{number}</Text>
                                        </React.Fragment>
                                    :
                                    null
                                }
                                <TouchableOpacity onPress={this.add.bind(this)}>
                                    <Image source={add} style={{width:15,height:15}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:40}}>
                            {
                                specprodList && specprodList.map((v,i)=>{
                                    let top = 0
                                    if(i>0){
                                        top=17
                                    }
                                    return (
                                        <View key={i} style={{marginTop:top}}>
                                            <Text>{v.targetName}</Text>
                                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                                {
                                                    v.data && v.data.map((v,i)=>{
                                                        let selected = ['#F2F2F2', '#F2F2F2']
                                                        let selectedFont = '#9B9B9B'
                                                        if(specificationPar[v.targetId] && specificationPar[v.targetId]==v.id){
                                                            selected = ['#8BC220', '#2DAE36']
                                                            selectedFont = '#fff'
                                                        }
                                                        return (
                                                            <TouchableOpacity key={i} onPress={this.click.bind(this,v)}>
                                                                <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={selected} style={styles.specification}>
                                                                    <Text style={{fontSize:12,color:selectedFont}}>{v.name}</Text>
                                                                </LinearGradient> 
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity onPress={this.submit.bind(this)}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#8BC220', '#2DAE36']} style={styles.submitBut}>
                                <Text style={{fontSize:19,color:'#fff'}}>选好了</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    specification:{
        width:100,
        height:26,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
        marginTop:7
    },
    submitBut:{
        marginTop:40,
        width:SCREEN_WIDTH-32,
        height:44,
        borderRadius:22,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:18
    },
})
