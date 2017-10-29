var App, AppRegistry, Sentry;

AppRegistry = require('react-native').AppRegistry;

App = require('./app/dist/App');

if (process.env.NODE_ENV === 'production') {
  Sentry = require('react-native-sentry').Sentry;
  Sentry.config("MY_SENTRY_DSN", {
    deactivateStacktraceMerging: true
  }).install();
}

AppRegistry.registerComponent('rn_memory_usage_test_high_usage', function() {
  return App;
});
