import React, {Component} from 'react';
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {connect} from 'react-redux'
/* import Spinner from 'react-native-loading-spinner-overlay' */
import Spinner from '../../utils/spinner'
import ActionType from '../../config/actionType'
import {commonStyle} from '../../res/commonStyle'
class Loading extends Component {
    render() {
        let {loading} = this.props      
        return (<Spinner
            visible={loading}
            textContent={'正在加载中 .....'}
            cancelable={true}
            //overlayColor={commonStyle.spinnerOverlayColor}
            textStyle={styles.spinnerTextStyle}/>);
    }
}

const mapStateToProps = (state) => {
    let loading = state.loading
    return {loading}
}
Loading = connect(mapStateToProps)(Loading)
export default Loading

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: commonStyle.spinnerTextColor
    }
})
