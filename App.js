import React from 'react';
import { Text, View, StatusBar } from 'react-native';

import reducers from './app/reducers'

import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'
import { createAppContainer } from 'react-navigation'

import MainNavigator from './app/navigators'
import rootSaga from './app/sagas'
import Loading from './app/pages/loading'
import {commonStyle} from './app/res/commonStyle'
import SplashScreen from 'react-native-splash-screen'
import {hisRouters,shieldRouters,RoutersParams} from './app/config'
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading','sms','membersInfo','drinkOrder','searchList'] // reducer 里不持久化的数据
}
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  // 包装createReducer 即 rootReducer
  persistReducer(persistConfig, reducers), compose(
    applyMiddleware(sagaMiddleware),
    // autoRehydrate() 
  )
)
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)

const PersistorLoading= () => <Text>loading</Text>
const App = createAppContainer(MainNavigator)
//const App = (News)
/* const getActiveRouteName=(navigationState)=> {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];  
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
} */
export default class Container extends React.Component {
  componentDidMount() {
    setTimeout(SplashScreen.hide,2000);
}
  render() {
    let switchRouters = false
    return (
      <Provider store={store}>
       {/*  <PersistGate persistor={persistor} loading={<Loading/>} > }*/}
          <ThemeProvider>   
            <View　style={{flex:1}}      >
            <StatusBar
                    barStyle='light-content'
                   /*  barStyle='dark-content' */
                    //backgroundColor={commonStyle.themeColor}
                    backgroundColor='rgba(255, 255, 255, 0)'
                    translucent={true}
                    //hidden={true}
                />           
            <App  onNavigationStateChange={(prevState, currentState, action) => { 
              //console.log(currentState) 
              
              //
              if(action&&action.type&&action.type=='Navigation/BACK'){
                  if(switchRouters){
                    if(currentState.routes[1].routes.length==1){
                      hisRouters.push('mainTabs_glife')
                    }else{
                      hisRouters.push(hisRouters[hisRouters.length-2])
                    }
                   // hisRouters.push(hisRouters[hisRouters.length-2])
                  }
                  if(hisRouters.length>3){
                    hisRouters.shift()  
                  }
              }  
              if(action&&action.type&&action.routeName&&action.type!=='Navigation/COMPLETE_TRANSITION'){
                if(currentState&&currentState.routes){
                  let routes = currentState.routes[currentState.routes.length-1].routes
                  if(routes&&routes[routes.length-1]&&routes[routes.length-1].params){
                    RoutersParams.push(routes[routes.length-1].params)
                    if(RoutersParams.length>1)
                      RoutersParams.shift()
                  }
                }
                //console.log(RoutersParams)
                if(shieldRouters.indexOf(action.routeName)>0){
                  switchRouters=false
                }
                if(hisRouters[hisRouters.length-1]!=action.routeName&&shieldRouters.indexOf(action.routeName)<0){
                   switchRouters=true
                   hisRouters.push(action.routeName)    
                   if(hisRouters.length>3){
                    hisRouters.shift()     
                   }      
                }
              }
              console.log(hisRouters)
            /* const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);
              console.log('------------------------------') */
          // console.log(prevScreen);
          //  console.log(currentScreen)
     
    }}/>
            <Loading/>
            </View>
          </ThemeProvider>
      {/*   </PersistGate> */}
      </Provider>
    )
  }
}

