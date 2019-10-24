import auth from './auth'
import sms from './sms'
import life from './life'
import cate from './cate'
import school from './school'
import search from './search'
import drink from './drink'
import order from './order'
import weather from './weather'
import reservation from './reservation'
import staticPage from './staticPage'
import request from './request'
import { put, takeEvery, fork,all } from 'redux-saga/effects'

 
export default function* rootSaga() {
    yield all([auth(),sms(),life(),cate(),school(),search(),drink(),order(),weather(),reservation(),staticPage()])
  }