import React, { Component } from 'react';
import {  
    Text,
    View, WebView,ScrollView
} from 'react-native';
import ActionType from '../../config/actionType'
import {connect} from 'react-redux'
import defaultStyles from '../../res/commonStyle'

class Privacy extends Component {
    componentDidMount(){
        this.props.dispatch({
            type: ActionType.staticPage.getstaticPage,  
            options: {
              id:103
            },
            extra: {
              method:'GET'
            }
          })
    }
    render() { 
        const {privacyPolicy} = this.props    
        return (   
            <ScrollView style={defaultStyles.container}>
                <View style={{marginHorizontal:18}}>
                    <Text>
                        {
                            privacyPolicy && privacyPolicy.content
                        }
                    </Text>  
                </View>
            </ScrollView>
            
        )
    }
}
const mapStateToProps = (state) => {
    const privacyPolicy = state.privacyPolicy
    return {privacyPolicy}
}
Privacy = connect(mapStateToProps)(Privacy)
export default Privacy;

