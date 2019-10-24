import React, { Component } from 'react';
import {  
    Text,
    View, WebView,ScrollView
} from 'react-native';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'

class Agreement extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.staticPage.getstaticPage,  
            options: {
              id:101
            },
            extra: {
              method:'GET'
            }
          })
    }
    render() { 
        const {userAgreement} = this.props  
        return (   
            <ScrollView style={defaultStyles.container}>
                <View style={{marginHorizontal:18}}>
                    <Text>
                        {
                            userAgreement && userAgreement.content
                        }
                    </Text>  
                </View>
            </ScrollView>
            
        )
    }
}
const mapStateToProps = (state) => {
    const userAgreement = state.userAgreement
    return {userAgreement}
}
Agreement = connect(mapStateToProps)(Agreement)
export default Agreement;


