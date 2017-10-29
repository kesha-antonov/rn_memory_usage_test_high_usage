'use strict';

import React from 'react'
import {
  AsyncStorage,
  AppState,
  NetInfo,
  Platform,
  Dimensions
} from 'react-native'
import {
  action,
  runInAction,
  reaction,
  observable,
  autorun,
  observe
} from 'mobx';
import autobind from 'autobind-decorator'
import {
  ActionCable,
  Cable
} from 'action-cable-react-native'
import moment from '../initMoment'
import {
  Actions,
  ActionConst
} from 'react-native-router-flux'
import I18n from '../initI18n'
import _ from 'lodash'
import PushNotification from 'react-native-push-notification'
const DeviceInfo = require('react-native-device-info')
import RatingRequestor from 'react-native-rating-requestor';
import * as StoreReview from 'react-native-store-review'


@autobind
class Store {

  @observable currentUserLanguage = null
  @observable deviceWidth = Dimensions.get('window').width
  @observable deviceHeight = Dimensions.get('window').height

  constructor(props) {
  }

  async prepareThings() {
    this.setReactionsAndAutoruns()
  }

  setReactionsAndAutoruns() {
    this.reactionForLocaleChangeDisposer = this.setReactionForLocaleChange()
  }

  setReactionForLocaleChange() {
    return reaction(
      () => this.currentUserLanguage,
      () => {
        return
      }
    )
  }

  fullCleanup() {
    this.reactionForLocaleChangeDisposer()
  }

}

export default Store;
