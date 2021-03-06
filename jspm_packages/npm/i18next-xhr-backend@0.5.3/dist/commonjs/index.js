/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var _utils = require('./utils');
var utils = _interopRequireWildcard(_utils);
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function ajax(url, options, callback, data, cache) {
  if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    var y = '',
        e = encodeURIComponent;
    for (var m in data) {
      y += '&' + e(m) + '=' + e(data[m]);
    }
    data = y.slice(1) + (!cache ? '&_t=' + new Date() : '');
  }
  try {
    var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    x.open(data ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.onreadystatechange = function() {
      x.readyState > 3 && callback && callback(x.responseText, x);
    };
    x.send(data);
  } catch (e) {
    window.console && console.log(e);
  }
}
;
function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse,
    crossDomain: false,
    ajax: ajax
  };
}
var Backend = function() {
  function Backend(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    _classCallCheck(this, Backend);
    this.init(services, options);
    this.type = 'backend';
  }
  _createClass(Backend, [{
    key: 'init',
    value: function init(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      this.services = services;
      this.options = utils.defaults(options, this.options || {}, getDefaults());
    }
  }, {
    key: 'readMulti',
    value: function readMulti(languages, namespaces, callback) {
      var url = this.services.interpolator.interpolate(this.options.loadPath, {
        lng: languages.join('+'),
        ns: namespaces.join('+')
      });
      this.loadUrl(url, callback);
    }
  }, {
    key: 'read',
    value: function read(language, namespace, callback) {
      var url = this.services.interpolator.interpolate(this.options.loadPath, {
        lng: language,
        ns: namespace
      });
      this.loadUrl(url, callback);
    }
  }, {
    key: 'loadUrl',
    value: function loadUrl(url, callback) {
      var _this = this;
      this.options.ajax(url, this.options, function(data, xhr) {
        var statusCode = xhr.status.toString();
        if (statusCode.indexOf('5') === 0)
          return callback('failed loading ' + url, true);
        if (statusCode.indexOf('4') === 0)
          return callback('failed loading ' + url, false);
        var ret = void 0,
            err = void 0;
        try {
          ret = _this.options.parse(data);
        } catch (e) {
          err = 'failed parsing ' + url + ' to json';
        }
        if (err)
          return callback(err, false);
        callback(null, ret);
      });
    }
  }, {
    key: 'create',
    value: function create(languages, namespace, key, fallbackValue) {
      var _this2 = this;
      if (typeof languages === 'string')
        languages = [languages];
      var payload = {};
      payload[key] = fallbackValue || '';
      languages.forEach(function(lng) {
        var url = _this2.services.interpolator.interpolate(_this2.options.addPath, {
          lng: lng,
          ns: namespace
        });
        _this2.options.ajax(url, _this2.options, function(data, xhr) {}, payload);
      });
    }
  }]);
  return Backend;
}();
Backend.type = 'backend';
exports.default = Backend;
