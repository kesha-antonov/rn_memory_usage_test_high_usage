var I18n;

I18n = require('react-native-i18n')["default"];

I18n.defaultLocale = 'en';

I18n.fallbacks = true;

I18n.translations = {ru: {}, en: {}};

I18n.pluralization['ru'] = function(count) {
  var key;
  key = count % 10 === 1 && count % 100 !== 11 ? 'one' : [2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0 ? 'few' : count % 10 === 0 || [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 || [11, 12, 13, 14].indexOf(count % 100) >= 0 ? 'many' : 'other';
  return [key];
};

module.exports = I18n;
