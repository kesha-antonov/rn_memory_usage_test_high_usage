var ActionConst, ActionSheetProvider, Actions, AndroidKeyboardAdjust, Animated, App, AppView, AsyncStorage, Component, DeviceInfo, I18n, Icon, Linking, Orientation, Permissions, Platform, PropTypes, Provider, React, Reducer, Router, Scene, SignInScene, SplashScreen, Stack, Store, StyleSheet, TabBarIcon, Tabs, Text, TouchableOpacity, UserScene, View, _, action, autorun, inject, mobx, moment, observer, propTypes, reaction, reducerCreate, ref, ref1, ref2, store,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

React = require('react');

Component = React.Component;

ref = require('react-native'), ScrollView = ref.ScrollView, View = ref.View, StyleSheet = ref.StyleSheet, AsyncStorage = ref.AsyncStorage, Platform = ref.Platform, Animated = ref.Animated, TouchableOpacity = ref.TouchableOpacity, Linking = ref.Linking, Text = ref.Text;

ref1 = require('mobx-react/native'), Provider = ref1.Provider, observer = ref1.observer, inject = ref1.inject, PropTypes = ref1.PropTypes;

mobx = require('mobx');

mobx.useStrict(true);

autorun = mobx.autorun, reaction = mobx.reaction, action = mobx.action;

ref2 = require('react-native-router-flux'), Router = ref2.Router, Actions = ref2.Actions, Reducer = ref2.Reducer, ActionConst = ref2.ActionConst, Tabs = ref2.Tabs, Scene = ref2.Scene, Stack = ref2.Stack;

Icon = require('react-native-vector-icons/Ionicons')["default"];

I18n = require('./initI18n');

moment = require('./initMoment');

_ = require('lodash');

Permissions = require('react-native-permissions');

ActionSheetProvider = require('@expo/react-native-action-sheet').ActionSheetProvider;

propTypes = require('prop-types');

DeviceInfo = require('react-native-device-info');

SplashScreen = require('react-native-splash-screen');

AndroidKeyboardAdjust = require('react-native-android-keyboard-adjust');

Store = require('./stores/Store')["default"];

store = new Store();

if (store.deviceWidth < 1668 || store.deviceHeight < 1668) {
  Orientation = require('react-native-orientation');
  if (Platform.OS === 'android') {
    Orientation.lockToSensorPortrait();
  } else {
    Orientation.lockToPortrait();
  }
}

reducerCreate = function(params) {
  var defaultReducer;
  defaultReducer = new Reducer(params);
  return function(state, action) {
    var scene;
    scene = state.routes[state.index];
    if (action.type === ActionConst.FOCUS && (scene != null)) {
      if (key !== store.currentScene.key) {
        store.setCurrentScene({
          key: key,
          prevSceneKey: store.currentScene.key,
          index: state.index
        });
      }
    }
    return defaultReducer(state, action);
  };
};

UserScene = (function(superClass) {
  extend(UserScene, superClass);

  function UserScene() {
    return UserScene.__super__.constructor.apply(this, arguments);
  }

  UserScene.prototype.render = function() {
    // return React.createElement(View, null);
    return (
      <ScrollView style={{flex: 1}}>
        {
          new Array(100).fill().map((x,i) => {
            return (
              <View key={i} style={{width: 320, height: 100, }}>
                <Text>
                  {'Hello' + i}
                </Text>
              </View>
            )
          })
        }
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {"Welcome to React Native!"}
          </Text>
          <Text style={styles.instructions}>
            {"To get started, edit App.js"}
          </Text>
          <Text style={styles.instructions}>
            {"instructions"}
          </Text>
        </View>
      </ScrollView>
    )
  };

  return UserScene;

})(Component);

SignInScene = (function(superClass) {
  extend(SignInScene, superClass);

  function SignInScene() {
    return SignInScene.__super__.constructor.apply(this, arguments);
  }

  SignInScene.prototype.render = function() {
    return React.createElement(View, null);
  };

  return SignInScene;

})(Component);

TabBarIcon = (function(superClass) {
  extend(TabBarIcon, superClass);

  function TabBarIcon() {
    return TabBarIcon.__super__.constructor.apply(this, arguments);
  }

  TabBarIcon.prototype.render = function() {
    return React.createElement(View, null);
  };

  return TabBarIcon;

})(Component);

AppView = observer(App = (function(superClass) {
  extend(App, superClass);

  function App(props) {
    this.renderScenesAndModals = bind(this.renderScenesAndModals, this);
    this.scenes = bind(this.scenes, this);
    this.renderTabsScenes = bind(this.renderTabsScenes, this);
    this.getAndroidInitialPushData = bind(this.getAndroidInitialPushData, this);
    App.__super__.constructor.call(this, props);
    this.getAndroidInitialPushData();
  }

  App.prototype.componentDidMount = async function() {
    // NOTE: HIDE SPLASH SCREEN
    SplashScreen.hide()
    await store.prepareThings()
    this.setKeyboardConfigForAndroid()
  };

  App.prototype.componentWillUnmount = function() {
    return store.fullCleanup();
  };

  App.prototype.getAndroidInitialPushData = function() {
    var initialPushData;
    if (Platform.OS === 'android' && (this.props.initialPushData != null)) {
      return initialPushData = JSON.parse(this.props.initialPushData);
    }
  };

  App.prototype.setKeyboardConfigForAndroid = function() {
    if (Platform.OS === 'android') {
      return AndroidKeyboardAdjust.setAdjustPan();
    }
  };

  App.prototype.renderTitle = function(props) {
    var navigationState;
    if (props.title != null) {
      return props.title;
    }
    navigationState = props.navigation.state;
    switch (navigationState.routeName) {
      case 'user':
        return 'User';
    }
  };

  App.prototype.renderTabsScenes = function() {
    var defaultTabOptions;
    defaultTabOptions = {
      panHandlers: null,
      icon: TabBarIcon
    };
    return React.createElement(Tabs, {
      "key": 'tabbar',
      "initial": true,
      "hideNavBar": true,
      "panHandlers": null,
      "tabBarStyle": styles.tabBar,
      "gestureEnabled": false,
      "backToInitial": false,
      "tabBarPosition": 'bottom',
      "showLabel": true,
      "swipeEnabled": false,
      "animationEnabled": false,
      "lazy": true
    }, React.createElement(Scene, Object.assign({}, defaultTabOptions, {
      "key": 'userTab',
      "tabName": 'userTab',
      "initial": true,
    }), React.createElement(Scene, {
      "key": 'user',
      "component": UserScene
    })));
  };

  App.prototype.scenes = function() {
    var authSceneDefaultProps, sceneWithTitleDefaultProps;
    sceneWithTitleDefaultProps = {
      renderTitle: this.renderTitle
    };
    authSceneDefaultProps = {
      type: ActionConst.REPLACE
    };
    return React.createElement(Stack, {
      "key": 'root'
    }, React.createElement(Scene, {
      "key": 'signIn',
      "component": SignInScene
    }), this.renderTabsScenes());
  };

  App.prototype.renderBackButton = function(props) {
    return React.createElement(View, null);
  };

  App.prototype.renderScenesAndModals = function() {
    return React.createElement(ActionSheetProvider, null, React.createElement(View, {
      "style": [
        {
          position: 'relative'
        }, styles.scenesContainer
      ]
    }, React.createElement(Router, {
      "store": store,
      "wrapBy": observer,
      "createReducer": reducerCreate,
      "renderBackButton": this.renderBackButton,
      "sceneStyle": styles.scene,
      "backButtonTextStyle": styles.backButtonText,
      "titleStyle": {
        backgroundColor: 'black',
        fontSize: 20,
        lineHeight: 25
      },
      "navigationBarStyle": styles.navigationBar
    }, this.scenes())));
  };

  App.prototype.render = function() {
    return React.createElement(Provider, {
      "store": store
    }, this.renderScenesAndModals());
  };

  return App;

})(Component));

App.propTypes = {
  initialPushData: propTypes.string
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    height: 54
  },
  tabIconContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    position: 'relative'
  },
  tabIcon: {
    marginBottom: -3
  },
  tabIconText: {
    fontSize: 7.5,
    lineHeight: 12,
    flexWrap: 'nowrap',
    fontWeight: '700',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        marginBottom: 3,
        marginTop: 27
      },
      android: {
        marginBottom: 5,
        marginTop: 0
      }
    })
  },
  tabIconTextActive: {
    color: 'blue',
    fontWeight: '900'
  },
  tabNotificationsBadge: {
    position: 'absolute',
    top: -4,
    right: -8
  },
  backButtonText: {
    color: 'blue',
    ...Platform.select({
      android: {
        marginTop: -3
      }
    })
  },
  scene: {
    backgroundColor: '#fff'
  },
  editMediaTitleWrapper: {
    left: -50
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  scenesContainer: {
    flex: 1
  },
  tabIconUploadMedia: {
    top: -4
  },
  placesIcon: {
    top: -1
  },
  feedIcon: {
    top: 1
  },
  navigationBar: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'grey',
    left: 0,
    right: 0,
    borderBottomWidth: 0,
    ...Platform.select({
      android: {
        elevation: 0
      }
    })
  }
})
;

module.exports = AppView;
