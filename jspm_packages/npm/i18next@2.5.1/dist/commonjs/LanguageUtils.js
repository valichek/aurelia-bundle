/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _logger = require('./logger');
var _logger2 = _interopRequireDefault(_logger);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var LanguageUtil = function() {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);
    this.options = options;
    this.whitelist = this.options.whitelist || false;
    this.logger = _logger2.default.create('languageUtils');
  }
  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (code.indexOf('-') < 0)
      return code;
    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
    var p = code.split('-');
    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
  };
  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');
      if (this.options.lowerCaseLng) {
        p = p.map(function(part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1)
          p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();
        if (p[1].length === 2)
          p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2)
          p[2] = p[2].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1)
          p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1)
          p[2] = capitalize(p[2].toLowerCase());
      }
      return p.join('-');
    } else {
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  };
  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly')
      code = this.getLanguagePartFromCode(code);
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
  };
  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;
    fallbackCode = fallbackCode || this.options.fallbackLng || [];
    if (typeof fallbackCode === 'string')
      fallbackCode = [fallbackCode];
    var codes = [];
    var addCode = function addCode(code) {
      if (_this.isWhitelisted(code)) {
        codes.push(code);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
      }
    };
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly')
        addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'currentOnly')
        addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCode.forEach(function(fc) {
      if (codes.indexOf(fc) < 0)
        addCode(_this.formatLanguageCode(fc));
    });
    return codes;
  };
  return LanguageUtil;
}();
;
exports.default = LanguageUtil;
