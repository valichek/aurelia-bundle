"bundle";
System.registerDynamic("github:systemjs/plugin-text@0.0.8/text", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports.translate = function(load) {
    if (this.builder && this.transpiler) {
      load.metadata.format = 'esm';
      return 'export default ' + JSON.stringify(load.source) + ';';
    }
    load.metadata.format = 'amd';
    return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-text@0.0.8", ["github:systemjs/plugin-text@0.0.8/text"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:systemjs/plugin-text@0.0.8/text');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:github/fetch@1.0.0/fetch", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    (function(self) {
      'use strict';
      if (self.fetch) {
        return;
      }
      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      };
      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name');
        }
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value);
        }
        return value;
      }
      function iteratorFor(items) {
        var iterator = {next: function() {
            var value = items.shift();
            return {
              done: value === undefined,
              value: value
            };
          }};
        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }
        return iterator;
      }
      function Headers(headers) {
        this.map = {};
        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var list = this.map[name];
        if (!list) {
          list = [];
          this.map[name] = list;
        }
        list.push(value);
      };
      Headers.prototype['delete'] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        var values = this.map[normalizeName(name)];
        return values ? values[0] : null;
      };
      Headers.prototype.getAll = function(name) {
        return this.map[normalizeName(name)] || [];
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = [normalizeValue(value)];
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        Object.getOwnPropertyNames(this.map).forEach(function(name) {
          this.map[name].forEach(function(value) {
            callback.call(thisArg, value, name, this);
          }, this);
        }, this);
      };
      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }
      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return fileReaderReady(reader);
      }
      function readBlobAsText(blob) {
        var reader = new FileReader();
        reader.readAsText(blob);
        return fileReaderReady(reader);
      }
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this._bodyInit = body;
          if (typeof body === 'string') {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (!body) {
            this._bodyText = '';
          } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else {
            throw new Error('unsupported BodyInit type');
          }
          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8');
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob');
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
          this.arrayBuffer = function() {
            return this.blob().then(readBlobAsArrayBuffer);
          };
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text');
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
        } else {
          this.text = function() {
            var rejected = consumed(this);
            return rejected ? rejected : Promise.resolve(this._bodyText);
          };
        }
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method;
      }
      function Request(input, options) {
        options = options || {};
        var body = options.body;
        if (Request.prototype.isPrototypeOf(input)) {
          if (input.bodyUsed) {
            throw new TypeError('Already read');
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          if (!body) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = input;
        }
        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;
        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        this._initBody(body);
      }
      Request.prototype.clone = function() {
        return new Request(this);
      };
      function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function headers(xhr) {
        var head = new Headers();
        var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
        pairs.forEach(function(header) {
          var split = header.trim().split(':');
          var key = split.shift().trim();
          var value = split.join(':').trim();
          head.append(key, value);
        });
        return head;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        if (!options) {
          options = {};
        }
        this.type = 'default';
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText;
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, {
          status: 0,
          statusText: ''
        });
        response.type = 'error';
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code');
        }
        return new Response(null, {
          status: status,
          headers: {location: url}
        });
      };
      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;
      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request;
          if (Request.prototype.isPrototypeOf(input) && !init) {
            request = input;
          } else {
            request = new Request(input, init);
          }
          var xhr = new XMLHttpRequest();
          function responseURL() {
            if ('responseURL' in xhr) {
              return xhr.responseURL;
            }
            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
              return xhr.getResponseHeader('X-Request-URL');
            }
            return;
          }
          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: headers(xhr),
              url: responseURL()
            };
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.ontimeout = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.open(request.method, request.url, true);
          if (request.credentials === 'include') {
            xhr.withCredentials = true;
          }
          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob';
          }
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
      };
      self.fetch.polyfill = true;
    })(typeof self !== 'undefined' ? self : this);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("github:github/fetch@1.0.0", ["github:github/fetch@1.0.0/fetch"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:github/fetch@1.0.0/fetch');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-css@0.1.21/css", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  if (typeof window !== 'undefined') {
    var waitSeconds = 100;
    var head = document.getElementsByTagName('head')[0];
    var links = document.getElementsByTagName('link');
    var linkHrefs = [];
    for (var i = 0; i < links.length; i++) {
      linkHrefs.push(links[i].href);
    }
    var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
    var webkitLoadCheck = function(link, callback) {
      setTimeout(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href)
            return callback();
        }
        webkitLoadCheck(link, callback);
      }, 10);
    };
    var noop = function() {};
    var loadCSS = function(url) {
      return new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
          reject('Unable to load CSS');
        }, waitSeconds * 1000);
        var _callback = function(error) {
          clearTimeout(timeout);
          link.onload = link.onerror = noop;
          setTimeout(function() {
            if (error)
              reject(error);
            else
              resolve('');
          }, 7);
        };
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        if (!isWebkit) {
          link.onload = function() {
            _callback();
          };
        } else {
          webkitLoadCheck(link, _callback);
        }
        link.onerror = function(event) {
          _callback(event.error || new Error('Error loading CSS file.'));
        };
        head.appendChild(link);
      });
    };
    exports.fetch = function(load) {
      for (var i = 0; i < linkHrefs.length; i++)
        if (load.address == linkHrefs[i])
          return '';
      return loadCSS(load.address);
    };
  } else {
    function getBuilder(loader) {
      return loader['import']('./css-builder' + (System.version ? '.js' : ''), {name: module.id});
    }
    exports.cssPlugin = true;
    exports.fetch = function(load) {
      if (this.buildCSS === false)
        load.metadata.build = false;
      load.metadata.format = 'defined';
      return '';
    };
    exports.instantiate = function() {};
    exports.bundle = function(loads, opts) {
      var loader = this;
      if (loader.buildCSS === false)
        return '';
      return getBuilder(loader).then(function(builder) {
        return builder.bundle.call(loader, loads, opts);
      });
    };
    exports.listAssets = function(loads, compileOpts, outputOpts) {
      var loader = this;
      return getBuilder(loader).then(function(builder) {
        return builder.listAssets.call(loader, loads, compileOpts, outputOpts);
      });
    };
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-css@0.1.21", ["github:systemjs/plugin-css@0.1.21/css"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:systemjs/plugin-css@0.1.21/css');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next-xhr-backend@0.5.3/dist/commonjs/utils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.defaults = defaults;
  exports.extend = extend;
  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;
  function defaults(obj) {
    each.call(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined)
            obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }
  function extend(obj) {
    each.call(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next-xhr-backend@0.5.3/dist/commonjs/index", ["npm:i18next-xhr-backend@0.5.3/dist/commonjs/utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var _utils = $__require('npm:i18next-xhr-backend@0.5.3/dist/commonjs/utils');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next-xhr-backend@0.5.3/index", ["npm:i18next-xhr-backend@0.5.3/dist/commonjs/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:i18next-xhr-backend@0.5.3/dist/commonjs/index').default;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next-xhr-backend@0.5.3", ["npm:i18next-xhr-backend@0.5.3/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:i18next-xhr-backend@0.5.3/index');
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/base-i18n", ["exports", "npm:aurelia-i18n@0.5.2/i18n", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0"], function(exports, _i18n, _aureliaEventAggregator) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.BaseI18N = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _class,
      _temp;
  var BaseI18N = exports.BaseI18N = (_temp = _class = function() {
    function BaseI18N(i18n, element, ea) {
      var _this = this;
      _classCallCheck(this, BaseI18N);
      this.i18n = i18n;
      this.element = element;
      this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function() {
        _this.i18n.updateTranslations(_this.element);
      });
    }
    BaseI18N.prototype.attached = function attached() {
      this.i18n.updateTranslations(this.element);
    };
    BaseI18N.prototype.detached = function detached() {
      this.__i18nDisposer.dispose();
    };
    return BaseI18N;
  }(), _class.inject = [_i18n.I18N, Element, _aureliaEventAggregator.EventAggregator], _temp);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/utils", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2"], function(exports, _aureliaDependencyInjection) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.LazyOptional = exports.assignObjectToKeys = exports.extend = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _class;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  var extend = exports.extend = function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  };
  var assignObjectToKeys = exports.assignObjectToKeys = function assignObjectToKeys(root, obj) {
    if (obj === undefined || obj === null) {
      return obj;
    }
    var opts = {};
    Object.keys(obj).map(function(key) {
      if (_typeof(obj[key]) === 'object') {
        extend(opts, assignObjectToKeys(key, obj[key]));
      } else {
        opts[root !== '' ? root + '.' + key : key] = obj[key];
      }
    });
    return opts;
  };
  var LazyOptional = exports.LazyOptional = (_dec = (0, _aureliaDependencyInjection.resolver)(), _dec(_class = function() {
    function LazyOptional(key) {
      _classCallCheck(this, LazyOptional);
      this.key = key;
    }
    LazyOptional.prototype.get = function get(container) {
      var _this = this;
      return function() {
        if (container.hasResolver(_this.key, false)) {
          return container.get(_this.key);
        }
        return null;
      };
    };
    LazyOptional.of = function of(key) {
      return new LazyOptional(key);
    };
    return LazyOptional;
  }()) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/t", ["exports", "npm:aurelia-i18n@0.5.2/i18n", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-i18n@0.5.2/utils"], function(exports, _i18n, _aureliaEventAggregator, _aureliaTemplating, _aureliaTemplatingResources, _aureliaBinding, _utils) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TBindingBehavior = exports.TCustomAttribute = exports.TParamsCustomAttribute = exports.TValueConverter = undefined;
  var _dec,
      _class,
      _class2,
      _temp,
      _dec2,
      _class3,
      _class4,
      _temp2,
      _class5,
      _temp3;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var TValueConverter = exports.TValueConverter = function() {
    TValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };
    function TValueConverter(i18n) {
      _classCallCheck(this, TValueConverter);
      this.service = i18n;
    }
    TValueConverter.prototype.toView = function toView(value, options) {
      return this.service.tr(value, options);
    };
    return TValueConverter;
  }();
  var TParamsCustomAttribute = exports.TParamsCustomAttribute = (_dec = (0, _aureliaTemplating.customAttribute)('t-params'), _dec(_class = (_temp = _class2 = function() {
    function TParamsCustomAttribute(element) {
      _classCallCheck(this, TParamsCustomAttribute);
      this.element = element;
    }
    TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};
    return TParamsCustomAttribute;
  }(), _class2.inject = [Element], _temp)) || _class);
  var TCustomAttribute = exports.TCustomAttribute = (_dec2 = (0, _aureliaTemplating.customAttribute)('t'), _dec2(_class3 = (_temp2 = _class4 = function() {
    function TCustomAttribute(element, i18n, ea, tparams) {
      _classCallCheck(this, TCustomAttribute);
      this.element = element;
      this.service = i18n;
      this.ea = ea;
      this.lazyParams = tparams;
    }
    TCustomAttribute.prototype.bind = function bind() {
      var _this = this;
      this.params = this.lazyParams();
      if (this.params) {
        this.params.valueChanged = function(newParams, oldParams) {
          _this.paramsChanged(_this.value, newParams, oldParams);
        };
      }
      var p = this.params !== null ? this.params.value : undefined;
      this.subscription = this.ea.subscribe('i18n:locale:changed', function() {
        _this.service.updateValue(_this.element, _this.value, p);
      });
      this.service.updateValue(this.element, this.value, p);
    };
    TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
      this.service.updateValue(this.element, newValue, newParams);
    };
    TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
      var p = this.params !== null ? this.params.value : undefined;
      this.service.updateValue(this.element, newValue, p);
    };
    TCustomAttribute.prototype.unbind = function unbind() {
      if (this.subscription) {
        this.subscription.dispose();
      }
    };
    return TCustomAttribute;
  }(), _class4.inject = [Element, _i18n.I18N, _aureliaEventAggregator.EventAggregator, _utils.LazyOptional.of(TParamsCustomAttribute)], _temp2)) || _class3);
  var TBindingBehavior = exports.TBindingBehavior = (_temp3 = _class5 = function() {
    function TBindingBehavior(signalBindingBehavior) {
      _classCallCheck(this, TBindingBehavior);
      this.signalBindingBehavior = signalBindingBehavior;
    }
    TBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');
      var sourceExpression = binding.sourceExpression;
      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
    };
    TBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.sourceExpression.expression = binding.sourceExpression.expression.expression;
      this.signalBindingBehavior.unbind(binding, source);
    };
    return TBindingBehavior;
  }(), _class5.inject = [_aureliaTemplatingResources.SignalBindingBehavior], _temp3);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/rt", ["exports", "npm:aurelia-i18n@0.5.2/relativeTime"], function(exports, _relativeTime) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RtValueConverter = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var RtValueConverter = exports.RtValueConverter = function() {
    RtValueConverter.inject = function inject() {
      return [_relativeTime.RelativeTime];
    };
    function RtValueConverter(relativeTime) {
      _classCallCheck(this, RtValueConverter);
      this.service = relativeTime;
    }
    RtValueConverter.prototype.toView = function toView(value) {
      return this.service.getRelativeTime(value);
    };
    return RtValueConverter;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/nf", ["exports", "npm:aurelia-i18n@0.5.2/i18n"], function(exports, _i18n) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.NfValueConverter = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var NfValueConverter = exports.NfValueConverter = function() {
    NfValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };
    function NfValueConverter(i18n) {
      _classCallCheck(this, NfValueConverter);
      this.service = i18n;
    }
    NfValueConverter.prototype.toView = function toView(value, formatOptions, locale, numberFormat) {
      var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());
      return nf.format(value);
    };
    return NfValueConverter;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/df", ["exports", "npm:aurelia-i18n@0.5.2/i18n"], function(exports, _i18n) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.DfValueConverter = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var DfValueConverter = exports.DfValueConverter = function() {
    DfValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };
    function DfValueConverter(i18n) {
      _classCallCheck(this, DfValueConverter);
      this.service = i18n;
    }
    DfValueConverter.prototype.toView = function toView(value, formatOptions, locale, dateFormat) {
      var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());
      return df.format(value);
    };
    return DfValueConverter;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/defaultTranslations/relative.time", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var translations = exports.translations = {
    ar: {translation: {
        'now': 'الآن',
        'second_ago': 'منذ __count__ ثانية',
        'second_ago_plural': 'منذ __count__ ثواني',
        'second_in': 'في __count__ ثانية',
        'second_in_plural': 'في __count__ ثواني',
        'minute_ago': 'منذ __count__ دقيقة',
        'minute_ago_plural': 'منذ __count__ دقائق',
        'minute_in': 'في __count__ دقيقة',
        'minute_in_plural': 'في __count__ دقائق',
        'hour_ago': 'منذ __count__ ساعة',
        'hour_ago_plural': 'منذ __count__ ساعات',
        'hour_in': 'في __count__ ساعة',
        'hour_in_plural': 'في __count__ ساعات',
        'day_ago': 'منذ __count__ يوم',
        'day_ago_plural': 'منذ __count__ أيام',
        'day_in': 'في __count__ يوم',
        'day_in_plural': 'في __count__ أيام'
      }},
    en: {translation: {
        'now': 'just now',
        'second_ago': '__count__ second ago',
        'second_ago_plural': '__count__ seconds ago',
        'second_in': 'in __count__ second',
        'second_in_plural': 'in __count__ seconds',
        'minute_ago': '__count__ minute ago',
        'minute_ago_plural': '__count__ minutes ago',
        'minute_in': 'in __count__ minute',
        'minute_in_plural': 'in __count__ minutes',
        'hour_ago': '__count__ hour ago',
        'hour_ago_plural': '__count__ hours ago',
        'hour_in': 'in __count__ hour',
        'hour_in_plural': 'in __count__ hours',
        'day_ago': '__count__ day ago',
        'day_ago_plural': '__count__ days ago',
        'day_in': 'in __count__ day',
        'day_in_plural': 'in __count__ days',
        'month_ago': '__count__ month ago',
        'month_ago_plural': '__count__ months ago',
        'month_in': 'in __count__ month',
        'month_in_plural': 'in __count__ months',
        'year_ago': '__count__ year ago',
        'year_ago_plural': '__count__ years ago',
        'year_in': 'in __count__ year',
        'year_in_plural': 'in __count__ years'
      }},
    it: {translation: {
        'now': 'adesso',
        'second_ago': '__count__ secondo fa',
        'second_ago_plural': '__count__ secondi fa',
        'second_in': 'in __count__ secondo',
        'second_in_plural': 'in __count__ secondi',
        'minute_ago': '__count__ minuto fa',
        'minute_ago_plural': '__count__ minuti fa',
        'minute_in': 'in __count__ minuto',
        'minute_in_plural': 'in __count__ minuti',
        'hour_ago': '__count__ ora fa',
        'hour_ago_plural': '__count__ ore fa',
        'hour_in': 'in __count__ ora',
        'hour_in_plural': 'in __count__ ore',
        'day_ago': '__count__ giorno fa',
        'day_ago_plural': '__count__ giorni fa',
        'day_in': 'in __count__ giorno',
        'day_in_plural': 'in __count__ giorni',
        'month_ago': '__count__ mese fa',
        'month_ago_plural': '__count__ mesi fa',
        'month_in': 'in __count__ mese',
        'month_in_plural': 'in __count__ mesi',
        'year_ago': '__count__ anno fa',
        'year_ago_plural': '__count__ anni fa',
        'year_in': 'in __count__ anno',
        'year_in_plural': 'in __count__ anni'
      }},
    de: {translation: {
        'now': 'jetzt gerade',
        'second_ago': 'vor __count__ Sekunde',
        'second_ago_plural': 'vor __count__ Sekunden',
        'second_in': 'in __count__ Sekunde',
        'second_in_plural': 'in __count__ Sekunden',
        'minute_ago': 'vor __count__ Minute',
        'minute_ago_plural': 'vor __count__ Minuten',
        'minute_in': 'in __count__ Minute',
        'minute_in_plural': 'in __count__ Minuten',
        'hour_ago': 'vor __count__ Stunde',
        'hour_ago_plural': 'vor __count__ Stunden',
        'hour_in': 'in __count__ Stunde',
        'hour_in_plural': 'in __count__ Stunden',
        'day_ago': 'vor __count__ Tag',
        'day_ago_plural': 'vor __count__ Tagen',
        'day_in': 'in __count__ Tag',
        'day_in_plural': 'in __count__ Tagen',
        'month_ago': 'vor __count__ Monat',
        'month_ago_plural': 'vor __count__ Monaten',
        'month_in': 'in __count__ Monat',
        'month_in_plural': 'in __count__ Monaten',
        'year_ago': 'vor __count__ Jahr',
        'year_ago_plural': 'vor __count__ Jahren',
        'year_in': 'in __count__ Jahr',
        'year_in_plural': 'in __count__ Jahren'
      }},
    nl: {translation: {
        'now': 'zonet',
        'second_ago': '__count__ seconde geleden',
        'second_ago_plural': '__count__ seconden geleden',
        'second_in': 'in __count__ seconde',
        'second_in_plural': 'in __count__ seconden',
        'minute_ago': '__count__ minuut geleden',
        'minute_ago_plural': '__count__ minuten geleden',
        'minute_in': 'in __count__ minuut',
        'minute_in_plural': 'in __count__ minuten',
        'hour_ago': '__count__ uur geleden',
        'hour_ago_plural': '__count__ uren geleden',
        'hour_in': 'in __count__ uur',
        'hour_in_plural': 'in __count__ uren',
        'day_ago': '__count__ dag geleden',
        'day_ago_plural': '__count__ dagen geleden',
        'day_in': 'in __count__ dag',
        'day_in_plural': 'in __count__ dagen',
        'month_ago': '__count__ maand geleden',
        'month_ago_plural': '__count__ maanden geleden',
        'month_in': 'in __count__ maand',
        'month_in_plural': 'in __count__ maanden',
        'year_ago': '__count__ jaar geleden',
        'year_ago_plural': '__count__ jaren geleden',
        'year_in': 'in __count__ jaar',
        'year_in_plural': 'in __count__ jaren'
      }},
    fr: {translation: {
        'now': 'juste',
        'second_ago': '__count__ seconde passé',
        'second_ago_plural': '__count__ secondes passé',
        'second_in': 'en __count__ seconde',
        'second_in_plural': 'en __count__ secondes',
        'minute_ago': '__count__ minute passé',
        'minute_ago_plural': '__count__ minutes passé',
        'minute_in': 'en __count__ minute',
        'minute_in_plural': 'en __count__ minutes',
        'hour_ago': '__count__ heure passé',
        'hour_ago_plural': '__count__ heures passé',
        'hour_in': 'en __count__ heure',
        'hour_in_plural': 'en __count__ heures',
        'day_ago': '__count__ jour passé',
        'day_ago_plural': '__count__ jours passé',
        'day_in': 'en __count__ jour',
        'day_in_plural': 'en __count__ jours'
      }},
    th: {translation: {
        'now': 'เมื่อกี้',
        'second_ago': '__count__ วินาที ที่ผ่านมา',
        'second_ago_plural': '__count__ วินาที ที่ผ่านมา',
        'second_in': 'อีก __count__ วินาที',
        'second_in_plural': 'อีก __count__ วินาที',
        'minute_ago': '__count__ นาที ที่ผ่านมา',
        'minute_ago_plural': '__count__ นาที ที่ผ่านมา',
        'minute_in': 'อีก __count__ นาที',
        'minute_in_plural': 'อีก __count__ นาที',
        'hour_ago': '__count__ ชั่วโมง ที่ผ่านมา',
        'hour_ago_plural': '__count__ ชั่วโมง ที่ผ่านมา',
        'hour_in': 'อีก __count__ ชั่วโมง',
        'hour_in_plural': 'อีก __count__ ชั่วโมง',
        'day_ago': '__count__ วัน ที่ผ่านมา',
        'day_ago_plural': '__count__ วัน ที่ผ่านมา',
        'day_in': 'อีก __count__ วัน',
        'day_in_plural': 'อีก __count__ วัน'
      }},
    sv: {translation: {
        'now': 'just nu',
        'second_ago': '__count__ sekund sedan',
        'second_ago_plural': '__count__ sekunder sedan',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minut sedan',
        'minute_ago_plural': '__count__ minuter sedan',
        'minute_in': 'om __count__ minut',
        'minute_in_plural': 'om __count__ minuter',
        'hour_ago': '__count__ timme sedan',
        'hour_ago_plural': '__count__ timmar sedan',
        'hour_in': 'om __count__ timme',
        'hour_in_plural': 'om __count__ timmar',
        'day_ago': '__count__ dag sedan',
        'day_ago_plural': '__count__ dagar sedan',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dagar'
      }},
    da: {translation: {
        'now': 'lige nu',
        'second_ago': '__count__ sekunder siden',
        'second_ago_plural': '__count__ sekunder siden',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minut siden',
        'minute_ago_plural': '__count__ minutter siden',
        'minute_in': 'om __count__ minut',
        'minute_in_plural': 'om __count__ minutter',
        'hour_ago': '__count__ time siden',
        'hour_ago_plural': '__count__ timer siden',
        'hour_in': 'om __count__ time',
        'hour_in_plural': 'om __count__ timer',
        'day_ago': '__count__ dag siden',
        'day_ago_plural': '__count__ dage siden',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dage'
      }},
    no: {translation: {
        'now': 'akkurat nå',
        'second_ago': '__count__ sekund siden',
        'second_ago_plural': '__count__ sekunder siden',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minutt siden',
        'minute_ago_plural': '__count__ minutter siden',
        'minute_in': 'om __count__ minutt',
        'minute_in_plural': 'om __count__ minutter',
        'hour_ago': '__count__ time siden',
        'hour_ago_plural': '__count__ timer siden',
        'hour_in': 'om __count__ time',
        'hour_in_plural': 'om __count__ timer',
        'day_ago': '__count__ dag siden',
        'day_ago_plural': '__count__ dager siden',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dager'
      }},
    jp: {translation: {
        'now': 'たった今',
        'second_ago': '__count__ 秒前',
        'second_ago_plural': '__count__ 秒前',
        'second_in': 'あと __count__ 秒',
        'second_in_plural': 'あと __count__ 秒',
        'minute_ago': '__count__ 分前',
        'minute_ago_plural': '__count__ 分前',
        'minute_in': 'あと __count__ 分',
        'minute_in_plural': 'あと __count__ 分',
        'hour_ago': '__count__ 時間前',
        'hour_ago_plural': '__count__ 時間前',
        'hour_in': 'あと __count__ 時間',
        'hour_in_plural': 'あと __count__ 時間',
        'day_ago': '__count__ 日間前',
        'day_ago_plural': '__count__ 日間前',
        'day_in': 'あと __count__ 日間',
        'day_in_plural': 'あと __count__ 日間'
      }}
  };
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/relativeTime", ["exports", "npm:aurelia-i18n@0.5.2/i18n", "npm:aurelia-i18n@0.5.2/defaultTranslations/relative.time", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0"], function(exports, _i18n, _relative, _aureliaEventAggregator) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RelativeTime = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var RelativeTime = exports.RelativeTime = function() {
    RelativeTime.inject = function inject() {
      return [_i18n.I18N, _aureliaEventAggregator.EventAggregator];
    };
    function RelativeTime(i18n, ea) {
      var _this = this;
      _classCallCheck(this, RelativeTime);
      this.service = i18n;
      this.ea = ea;
      this.service.i18nextReady().then(function() {
        _this.setup();
      });
      this.ea.subscribe('i18n:locale:changed', function(locales) {
        _this.setup(locales);
      });
    }
    RelativeTime.prototype.setup = function setup(locales) {
      var trans = _relative.translations.default || _relative.translations;
      var key = locales && locales.newValue ? locales.newValue : this.service.getLocale();
      var fallbackLng = this.service.fallbackLng;
      var translation = (trans[key] || trans[fallbackLng] || {}).translation;
      var options = this.service.i18next.options;
      if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
        for (var subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolation.prefix + 'count' + options.interpolation.suffix);
        }
      }
      this.service.i18next.addResources(key, 'translation', translation);
    };
    RelativeTime.prototype.getRelativeTime = function getRelativeTime(time) {
      var now = new Date();
      var diff = now.getTime() - time.getTime();
      var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
              if (!timeDiff) {
                timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
                if (!timeDiff) {
                  timeDiff = this.service.tr('now');
                }
              }
            }
          }
        }
      }
      return timeDiff;
    };
    RelativeTime.prototype.getTimeDiffDescription = function getTimeDiffDescription(diff, unit, timeDivisor) {
      var unitAmount = (diff / timeDivisor).toFixed(0);
      if (unitAmount > 0) {
        return this.service.tr(unit, {
          count: parseInt(unitAmount, 10),
          context: 'ago'
        });
      } else if (unitAmount < 0) {
        var abs = Math.abs(unitAmount);
        return this.service.tr(unit, {
          count: abs,
          context: 'in'
        });
      }
      return null;
    };
    return RelativeTime;
  }();
});

_removeDefine();
})();
System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/defaults", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.get = get;
  exports.transformOptions = transformOptions;
  function get() {
    return {
      debug: false,
      initImmediate: true,
      ns: ['translation'],
      defaultNS: ['translation'],
      fallbackLng: ['dev'],
      fallbackNS: false,
      whitelist: false,
      load: 'all',
      preload: false,
      keySeparator: '.',
      nsSeparator: ':',
      pluralSeparator: '_',
      contextSeparator: '_',
      saveMissing: false,
      saveMissingTo: 'fallback',
      missingKeyHandler: false,
      postProcess: false,
      returnNull: true,
      returnEmptyString: true,
      returnObjects: false,
      joinArrays: false,
      returnedObjectHandler: function returnedObjectHandler() {},
      parseMissingKeyHandler: false,
      appendNamespaceToMissingKey: false,
      overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
        return {defaultValue: args[1]};
      },
      interpolation: {
        escapeValue: true,
        prefix: '{{',
        suffix: '}}',
        unescapePrefix: '-',
        nestingPrefix: '$t(',
        nestingSuffix: ')',
        defaultVariables: undefined
      }
    };
  }
  function transformOptions(options) {
    if (typeof options.ns === 'string')
      options.ns = [options.ns];
    if (typeof options.fallbackLng === 'string')
      options.fallbackLng = [options.fallbackLng];
    if (typeof options.fallbackNS === 'string')
      options.fallbackNS = [options.fallbackNS];
    if (options.whitelist && options.whitelist.indexOf('cimode') < 0)
      options.whitelist.push('cimode');
    return options;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/CacheConnector", ["npm:i18next@2.5.1/dist/commonjs/utils", "npm:i18next@2.5.1/dist/commonjs/logger", "npm:i18next@2.5.1/dist/commonjs/EventEmitter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _utils = $__require('npm:i18next@2.5.1/dist/commonjs/utils');
  var utils = _interopRequireWildcard(_utils);
  var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
  var _logger2 = _interopRequireDefault(_logger);
  var _EventEmitter2 = $__require('npm:i18next@2.5.1/dist/commonjs/EventEmitter');
  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
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
  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
  }
  var Connector = function(_EventEmitter) {
    _inherits(Connector, _EventEmitter);
    function Connector(cache, store, services) {
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
      _classCallCheck(this, Connector);
      var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
      _this.cache = cache;
      _this.store = store;
      _this.services = services;
      _this.options = options;
      _this.logger = _logger2.default.create('cacheConnector');
      _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
      return _this;
    }
    Connector.prototype.load = function load(languages, namespaces, callback) {
      var _this2 = this;
      if (!this.cache)
        return callback && callback();
      var options = _extends({}, this.cache.options, this.options.cache);
      if (typeof languages === 'string')
        languages = this.services.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string')
        namespaces = [namespaces];
      if (options.enabled) {
        this.cache.load(languages, function(err, data) {
          if (err)
            _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
          if (data) {
            for (var l in data) {
              for (var n in data[l]) {
                if (n === 'i18nStamp')
                  continue;
                var bundle = data[l][n];
                if (bundle)
                  _this2.store.addResourceBundle(l, n, bundle);
              }
            }
          }
          if (callback)
            callback();
        });
      } else {
        if (callback)
          callback();
      }
    };
    Connector.prototype.save = function save() {
      if (this.cache && this.options.cache && this.options.cache.enabled)
        this.cache.save(this.store.data);
    };
    return Connector;
  }(_EventEmitter3.default);
  exports.default = Connector;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/BackendConnector", ["npm:i18next@2.5.1/dist/commonjs/utils", "npm:i18next@2.5.1/dist/commonjs/logger", "npm:i18next@2.5.1/dist/commonjs/EventEmitter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _slicedToArray = function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](),
            _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"])
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();
  var _utils = $__require('npm:i18next@2.5.1/dist/commonjs/utils');
  var utils = _interopRequireWildcard(_utils);
  var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
  var _logger2 = _interopRequireDefault(_logger);
  var _EventEmitter2 = $__require('npm:i18next@2.5.1/dist/commonjs/EventEmitter');
  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
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
  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
  }
  function remove(arr, what) {
    var found = arr.indexOf(what);
    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }
  var Connector = function(_EventEmitter) {
    _inherits(Connector, _EventEmitter);
    function Connector(backend, store, services) {
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
      _classCallCheck(this, Connector);
      var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
      _this.backend = backend;
      _this.store = store;
      _this.services = services;
      _this.options = options;
      _this.logger = _logger2.default.create('backendConnector');
      _this.state = {};
      _this.queue = [];
      _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
      return _this;
    }
    Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
      var _this2 = this;
      var toLoad = [],
          pending = [],
          toLoadLanguages = [],
          toLoadNamespaces = [];
      languages.forEach(function(lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function(ns) {
          var name = lng + '|' + ns;
          if (_this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) {} else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0)
              pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0)
              pending.push(name);
            if (toLoad.indexOf(name) < 0)
              toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0)
              toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces)
          toLoadLanguages.push(lng);
      });
      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }
      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    };
    Connector.prototype.loaded = function loaded(name, err, data) {
      var _this3 = this;
      var _name$split = name.split('|');
      var _name$split2 = _slicedToArray(_name$split, 2);
      var lng = _name$split2[0];
      var ns = _name$split2[1];
      if (err)
        this.emit('failedLoading', lng, ns, err);
      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }
      this.state[name] = err ? -1 : 2;
      this.queue.forEach(function(q) {
        utils.pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err)
          q.errors.push(err);
        if (q.pending.length === 0 && !q.done) {
          q.errors.length ? q.callback(q.errors) : q.callback();
          _this3.emit('loaded', q.loaded);
          q.done = true;
        }
      });
      this.queue = this.queue.filter(function(q) {
        return !q.done;
      });
    };
    Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
      var _this4 = this;
      if (!tried)
        tried = 0;
      if (!wait)
        wait = 250;
      if (!lng.length)
        return callback(null, {});
      this.backend[fcName](lng, ns, function(err, data) {
        if (err && data && tried < 5) {
          setTimeout(function() {
            _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      });
    };
    Connector.prototype.load = function load(languages, namespaces, callback) {
      var _this5 = this;
      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }
      var options = _extends({}, this.backend.options, this.options.backend);
      if (typeof languages === 'string')
        languages = this.services.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string')
        namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length)
          callback();
        return;
      }
      if (options.allowMultiLoading && this.backend.readMulti) {
        this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function(err, data) {
          if (err)
            _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
          if (!err && data)
            _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);
          toLoad.toLoad.forEach(function(name) {
            var _name$split3 = name.split('|');
            var _name$split4 = _slicedToArray(_name$split3, 2);
            var l = _name$split4[0];
            var n = _name$split4[1];
            var bundle = utils.getPath(data, [l, n]);
            if (bundle) {
              _this5.loaded(name, err, bundle);
            } else {
              var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
              _this5.loaded(name, _err);
              _this5.logger.error(_err);
            }
          });
        });
      } else {
        (function() {
          var read = function read(name) {
            var _this6 = this;
            var _name$split5 = name.split('|');
            var _name$split6 = _slicedToArray(_name$split5, 2);
            var lng = _name$split6[0];
            var ns = _name$split6[1];
            this.read(lng, ns, 'read', null, null, function(err, data) {
              if (err)
                _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
              if (!err && data)
                _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);
              _this6.loaded(name, err, data);
            });
          };
          ;
          toLoad.toLoad.forEach(function(name) {
            read.call(_this5, name);
          });
        })();
      }
    };
    Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
      if (this.backend && this.backend.create)
        this.backend.create(languages, namespace, key, fallbackValue);
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    };
    return Connector;
  }(_EventEmitter3.default);
  exports.default = Connector;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/Interpolator", ["npm:i18next@2.5.1/dist/commonjs/utils", "npm:i18next@2.5.1/dist/commonjs/logger", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    var _utils = $__require('npm:i18next@2.5.1/dist/commonjs/utils');
    var utils = _interopRequireWildcard(_utils);
    var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
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
    var Interpolator = function() {
      function Interpolator() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        _classCallCheck(this, Interpolator);
        this.logger = _logger2.default.create('interpolator');
        this.init(options, true);
      }
      Interpolator.prototype.init = function init() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var reset = arguments[1];
        if (reset)
          this.options = options;
        if (!options.interpolation)
          options.interpolation = {escapeValue: true};
        var iOpts = options.interpolation;
        this.escapeValue = iOpts.escapeValue;
        this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
        this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
        this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
        this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
        this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape('$t(');
        this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(')');
        var regexpStr = this.prefix + '(.+?)' + this.suffix;
        this.regexp = new RegExp(regexpStr, 'g');
        var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
        this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
        var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
        this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
      };
      Interpolator.prototype.reset = function reset() {
        if (this.options)
          this.init(this.options);
      };
      Interpolator.prototype.interpolate = function interpolate(str, data) {
        var match = void 0,
            value = void 0;
        function regexSafe(val) {
          return val.replace(/\$/g, '$$$$');
        }
        while (match = this.regexpUnescape.exec(str)) {
          var _value = utils.getPath(data, match[1].trim());
          str = str.replace(match[0], _value);
        }
        while (match = this.regexp.exec(str)) {
          value = utils.getPath(data, match[1].trim());
          if (typeof value !== 'string')
            value = utils.makeString(value);
          if (!value) {
            this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
            value = '';
          }
          value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
          str = str.replace(match[0], value);
          this.regexp.lastIndex = 0;
        }
        return str;
      };
      Interpolator.prototype.nest = function nest(str, fc) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var match = void 0,
            value = void 0;
        var clonedOptions = JSON.parse(JSON.stringify(options));
        clonedOptions.applyPostProcessor = false;
        function regexSafe(val) {
          return val.replace(/\$/g, '$$$$');
        }
        function handleHasOptions(key) {
          if (key.indexOf(',') < 0)
            return key;
          var p = key.split(',');
          key = p.shift();
          var optionsString = p.join(',');
          optionsString = this.interpolate(optionsString, clonedOptions);
          try {
            clonedOptions = JSON.parse(optionsString);
          } catch (e) {
            this.logger.error('failed parsing options string in nesting for key ' + key, e);
          }
          return key;
        }
        while (match = this.nestingRegexp.exec(str)) {
          value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
          if (typeof value !== 'string')
            value = utils.makeString(value);
          if (!value) {
            this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
            value = '';
          }
          value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
          str = str.replace(match[0], value);
          this.regexp.lastIndex = 0;
        }
        return str;
      };
      return Interpolator;
    }();
    exports.default = Interpolator;
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/PluralResolver", ["npm:i18next@2.5.1/dist/commonjs/logger"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
  var _logger2 = _interopRequireDefault(_logger);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var sets = [{
    lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'],
    nr: [1, 2],
    fc: 1
  }, {
    lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
    nr: [1, 2],
    fc: 2
  }, {
    lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
    nr: [1],
    fc: 3
  }, {
    lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'],
    nr: [1, 2, 5],
    fc: 4
  }, {
    lngs: ['ar'],
    nr: [0, 1, 2, 3, 11, 100],
    fc: 5
  }, {
    lngs: ['cs', 'sk'],
    nr: [1, 2, 5],
    fc: 6
  }, {
    lngs: ['csb', 'pl'],
    nr: [1, 2, 5],
    fc: 7
  }, {
    lngs: ['cy'],
    nr: [1, 2, 3, 8],
    fc: 8
  }, {
    lngs: ['fr'],
    nr: [1, 2],
    fc: 9
  }, {
    lngs: ['ga'],
    nr: [1, 2, 3, 7, 11],
    fc: 10
  }, {
    lngs: ['gd'],
    nr: [1, 2, 3, 20],
    fc: 11
  }, {
    lngs: ['is'],
    nr: [1, 2],
    fc: 12
  }, {
    lngs: ['jv'],
    nr: [0, 1],
    fc: 13
  }, {
    lngs: ['kw'],
    nr: [1, 2, 3, 4],
    fc: 14
  }, {
    lngs: ['lt'],
    nr: [1, 2, 10],
    fc: 15
  }, {
    lngs: ['lv'],
    nr: [1, 2, 0],
    fc: 16
  }, {
    lngs: ['mk'],
    nr: [1, 2],
    fc: 17
  }, {
    lngs: ['mnk'],
    nr: [0, 1, 2],
    fc: 18
  }, {
    lngs: ['mt'],
    nr: [1, 2, 11, 20],
    fc: 19
  }, {
    lngs: ['or'],
    nr: [2, 1],
    fc: 2
  }, {
    lngs: ['ro'],
    nr: [1, 2, 20],
    fc: 20
  }, {
    lngs: ['sl'],
    nr: [5, 1, 2, 3],
    fc: 21
  }];
  var _rulesPluralsTypes = {
    1: function _(n) {
      return Number(n > 1);
    },
    2: function _(n) {
      return Number(n != 1);
    },
    3: function _(n) {
      return 0;
    },
    4: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    5: function _(n) {
      return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
    },
    6: function _(n) {
      return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
    },
    7: function _(n) {
      return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    8: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
    },
    9: function _(n) {
      return Number(n >= 2);
    },
    10: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
    },
    11: function _(n) {
      return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
    },
    12: function _(n) {
      return Number(n % 10 != 1 || n % 100 == 11);
    },
    13: function _(n) {
      return Number(n !== 0);
    },
    14: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
    },
    15: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    16: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
    },
    17: function _(n) {
      return Number(n == 1 || n % 10 == 1 ? 0 : 1);
    },
    18: function _(n) {
      return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
    },
    19: function _(n) {
      return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
    },
    20: function _(n) {
      return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
    },
    21: function _(n) {
      return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
    }
  };
  function createRules() {
    var l,
        rules = {};
    sets.forEach(function(set) {
      set.lngs.forEach(function(l) {
        return rules[l] = {
          numbers: set.nr,
          plurals: _rulesPluralsTypes[set.fc]
        };
      });
    });
    return rules;
  }
  var PluralResolver = function() {
    function PluralResolver(languageUtils) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, PluralResolver);
      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = _logger2.default.create('pluralResolver');
      this.rules = createRules();
    }
    PluralResolver.prototype.addRule = function addRule(lng, obj) {
      this.rules[lng] = obj;
    };
    PluralResolver.prototype.getRule = function getRule(code) {
      return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    };
    PluralResolver.prototype.needsPlural = function needsPlural(code) {
      var rule = this.getRule(code);
      return rule && rule.numbers.length <= 1 ? false : true;
    };
    PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
      var rule = this.getRule(code);
      if (rule) {
        if (rule.numbers.length === 1)
          return '';
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];
        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }
        if (this.options.compatibilityJSON === 'v1') {
          if (suffix === 1)
            return '';
          if (typeof suffix === 'number')
            return '_plural_' + suffix.toString();
        }
        return this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
      } else {
        this.logger.warn('no plural rule found for: ' + code);
        return '';
      }
    };
    return PluralResolver;
  }();
  ;
  exports.default = PluralResolver;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/LanguageUtils", ["npm:i18next@2.5.1/dist/commonjs/logger"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/compatibility/v1", ["npm:i18next@2.5.1/dist/commonjs/logger", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.convertAPIOptions = convertAPIOptions;
    exports.convertJSONOptions = convertJSONOptions;
    exports.convertTOptions = convertTOptions;
    exports.appendBackwardsAPI = appendBackwardsAPI;
    var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function convertInterpolation(options) {
      options.interpolation = {unescapeSuffix: 'HTML'};
      options.interpolation.prefix = options.interpolationPrefix || '__';
      options.interpolation.suffix = options.interpolationSuffix || '__';
      options.interpolation.escapeValue = options.escapeInterpolation || false;
      options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
      options.interpolation.nestingSuffix = options.reuseSuffix || ')';
      return options;
    }
    function convertAPIOptions(options) {
      if (options.resStore)
        options.resources = options.resStore;
      if (options.ns && options.ns.defaultNs) {
        options.defaultNS = options.ns.defaultNs;
        options.ns = options.ns.namespaces;
      } else {
        options.defaultNS = options.ns || 'translation';
      }
      if (options.fallbackToDefaultNS && options.defaultNS)
        options.fallbackNS = options.defaultNS;
      options.saveMissing = options.sendMissing;
      options.saveMissingTo = options.sendMissingTo || 'current';
      options.returnNull = options.fallbackOnNull ? false : true;
      options.returnEmptyString = options.fallbackOnEmpty ? false : true;
      options.returnObjects = options.returnObjectTrees;
      options.joinArrays = '\n';
      options.returnedObjectHandler = options.objectTreeKeyHandler;
      options.parseMissingKeyHandler = options.parseMissingKey;
      options.appendNamespaceToMissingKey = true;
      options.nsSeparator = options.nsseparator;
      options.keySeparator = options.keyseparator;
      if (options.shortcutFunction === 'sprintf') {
        options.overloadTranslationOptionHandler = function(args) {
          var values = [];
          for (var i = 1; i < args.length; i++) {
            values.push(args[i]);
          }
          return {
            postProcess: 'sprintf',
            sprintf: values
          };
        };
      }
      options.whitelist = options.lngWhitelist;
      options.preload = options.preload;
      if (options.load === 'current')
        options.load = 'currentOnly';
      if (options.load === 'unspecific')
        options.load = 'languageOnly';
      options.backend = options.backend || {};
      options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
      options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
      options.backend.allowMultiLoading = options.dynamicLoad;
      options.cache = options.cache || {};
      options.cache.prefix = 'res_';
      options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
      options.cache.enabled = options.useLocalStorage ? true : false;
      options = convertInterpolation(options);
      if (options.defaultVariables)
        options.interpolation.defaultVariables = options.defaultVariables;
      return options;
    }
    function convertJSONOptions(options) {
      options = convertInterpolation(options);
      options.joinArrays = '\n';
      return options;
    }
    function convertTOptions(options) {
      if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
        options = convertInterpolation(options);
      }
      options.nsSeparator = options.nsseparator;
      options.keySeparator = options.keyseparator;
      options.returnObjects = options.returnObjectTrees;
      return options;
    }
    function appendBackwardsAPI(i18n) {
      i18n.lng = function() {
        _logger2.default.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
        return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
      };
      i18n.preload = function(lngs, cb) {
        _logger2.default.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
        i18n.loadLanguages(lngs, cb);
      };
      i18n.setLng = function(lng, options, callback) {
        _logger2.default.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        if (!options)
          options = {};
        if (options.fixLng === true) {
          if (callback)
            return callback(null, i18n.getFixedT(lng));
        }
        i18n.changeLanguage(lng, callback);
      };
      i18n.addPostProcessor = function(name, fc) {
        _logger2.default.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
        i18n.use({
          type: 'postProcessor',
          name: name,
          process: fc
        });
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2/browser", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2", ["npm:process@0.11.2/browser"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:process@0.11.2/browser');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index", ["npm:process@0.11.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.2');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2", ["github:jspm/nodelibs-process@0.1.2/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/postProcessor", ["github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = {
      processors: {},
      addPostProcessor: function addPostProcessor(module) {
        this.processors[module.name] = module;
      },
      handle: function handle(processors, value, key, options, translator) {
        var _this = this;
        processors.forEach(function(processor) {
          if (_this.processors[processor])
            value = _this.processors[processor].process(value, key, options, translator);
        });
        return value;
      }
    };
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/Translator", ["npm:i18next@2.5.1/dist/commonjs/logger", "npm:i18next@2.5.1/dist/commonjs/EventEmitter", "npm:i18next@2.5.1/dist/commonjs/postProcessor", "npm:i18next@2.5.1/dist/commonjs/compatibility/v1", "npm:i18next@2.5.1/dist/commonjs/utils", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
    var _logger2 = _interopRequireDefault(_logger);
    var _EventEmitter2 = $__require('npm:i18next@2.5.1/dist/commonjs/EventEmitter');
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    var _postProcessor = $__require('npm:i18next@2.5.1/dist/commonjs/postProcessor');
    var _postProcessor2 = _interopRequireDefault(_postProcessor);
    var _v = $__require('npm:i18next@2.5.1/dist/commonjs/compatibility/v1');
    var compat = _interopRequireWildcard(_v);
    var _utils = $__require('npm:i18next@2.5.1/dist/commonjs/utils');
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function _defaults(obj, defaults) {
      var keys = Object.getOwnPropertyNames(defaults);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) {
          Object.defineProperty(obj, key, value);
        }
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    var Translator = function(_EventEmitter) {
      _inherits(Translator, _EventEmitter);
      function Translator(services) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        _classCallCheck(this, Translator);
        var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
        utils.copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);
        _this.options = options;
        _this.logger = _logger2.default.create('translator');
        return _this;
      }
      Translator.prototype.changeLanguage = function changeLanguage(lng) {
        if (lng)
          this.language = lng;
      };
      Translator.prototype.exists = function exists(key) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {interpolation: {}} : arguments[1];
        if (this.options.compatibilityAPI === 'v1') {
          options = compat.convertTOptions(options);
        }
        return this.resolve(key, options) !== undefined;
      };
      Translator.prototype.extractFromKey = function extractFromKey(key, options) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        if (nsSeparator === undefined)
          nsSeparator = ':';
        var namespaces = options.ns || this.options.defaultNS;
        if (nsSeparator && key.indexOf(nsSeparator) > -1) {
          var parts = key.split(nsSeparator);
          namespaces = parts[0];
          key = parts[1];
        }
        if (typeof namespaces === 'string')
          namespaces = [namespaces];
        return {
          key: key,
          namespaces: namespaces
        };
      };
      Translator.prototype.translate = function translate(keys) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
          options = this.options.overloadTranslationOptionHandler(arguments);
        } else if (this.options.compatibilityAPI === 'v1') {
          options = compat.convertTOptions(options);
        }
        if (keys === undefined || keys === null || keys === '')
          return '';
        if (typeof keys === 'number')
          keys = String(keys);
        if (typeof keys === 'string')
          keys = [keys];
        var lng = options.lng || this.language;
        if (lng && lng.toLowerCase() === 'cimode')
          return keys[keys.length - 1];
        var keySeparator = options.keySeparator || this.options.keySeparator || '.';
        var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);
        var key = _extractFromKey.key;
        var namespaces = _extractFromKey.namespaces;
        var namespace = namespaces[namespaces.length - 1];
        var res = this.resolve(keys, options);
        var resType = Object.prototype.toString.apply(res);
        var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
        var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
        if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
          if (!options.returnObjects && !this.options.returnObjects) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
            return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
          }
          var copy = resType === '[object Array]' ? [] : {};
          for (var m in res) {
            copy[m] = this.translate('' + key + keySeparator + m, _extends({
              joinArrays: false,
              ns: namespaces
            }, options));
          }
          res = copy;
        } else if (joinArrays && resType === '[object Array]') {
          res = res.join(joinArrays);
          if (res)
            res = this.extendTranslation(res, key, options);
        } else {
          var usedDefault = false,
              usedKey = false;
          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
            usedDefault = true;
            res = options.defaultValue;
          }
          if (!this.isValidLookup(res)) {
            usedKey = true;
            res = key;
          }
          if (usedKey || usedDefault) {
            this.logger.log('missingKey', lng, namespace, key, res);
            if (this.options.saveMissing) {
              var lngs = [];
              if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
                for (var i = 0; i < this.options.fallbackLng.length; i++) {
                  lngs.push(this.options.fallbackLng[i]);
                }
              } else if (this.options.saveMissingTo === 'all') {
                lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
              } else {
                lngs.push(options.lng || this.language);
              }
              if (this.options.missingKeyHandler) {
                this.options.missingKeyHandler(lngs, namespace, key, res);
              } else if (this.backendConnector && this.backendConnector.saveMissing) {
                this.backendConnector.saveMissing(lngs, namespace, key, res);
              }
              this.emit('missingKey', lngs, namespace, key, res);
            }
          }
          res = this.extendTranslation(res, key, options);
          if (usedKey && res === key && this.options.appendNamespaceToMissingKey)
            res = namespace + ':' + key;
          if (usedKey && this.options.parseMissingKeyHandler)
            res = this.options.parseMissingKeyHandler(res);
        }
        return res;
      };
      Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
        var _this2 = this;
        if (options.interpolation)
          this.interpolator.init(options);
        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables)
          data = _extends({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data);
        res = this.interpolator.nest(res, function() {
          for (var _len = arguments.length,
              args = Array(_len),
              _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return _this2.translate.apply(_this2, args);
        }, options);
        if (options.interpolation)
          this.interpolator.reset();
        var postProcess = options.postProcess || this.options.postProcess;
        var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
        if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
          res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
        }
        return res;
      };
      Translator.prototype.resolve = function resolve(keys) {
        var _this3 = this;
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var found = void 0;
        if (typeof keys === 'string')
          keys = [keys];
        keys.forEach(function(k) {
          if (_this3.isValidLookup(found))
            return;
          var _extractFromKey2 = _this3.extractFromKey(k, options);
          var key = _extractFromKey2.key;
          var namespaces = _extractFromKey2.namespaces;
          if (_this3.options.fallbackNS)
            namespaces = namespaces.concat(_this3.options.fallbackNS);
          var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
          var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
          var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);
          namespaces.forEach(function(ns) {
            if (_this3.isValidLookup(found))
              return;
            codes.forEach(function(code) {
              if (_this3.isValidLookup(found))
                return;
              var finalKey = key;
              var finalKeys = [finalKey];
              var pluralSuffix = void 0;
              if (needsPluralHandling)
                pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);
              if (needsPluralHandling && needsContextHandling)
                finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling)
                finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);
              if (needsPluralHandling)
                finalKeys.push(finalKey += pluralSuffix);
              var possibleKey = void 0;
              while (possibleKey = finalKeys.pop()) {
                if (_this3.isValidLookup(found))
                  continue;
                found = _this3.getResource(code, ns, possibleKey, options);
              }
            });
          });
        });
        return found;
      };
      Translator.prototype.isValidLookup = function isValidLookup(res) {
        return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
      };
      Translator.prototype.getResource = function getResource(code, ns, key) {
        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
        return this.resourceStore.getResource(code, ns, key, options);
      };
      return Translator;
    }(_EventEmitter3.default);
    exports.default = Translator;
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/utils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.makeString = makeString;
  exports.copy = copy;
  exports.setPath = setPath;
  exports.pushPath = pushPath;
  exports.getPath = getPath;
  exports.deepExtend = deepExtend;
  exports.regexEscape = regexEscape;
  exports.escape = escape;
  function makeString(object) {
    if (object == null)
      return '';
    return '' + object;
  }
  function copy(a, s, t) {
    a.forEach(function(m) {
      if (s[m])
        t[m] = s[m];
    });
  }
  function getLastOfPath(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }
    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
    while (stack.length > 1) {
      if (!object)
        return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty)
        object[key] = new Empty();
      object = object[key];
    }
    if (!object)
      return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }
  function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object);
    var obj = _getLastOfPath.obj;
    var k = _getLastOfPath.k;
    obj[k] = newValue;
  }
  function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object);
    var obj = _getLastOfPath2.obj;
    var k = _getLastOfPath2.k;
    obj[k] = obj[k] || [];
    if (concat)
      obj[k] = obj[k].concat(newValue);
    if (!concat)
      obj[k].push(newValue);
  }
  function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path);
    var obj = _getLastOfPath3.obj;
    var k = _getLastOfPath3.k;
    if (!obj)
      return undefined;
    return obj[k];
  }
  function deepExtend(target, source, overwrite) {
    for (var prop in source) {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite)
            target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function regexEscape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
  var _entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  function escape(data) {
    if (typeof data === 'string') {
      return data.replace(/[&<>"'\/]/g, function(s) {
        return _entityMap[s];
      });
    } else {
      return data;
    }
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/ResourceStore", ["npm:i18next@2.5.1/dist/commonjs/EventEmitter", "npm:i18next@2.5.1/dist/commonjs/utils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _EventEmitter2 = $__require('npm:i18next@2.5.1/dist/commonjs/EventEmitter');
  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
  var _utils = $__require('npm:i18next@2.5.1/dist/commonjs/utils');
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
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
  }
  var ResourceStore = function(_EventEmitter) {
    _inherits(ResourceStore, _EventEmitter);
    function ResourceStore() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? {
        ns: ['translation'],
        defaultNS: 'translation'
      } : arguments[1];
      _classCallCheck(this, ResourceStore);
      var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
      _this.data = data;
      _this.options = options;
      return _this;
    }
    ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    };
    ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);
      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    };
    ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
      var keySeparator = options.keySeparator || this.options.keySeparator;
      if (keySeparator === undefined)
        keySeparator = '.';
      var path = [lng, ns];
      if (key && typeof key !== 'string')
        path = path.concat(key);
      if (key && typeof key === 'string')
        path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }
      return utils.getPath(this.data, path);
    };
    ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
      var options = arguments.length <= 4 || arguments[4] === undefined ? {silent: false} : arguments[4];
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined)
        keySeparator = '.';
      var path = [lng, ns];
      if (key)
        path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      utils.setPath(this.data, path, value);
      if (!options.silent)
        this.emit('added', lng, ns, key, value);
    };
    ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
      for (var m in resources) {
        if (typeof resources[m] === 'string')
          this.addResource(lng, ns, m, resources[m], {silent: true});
      }
      this.emit('added', lng, ns, resources);
    };
    ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var path = [lng, ns];
      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      var pack = utils.getPath(this.data, path) || {};
      if (deep) {
        utils.deepExtend(pack, resources, overwrite);
      } else {
        pack = _extends({}, pack, resources);
      }
      utils.setPath(this.data, path, pack);
      this.emit('added', lng, ns, resources);
    };
    ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    };
    ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    };
    ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
      if (!ns)
        ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1')
        return _extends({}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    };
    ResourceStore.prototype.toJSON = function toJSON() {
      return this.data;
    };
    return ResourceStore;
  }(_EventEmitter3.default);
  exports.default = ResourceStore;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/EventEmitter", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var EventEmitter = function() {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);
      this.observers = {};
    }
    EventEmitter.prototype.on = function on(events, listener) {
      var _this = this;
      events.split(' ').forEach(function(event) {
        _this.observers[event] = _this.observers[event] || [];
        _this.observers[event].push(listener);
      });
    };
    EventEmitter.prototype.off = function off(event, listener) {
      var _this2 = this;
      if (!this.observers[event]) {
        return;
      }
      this.observers[event].forEach(function() {
        if (!listener) {
          delete _this2.observers[event];
        } else {
          var index = _this2.observers[event].indexOf(listener);
          if (index > -1) {
            _this2.observers[event].splice(index, 1);
          }
        }
      });
    };
    EventEmitter.prototype.emit = function emit(event) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        this.observers[event].forEach(function(observer) {
          observer.apply(undefined, args);
        });
      }
      if (this.observers['*']) {
        this.observers['*'].forEach(function(observer) {
          var _ref;
          observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
        });
      }
    };
    return EventEmitter;
  }();
  exports.default = EventEmitter;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/logger", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var consoleLogger = {
    type: 'logger',
    log: function log(args) {
      this._output('log', args);
    },
    warn: function warn(args) {
      this._output('warn', args);
    },
    error: function error(args) {
      this._output('error', args);
    },
    _output: function _output(type, args) {
      if (console && console[type])
        console[type].apply(console, Array.prototype.slice.call(args));
    }
  };
  var Logger = function() {
    function Logger(concreteLogger) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, Logger);
      this.subs = [];
      this.init(concreteLogger, options);
    }
    Logger.prototype.init = function init(concreteLogger) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug === false ? false : true;
    };
    Logger.prototype.setDebug = function setDebug(bool) {
      this.debug = bool;
      this.subs.forEach(function(sub) {
        sub.setDebug(bool);
      });
    };
    Logger.prototype.log = function log() {
      this.forward(arguments, 'log', '', true);
    };
    Logger.prototype.warn = function warn() {
      this.forward(arguments, 'warn', '', true);
    };
    Logger.prototype.error = function error() {
      this.forward(arguments, 'error', '');
    };
    Logger.prototype.deprecate = function deprecate() {
      this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
    };
    Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug)
        return;
      if (typeof args[0] === 'string')
        args[0] = prefix + this.prefix + ' ' + args[0];
      this.logger[lvl](args);
    };
    Logger.prototype.create = function create(moduleName) {
      var sub = new Logger(this.logger, _extends({prefix: this.prefix + ':' + moduleName + ':'}, this.options));
      this.subs.push(sub);
      return sub;
    };
    return Logger;
  }();
  ;
  exports.default = new Logger();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/i18next", ["npm:i18next@2.5.1/dist/commonjs/logger", "npm:i18next@2.5.1/dist/commonjs/EventEmitter", "npm:i18next@2.5.1/dist/commonjs/ResourceStore", "npm:i18next@2.5.1/dist/commonjs/Translator", "npm:i18next@2.5.1/dist/commonjs/LanguageUtils", "npm:i18next@2.5.1/dist/commonjs/PluralResolver", "npm:i18next@2.5.1/dist/commonjs/Interpolator", "npm:i18next@2.5.1/dist/commonjs/BackendConnector", "npm:i18next@2.5.1/dist/commonjs/CacheConnector", "npm:i18next@2.5.1/dist/commonjs/defaults", "npm:i18next@2.5.1/dist/commonjs/postProcessor", "npm:i18next@2.5.1/dist/commonjs/compatibility/v1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _logger = $__require('npm:i18next@2.5.1/dist/commonjs/logger');
  var _logger2 = _interopRequireDefault(_logger);
  var _EventEmitter2 = $__require('npm:i18next@2.5.1/dist/commonjs/EventEmitter');
  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
  var _ResourceStore = $__require('npm:i18next@2.5.1/dist/commonjs/ResourceStore');
  var _ResourceStore2 = _interopRequireDefault(_ResourceStore);
  var _Translator = $__require('npm:i18next@2.5.1/dist/commonjs/Translator');
  var _Translator2 = _interopRequireDefault(_Translator);
  var _LanguageUtils = $__require('npm:i18next@2.5.1/dist/commonjs/LanguageUtils');
  var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);
  var _PluralResolver = $__require('npm:i18next@2.5.1/dist/commonjs/PluralResolver');
  var _PluralResolver2 = _interopRequireDefault(_PluralResolver);
  var _Interpolator = $__require('npm:i18next@2.5.1/dist/commonjs/Interpolator');
  var _Interpolator2 = _interopRequireDefault(_Interpolator);
  var _BackendConnector = $__require('npm:i18next@2.5.1/dist/commonjs/BackendConnector');
  var _BackendConnector2 = _interopRequireDefault(_BackendConnector);
  var _CacheConnector = $__require('npm:i18next@2.5.1/dist/commonjs/CacheConnector');
  var _CacheConnector2 = _interopRequireDefault(_CacheConnector);
  var _defaults2 = $__require('npm:i18next@2.5.1/dist/commonjs/defaults');
  var _postProcessor = $__require('npm:i18next@2.5.1/dist/commonjs/postProcessor');
  var _postProcessor2 = _interopRequireDefault(_postProcessor);
  var _v = $__require('npm:i18next@2.5.1/dist/commonjs/compatibility/v1');
  var compat = _interopRequireWildcard(_v);
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
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
  }
  var I18n = function(_EventEmitter) {
    _inherits(I18n, _EventEmitter);
    function I18n() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var callback = arguments[1];
      _classCallCheck(this, I18n);
      var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
      _this.options = (0, _defaults2.transformOptions)(options);
      _this.services = {};
      _this.logger = _logger2.default;
      _this.modules = {};
      if (callback && !_this.isInitialized)
        _this.init(options, callback);
      return _this;
    }
    I18n.prototype.init = function init(options, callback) {
      var _this2 = this;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (!options)
        options = {};
      if (options.compatibilityAPI === 'v1') {
        this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertAPIOptions(options)), {});
      } else if (options.compatibilityJSON === 'v1') {
        this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertJSONOptions(options)), {});
      } else {
        this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));
      }
      if (!callback)
        callback = function callback() {};
      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject)
          return;
        if (typeof ClassOrObject === 'function')
          return new ClassOrObject();
        return ClassOrObject;
      }
      if (!this.options.isClone) {
        if (this.modules.logger) {
          _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          _logger2.default.init(null, this.options);
        }
        var lu = new _LanguageUtils2.default(this.options);
        this.store = new _ResourceStore2.default(this.options.resources, this.options);
        var s = this.services;
        s.logger = _logger2.default;
        s.resourceStore = this.store;
        s.resourceStore.on('added removed', function(lng, ns) {
          s.cacheConnector.save();
        });
        s.languageUtils = lu;
        s.pluralResolver = new _PluralResolver2.default(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON
        });
        s.interpolator = new _Interpolator2.default(this.options);
        s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function(event) {
          for (var _len = arguments.length,
              args = Array(_len > 1 ? _len - 1 : 0),
              _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        s.backendConnector.on('loaded', function(loaded) {
          s.cacheConnector.save();
        });
        s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
        s.cacheConnector.on('*', function(event) {
          for (var _len2 = arguments.length,
              args = Array(_len2 > 1 ? _len2 - 1 : 0),
              _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }
        this.translator = new _Translator2.default(this.services, this.options);
        this.translator.on('*', function(event) {
          for (var _len3 = arguments.length,
              args = Array(_len3 > 1 ? _len3 - 1 : 0),
              _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
      }
      var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
      storeApi.forEach(function(fcName) {
        _this2[fcName] = function() {
          return this.store[fcName].apply(this.store, arguments);
        };
      });
      if (this.options.compatibilityAPI === 'v1')
        compat.appendBackwardsAPI(this);
      var load = function load() {
        _this2.changeLanguage(_this2.options.lng, function(err, t) {
          _this2.emit('initialized', _this2.options);
          _this2.logger.log('initialized', _this2.options);
          callback(err, t);
        });
      };
      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return this;
    };
    I18n.prototype.loadResources = function loadResources(callback) {
      var _this3 = this;
      if (!callback)
        callback = function callback() {};
      if (!this.options.resources) {
        var _ret = function() {
          if (_this3.language && _this3.language.toLowerCase() === 'cimode')
            return {v: callback()};
          var toLoad = [];
          var append = function append(lng) {
            var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
            lngs.forEach(function(l) {
              if (toLoad.indexOf(l) < 0)
                toLoad.push(l);
            });
          };
          append(_this3.language);
          if (_this3.options.preload) {
            _this3.options.preload.forEach(function(l) {
              append(l);
            });
          }
          _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function() {
            _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
          });
        }();
        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
          return _ret.v;
      } else {
        callback(null);
      }
    };
    I18n.prototype.use = function use(module) {
      if (module.type === 'backend') {
        this.modules.backend = module;
      }
      if (module.type === 'cache') {
        this.modules.cache = module;
      }
      if (module.type === 'logger' || module.log && module.warn && module.warn) {
        this.modules.logger = module;
      }
      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }
      if (module.type === 'postProcessor') {
        _postProcessor2.default.addPostProcessor(module);
      }
      return this;
    };
    I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
      var _this4 = this;
      var done = function done(err) {
        if (lng) {
          _this4.emit('languageChanged', lng);
          _this4.logger.log('languageChanged', lng);
        }
        if (callback)
          callback(err, function() {
            for (var _len4 = arguments.length,
                args = Array(_len4),
                _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            return _this4.t.apply(_this4, args);
          });
      };
      if (!lng && this.services.languageDetector)
        lng = this.services.languageDetector.detect();
      if (lng) {
        this.language = lng;
        this.languages = this.services.languageUtils.toResolveHierarchy(lng);
        this.translator.changeLanguage(lng);
        if (this.services.languageDetector)
          this.services.languageDetector.cacheUserLanguage(lng);
      }
      this.loadResources(function(err) {
        done(err);
      });
    };
    I18n.prototype.getFixedT = function getFixedT(lng, ns) {
      var _this5 = this;
      var fixedT = function fixedT(key, options) {
        options = options || {};
        options.lng = options.lng || fixedT.lng;
        options.ns = options.ns || fixedT.ns;
        return _this5.t(key, options);
      };
      fixedT.lng = lng;
      fixedT.ns = ns;
      return fixedT;
    };
    I18n.prototype.t = function t() {
      return this.translator && this.translator.translate.apply(this.translator, arguments);
    };
    I18n.prototype.exists = function exists() {
      return this.translator && this.translator.exists.apply(this.translator, arguments);
    };
    I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    };
    I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
      var _this6 = this;
      if (!this.options.ns)
        return callback && callback();
      if (typeof ns === 'string')
        ns = [ns];
      ns.forEach(function(n) {
        if (_this6.options.ns.indexOf(n) < 0)
          _this6.options.ns.push(n);
      });
      this.loadResources(callback);
    };
    I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
      if (typeof lngs === 'string')
        lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function(lng) {
        return preloaded.indexOf(lng) < 0;
      });
      if (!newLngs.length)
        return callback();
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(callback);
    };
    I18n.prototype.dir = function dir(lng) {
      if (!lng)
        lng = this.language;
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
    };
    I18n.prototype.createInstance = function createInstance() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var callback = arguments[1];
      return new I18n(options, callback);
    };
    I18n.prototype.cloneInstance = function cloneInstance() {
      var _this7 = this;
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var callback = arguments[1];
      var clone = new I18n(_extends({}, options, this.options, {isClone: true}), callback);
      var membersToCopy = ['store', 'translator', 'services', 'language'];
      membersToCopy.forEach(function(m) {
        clone[m] = _this7[m];
      });
      return clone;
    };
    return I18n;
  }(_EventEmitter3.default);
  exports.default = new I18n();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/dist/commonjs/index", ["npm:i18next@2.5.1/dist/commonjs/i18next"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _i18next = $__require('npm:i18next@2.5.1/dist/commonjs/i18next');
  var _i18next2 = _interopRequireDefault(_i18next);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _i18next2.default;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1/index", ["npm:i18next@2.5.1/dist/commonjs/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:i18next@2.5.1/dist/commonjs/index').default;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:i18next@2.5.1", ["npm:i18next@2.5.1/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:i18next@2.5.1/index');
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/i18n", ["exports", "npm:i18next@2.5.1"], function(exports, _i18next) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.I18N = undefined;
  var _i18next2 = _interopRequireDefault(_i18next);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var I18N = exports.I18N = function() {
    function I18N(ea, signaler) {
      var _this = this;
      _classCallCheck(this, I18N);
      this.globalVars = {};
      this.i18nextDefered = {
        resolve: null,
        promise: null
      };
      this.i18next = _i18next2.default;
      this.ea = ea;
      this.Intl = window.Intl;
      this.signaler = signaler;
      this.i18nextDefered.promise = new Promise(function(resolve) {
        return _this.i18nextDefered.resolve = resolve;
      });
    }
    I18N.prototype.setup = function setup(options) {
      var _this2 = this;
      var defaultOptions = {
        compatibilityAPI: 'v1',
        compatibilityJSON: 'v1',
        lng: 'en',
        attributes: ['t', 'i18n'],
        fallbackLng: 'en',
        debug: false
      };
      _i18next2.default.init(options || defaultOptions, function(err, t) {
        if (_i18next2.default.options.attributes instanceof String) {
          _i18next2.default.options.attributes = [_i18next2.default.options.attributes];
        }
        _this2.i18nextDefered.resolve(_this2.i18next);
      });
      return this.i18nextDefered.promise;
    };
    I18N.prototype.i18nextReady = function i18nextReady() {
      return this.i18nextDefered.promise;
    };
    I18N.prototype.setLocale = function setLocale(locale) {
      var _this3 = this;
      return new Promise(function(resolve) {
        var oldLocale = _this3.getLocale();
        _this3.i18next.changeLanguage(locale, function(err, tr) {
          _this3.ea.publish('i18n:locale:changed', {
            oldValue: oldLocale,
            newValue: locale
          });
          _this3.signaler.signal('aurelia-translation-signal');
          resolve(tr);
        });
      });
    };
    I18N.prototype.getLocale = function getLocale() {
      return this.i18next.language;
    };
    I18N.prototype.nf = function nf(options, locales) {
      return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
    };
    I18N.prototype.uf = function uf(number, locale) {
      var nf = this.nf({}, locale || this.getLocale());
      var comparer = nf.format(10000 / 3);
      var thousandSeparator = comparer[1];
      var decimalSeparator = comparer[5];
      var result = number.replace(thousandSeparator, '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');
      return Number(result);
    };
    I18N.prototype.df = function df(options, locales) {
      return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
    };
    I18N.prototype.tr = function tr(key, options) {
      var fullOptions = this.globalVars;
      if (options !== undefined) {
        fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
      }
      return this.i18next.t(key, fullOptions);
    };
    I18N.prototype.registerGlobalVariable = function registerGlobalVariable(key, value) {
      this.globalVars[key] = value;
    };
    I18N.prototype.unregisterGlobalVariable = function unregisterGlobalVariable(key) {
      delete this.globalVars[key];
    };
    I18N.prototype.updateTranslations = function updateTranslations(el) {
      var i = void 0;
      var l = void 0;
      var selector = [].concat(this.i18next.options.attributes);
      for (i = 0, l = selector.length; i < l; i++) {
        selector[i] = '[' + selector[i] + ']';
      }
      selector = selector.join(',');
      var nodes = el.querySelectorAll(selector);
      for (i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var keys = void 0;
        for (var i2 = 0,
            l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
          keys = node.getAttribute(this.i18next.options.attributes[i2]);
          if (keys)
            break;
        }
        if (!keys)
          continue;
        this.updateValue(node, keys);
      }
    };
    I18N.prototype.updateValue = function updateValue(node, value, params) {
      var _this4 = this;
      this.i18nextDefered.promise.then(function() {
        return _this4._updateValue(node, value, params);
      });
    };
    I18N.prototype._updateValue = function _updateValue(node, value, params) {
      if (value === null || value === undefined) {
        return;
      }
      var keys = value.split(';');
      var i = keys.length;
      while (i--) {
        var key = keys[i];
        var re = /\[([a-z\-]*)\]/g;
        var m = void 0;
        var attr = 'text';
        if (node.nodeName === 'IMG')
          attr = 'src';
        while ((m = re.exec(key)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
          if (m) {
            key = key.replace(m[0], '');
            attr = m[1];
          }
        }
        if (!node._textContent)
          node._textContent = node.textContent;
        if (!node._innerHTML)
          node._innerHTML = node.innerHTML;
        switch (attr) {
          case 'text':
            node.textContent = this.tr(key, params);
            break;
          case 'prepend':
            node.innerHTML = this.tr(key, params) + node._innerHTML.trim();
            break;
          case 'append':
            node.innerHTML = node._innerHTML.trim() + this.tr(key, params);
            break;
          case 'html':
            node.innerHTML = this.tr(key, params);
            break;
          default:
            node.setAttribute(attr, this.tr(key, params));
            break;
        }
      }
    };
    return I18N;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2/aurelia-i18n", ["exports", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3", "npm:aurelia-i18n@0.5.2/i18n", "npm:aurelia-i18n@0.5.2/relativeTime", "npm:aurelia-i18n@0.5.2/df", "npm:aurelia-i18n@0.5.2/nf", "npm:aurelia-i18n@0.5.2/rt", "npm:aurelia-i18n@0.5.2/t", "npm:aurelia-i18n@0.5.2/base-i18n"], function(exports, _aureliaEventAggregator, _aureliaTemplating, _aureliaLoader, _aureliaTemplatingResources, _i18n, _relativeTime, _df, _nf, _rt, _t, _baseI18n) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.EventAggregator = exports.BaseI18N = exports.TParamsCustomAttribute = exports.TCustomAttribute = exports.TBindingBehavior = exports.TValueConverter = exports.RtValueConverter = exports.NfValueConverter = exports.DfValueConverter = exports.RelativeTime = exports.I18N = exports.configure = undefined;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  function registerI18N(frameworkConfig, cb) {
    var instance = new _i18n.I18N(frameworkConfig.container.get(_aureliaEventAggregator.EventAggregator), frameworkConfig.container.get(_aureliaTemplatingResources.BindingSignaler));
    frameworkConfig.container.registerInstance(_i18n.I18N, instance);
    var ret = cb(instance);
    frameworkConfig.postTask(function() {
      var resources = frameworkConfig.container.get(_aureliaTemplating.ViewResources);
      var htmlBehaviorResource = resources.getAttribute('t');
      var htmlParamsResource = resources.getAttribute('t-params');
      var attributes = instance.i18next.options.attributes;
      if (!attributes) {
        attributes = ['t', 'i18n'];
      }
      attributes.forEach(function(alias) {
        return resources.registerAttribute(alias, htmlBehaviorResource, 't');
      });
      attributes.forEach(function(alias) {
        return resources.registerAttribute(alias + '-params', htmlParamsResource, 't-params');
      });
    });
    return ret;
  }
  function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== 'function') {
      var errorMsg = 'You need to provide a callback method to properly configure the library';
      throw errorMsg;
    }
    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');
    if (window.Intl === undefined) {
      var _ret = function() {
        var loader = frameworkConfig.container.get(_aureliaLoader.Loader);
        return {v: loader.normalize('aurelia-i18n').then(function(i18nName) {
            return loader.normalize('intl', i18nName).then(function(intlName) {
              return loader.loadModule(intlName).then(function(poly) {
                window.Intl = poly;
                return registerI18N(frameworkConfig, cb);
              });
            });
          })};
      }();
      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
        return _ret.v;
    }
    return Promise.resolve(registerI18N(frameworkConfig, cb));
  }
  exports.configure = configure;
  exports.I18N = _i18n.I18N;
  exports.RelativeTime = _relativeTime.RelativeTime;
  exports.DfValueConverter = _df.DfValueConverter;
  exports.NfValueConverter = _nf.NfValueConverter;
  exports.RtValueConverter = _rt.RtValueConverter;
  exports.TValueConverter = _t.TValueConverter;
  exports.TBindingBehavior = _t.TBindingBehavior;
  exports.TCustomAttribute = _t.TCustomAttribute;
  exports.TParamsCustomAttribute = _t.TParamsCustomAttribute;
  exports.BaseI18N = _baseI18n.BaseI18N;
  exports.EventAggregator = _aureliaEventAggregator.EventAggregator;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-i18n@0.5.2", ["npm:aurelia-i18n@0.5.2/aurelia-i18n"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-router@1.0.0-beta.1.2.1", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-logging@1.0.0-beta.1.2.0"], function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaRouter, _aureliaPal, _aureliaLogging) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RouteHref = undefined;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var _dec,
      _dec2,
      _dec3,
      _dec4,
      _dec5,
      _class;
  var logger = LogManager.getLogger('route-href');
  var RouteHref = exports.RouteHref = (_dec = (0, _aureliaTemplating.customAttribute)('route-href'), _dec2 = (0, _aureliaTemplating.bindable)({
    name: 'route',
    changeHandler: 'processChange'
  }), _dec3 = (0, _aureliaTemplating.bindable)({
    name: 'params',
    changeHandler: 'processChange'
  }), _dec4 = (0, _aureliaTemplating.bindable)({
    name: 'attribute',
    defaultValue: 'href'
  }), _dec5 = (0, _aureliaDependencyInjection.inject)(_aureliaRouter.Router, _aureliaPal.DOM.Element), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = function() {
    function RouteHref(router, element) {
      _classCallCheck(this, RouteHref);
      this.router = router;
      this.element = element;
    }
    RouteHref.prototype.bind = function bind() {
      this.isActive = true;
      this.processChange();
    };
    RouteHref.prototype.unbind = function unbind() {
      this.isActive = false;
    };
    RouteHref.prototype.attributeChanged = function attributeChanged(value, previous) {
      if (previous) {
        this.element.removeAttribute(previous);
      }
      this.processChange();
    };
    RouteHref.prototype.processChange = function processChange() {
      var _this = this;
      return this.router.ensureConfigured().then(function() {
        if (!_this.isActive) {
          return;
        }
        var href = _this.router.generate(_this.route, _this.params);
        _this.element.setAttribute(_this.attribute, href);
      }).catch(function(reason) {
        logger.error(reason);
      });
    };
    return RouteHref;
  }()) || _class) || _class) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-router@1.0.0-beta.1.2.1", "npm:aurelia-metadata@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaMetadata, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RouterView = undefined;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  var _dec,
      _dec2,
      _class,
      _desc,
      _value,
      _class2,
      _descriptor;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var SwapStrategies = function() {
    function SwapStrategies() {
      _classCallCheck(this, SwapStrategies);
    }
    SwapStrategies.prototype.before = function before(viewSlot, previousView, callback) {
      var promise = Promise.resolve(callback());
      if (previousView !== undefined) {
        return promise.then(function() {
          return viewSlot.remove(previousView, true);
        });
      }
      return promise;
    };
    SwapStrategies.prototype.with = function _with(viewSlot, previousView, callback) {
      var promise = Promise.resolve(callback());
      if (previousView !== undefined) {
        return Promise.all([viewSlot.remove(previousView, true), promise]);
      }
      return promise;
    };
    SwapStrategies.prototype.after = function after(viewSlot, previousView, callback) {
      return Promise.resolve(viewSlot.removeAll(true)).then(callback);
    };
    return SwapStrategies;
  }();
  var swapStrategies = new SwapStrategies();
  var RouterView = exports.RouterView = (_dec = (0, _aureliaTemplating.customElement)('router-view'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.ViewSlot, _aureliaRouter.Router, _aureliaTemplating.ViewLocator, _aureliaTemplating.CompositionTransaction), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function() {
    function RouterView(element, container, viewSlot, router, viewLocator, compositionTransaction) {
      _classCallCheck(this, RouterView);
      _initDefineProp(this, 'swapOrder', _descriptor, this);
      this.element = element;
      this.container = container;
      this.viewSlot = viewSlot;
      this.router = router;
      this.viewLocator = viewLocator;
      this.compositionTransaction = compositionTransaction;
      this.router.registerViewPort(this, this.element.getAttribute('name'));
      if (!('initialComposition' in compositionTransaction)) {
        compositionTransaction.initialComposition = true;
        this.compositionTransactionNotifier = compositionTransaction.enlist();
      }
    }
    RouterView.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };
    RouterView.prototype.bind = function bind(bindingContext, overrideContext) {
      this.container.viewModel = bindingContext;
      this.overrideContext = overrideContext;
    };
    RouterView.prototype.process = function process(viewPortInstruction, waitToSwap) {
      var _this = this;
      var component = viewPortInstruction.component;
      var childContainer = component.childContainer;
      var viewModel = component.viewModel;
      var viewModelResource = component.viewModelResource;
      var metadata = viewModelResource.metadata;
      var viewStrategy = this.viewLocator.getViewStrategy(component.view || viewModel);
      if (viewStrategy) {
        viewStrategy.makeRelativeTo(_aureliaMetadata.Origin.get(component.router.container.viewModel.constructor).moduleId);
      }
      return metadata.load(childContainer, viewModelResource.value, null, viewStrategy, true).then(function(viewFactory) {
        if (!_this.compositionTransactionNotifier) {
          _this.compositionTransactionOwnershipToken = _this.compositionTransaction.tryCapture();
        }
        viewPortInstruction.controller = metadata.create(childContainer, _aureliaTemplating.BehaviorInstruction.dynamic(_this.element, viewModel, viewFactory));
        if (waitToSwap) {
          return;
        }
        _this.swap(viewPortInstruction);
      });
    };
    RouterView.prototype.swap = function swap(viewPortInstruction) {
      var _this2 = this;
      var work = function work() {
        var previousView = _this2.view;
        var viewSlot = _this2.viewSlot;
        var swapStrategy = void 0;
        swapStrategy = _this2.swapOrder in swapStrategies ? swapStrategies[_this2.swapOrder] : swapStrategies.after;
        swapStrategy(viewSlot, previousView, function() {
          return Promise.resolve(viewSlot.add(viewPortInstruction.controller.view)).then(function() {
            if (_this2.compositionTransactionNotifier) {
              _this2.compositionTransactionNotifier.done();
              _this2.compositionTransactionNotifier = null;
            }
          });
        });
        _this2.view = viewPortInstruction.controller.view;
      };
      viewPortInstruction.controller.automate(this.overrideContext, this.owningView);
      if (this.compositionTransactionOwnershipToken) {
        return this.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function() {
          _this2.compositionTransactionOwnershipToken = null;
          work();
        });
      }
      work();
    };
    return RouterView;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-router@1.0.0-beta.1.2.1", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-metadata@1.0.0-beta.1.2.0"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaPath, _aureliaMetadata) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TemplatingRouteLoader = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _dec,
      _class;
  var TemplatingRouteLoader = exports.TemplatingRouteLoader = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.CompositionEngine), _dec(_class = function(_RouteLoader) {
    _inherits(TemplatingRouteLoader, _RouteLoader);
    function TemplatingRouteLoader(compositionEngine) {
      _classCallCheck(this, TemplatingRouteLoader);
      var _this = _possibleConstructorReturn(this, _RouteLoader.call(this));
      _this.compositionEngine = compositionEngine;
      return _this;
    }
    TemplatingRouteLoader.prototype.loadRoute = function loadRoute(router, config) {
      var childContainer = router.container.createChild();
      var instruction = {
        viewModel: (0, _aureliaPath.relativeToFile)(config.moduleId, _aureliaMetadata.Origin.get(router.container.viewModel.constructor).moduleId),
        childContainer: childContainer,
        view: config.view || config.viewStrategy,
        router: router
      };
      childContainer.getChildRouter = function() {
        var childRouter = void 0;
        childContainer.registerHandler(_aureliaRouter.Router, function(c) {
          return childRouter || (childRouter = router.createChild(childContainer));
        });
        return childContainer.get(_aureliaRouter.Router);
      };
      return this.compositionEngine.ensureViewModel(instruction);
    };
    return TemplatingRouteLoader;
  }(_aureliaRouter.RouteLoader)) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router", ["exports", "npm:aurelia-router@1.0.0-beta.1.2.1", "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader", "npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view", "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href"], function(exports, _aureliaRouter, _routeLoader, _routerView, _routeHref) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.configure = exports.RouteHref = exports.RouterView = exports.TemplatingRouteLoader = undefined;
  function configure(config) {
    config.singleton(_aureliaRouter.RouteLoader, _routeLoader.TemplatingRouteLoader).singleton(_aureliaRouter.Router, _aureliaRouter.AppRouter).globalResources('./router-view', './route-href');
    config.container.registerAlias(_aureliaRouter.Router, _aureliaRouter.AppRouter);
  }
  exports.TemplatingRouteLoader = _routeLoader.TemplatingRouteLoader;
  exports.RouterView = _routerView.RouterView;
  exports.RouteHref = _routeHref.RouteHref;
  exports.configure = configure;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.2.0", ["npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/dynamic-element", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4"], function(exports, _aureliaTemplating) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports._createDynamicElement = _createDynamicElement;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _createDynamicElement(name, viewUrl, bindableNames) {
    var _dec,
        _dec2,
        _class;
    var DynamicElement = (_dec = (0, _aureliaTemplating.customElement)(name), _dec2 = (0, _aureliaTemplating.useView)(viewUrl), _dec(_class = _dec2(_class = function() {
      function DynamicElement() {
        _classCallCheck(this, DynamicElement);
      }
      DynamicElement.prototype.bind = function bind(bindingContext) {
        this.$parent = bindingContext;
      };
      return DynamicElement;
    }()) || _class) || _class);
    for (var i = 0,
        ii = bindableNames.length; i < ii; ++i) {
      (0, _aureliaTemplating.bindable)(bindableNames[i])(DynamicElement);
    }
    return DynamicElement;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-resource-plugin", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/dynamic-element"], function(exports, _aureliaTemplating, _dynamicElement) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.getElementName = getElementName;
  exports.configure = configure;
  function getElementName(address) {
    return (/([^\/^\?]+)\.html/i.exec(address)[1].toLowerCase());
  }
  function configure(config) {
    var viewEngine = config.container.get(_aureliaTemplating.ViewEngine);
    var loader = config.aurelia.loader;
    viewEngine.addResourcePlugin('.html', {'fetch': function fetch(address) {
        return loader.loadTemplate(address).then(function(registryEntry) {
          var _ref;
          var bindable = registryEntry.template.getAttribute('bindable');
          var elementName = getElementName(address);
          if (bindable) {
            bindable = bindable.split(',').map(function(x) {
              return x.trim();
            });
            registryEntry.template.removeAttribute('bindable');
          } else {
            bindable = [];
          }
          return _ref = {}, _ref[elementName] = (0, _dynamicElement._createDynamicElement)(elementName, address, bindable), _ref;
        });
      }});
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/update-trigger-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.UpdateTriggerBindingBehavior = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _class,
      _temp;
  var eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
  var notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way bindings on input/select elements.';
  var UpdateTriggerBindingBehavior = exports.UpdateTriggerBindingBehavior = (_temp = _class = function() {
    function UpdateTriggerBindingBehavior(eventManager) {
      _classCallCheck(this, UpdateTriggerBindingBehavior);
      this.eventManager = eventManager;
    }
    UpdateTriggerBindingBehavior.prototype.bind = function bind(binding, source) {
      for (var _len = arguments.length,
          events = Array(_len > 2 ? _len - 2 : 0),
          _key = 2; _key < _len; _key++) {
        events[_key - 2] = arguments[_key];
      }
      if (events.length === 0) {
        throw new Error(eventNamesRequired);
      }
      if (binding.mode !== _aureliaBinding.bindingMode.twoWay) {
        throw new Error(notApplicableMessage);
      }
      var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);
      if (!targetObserver.handler) {
        throw new Error(notApplicableMessage);
      }
      binding.targetObserver = targetObserver;
      targetObserver.originalHandler = binding.targetObserver.handler;
      var handler = this.eventManager.createElementHandler(events);
      targetObserver.handler = handler;
    };
    UpdateTriggerBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.targetObserver.handler = binding.targetObserver.originalHandler;
      binding.targetObserver.originalHandler = null;
    };
    return UpdateTriggerBindingBehavior;
  }(), _class.inject = [_aureliaBinding.EventManager], _temp);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-signaler", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.BindingSignaler = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var BindingSignaler = exports.BindingSignaler = function() {
    function BindingSignaler() {
      _classCallCheck(this, BindingSignaler);
      this.signals = {};
    }
    BindingSignaler.prototype.signal = function signal(name) {
      var bindings = this.signals[name];
      if (!bindings) {
        return;
      }
      var i = bindings.length;
      while (i--) {
        bindings[i].call(_aureliaBinding.sourceContext);
      }
    };
    return BindingSignaler;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/signal-binding-behavior", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-signaler"], function(exports, _bindingSignaler) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SignalBindingBehavior = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var SignalBindingBehavior = exports.SignalBindingBehavior = function() {
    SignalBindingBehavior.inject = function inject() {
      return [_bindingSignaler.BindingSignaler];
    };
    function SignalBindingBehavior(bindingSignaler) {
      _classCallCheck(this, SignalBindingBehavior);
      this.signals = bindingSignaler.signals;
    }
    SignalBindingBehavior.prototype.bind = function bind(binding, source) {
      if (!binding.updateTarget) {
        throw new Error('Only property bindings and string interpolation bindings can be signaled.  Trigger, delegate and call bindings cannot be signaled.');
      }
      if (arguments.length === 3) {
        var name = arguments[2];
        var bindings = this.signals[name] || (this.signals[name] = []);
        bindings.push(binding);
        binding.signalName = name;
      } else if (arguments.length > 3) {
        var names = Array.prototype.slice.call(arguments, 2);
        var i = names.length;
        while (i--) {
          var _name = names[i];
          var _bindings = this.signals[_name] || (this.signals[_name] = []);
          _bindings.push(binding);
        }
        binding.signalName = names;
      } else {
        throw new Error('Signal name is required.');
      }
    };
    SignalBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var name = binding.signalName;
      binding.signalName = null;
      if (Array.isArray(name)) {
        var names = name;
        var i = names.length;
        while (i--) {
          var n = names[i];
          var bindings = this.signals[n];
          bindings.splice(bindings.indexOf(binding), 1);
        }
      } else {
        var _bindings2 = this.signals[name];
        _bindings2.splice(_bindings2.indexOf(binding), 1);
      }
    };
    return SignalBindingBehavior;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/debounce-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.DebounceBindingBehavior = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function debounce(newValue) {
    var _this = this;
    var state = this.debounceState;
    if (state.immediate) {
      state.immediate = false;
      this.debouncedMethod(newValue);
      return;
    }
    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(function() {
      return _this.debouncedMethod(newValue);
    }, state.delay);
  }
  var DebounceBindingBehavior = exports.DebounceBindingBehavior = function() {
    function DebounceBindingBehavior() {
      _classCallCheck(this, DebounceBindingBehavior);
    }
    DebounceBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];
      var methodToDebounce = 'updateTarget';
      if (binding.callSource) {
        methodToDebounce = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToDebounce = 'updateSource';
      }
      binding.debouncedMethod = binding[methodToDebounce];
      binding.debouncedMethod.originalName = methodToDebounce;
      binding[methodToDebounce] = debounce;
      binding.debounceState = {
        delay: delay,
        timeoutId: null,
        immediate: methodToDebounce === 'updateTarget'
      };
    };
    DebounceBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.debouncedMethod.originalName;
      binding[methodToRestore] = binding.debouncedMethod;
      binding.debouncedMethod = null;
      clearTimeout(binding.debounceState.timeoutId);
      binding.debounceState = null;
    };
    return DebounceBindingBehavior;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/throttle-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.ThrottleBindingBehavior = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function throttle(newValue) {
    var _this = this;
    var state = this.throttleState;
    var elapsed = +new Date() - state.last;
    if (elapsed >= state.delay) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
      state.last = +new Date();
      this.throttledMethod(newValue);
      return;
    }
    state.newValue = newValue;
    if (state.timeoutId === null) {
      state.timeoutId = setTimeout(function() {
        state.timeoutId = null;
        state.last = +new Date();
        _this.throttledMethod(state.newValue);
      }, state.delay - elapsed);
    }
  }
  var ThrottleBindingBehavior = exports.ThrottleBindingBehavior = function() {
    function ThrottleBindingBehavior() {
      _classCallCheck(this, ThrottleBindingBehavior);
    }
    ThrottleBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];
      var methodToThrottle = 'updateTarget';
      if (binding.callSource) {
        methodToThrottle = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToThrottle = 'updateSource';
      }
      binding.throttledMethod = binding[methodToThrottle];
      binding.throttledMethod.originalName = methodToThrottle;
      binding[methodToThrottle] = throttle;
      binding.throttleState = {
        delay: delay,
        last: 0,
        timeoutId: null
      };
    };
    ThrottleBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.throttledMethod.originalName;
      binding[methodToRestore] = binding.throttledMethod;
      binding.throttledMethod = null;
      clearTimeout(binding.throttleState.timeoutId);
      binding.throttleState = null;
    };
    return ThrottleBindingBehavior;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-mode-behaviors", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-metadata@1.0.0-beta.1.2.0"], function(exports, _aureliaBinding, _aureliaMetadata) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TwoWayBindingBehavior = exports.OneWayBindingBehavior = exports.OneTimeBindingBehavior = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _class,
      _dec2,
      _class2,
      _dec3,
      _class3;
  var modeBindingBehavior = {
    bind: function bind(binding, source, lookupFunctions) {
      binding.originalMode = binding.mode;
      binding.mode = this.mode;
    },
    unbind: function unbind(binding, source) {
      binding.mode = binding.originalMode;
      binding.originalMode = null;
    }
  };
  var OneTimeBindingBehavior = exports.OneTimeBindingBehavior = (_dec = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec(_class = function OneTimeBindingBehavior() {
    _classCallCheck(this, OneTimeBindingBehavior);
    this.mode = _aureliaBinding.bindingMode.oneTime;
  }) || _class);
  var OneWayBindingBehavior = exports.OneWayBindingBehavior = (_dec2 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec2(_class2 = function OneWayBindingBehavior() {
    _classCallCheck(this, OneWayBindingBehavior);
    this.mode = _aureliaBinding.bindingMode.oneWay;
  }) || _class2);
  var TwoWayBindingBehavior = exports.TwoWayBindingBehavior = (_dec3 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec3(_class3 = function TwoWayBindingBehavior() {
    _classCallCheck(this, TwoWayBindingBehavior);
    this.mode = _aureliaBinding.bindingMode.twoWay;
  }) || _class3);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/css-resource", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaTemplating, _aureliaLoader, _aureliaDependencyInjection, _aureliaPath, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports._createCSSResource = _createCSSResource;
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;
  function fixupCSSUrls(address, css) {
    if (typeof css !== 'string') {
      throw new Error('Failed loading required CSS file: ' + address);
    }
    return css.replace(cssUrlMatcher, function(match, p1) {
      var quote = p1.charAt(0);
      if (quote === '\'' || quote === '"') {
        p1 = p1.substr(1, p1.length - 2);
      }
      return 'url(\'' + (0, _aureliaPath.relativeToFile)(p1, address) + '\')';
    });
  }
  var CSSResource = function() {
    function CSSResource(address) {
      _classCallCheck(this, CSSResource);
      this.address = address;
      this._global = null;
      this._scoped = null;
    }
    CSSResource.prototype.initialize = function initialize(container, target) {
      this._global = new target('global');
      this._scoped = new target('scoped');
    };
    CSSResource.prototype.register = function register(registry, name) {
      registry.registerViewEngineHooks(name === 'scoped' ? this._scoped : this._global);
    };
    CSSResource.prototype.load = function load(container) {
      var _this = this;
      return container.get(_aureliaLoader.Loader).loadText(this.address).catch(function(err) {
        return null;
      }).then(function(text) {
        text = fixupCSSUrls(_this.address, text);
        _this._global.css = text;
        _this._scoped.css = text;
      });
    };
    return CSSResource;
  }();
  var CSSViewEngineHooks = function() {
    function CSSViewEngineHooks(mode) {
      _classCallCheck(this, CSSViewEngineHooks);
      this.mode = mode;
      this.css = null;
      this._alreadyGloballyInjected = false;
    }
    CSSViewEngineHooks.prototype.beforeCompile = function beforeCompile(content, resources, instruction) {
      if (this.mode === 'scoped') {
        if (instruction.targetShadowDOM) {
          _aureliaPal.DOM.injectStyles(this.css, content, true);
        } else if (_aureliaPal.FEATURE.scopedCSS) {
          var styleNode = _aureliaPal.DOM.injectStyles(this.css, content, true);
          styleNode.setAttribute('scoped', 'scoped');
        } else if (!this._alreadyGloballyInjected) {
          _aureliaPal.DOM.injectStyles(this.css);
          this._alreadyGloballyInjected = true;
        }
      } else if (!this._alreadyGloballyInjected) {
        _aureliaPal.DOM.injectStyles(this.css);
        this._alreadyGloballyInjected = true;
      }
    };
    return CSSViewEngineHooks;
  }();
  function _createCSSResource(address) {
    var _dec,
        _class;
    var ViewCSS = (_dec = (0, _aureliaTemplating.resource)(new CSSResource(address)), _dec(_class = function(_CSSViewEngineHooks) {
      _inherits(ViewCSS, _CSSViewEngineHooks);
      function ViewCSS() {
        _classCallCheck(this, ViewCSS);
        return _possibleConstructorReturn(this, _CSSViewEngineHooks.apply(this, arguments));
      }
      return ViewCSS;
    }(CSSViewEngineHooks)) || _class);
    return ViewCSS;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/view-spy", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-logging@1.0.0-beta.1.2.0"], function(exports, _aureliaTemplating, _aureliaLogging) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.ViewSpy = undefined;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var _dec,
      _class;
  var ViewSpy = exports.ViewSpy = (_dec = (0, _aureliaTemplating.customAttribute)('view-spy'), _dec(_class = function() {
    function ViewSpy() {
      _classCallCheck(this, ViewSpy);
      this.logger = LogManager.getLogger('view-spy');
    }
    ViewSpy.prototype._log = function _log(lifecycleName, context) {
      if (!this.value && lifecycleName === 'created') {
        this.logger.info(lifecycleName, this.view);
      } else if (this.value && this.value.indexOf(lifecycleName) !== -1) {
        this.logger.info(lifecycleName, this.view, context);
      }
    };
    ViewSpy.prototype.created = function created(view) {
      this.view = view;
      this._log('created');
    };
    ViewSpy.prototype.bind = function bind(bindingContext) {
      this._log('bind', bindingContext);
    };
    ViewSpy.prototype.attached = function attached() {
      this._log('attached');
    };
    ViewSpy.prototype.detached = function detached() {
      this._log('detached');
    };
    ViewSpy.prototype.unbind = function unbind() {
      this._log('unbind');
    };
    return ViewSpy;
  }()) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compile-spy", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaLogging, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.CompileSpy = undefined;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var _dec,
      _dec2,
      _class;
  var CompileSpy = exports.CompileSpy = (_dec = (0, _aureliaTemplating.customAttribute)('compile-spy'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.TargetInstruction), _dec(_class = _dec2(_class = function CompileSpy(element, instruction) {
    _classCallCheck(this, CompileSpy);
    LogManager.getLogger('compile-spy').info(element, instruction);
  }) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/focus", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-task-queue@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Focus = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var Focus = exports.Focus = (_dec = (0, _aureliaTemplating.customAttribute)('focus', _aureliaBinding.bindingMode.twoWay), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTaskQueue.TaskQueue), _dec(_class = _dec2(_class = function() {
    function Focus(element, taskQueue) {
      var _this = this;
      _classCallCheck(this, Focus);
      this.element = element;
      this.taskQueue = taskQueue;
      this.isAttached = false;
      this.needsApply = false;
      this.focusListener = function(e) {
        _this.value = true;
      };
      this.blurListener = function(e) {
        if (_aureliaPal.DOM.activeElement !== _this.element) {
          _this.value = false;
        }
      };
    }
    Focus.prototype.valueChanged = function valueChanged(newValue) {
      if (this.isAttached) {
        this._apply();
      } else {
        this.needsApply = true;
      }
    };
    Focus.prototype._apply = function _apply() {
      var _this2 = this;
      if (this.value) {
        this.taskQueue.queueMicroTask(function() {
          if (_this2.value) {
            _this2.element.focus();
          }
        });
      } else {
        this.element.blur();
      }
    };
    Focus.prototype.attached = function attached() {
      this.isAttached = true;
      if (this.needsApply) {
        this.needsApply = false;
        this._apply();
      }
      this.element.addEventListener('focus', this.focusListener);
      this.element.addEventListener('blur', this.blurListener);
    };
    Focus.prototype.detached = function detached() {
      this.isAttached = false;
      this.element.removeEventListener('focus', this.focusListener);
      this.element.removeEventListener('blur', this.blurListener);
    };
    return Focus;
  }()) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/replaceable", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4"], function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Replaceable = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var Replaceable = exports.Replaceable = (_dec = (0, _aureliaTemplating.customAttribute)('replaceable'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function() {
    function Replaceable(viewFactory, viewSlot) {
      _classCallCheck(this, Replaceable);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.view = null;
    }
    Replaceable.prototype.bind = function bind(bindingContext, overrideContext) {
      if (this.view === null) {
        this.view = this.viewFactory.create();
        this.viewSlot.add(this.view);
      }
      this.view.bind(bindingContext, overrideContext);
    };
    Replaceable.prototype.unbind = function unbind() {
      this.view.unbind();
    };
    return Replaceable;
  }()) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-sanitizer", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  var HTMLSanitizer = exports.HTMLSanitizer = function() {
    function HTMLSanitizer() {
      _classCallCheck(this, HTMLSanitizer);
    }
    HTMLSanitizer.prototype.sanitize = function sanitize(input) {
      return input.replace(SCRIPT_REGEX, '');
    };
    return HTMLSanitizer;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/sanitize-html", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-sanitizer"], function(exports, _aureliaBinding, _aureliaDependencyInjection, _htmlSanitizer) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SanitizeHTMLValueConverter = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var SanitizeHTMLValueConverter = exports.SanitizeHTMLValueConverter = (_dec = (0, _aureliaBinding.valueConverter)('sanitizeHTML'), _dec2 = (0, _aureliaDependencyInjection.inject)(_htmlSanitizer.HTMLSanitizer), _dec(_class = _dec2(_class = function() {
    function SanitizeHTMLValueConverter(sanitizer) {
      _classCallCheck(this, SanitizeHTMLValueConverter);
      this.sanitizer = sanitizer;
    }
    SanitizeHTMLValueConverter.prototype.toView = function toView(untrustedMarkup) {
      if (untrustedMarkup === null || untrustedMarkup === undefined) {
        return null;
      }
      return this.sanitizer.sanitize(untrustedMarkup);
    };
    return SanitizeHTMLValueConverter;
  }()) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/hide", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Hide = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var Hide = exports.Hide = (_dec = (0, _aureliaTemplating.customAttribute)('hide'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator), _dec(_class = _dec2(_class = function() {
    function Hide(element, animator) {
      _classCallCheck(this, Hide);
      this.element = element;
      this.animator = animator;
    }
    Hide.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.addClass(this.element, 'aurelia-hide');
      } else {
        this.animator.removeClass(this.element, 'aurelia-hide');
      }
    };
    Hide.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };
    return Hide;
  }()) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/show", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Show = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var Show = exports.Show = (_dec = (0, _aureliaTemplating.customAttribute)('show'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator), _dec(_class = _dec2(_class = function() {
    function Show(element, animator) {
      _classCallCheck(this, Show);
      this.element = element;
      this.animator = animator;
    }
    Show.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.removeClass(this.element, 'aurelia-hide');
      } else {
        this.animator.addClass(this.element, 'aurelia-hide');
      }
    };
    Show.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };
    return Show;
  }()) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/abstract-repeater", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var AbstractRepeater = exports.AbstractRepeater = function() {
    function AbstractRepeater(options) {
      _classCallCheck(this, AbstractRepeater);
      Object.assign(this, {
        local: 'items',
        viewsRequireLifecycle: true
      }, options);
    }
    AbstractRepeater.prototype.viewCount = function viewCount() {
      throw new Error('subclass must implement `viewCount`');
    };
    AbstractRepeater.prototype.views = function views() {
      throw new Error('subclass must implement `views`');
    };
    AbstractRepeater.prototype.view = function view(index) {
      throw new Error('subclass must implement `view`');
    };
    AbstractRepeater.prototype.matcher = function matcher() {
      throw new Error('subclass must implement `matcher`');
    };
    AbstractRepeater.prototype.addView = function addView(bindingContext, overrideContext) {
      throw new Error('subclass must implement `addView`');
    };
    AbstractRepeater.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      throw new Error('subclass must implement `insertView`');
    };
    AbstractRepeater.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      throw new Error('subclass must implement `moveView`');
    };
    AbstractRepeater.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeAllViews`');
    };
    AbstractRepeater.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };
    AbstractRepeater.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };
    AbstractRepeater.prototype.updateBindings = function updateBindings(view) {
      throw new Error('subclass must implement `updateBindings`');
    };
    return AbstractRepeater;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/analyze-view-factory", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.viewsRequireLifecycle = viewsRequireLifecycle;
  var lifecycleOptionalBehaviors = exports.lifecycleOptionalBehaviors = ['focus', 'if', 'repeat', 'show', 'with'];
  function behaviorRequiresLifecycle(instruction) {
    var t = instruction.type;
    var name = t.elementName !== null ? t.elementName : t.attributeName;
    return lifecycleOptionalBehaviors.indexOf(name) === -1 && (t.handlesAttached || t.handlesBind || t.handlesCreated || t.handlesDetached || t.handlesUnbind) || t.viewFactory && viewsRequireLifecycle(t.viewFactory) || instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }
  function targetRequiresLifecycle(instruction) {
    var behaviors = instruction.behaviorInstructions;
    if (behaviors) {
      var i = behaviors.length;
      while (i--) {
        if (behaviorRequiresLifecycle(behaviors[i])) {
          return true;
        }
      }
    }
    return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }
  function viewsRequireLifecycle(viewFactory) {
    if ('_viewsRequireLifecycle' in viewFactory) {
      return viewFactory._viewsRequireLifecycle;
    }
    if (viewFactory.viewFactory) {
      viewFactory._viewsRequireLifecycle = viewsRequireLifecycle(viewFactory.viewFactory);
      return viewFactory._viewsRequireLifecycle;
    }
    if (viewFactory.template.querySelector('.au-animate')) {
      viewFactory._viewsRequireLifecycle = true;
      return true;
    }
    for (var id in viewFactory.instructions) {
      if (targetRequiresLifecycle(viewFactory.instructions[id])) {
        viewFactory._viewsRequireLifecycle = true;
        return true;
      }
    }
    viewFactory._viewsRequireLifecycle = false;
    return false;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/number-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.NumberRepeatStrategy = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var NumberRepeatStrategy = exports.NumberRepeatStrategy = function() {
    function NumberRepeatStrategy() {
      _classCallCheck(this, NumberRepeatStrategy);
    }
    NumberRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver() {
      return null;
    };
    NumberRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, value) {
      var _this = this;
      var removePromise = repeat.removeAllViews(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, value);
        });
        return;
      }
      this._standardProcessItems(repeat, value);
    };
    NumberRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, value) {
      var childrenLength = repeat.viewCount();
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var viewsToRemove = void 0;
      value = Math.floor(value);
      viewsToRemove = childrenLength - value;
      if (viewsToRemove > 0) {
        if (viewsToRemove > childrenLength) {
          viewsToRemove = childrenLength;
        }
        for (i = 0, ii = viewsToRemove; i < ii; ++i) {
          repeat.removeView(childrenLength - (i + 1), true);
        }
        return;
      }
      for (i = childrenLength, ii = value; i < ii; ++i) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, i, i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
    };
    return NumberRepeatStrategy;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/set-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.SetRepeatStrategy = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var SetRepeatStrategy = exports.SetRepeatStrategy = function() {
    function SetRepeatStrategy() {
      _classCallCheck(this, SetRepeatStrategy);
    }
    SetRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getSetObserver(items);
    };
    SetRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      var removePromise = repeat.removeAllViews(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };
    SetRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;
      items.forEach(function(value) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };
    SetRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, set, records) {
      var value = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;
      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        value = record.value;
        switch (record.type) {
          case 'add':
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, set.size - 1, set.size);
            repeat.insertView(set.size - 1, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            removeIndex = this._getViewIndexByValue(repeat, value);
            viewOrPromise = repeat.removeView(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true);
            break;
          default:
            continue;
        }
      }
      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function() {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };
    SetRepeatStrategy.prototype._getViewIndexByValue = function _getViewIndexByValue(repeat, value) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;
      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.local] === value) {
          return i;
        }
      }
    };
    return SetRepeatStrategy;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/map-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.MapRepeatStrategy = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var MapRepeatStrategy = exports.MapRepeatStrategy = function() {
    function MapRepeatStrategy() {
      _classCallCheck(this, MapRepeatStrategy);
    }
    MapRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getMapObserver(items);
    };
    MapRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      var removePromise = repeat.removeAllViews(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };
    MapRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;
      items.forEach(function(value, key) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size, key);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };
    MapRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, map, records) {
      var key = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;
      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        key = record.key;
        switch (record.type) {
          case 'update':
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), removeIndex, map.size, key);
            repeat.insertView(removeIndex, overrideContext.bindingContext, overrideContext);
            break;
          case 'add':
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), map.size - 1, map.size, key);
            repeat.insertView(map.size - 1, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            if (record.oldValue === undefined) {
              return;
            }
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true);
            break;
          default:
            continue;
        }
      }
      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function() {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };
    MapRepeatStrategy.prototype._getViewIndexByKey = function _getViewIndexByKey(repeat, key) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;
      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.key] === key) {
          return i;
        }
      }
    };
    return MapRepeatStrategy;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities", ["exports", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.updateOverrideContexts = updateOverrideContexts;
  exports.createFullOverrideContext = createFullOverrideContext;
  exports.updateOverrideContext = updateOverrideContext;
  exports.getItemsSourceExpression = getItemsSourceExpression;
  exports.unwrapExpression = unwrapExpression;
  exports.isOneTime = isOneTime;
  exports.updateOneTimeBinding = updateOneTimeBinding;
  exports.indexOf = indexOf;
  var oneTime = _aureliaBinding.bindingMode.oneTime;
  function updateOverrideContexts(views, startIndex) {
    var length = views.length;
    if (startIndex > 0) {
      startIndex = startIndex - 1;
    }
    for (; startIndex < length; ++startIndex) {
      updateOverrideContext(views[startIndex].overrideContext, startIndex, length);
    }
  }
  function createFullOverrideContext(repeat, data, index, length, key) {
    var bindingContext = {};
    var overrideContext = (0, _aureliaBinding.createOverrideContext)(bindingContext, repeat.scope.overrideContext);
    if (typeof key !== 'undefined') {
      bindingContext[repeat.key] = key;
      bindingContext[repeat.value] = data;
    } else {
      bindingContext[repeat.local] = data;
    }
    updateOverrideContext(overrideContext, index, length);
    return overrideContext;
  }
  function updateOverrideContext(overrideContext, index, length) {
    var first = index === 0;
    var last = index === length - 1;
    var even = index % 2 === 0;
    overrideContext.$index = index;
    overrideContext.$first = first;
    overrideContext.$last = last;
    overrideContext.$middle = !(first || last);
    overrideContext.$odd = !even;
    overrideContext.$even = even;
  }
  function getItemsSourceExpression(instruction, attrName) {
    return instruction.behaviorInstructions.filter(function(bi) {
      return bi.originalAttrName === attrName;
    })[0].attributes.items.sourceExpression;
  }
  function unwrapExpression(expression) {
    var unwrapped = false;
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      expression = expression.expression;
    }
    while (expression instanceof _aureliaBinding.ValueConverter) {
      expression = expression.expression;
      unwrapped = true;
    }
    return unwrapped ? expression : null;
  }
  function isOneTime(expression) {
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      if (expression.name === 'oneTime') {
        return true;
      }
      expression = expression.expression;
    }
    return false;
  }
  function updateOneTimeBinding(binding) {
    if (binding.call && binding.mode === oneTime) {
      binding.call(_aureliaBinding.sourceContext);
    } else if (binding.updateOneTimeBindings) {
      binding.updateOneTimeBindings();
    }
  }
  function indexOf(array, item, matcher, startIndex) {
    if (!matcher) {
      return array.indexOf(item);
    }
    var length = array.length;
    for (var index = startIndex || 0; index < length; index++) {
      if (matcher(array[index], item)) {
        return index;
      }
    }
    return -1;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/array-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _repeatUtilities, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.ArrayRepeatStrategy = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var ArrayRepeatStrategy = exports.ArrayRepeatStrategy = function() {
    function ArrayRepeatStrategy() {
      _classCallCheck(this, ArrayRepeatStrategy);
    }
    ArrayRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getArrayObserver(items);
    };
    ArrayRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      var itemsLength = items.length;
      if (!items || itemsLength === 0) {
        repeat.removeAllViews(true);
        return;
      }
      var children = repeat.views();
      var viewsLength = children.length;
      if (viewsLength === 0) {
        this._standardProcessInstanceChanged(repeat, items);
        return;
      }
      if (repeat.viewsRequireLifecycle) {
        (function() {
          var childrenSnapshot = children.slice(0);
          var itemNameInBindingContext = repeat.local;
          var matcher = repeat.matcher();
          var itemsPreviouslyInViews = [];
          var viewsToRemove = [];
          for (var index = 0; index < viewsLength; index++) {
            var view = childrenSnapshot[index];
            var oldItem = view.bindingContext[itemNameInBindingContext];
            if ((0, _repeatUtilities.indexOf)(items, oldItem, matcher) === -1) {
              viewsToRemove.push(view);
            } else {
              itemsPreviouslyInViews.push(oldItem);
            }
          }
          var updateViews = void 0;
          var removePromise = void 0;
          if (itemsPreviouslyInViews.length > 0) {
            removePromise = repeat.removeViews(viewsToRemove, true);
            updateViews = function updateViews() {
              for (var _index = 0; _index < itemsLength; _index++) {
                var item = items[_index];
                var indexOfView = (0, _repeatUtilities.indexOf)(itemsPreviouslyInViews, item, matcher, _index);
                var _view = void 0;
                if (indexOfView === -1) {
                  var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_index], _index, itemsLength);
                  repeat.insertView(_index, overrideContext.bindingContext, overrideContext);
                  itemsPreviouslyInViews.splice(_index, 0, undefined);
                } else if (indexOfView === _index) {
                  _view = children[indexOfView];
                  itemsPreviouslyInViews[indexOfView] = undefined;
                } else {
                  _view = children[indexOfView];
                  repeat.moveView(indexOfView, _index);
                  itemsPreviouslyInViews.splice(indexOfView, 1);
                  itemsPreviouslyInViews.splice(_index, 0, undefined);
                }
                if (_view) {
                  (0, _repeatUtilities.updateOverrideContext)(_view.overrideContext, _index, itemsLength);
                }
              }
              _this._inPlaceProcessItems(repeat, items);
            };
          } else {
            removePromise = repeat.removeAllViews(true);
            updateViews = function updateViews() {
              return _this._standardProcessInstanceChanged(repeat, items);
            };
          }
          if (removePromise instanceof Promise) {
            removePromise.then(updateViews);
          } else {
            updateViews();
          }
        })();
      } else {
        this._inPlaceProcessItems(repeat, items);
      }
    };
    ArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
      for (var i = 0,
          ii = items.length; i < ii; i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[i], i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };
    ArrayRepeatStrategy.prototype._inPlaceProcessItems = function _inPlaceProcessItems(repeat, items) {
      var itemsLength = items.length;
      var viewsLength = repeat.viewCount();
      while (viewsLength > itemsLength) {
        viewsLength--;
        repeat.removeView(viewsLength, true);
      }
      var local = repeat.local;
      for (var i = 0; i < viewsLength; i++) {
        var view = repeat.view(i);
        var last = i === itemsLength - 1;
        var middle = i !== 0 && !last;
        if (view.bindingContext[local] === items[i] && view.overrideContext.$middle === middle && view.overrideContext.$last === last) {
          continue;
        }
        view.bindingContext[local] = items[i];
        view.overrideContext.$middle = middle;
        view.overrideContext.$last = last;
        repeat.updateBindings(view);
      }
      for (var _i = viewsLength; _i < itemsLength; _i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_i], _i, itemsLength);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };
    ArrayRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, array, splices) {
      if (repeat.viewsRequireLifecycle) {
        this._standardProcessInstanceMutated(repeat, array, splices);
        return;
      }
      this._inPlaceProcessItems(repeat, array);
    };
    ArrayRepeatStrategy.prototype._standardProcessInstanceMutated = function _standardProcessInstanceMutated(repeat, array, splices) {
      var _this2 = this;
      if (repeat.__queuedSplices) {
        for (var i = 0,
            ii = splices.length; i < ii; ++i) {
          var _splices$i = splices[i];
          var index = _splices$i.index;
          var removed = _splices$i.removed;
          var addedCount = _splices$i.addedCount;
          (0, _aureliaBinding.mergeSplice)(repeat.__queuedSplices, index, removed, addedCount);
        }
        repeat.__array = array.slice(0);
        return;
      }
      var maybePromise = this._runSplices(repeat, array.slice(0), splices);
      if (maybePromise instanceof Promise) {
        (function() {
          var queuedSplices = repeat.__queuedSplices = [];
          var runQueuedSplices = function runQueuedSplices() {
            if (!queuedSplices.length) {
              repeat.__queuedSplices = undefined;
              repeat.__array = undefined;
              return;
            }
            var nextPromise = _this2._runSplices(repeat, repeat.__array, queuedSplices) || Promise.resolve();
            queuedSplices = repeat.__queuedSplices = [];
            nextPromise.then(runQueuedSplices);
          };
          maybePromise.then(runQueuedSplices);
        })();
      }
    };
    ArrayRepeatStrategy.prototype._runSplices = function _runSplices(repeat, array, splices) {
      var _this3 = this;
      var removeDelta = 0;
      var rmPromises = [];
      for (var i = 0,
          ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var removed = splice.removed;
        for (var j = 0,
            jj = removed.length; j < jj; ++j) {
          var viewOrPromise = repeat.removeView(splice.index + removeDelta + rmPromises.length, true);
          if (viewOrPromise instanceof Promise) {
            rmPromises.push(viewOrPromise);
          }
        }
        removeDelta -= splice.addedCount;
      }
      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function() {
          var spliceIndexLow = _this3._handleAddedSplices(repeat, array, splices);
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);
        });
      }
      var spliceIndexLow = this._handleAddedSplices(repeat, array, splices);
      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);
    };
    ArrayRepeatStrategy.prototype._handleAddedSplices = function _handleAddedSplices(repeat, array, splices) {
      var spliceIndex = void 0;
      var spliceIndexLow = void 0;
      var arrayLength = array.length;
      for (var i = 0,
          ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var addIndex = spliceIndex = splice.index;
        var end = splice.index + splice.addedCount;
        if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
          spliceIndexLow = spliceIndex;
        }
        for (; addIndex < end; ++addIndex) {
          var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, array[addIndex], addIndex, arrayLength);
          repeat.insertView(addIndex, overrideContext.bindingContext, overrideContext);
        }
      }
      return spliceIndexLow;
    };
    return ArrayRepeatStrategy;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/null-repeat-strategy", ["exports"], function(exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var NullRepeatStrategy = exports.NullRepeatStrategy = function() {
    function NullRepeatStrategy() {
      _classCallCheck(this, NullRepeatStrategy);
    }
    NullRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      repeat.removeAllViews(true);
    };
    NullRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {};
    return NullRepeatStrategy;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-strategy-locator", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/null-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/array-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/map-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/set-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/number-repeat-strategy"], function(exports, _nullRepeatStrategy, _arrayRepeatStrategy, _mapRepeatStrategy, _setRepeatStrategy, _numberRepeatStrategy) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RepeatStrategyLocator = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var RepeatStrategyLocator = exports.RepeatStrategyLocator = function() {
    function RepeatStrategyLocator() {
      _classCallCheck(this, RepeatStrategyLocator);
      this.matchers = [];
      this.strategies = [];
      this.addStrategy(function(items) {
        return items === null || items === undefined;
      }, new _nullRepeatStrategy.NullRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Array;
      }, new _arrayRepeatStrategy.ArrayRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Map;
      }, new _mapRepeatStrategy.MapRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Set;
      }, new _setRepeatStrategy.SetRepeatStrategy());
      this.addStrategy(function(items) {
        return typeof items === 'number';
      }, new _numberRepeatStrategy.NumberRepeatStrategy());
    }
    RepeatStrategyLocator.prototype.addStrategy = function addStrategy(matcher, strategy) {
      this.matchers.push(matcher);
      this.strategies.push(strategy);
    };
    RepeatStrategyLocator.prototype.getStrategy = function getStrategy(items) {
      var matchers = this.matchers;
      for (var i = 0,
          ii = matchers.length; i < ii; ++i) {
        if (matchers[i](items)) {
          return this.strategies[i];
        }
      }
      return null;
    };
    return RepeatStrategyLocator;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-strategy-locator", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/analyze-view-factory", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/abstract-repeater"], function(exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaTemplating, _repeatStrategyLocator, _repeatUtilities, _analyzeViewFactory, _abstractRepeater) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Repeat = undefined;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  var _dec,
      _dec2,
      _class,
      _desc,
      _value,
      _class2,
      _descriptor,
      _descriptor2,
      _descriptor3,
      _descriptor4;
  var Repeat = exports.Repeat = (_dec = (0, _aureliaTemplating.customAttribute)('repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _repeatStrategyLocator.RepeatStrategyLocator), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function(_AbstractRepeater) {
    _inherits(Repeat, _AbstractRepeater);
    function Repeat(viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
      _classCallCheck(this, Repeat);
      var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
        local: 'item',
        viewsRequireLifecycle: (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory)
      }));
      _initDefineProp(_this, 'items', _descriptor, _this);
      _initDefineProp(_this, 'local', _descriptor2, _this);
      _initDefineProp(_this, 'key', _descriptor3, _this);
      _initDefineProp(_this, 'value', _descriptor4, _this);
      _this.viewFactory = viewFactory;
      _this.instruction = instruction;
      _this.viewSlot = viewSlot;
      _this.lookupFunctions = viewResources.lookupFunctions;
      _this.observerLocator = observerLocator;
      _this.key = 'key';
      _this.value = 'value';
      _this.strategyLocator = strategyLocator;
      _this.ignoreMutation = false;
      _this.sourceExpression = (0, _repeatUtilities.getItemsSourceExpression)(_this.instruction, 'repeat.for');
      _this.isOneTime = (0, _repeatUtilities.isOneTime)(_this.sourceExpression);
      _this.viewsRequireLifecycle = (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory);
      return _this;
    }
    Repeat.prototype.call = function call(context, changes) {
      this[context](this.items, changes);
    };
    Repeat.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = {
        bindingContext: bindingContext,
        overrideContext: overrideContext
      };
      this.matcherBinding = this._captureAndRemoveMatcherBinding();
      this.itemsChanged();
    };
    Repeat.prototype.unbind = function unbind() {
      this.scope = null;
      this.items = null;
      this.matcherBinding = null;
      this.viewSlot.removeAll(true);
      this._unsubscribeCollection();
    };
    Repeat.prototype._unsubscribeCollection = function _unsubscribeCollection() {
      if (this.collectionObserver) {
        this.collectionObserver.unsubscribe(this.callContext, this);
        this.collectionObserver = null;
        this.callContext = null;
      }
    };
    Repeat.prototype.itemsChanged = function itemsChanged() {
      this._unsubscribeCollection();
      if (!this.scope) {
        return;
      }
      var items = this.items;
      this.strategy = this.strategyLocator.getStrategy(items);
      if (!this.strategy) {
        throw new Error('Value for \'' + this.sourceExpression + '\' is non-repeatable');
      }
      if (!this.isOneTime && !this._observeInnerCollection()) {
        this._observeCollection();
      }
      this.strategy.instanceChanged(this, items);
    };
    Repeat.prototype._getInnerCollection = function _getInnerCollection() {
      var expression = (0, _repeatUtilities.unwrapExpression)(this.sourceExpression);
      if (!expression) {
        return null;
      }
      return expression.evaluate(this.scope, null);
    };
    Repeat.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
      if (!this.collectionObserver) {
        return;
      }
      this.strategy.instanceMutated(this, collection, changes);
    };
    Repeat.prototype.handleInnerCollectionMutated = function handleInnerCollectionMutated(collection, changes) {
      var _this2 = this;
      if (!this.collectionObserver) {
        return;
      }
      if (this.ignoreMutation) {
        return;
      }
      this.ignoreMutation = true;
      var newItems = this.sourceExpression.evaluate(this.scope, this.lookupFunctions);
      this.observerLocator.taskQueue.queueMicroTask(function() {
        return _this2.ignoreMutation = false;
      });
      if (newItems === this.items) {
        this.itemsChanged();
      } else {
        this.items = newItems;
      }
    };
    Repeat.prototype._observeInnerCollection = function _observeInnerCollection() {
      var items = this._getInnerCollection();
      var strategy = this.strategyLocator.getStrategy(items);
      if (!strategy) {
        return false;
      }
      this.collectionObserver = strategy.getCollectionObserver(this.observerLocator, items);
      if (!this.collectionObserver) {
        return false;
      }
      this.callContext = 'handleInnerCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
      return true;
    };
    Repeat.prototype._observeCollection = function _observeCollection() {
      var items = this.items;
      this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, items);
      if (this.collectionObserver) {
        this.callContext = 'handleCollectionMutated';
        this.collectionObserver.subscribe(this.callContext, this);
      }
    };
    Repeat.prototype._captureAndRemoveMatcherBinding = function _captureAndRemoveMatcherBinding() {
      if (this.viewFactory.viewFactory) {
        var instructions = this.viewFactory.viewFactory.instructions;
        var instructionIds = Object.keys(instructions);
        for (var i = 0; i < instructionIds.length; i++) {
          var expressions = instructions[instructionIds[i]].expressions;
          if (expressions) {
            for (var ii = 0; i < expressions.length; i++) {
              if (expressions[ii].targetProperty === 'matcher') {
                var matcherBinding = expressions[ii];
                expressions.splice(ii, 1);
                return matcherBinding;
              }
            }
          }
        }
      }
    };
    Repeat.prototype.viewCount = function viewCount() {
      return this.viewSlot.children.length;
    };
    Repeat.prototype.views = function views() {
      return this.viewSlot.children;
    };
    Repeat.prototype.view = function view(index) {
      return this.viewSlot.children[index];
    };
    Repeat.prototype.matcher = function matcher() {
      return this.matcherBinding ? this.matcherBinding.sourceExpression.evaluate(this.scope, this.matcherBinding.lookupFunctions) : null;
    };
    Repeat.prototype.addView = function addView(bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.add(view);
    };
    Repeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.insert(index, view);
    };
    Repeat.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      this.viewSlot.move(sourceIndex, targetIndex);
    };
    Repeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      return this.viewSlot.removeAll(returnToCache, skipAnimation);
    };
    Repeat.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      return this.viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
    };
    Repeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
    };
    Repeat.prototype.updateBindings = function updateBindings(view) {
      var j = view.bindings.length;
      while (j--) {
        (0, _repeatUtilities.updateOneTimeBinding)(view.bindings[j]);
      }
      j = view.controllers.length;
      while (j--) {
        var k = view.controllers[j].boundProperties.length;
        while (k--) {
          var binding = view.controllers[j].boundProperties[k].binding;
          (0, _repeatUtilities.updateOneTimeBinding)(binding);
        }
      }
    };
    return Repeat;
  }(_abstractRepeater.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/with", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-binding@1.0.0-beta.1.3.3"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaBinding) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.With = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var With = exports.With = (_dec = (0, _aureliaTemplating.customAttribute)('with'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function() {
    function With(viewFactory, viewSlot) {
      _classCallCheck(this, With);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.parentOverrideContext = null;
      this.view = null;
    }
    With.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parentOverrideContext = overrideContext;
      this.valueChanged(this.value);
    };
    With.prototype.valueChanged = function valueChanged(newValue) {
      var overrideContext = (0, _aureliaBinding.createOverrideContext)(newValue, this.parentOverrideContext);
      if (!this.view) {
        this.view = this.viewFactory.create();
        this.view.bind(newValue, overrideContext);
        this.viewSlot.add(this.view);
      } else {
        this.view.bind(newValue, overrideContext);
      }
    };
    With.prototype.unbind = function unbind() {
      this.parentOverrideContext = null;
      if (this.view) {
        this.view.unbind();
      }
    };
    return With;
  }()) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/if", ["exports", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2"], function(exports, _aureliaTemplating, _aureliaDependencyInjection) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.If = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _dec2,
      _class;
  var If = exports.If = (_dec = (0, _aureliaTemplating.customAttribute)('if'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function() {
    function If(viewFactory, viewSlot) {
      _classCallCheck(this, If);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.showing = false;
      this.view = null;
      this.bindingContext = null;
      this.overrideContext = null;
    }
    If.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      this.valueChanged(this.value);
    };
    If.prototype.valueChanged = function valueChanged(newValue) {
      var _this = this;
      if (this.__queuedChanges) {
        this.__queuedChanges.push(newValue);
        return;
      }
      var maybePromise = this._runValueChanged(newValue);
      if (maybePromise instanceof Promise) {
        (function() {
          var queuedChanges = _this.__queuedChanges = [];
          var runQueuedChanges = function runQueuedChanges() {
            if (!queuedChanges.length) {
              _this.__queuedChanges = undefined;
              return;
            }
            var nextPromise = _this._runValueChanged(queuedChanges.shift()) || Promise.resolve();
            nextPromise.then(runQueuedChanges);
          };
          maybePromise.then(runQueuedChanges);
        })();
      }
    };
    If.prototype._runValueChanged = function _runValueChanged(newValue) {
      var _this2 = this;
      if (!newValue) {
        var viewOrPromise = void 0;
        if (this.view !== null && this.showing) {
          viewOrPromise = this.viewSlot.remove(this.view);
          if (viewOrPromise instanceof Promise) {
            viewOrPromise.then(function() {
              return _this2.view.unbind();
            });
          } else {
            this.view.unbind();
          }
        }
        this.showing = false;
        return viewOrPromise;
      }
      if (this.view === null) {
        this.view = this.viewFactory.create();
      }
      if (!this.view.isBound) {
        this.view.bind(this.bindingContext, this.overrideContext);
      }
      if (!this.showing) {
        this.showing = true;
        return this.viewSlot.add(this.view);
      }
    };
    If.prototype.unbind = function unbind() {
      if (this.view === null) {
        return;
      }
      this.view.unbind();
      if (!this.viewFactory.isCaching) {
        return;
      }
      if (this.showing) {
        this.showing = false;
        this.viewSlot.remove(this.view, true, true);
      }
      this.view.returnToCache();
      this.view = null;
    };
    return If;
  }()) || _class) || _class) || _class);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compose", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-task-queue@1.0.0-beta.1.2.0", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaTemplating, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Compose = undefined;
  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor)
      return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }
    return desc;
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }
  var _dec,
      _dec2,
      _class,
      _desc,
      _value,
      _class2,
      _descriptor,
      _descriptor2,
      _descriptor3;
  var Compose = exports.Compose = (_dec = (0, _aureliaTemplating.customElement)('compose'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function() {
    function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
      _classCallCheck(this, Compose);
      _initDefineProp(this, 'model', _descriptor, this);
      _initDefineProp(this, 'view', _descriptor2, this);
      _initDefineProp(this, 'viewModel', _descriptor3, this);
      this.element = element;
      this.container = container;
      this.compositionEngine = compositionEngine;
      this.viewSlot = viewSlot;
      this.viewResources = viewResources;
      this.taskQueue = taskQueue;
      this.currentController = null;
      this.currentViewModel = null;
    }
    Compose.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };
    Compose.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      processInstruction(this, createInstruction(this, {
        view: this.view,
        viewModel: this.viewModel,
        model: this.model
      }));
    };
    Compose.prototype.unbind = function unbind(bindingContext, overrideContext) {
      this.bindingContext = null;
      this.overrideContext = null;
      var returnToCache = true;
      var skipAnimation = true;
      this.viewSlot.removeAll(returnToCache, skipAnimation);
    };
    Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
      var _this = this;
      if (this.currentInstruction) {
        this.currentInstruction.model = newValue;
        return;
      }
      this.taskQueue.queueMicroTask(function() {
        if (_this.currentInstruction) {
          _this.currentInstruction.model = newValue;
          return;
        }
        var vm = _this.currentViewModel;
        if (vm && typeof vm.activate === 'function') {
          vm.activate(newValue);
        }
      });
    };
    Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
      var _this2 = this;
      var instruction = createInstruction(this, {
        view: newValue,
        viewModel: this.currentViewModel || this.viewModel,
        model: this.model
      });
      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }
      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function() {
        return processInstruction(_this2, _this2.currentInstruction);
      });
    };
    Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
      var _this3 = this;
      var instruction = createInstruction(this, {
        viewModel: newValue,
        view: this.view,
        model: this.model
      });
      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }
      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function() {
        return processInstruction(_this3, _this3.currentInstruction);
      });
    };
    return Compose;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'viewModel', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      bindingContext: composer.bindingContext,
      overrideContext: composer.overrideContext,
      owningView: composer.owningView,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentController: composer.currentController,
      host: composer.element
    });
  }
  function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function(controller) {
      composer.currentController = controller;
      composer.currentViewModel = controller ? controller.viewModel : null;
    });
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3/aurelia-templating-resources", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compose", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/if", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/with", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/show", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/hide", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/sanitize-html", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/replaceable", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/focus", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compile-spy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/view-spy", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/css-resource", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-sanitizer", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-mode-behaviors", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/throttle-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/debounce-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/signal-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-signaler", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/update-trigger-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/abstract-repeater", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-strategy-locator", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-resource-plugin", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/null-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/array-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/map-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/set-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/number-repeat-strategy"], function(exports, _compose, _if, _with, _repeat, _show, _hide, _sanitizeHtml, _replaceable, _focus, _compileSpy, _viewSpy, _aureliaTemplating, _cssResource, _aureliaPal, _htmlSanitizer, _bindingModeBehaviors, _throttleBindingBehavior, _debounceBindingBehavior, _signalBindingBehavior, _bindingSignaler, _updateTriggerBindingBehavior, _abstractRepeater, _repeatStrategyLocator, _htmlResourcePlugin, _nullRepeatStrategy, _arrayRepeatStrategy, _mapRepeatStrategy, _setRepeatStrategy, _numberRepeatStrategy) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.NumberRepeatStrategy = exports.SetRepeatStrategy = exports.MapRepeatStrategy = exports.ArrayRepeatStrategy = exports.NullRepeatStrategy = exports.RepeatStrategyLocator = exports.AbstractRepeater = exports.UpdateTriggerBindingBehavior = exports.BindingSignaler = exports.SignalBindingBehavior = exports.DebounceBindingBehavior = exports.ThrottleBindingBehavior = exports.TwoWayBindingBehavior = exports.OneWayBindingBehavior = exports.OneTimeBindingBehavior = exports.configure = exports.ViewSpy = exports.CompileSpy = exports.Focus = exports.Replaceable = exports.SanitizeHTMLValueConverter = exports.HTMLSanitizer = exports.Hide = exports.Show = exports.Repeat = exports.With = exports.If = exports.Compose = undefined;
  function configure(config) {
    if (_aureliaPal.FEATURE.shadowDOM) {
      _aureliaPal.DOM.injectStyles('body /deep/ .aurelia-hide { display:none !important; }');
    } else {
      _aureliaPal.DOM.injectStyles('.aurelia-hide { display:none !important; }');
    }
    config.globalResources('./compose', './if', './with', './repeat', './show', './hide', './replaceable', './sanitize-html', './focus', './compile-spy', './view-spy', './binding-mode-behaviors', './throttle-binding-behavior', './debounce-binding-behavior', './signal-binding-behavior', './update-trigger-binding-behavior');
    (0, _htmlResourcePlugin.configure)(config);
    var viewEngine = config.container.get(_aureliaTemplating.ViewEngine);
    viewEngine.addResourcePlugin('.css', {'fetch': function fetch(address) {
        var _ref;
        return _ref = {}, _ref[address] = (0, _cssResource._createCSSResource)(address), _ref;
      }});
  }
  exports.Compose = _compose.Compose;
  exports.If = _if.If;
  exports.With = _with.With;
  exports.Repeat = _repeat.Repeat;
  exports.Show = _show.Show;
  exports.Hide = _hide.Hide;
  exports.HTMLSanitizer = _htmlSanitizer.HTMLSanitizer;
  exports.SanitizeHTMLValueConverter = _sanitizeHtml.SanitizeHTMLValueConverter;
  exports.Replaceable = _replaceable.Replaceable;
  exports.Focus = _focus.Focus;
  exports.CompileSpy = _compileSpy.CompileSpy;
  exports.ViewSpy = _viewSpy.ViewSpy;
  exports.configure = configure;
  exports.OneTimeBindingBehavior = _bindingModeBehaviors.OneTimeBindingBehavior;
  exports.OneWayBindingBehavior = _bindingModeBehaviors.OneWayBindingBehavior;
  exports.TwoWayBindingBehavior = _bindingModeBehaviors.TwoWayBindingBehavior;
  exports.ThrottleBindingBehavior = _throttleBindingBehavior.ThrottleBindingBehavior;
  exports.DebounceBindingBehavior = _debounceBindingBehavior.DebounceBindingBehavior;
  exports.SignalBindingBehavior = _signalBindingBehavior.SignalBindingBehavior;
  exports.BindingSignaler = _bindingSignaler.BindingSignaler;
  exports.UpdateTriggerBindingBehavior = _updateTriggerBindingBehavior.UpdateTriggerBindingBehavior;
  exports.AbstractRepeater = _abstractRepeater.AbstractRepeater;
  exports.RepeatStrategyLocator = _repeatStrategyLocator.RepeatStrategyLocator;
  exports.NullRepeatStrategy = _nullRepeatStrategy.NullRepeatStrategy;
  exports.ArrayRepeatStrategy = _arrayRepeatStrategy.ArrayRepeatStrategy;
  exports.MapRepeatStrategy = _mapRepeatStrategy.MapRepeatStrategy;
  exports.SetRepeatStrategy = _setRepeatStrategy.SetRepeatStrategy;
  exports.NumberRepeatStrategy = _numberRepeatStrategy.NumberRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.2.3", ["npm:aurelia-templating-resources@1.0.0-beta.1.2.3/aurelia-templating-resources"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-binding@1.0.0-beta.1.2.2/aurelia-templating-binding", ["exports", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-templating@1.0.0-beta.1.2.4"], function(exports, _aureliaLogging, _aureliaBinding, _aureliaTemplating) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TemplatingBindingLanguage = exports.SyntaxInterpreter = exports.ChildInterpolationBinding = exports.InterpolationBinding = exports.InterpolationBindingExpression = exports.AttributeMap = undefined;
  exports.configure = configure;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _dec,
      _class2,
      _class3,
      _temp,
      _class4,
      _temp2;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var AttributeMap = exports.AttributeMap = function() {
    function AttributeMap() {
      _classCallCheck(this, AttributeMap);
      this.elements = Object.create(null);
      this.allElements = Object.create(null);
      this.registerUniversal('accesskey', 'accessKey');
      this.registerUniversal('contenteditable', 'contentEditable');
      this.registerUniversal('tabindex', 'tabIndex');
      this.registerUniversal('textcontent', 'textContent');
      this.registerUniversal('innerhtml', 'innerHTML');
      this.registerUniversal('scrolltop', 'scrollTop');
      this.registerUniversal('scrollleft', 'scrollLeft');
      this.registerUniversal('readonly', 'readOnly');
      this.register('label', 'for', 'htmlFor');
      this.register('input', 'maxlength', 'maxLength');
      this.register('input', 'minlength', 'minLength');
      this.register('input', 'formaction', 'formAction');
      this.register('input', 'formenctype', 'formEncType');
      this.register('input', 'formmethod', 'formMethod');
      this.register('input', 'formnovalidate', 'formNoValidate');
      this.register('input', 'formtarget', 'formTarget');
      this.register('td', 'rowspan', 'rowSpan');
      this.register('td', 'colspan', 'colSpan');
      this.register('th', 'rowspan', 'rowSpan');
      this.register('th', 'colspan', 'colSpan');
    }
    AttributeMap.prototype.register = function register(elementName, attributeName, propertyName) {
      elementName = elementName.toLowerCase();
      attributeName = attributeName.toLowerCase();
      var element = this.elements[elementName] = this.elements[elementName] || Object.create(null);
      element[attributeName] = propertyName;
    };
    AttributeMap.prototype.registerUniversal = function registerUniversal(attributeName, propertyName) {
      attributeName = attributeName.toLowerCase();
      this.allElements[attributeName] = propertyName;
    };
    AttributeMap.prototype.map = function map(elementName, attributeName) {
      elementName = elementName.toLowerCase();
      attributeName = attributeName.toLowerCase();
      var element = this.elements[elementName];
      if (element !== undefined && attributeName in element) {
        return element[attributeName];
      }
      if (attributeName in this.allElements) {
        return this.allElements[attributeName];
      }
      if (/(^data-)|(^aria-)|:/.test(attributeName)) {
        return attributeName;
      }
      return (0, _aureliaBinding.camelCase)(attributeName);
    };
    return AttributeMap;
  }();
  var InterpolationBindingExpression = exports.InterpolationBindingExpression = function() {
    function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, lookupFunctions, attribute) {
      _classCallCheck(this, InterpolationBindingExpression);
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.parts = parts;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.attribute = this.attrToRemove = attribute;
      this.discrete = false;
    }
    InterpolationBindingExpression.prototype.createBinding = function createBinding(target) {
      if (this.parts.length === 3) {
        return new ChildInterpolationBinding(target, this.observerLocator, this.parts[1], this.mode, this.lookupFunctions, this.targetProperty, this.parts[0], this.parts[2]);
      }
      return new InterpolationBinding(this.observerLocator, this.parts, target, this.targetProperty, this.mode, this.lookupFunctions);
    };
    return InterpolationBindingExpression;
  }();
  function validateTarget(target, propertyName) {
    if (propertyName === 'style') {
      LogManager.getLogger('templating-binding').info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
    } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && propertyName === 'textContent') {
      throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
    }
  }
  var InterpolationBinding = exports.InterpolationBinding = function() {
    function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, lookupFunctions) {
      _classCallCheck(this, InterpolationBinding);
      validateTarget(target, targetProperty);
      this.observerLocator = observerLocator;
      this.parts = parts;
      this.target = target;
      this.targetProperty = targetProperty;
      this.targetAccessor = observerLocator.getAccessor(target, targetProperty);
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
    }
    InterpolationBinding.prototype.interpolate = function interpolate() {
      if (this.isBound) {
        var value = '';
        var parts = this.parts;
        for (var i = 0,
            ii = parts.length; i < ii; i++) {
          value += i % 2 === 0 ? parts[i] : this['childBinding' + i].value;
        }
        this.targetAccessor.setValue(value, this.target, this.targetProperty);
      }
    };
    InterpolationBinding.prototype.updateOneTimeBindings = function updateOneTimeBindings() {
      for (var i = 1,
          ii = this.parts.length; i < ii; i += 2) {
        var child = this['childBinding' + i];
        if (child.mode === _aureliaBinding.bindingMode.oneTime) {
          child.call();
        }
      }
    };
    InterpolationBinding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.source = source;
      var parts = this.parts;
      for (var i = 1,
          ii = parts.length; i < ii; i += 2) {
        var binding = new ChildInterpolationBinding(this, this.observerLocator, parts[i], this.mode, this.lookupFunctions);
        binding.bind(source);
        this['childBinding' + i] = binding;
      }
      this.isBound = true;
      this.interpolate();
    };
    InterpolationBinding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      this.source = null;
      var parts = this.parts;
      for (var i = 1,
          ii = parts.length; i < ii; i += 2) {
        var name = 'childBinding' + i;
        this[name].unbind();
      }
    };
    return InterpolationBinding;
  }();
  var ChildInterpolationBinding = exports.ChildInterpolationBinding = (_dec = (0, _aureliaBinding.connectable)(), _dec(_class2 = function() {
    function ChildInterpolationBinding(target, observerLocator, sourceExpression, mode, lookupFunctions, targetProperty, left, right) {
      _classCallCheck(this, ChildInterpolationBinding);
      if (target instanceof InterpolationBinding) {
        this.parent = target;
      } else {
        validateTarget(target, targetProperty);
        this.target = target;
        this.targetProperty = targetProperty;
        this.targetAccessor = observerLocator.getAccessor(target, targetProperty);
      }
      this.observerLocator = observerLocator;
      this.sourceExpression = sourceExpression;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.left = left;
      this.right = right;
    }
    ChildInterpolationBinding.prototype.updateTarget = function updateTarget(value) {
      value = value === null || value === undefined ? '' : value.toString();
      if (value !== this.value) {
        this.value = value;
        if (this.parent) {
          this.parent.interpolate();
        } else {
          this.targetAccessor.setValue(this.left + value + this.right, this.target, this.targetProperty);
        }
      }
    };
    ChildInterpolationBinding.prototype.call = function call() {
      if (!this.isBound) {
        return;
      }
      var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
      this.updateTarget(value);
      if (this.mode !== _aureliaBinding.bindingMode.oneTime) {
        this._version++;
        this.sourceExpression.connect(this, this.source);
        if (value instanceof Array) {
          this.observeArray(value);
        }
        this.unobserve(false);
      }
    };
    ChildInterpolationBinding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.bind) {
        sourceExpression.bind(this, source, this.lookupFunctions);
      }
      var value = sourceExpression.evaluate(source, this.lookupFunctions);
      this.updateTarget(value);
      if (this.mode === _aureliaBinding.bindingMode.oneWay) {
        (0, _aureliaBinding.enqueueBindingConnect)(this);
      }
    };
    ChildInterpolationBinding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.unbind) {
        sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this.unobserve(true);
    };
    ChildInterpolationBinding.prototype.connect = function connect(evaluate) {
      if (!this.isBound) {
        return;
      }
      if (evaluate) {
        var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        this.updateTarget(value);
      }
      this.sourceExpression.connect(this, this.source);
      if (this.value instanceof Array) {
        this.observeArray(this.value);
      }
    };
    return ChildInterpolationBinding;
  }()) || _class2);
  var SyntaxInterpreter = exports.SyntaxInterpreter = (_temp = _class3 = function() {
    function SyntaxInterpreter(parser, observerLocator, eventManager, attributeMap) {
      _classCallCheck(this, SyntaxInterpreter);
      this.parser = parser;
      this.observerLocator = observerLocator;
      this.eventManager = eventManager;
      this.attributeMap = attributeMap;
    }
    SyntaxInterpreter.prototype.interpret = function interpret(resources, element, info, existingInstruction, context) {
      if (info.command in this) {
        return this[info.command](resources, element, info, existingInstruction, context);
      }
      return this.handleUnknownCommand(resources, element, info, existingInstruction, context);
    };
    SyntaxInterpreter.prototype.handleUnknownCommand = function handleUnknownCommand(resources, element, info, existingInstruction, context) {
      LogManager.getLogger('templating-binding').warn('Unknown binding command.', info);
      return existingInstruction;
    };
    SyntaxInterpreter.prototype.determineDefaultBindingMode = function determineDefaultBindingMode(element, attrName, context) {
      var tagName = element.tagName.toLowerCase();
      if (tagName === 'input' && (attrName === 'value' || attrName === 'files') && element.type !== 'checkbox' && element.type !== 'radio' || tagName === 'input' && attrName === 'checked' && (element.type === 'checkbox' || element.type === 'radio') || (tagName === 'textarea' || tagName === 'select') && attrName === 'value' || (attrName === 'textcontent' || attrName === 'innerhtml') && element.contentEditable === 'true' || attrName === 'scrolltop' || attrName === 'scrollleft') {
        return _aureliaBinding.bindingMode.twoWay;
      }
      if (context && attrName in context.attributes && context.attributes[attrName] && context.attributes[attrName].defaultBindingMode >= _aureliaBinding.bindingMode.oneTime) {
        return context.attributes[attrName].defaultBindingMode;
      }
      return _aureliaBinding.bindingMode.oneWay;
    };
    SyntaxInterpreter.prototype.bind = function bind(resources, element, info, existingInstruction, context) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap.map(element.tagName, info.attrName), this.parser.parse(info.attrValue), info.defaultBindingMode || this.determineDefaultBindingMode(element, info.attrName, context), resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype.trigger = function trigger(resources, element, info) {
      return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), false, true, resources.lookupFunctions);
    };
    SyntaxInterpreter.prototype.delegate = function delegate(resources, element, info) {
      return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), true, true, resources.lookupFunctions);
    };
    SyntaxInterpreter.prototype.call = function call(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.CallExpression(this.observerLocator, info.attrName, this.parser.parse(info.attrValue), resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype.options = function options(resources, element, info, existingInstruction, context) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      var attrValue = info.attrValue;
      var language = this.language;
      var name = null;
      var target = '';
      var current = void 0;
      var i = void 0;
      var ii = void 0;
      var inString = false;
      var inEscape = false;
      for (i = 0, ii = attrValue.length; i < ii; ++i) {
        current = attrValue[i];
        if (current === ';' && !inString) {
          info = language.inspectAttribute(resources, '?', name, target.trim());
          language.createAttributeInstruction(resources, element, info, instruction, context);
          if (!instruction.attributes[info.attrName]) {
            instruction.attributes[info.attrName] = info.attrValue;
          }
          target = '';
          name = null;
        } else if (current === ':' && name === null) {
          name = target.trim();
          target = '';
        } else if (current === '\\') {
          target += current;
          inEscape = true;
          continue;
        } else {
          target += current;
          if (name !== null && inEscape === false && current === '\'') {
            inString = !inString;
          }
        }
        inEscape = false;
      }
      if (name !== null) {
        info = language.inspectAttribute(resources, '?', name, target.trim());
        language.createAttributeInstruction(resources, element, info, instruction, context);
        if (!instruction.attributes[info.attrName]) {
          instruction.attributes[info.attrName] = info.attrValue;
        }
      }
      return instruction;
    };
    SyntaxInterpreter.prototype['for'] = function _for(resources, element, info, existingInstruction) {
      var parts = void 0;
      var keyValue = void 0;
      var instruction = void 0;
      var attrValue = void 0;
      var isDestructuring = void 0;
      attrValue = info.attrValue;
      isDestructuring = attrValue.match(/^ *[[].+[\]]/);
      parts = isDestructuring ? attrValue.split('of ') : attrValue.split(' of ');
      if (parts.length !== 2) {
        throw new Error('Incorrect syntax for "for". The form is: "$local of $items" or "[$key, $value] of $items".');
      }
      instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      if (isDestructuring) {
        keyValue = parts[0].replace(/[[\]]/g, '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
        instruction.attributes.key = keyValue[0];
        instruction.attributes.value = keyValue[1];
      } else {
        instruction.attributes.local = parts[0];
      }
      instruction.attributes.items = new _aureliaBinding.BindingExpression(this.observerLocator, 'items', this.parser.parse(parts[1]), _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['two-way'] = function twoWay(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap.map(element.tagName, info.attrName), this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.twoWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-way'] = function oneWay(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap.map(element.tagName, info.attrName), this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-time'] = function oneTime(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap.map(element.tagName, info.attrName), this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneTime, resources.lookupFunctions);
      return instruction;
    };
    return SyntaxInterpreter;
  }(), _class3.inject = [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, _aureliaBinding.EventManager, AttributeMap], _temp);
  var info = {};
  var TemplatingBindingLanguage = exports.TemplatingBindingLanguage = (_temp2 = _class4 = function(_BindingLanguage) {
    _inherits(TemplatingBindingLanguage, _BindingLanguage);
    function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter, attributeMap) {
      _classCallCheck(this, TemplatingBindingLanguage);
      var _this = _possibleConstructorReturn(this, _BindingLanguage.call(this));
      _this.parser = parser;
      _this.observerLocator = observerLocator;
      _this.syntaxInterpreter = syntaxInterpreter;
      _this.emptyStringExpression = _this.parser.parse('\'\'');
      syntaxInterpreter.language = _this;
      _this.attributeMap = attributeMap;
      return _this;
    }
    TemplatingBindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
      var parts = attrName.split('.');
      info.defaultBindingMode = null;
      if (parts.length === 2) {
        info.attrName = parts[0].trim();
        info.attrValue = attrValue;
        info.command = parts[1].trim();
        if (info.command === 'ref') {
          info.expression = new _aureliaBinding.NameExpression(this.parser.parse(attrValue), info.attrName);
          info.command = null;
          info.attrName = 'ref';
        } else {
          info.expression = null;
        }
      } else if (attrName === 'ref') {
        info.attrName = attrName;
        info.attrValue = attrValue;
        info.command = null;
        info.expression = new _aureliaBinding.NameExpression(this.parser.parse(attrValue), 'element');
      } else {
        info.attrName = attrName;
        info.attrValue = attrValue;
        info.command = null;
        var interpolationParts = this.parseInterpolation(resources, attrValue);
        if (interpolationParts === null) {
          info.expression = null;
        } else {
          info.expression = new InterpolationBindingExpression(this.observerLocator, this.attributeMap.map(elementName, attrName), interpolationParts, _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions, attrName);
        }
      }
      return info;
    };
    TemplatingBindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, theInfo, existingInstruction, context) {
      var instruction = void 0;
      if (theInfo.expression) {
        if (theInfo.attrName === 'ref') {
          return theInfo.expression;
        }
        instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(theInfo.attrName);
        instruction.attributes[theInfo.attrName] = theInfo.expression;
      } else if (theInfo.command) {
        instruction = this.syntaxInterpreter.interpret(resources, element, theInfo, existingInstruction, context);
      }
      return instruction;
    };
    TemplatingBindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
      var parts = this.parseInterpolation(resources, value);
      if (parts === null) {
        return null;
      }
      return new InterpolationBindingExpression(this.observerLocator, 'textContent', parts, _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions, 'textContent');
    };
    TemplatingBindingLanguage.prototype.parseInterpolation = function parseInterpolation(resources, value) {
      var i = value.indexOf('${', 0);
      var ii = value.length;
      var char = void 0;
      var pos = 0;
      var open = 0;
      var quote = null;
      var interpolationStart = void 0;
      var parts = void 0;
      var partIndex = 0;
      while (i >= 0 && i < ii - 2) {
        open = 1;
        interpolationStart = i;
        i += 2;
        do {
          char = value[i];
          i++;
          if (char === "'" || char === '"') {
            if (quote === null) {
              quote = char;
            } else if (quote === char) {
              quote = null;
            }
            continue;
          }
          if (char === '\\') {
            i++;
            continue;
          }
          if (quote !== null) {
            continue;
          }
          if (char === '{') {
            open++;
          } else if (char === '}') {
            open--;
          }
        } while (open > 0 && i < ii);
        if (open === 0) {
          parts = parts || [];
          if (value[interpolationStart - 1] === '\\' && value[interpolationStart - 2] !== '\\') {
            parts[partIndex] = value.substring(pos, interpolationStart - 1) + value.substring(interpolationStart, i);
            partIndex++;
            parts[partIndex] = this.emptyStringExpression;
            partIndex++;
          } else {
            parts[partIndex] = value.substring(pos, interpolationStart);
            partIndex++;
            parts[partIndex] = this.parser.parse(value.substring(interpolationStart + 2, i - 1));
            partIndex++;
          }
          pos = i;
          i = value.indexOf('${', i);
        } else {
          break;
        }
      }
      if (partIndex === 0) {
        return null;
      }
      parts[partIndex] = value.substr(pos);
      return parts;
    };
    return TemplatingBindingLanguage;
  }(_aureliaTemplating.BindingLanguage), _class4.inject = [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, SyntaxInterpreter, AttributeMap], _temp2);
  function configure(config) {
    config.container.registerSingleton(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
    config.container.registerAlias(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-binding@1.0.0-beta.1.2.2", ["npm:aurelia-templating-binding@1.0.0-beta.1.2.2/aurelia-templating-binding"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-router@1.0.0-beta.1.2.1/aurelia-router", ["exports", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-history@1.0.0-beta.1.2.0", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0"], function(exports, _aureliaLogging, _aureliaRouteRecognizer, _aureliaDependencyInjection, _aureliaHistory, _aureliaEventAggregator) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.AppRouter = exports.PipelineProvider = exports.LoadRouteStep = exports.RouteLoader = exports.ActivateNextStep = exports.DeactivatePreviousStep = exports.CanActivateNextStep = exports.CanDeactivatePreviousStep = exports.Router = exports.BuildNavigationPlanStep = exports.activationStrategy = exports.RouterConfiguration = exports.RedirectToRoute = exports.Redirect = exports.NavModel = exports.NavigationInstruction = exports.CommitChangesStep = exports.Pipeline = exports.pipelineStatus = undefined;
  exports._normalizeAbsolutePath = _normalizeAbsolutePath;
  exports._createRootedPath = _createRootedPath;
  exports._resolveUrl = _resolveUrl;
  exports.isNavigationCommand = isNavigationCommand;
  exports._buildNavigationPlan = _buildNavigationPlan;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
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
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _normalizeAbsolutePath(path, hasPushState) {
    if (!hasPushState && path[0] !== '#') {
      path = '#' + path;
    }
    return path;
  }
  function _createRootedPath(fragment, baseUrl, hasPushState) {
    if (isAbsoluteUrl.test(fragment)) {
      return fragment;
    }
    var path = '';
    if (baseUrl.length && baseUrl[0] !== '/') {
      path += '/';
    }
    path += baseUrl;
    if ((!path.length || path[path.length - 1] !== '/') && fragment[0] !== '/') {
      path += '/';
    }
    if (path.length && path[path.length - 1] === '/' && fragment[0] === '/') {
      path = path.substring(0, path.length - 1);
    }
    return _normalizeAbsolutePath(path + fragment, hasPushState);
  }
  function _resolveUrl(fragment, baseUrl, hasPushState) {
    if (isRootedPath.test(fragment)) {
      return _normalizeAbsolutePath(fragment, hasPushState);
    }
    return _createRootedPath(fragment, baseUrl, hasPushState);
  }
  var isRootedPath = /^#?\//;
  var isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  var pipelineStatus = exports.pipelineStatus = {
    completed: 'completed',
    canceled: 'canceled',
    rejected: 'rejected',
    running: 'running'
  };
  var Pipeline = exports.Pipeline = function() {
    function Pipeline() {
      _classCallCheck(this, Pipeline);
      this.steps = [];
    }
    Pipeline.prototype.addStep = function addStep(step) {
      var run = void 0;
      if (typeof step === 'function') {
        run = step;
      } else if (typeof step.getSteps === 'function') {
        var steps = step.getSteps();
        for (var i = 0,
            l = steps.length; i < l; i++) {
          this.addStep(steps[i]);
        }
        return this;
      } else {
        run = step.run.bind(step);
      }
      this.steps.push(run);
      return this;
    };
    Pipeline.prototype.run = function run(instruction) {
      var index = -1;
      var steps = this.steps;
      function next() {
        index++;
        if (index < steps.length) {
          var currentStep = steps[index];
          try {
            return currentStep(instruction, next);
          } catch (e) {
            return next.reject(e);
          }
        } else {
          return next.complete();
        }
      }
      next.complete = createCompletionHandler(next, pipelineStatus.completed);
      next.cancel = createCompletionHandler(next, pipelineStatus.canceled);
      next.reject = createCompletionHandler(next, pipelineStatus.rejected);
      return next();
    };
    return Pipeline;
  }();
  function createCompletionHandler(next, status) {
    return function(output) {
      return Promise.resolve({
        status: status,
        output: output,
        completed: status === pipelineStatus.completed
      });
    };
  }
  var CommitChangesStep = exports.CommitChangesStep = function() {
    function CommitChangesStep() {
      _classCallCheck(this, CommitChangesStep);
    }
    CommitChangesStep.prototype.run = function run(navigationInstruction, next) {
      return navigationInstruction._commitChanges(true).then(function() {
        navigationInstruction._updateTitle();
        return next();
      });
    };
    return CommitChangesStep;
  }();
  var NavigationInstruction = exports.NavigationInstruction = function() {
    function NavigationInstruction(init) {
      _classCallCheck(this, NavigationInstruction);
      this.plan = null;
      this.options = {};
      Object.assign(this, init);
      this.params = this.params || {};
      this.viewPortInstructions = {};
      var ancestorParams = [];
      var current = this;
      do {
        var currentParams = Object.assign({}, current.params);
        if (current.config && current.config.hasChildRouter) {
          delete currentParams[current.getWildCardName()];
        }
        ancestorParams.unshift(currentParams);
        current = current.parentInstruction;
      } while (current);
      var allParams = Object.assign.apply(Object, [{}, this.queryParams].concat(ancestorParams));
      this.lifecycleArgs = [allParams, this.config, this];
    }
    NavigationInstruction.prototype.getAllInstructions = function getAllInstructions() {
      var instructions = [this];
      for (var key in this.viewPortInstructions) {
        var childInstruction = this.viewPortInstructions[key].childNavigationInstruction;
        if (childInstruction) {
          instructions.push.apply(instructions, childInstruction.getAllInstructions());
        }
      }
      return instructions;
    };
    NavigationInstruction.prototype.getAllPreviousInstructions = function getAllPreviousInstructions() {
      return this.getAllInstructions().map(function(c) {
        return c.previousInstruction;
      }).filter(function(c) {
        return c;
      });
    };
    NavigationInstruction.prototype.addViewPortInstruction = function addViewPortInstruction(viewPortName, strategy, moduleId, component) {
      var viewportInstruction = this.viewPortInstructions[viewPortName] = {
        name: viewPortName,
        strategy: strategy,
        moduleId: moduleId,
        component: component,
        childRouter: component.childRouter,
        lifecycleArgs: this.lifecycleArgs.slice()
      };
      return viewportInstruction;
    };
    NavigationInstruction.prototype.getWildCardName = function getWildCardName() {
      var wildcardIndex = this.config.route.lastIndexOf('*');
      return this.config.route.substr(wildcardIndex + 1);
    };
    NavigationInstruction.prototype.getWildcardPath = function getWildcardPath() {
      var wildcardName = this.getWildCardName();
      var path = this.params[wildcardName] || '';
      if (this.queryString) {
        path += '?' + this.queryString;
      }
      return path;
    };
    NavigationInstruction.prototype.getBaseUrl = function getBaseUrl() {
      if (!this.params) {
        return this.fragment;
      }
      var wildcardName = this.getWildCardName();
      var path = this.params[wildcardName] || '';
      if (!path) {
        return this.fragment;
      }
      return this.fragment.substr(0, this.fragment.lastIndexOf(path));
    };
    NavigationInstruction.prototype._commitChanges = function _commitChanges(waitToSwap) {
      var _this = this;
      var router = this.router;
      router.currentInstruction = this;
      if (this.previousInstruction) {
        this.previousInstruction.config.navModel.isActive = false;
      }
      this.config.navModel.isActive = true;
      router._refreshBaseUrl();
      router.refreshNavigation();
      var loads = [];
      var delaySwaps = [];
      var _loop = function _loop(viewPortName) {
        var viewPortInstruction = _this.viewPortInstructions[viewPortName];
        var viewPort = router.viewPorts[viewPortName];
        if (!viewPort) {
          throw new Error('There was no router-view found in the view for ' + viewPortInstruction.moduleId + '.');
        }
        if (viewPortInstruction.strategy === activationStrategy.replace) {
          if (waitToSwap) {
            delaySwaps.push({
              viewPort: viewPort,
              viewPortInstruction: viewPortInstruction
            });
          }
          loads.push(viewPort.process(viewPortInstruction, waitToSwap).then(function(x) {
            if (viewPortInstruction.childNavigationInstruction) {
              return viewPortInstruction.childNavigationInstruction._commitChanges();
            }
          }));
        } else {
          if (viewPortInstruction.childNavigationInstruction) {
            loads.push(viewPortInstruction.childNavigationInstruction._commitChanges(waitToSwap));
          }
        }
      };
      for (var viewPortName in this.viewPortInstructions) {
        _loop(viewPortName);
      }
      return Promise.all(loads).then(function() {
        delaySwaps.forEach(function(x) {
          return x.viewPort.swap(x.viewPortInstruction);
        });
        return null;
      }).then(function() {
        return prune(_this);
      });
    };
    NavigationInstruction.prototype._updateTitle = function _updateTitle() {
      var title = this._buildTitle();
      if (title) {
        this.router.history.setTitle(title);
      }
    };
    NavigationInstruction.prototype._buildTitle = function _buildTitle() {
      var separator = arguments.length <= 0 || arguments[0] === undefined ? ' | ' : arguments[0];
      var title = this.config.navModel.title || '';
      var childTitles = [];
      for (var viewPortName in this.viewPortInstructions) {
        var _viewPortInstruction = this.viewPortInstructions[viewPortName];
        if (_viewPortInstruction.childNavigationInstruction) {
          var childTitle = _viewPortInstruction.childNavigationInstruction._buildTitle(separator);
          if (childTitle) {
            childTitles.push(childTitle);
          }
        }
      }
      if (childTitles.length) {
        title = childTitles.join(separator) + (title ? separator : '') + title;
      }
      if (this.router.title) {
        title += (title ? separator : '') + this.router.title;
      }
      return title;
    };
    return NavigationInstruction;
  }();
  function prune(instruction) {
    instruction.previousInstruction = null;
    instruction.plan = null;
  }
  var NavModel = exports.NavModel = function() {
    function NavModel(router, relativeHref) {
      _classCallCheck(this, NavModel);
      this.isActive = false;
      this.title = null;
      this.href = null;
      this.relativeHref = null;
      this.settings = {};
      this.config = null;
      this.router = router;
      this.relativeHref = relativeHref;
    }
    NavModel.prototype.setTitle = function setTitle(title) {
      this.title = title;
      if (this.isActive) {
        this.router.updateTitle();
      }
    };
    return NavModel;
  }();
  function isNavigationCommand(obj) {
    return obj && typeof obj.navigate === 'function';
  }
  var Redirect = exports.Redirect = function() {
    function Redirect(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, Redirect);
      this.url = url;
      this.options = Object.assign({
        trigger: true,
        replace: true
      }, options);
      this.shouldContinueProcessing = false;
    }
    Redirect.prototype.setRouter = function setRouter(router) {
      this.router = router;
    };
    Redirect.prototype.navigate = function navigate(appRouter) {
      var navigatingRouter = this.options.useAppRouter ? appRouter : this.router || appRouter;
      navigatingRouter.navigate(this.url, this.options);
    };
    return Redirect;
  }();
  var RedirectToRoute = exports.RedirectToRoute = function() {
    function RedirectToRoute(route) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      _classCallCheck(this, RedirectToRoute);
      this.route = route;
      this.params = params;
      this.options = Object.assign({
        trigger: true,
        replace: true
      }, options);
      this.shouldContinueProcessing = false;
    }
    RedirectToRoute.prototype.setRouter = function setRouter(router) {
      this.router = router;
    };
    RedirectToRoute.prototype.navigate = function navigate(appRouter) {
      var navigatingRouter = this.options.useAppRouter ? appRouter : this.router || appRouter;
      navigatingRouter.navigateToRoute(this.route, this.params, this.options);
    };
    return RedirectToRoute;
  }();
  var RouterConfiguration = exports.RouterConfiguration = function() {
    function RouterConfiguration() {
      _classCallCheck(this, RouterConfiguration);
      this.instructions = [];
      this.options = {};
      this.pipelineSteps = [];
    }
    RouterConfiguration.prototype.addPipelineStep = function addPipelineStep(name, step) {
      this.pipelineSteps.push({
        name: name,
        step: step
      });
      return this;
    };
    RouterConfiguration.prototype.addAuthorizeStep = function addAuthorizeStep(step) {
      return this.addPipelineStep('authorize', step);
    };
    RouterConfiguration.prototype.addPreActivateStep = function addPreActivateStep(step) {
      return this.addPipelineStep('preActivate', step);
    };
    RouterConfiguration.prototype.addPreRenderStep = function addPreRenderStep(step) {
      return this.addPipelineStep('preRender', step);
    };
    RouterConfiguration.prototype.addPostRenderStep = function addPostRenderStep(step) {
      return this.addPipelineStep('postRender', step);
    };
    RouterConfiguration.prototype.map = function map(route) {
      if (Array.isArray(route)) {
        route.forEach(this.map.bind(this));
        return this;
      }
      return this.mapRoute(route);
    };
    RouterConfiguration.prototype.mapRoute = function mapRoute(config) {
      this.instructions.push(function(router) {
        var routeConfigs = [];
        if (Array.isArray(config.route)) {
          for (var i = 0,
              ii = config.route.length; i < ii; ++i) {
            var _current = Object.assign({}, config);
            _current.route = config.route[i];
            routeConfigs.push(_current);
          }
        } else {
          routeConfigs.push(Object.assign({}, config));
        }
        var navModel = void 0;
        for (var _i = 0,
            _ii = routeConfigs.length; _i < _ii; ++_i) {
          var routeConfig = routeConfigs[_i];
          routeConfig.settings = routeConfig.settings || {};
          if (!navModel) {
            navModel = router.createNavModel(routeConfig);
          }
          router.addRoute(routeConfig, navModel);
        }
      });
      return this;
    };
    RouterConfiguration.prototype.mapUnknownRoutes = function mapUnknownRoutes(config) {
      this.unknownRouteConfig = config;
      return this;
    };
    RouterConfiguration.prototype.exportToRouter = function exportToRouter(router) {
      var instructions = this.instructions;
      for (var i = 0,
          ii = instructions.length; i < ii; ++i) {
        instructions[i](router);
      }
      if (this.title) {
        router.title = this.title;
      }
      if (this.unknownRouteConfig) {
        router.handleUnknownRoutes(this.unknownRouteConfig);
      }
      router.options = this.options;
      var pipelineSteps = this.pipelineSteps;
      if (pipelineSteps.length) {
        if (!router.isRoot) {
          throw new Error('Pipeline steps can only be added to the root router');
        }
        var pipelineProvider = router.pipelineProvider;
        for (var _i2 = 0,
            _ii2 = pipelineSteps.length; _i2 < _ii2; ++_i2) {
          var _pipelineSteps$_i = pipelineSteps[_i2];
          var _name = _pipelineSteps$_i.name;
          var step = _pipelineSteps$_i.step;
          pipelineProvider.addStep(_name, step);
        }
      }
    };
    return RouterConfiguration;
  }();
  var activationStrategy = exports.activationStrategy = {
    noChange: 'no-change',
    invokeLifecycle: 'invoke-lifecycle',
    replace: 'replace'
  };
  var BuildNavigationPlanStep = exports.BuildNavigationPlanStep = function() {
    function BuildNavigationPlanStep() {
      _classCallCheck(this, BuildNavigationPlanStep);
    }
    BuildNavigationPlanStep.prototype.run = function run(navigationInstruction, next) {
      return _buildNavigationPlan(navigationInstruction).then(function(plan) {
        navigationInstruction.plan = plan;
        return next();
      }).catch(next.cancel);
    };
    return BuildNavigationPlanStep;
  }();
  function _buildNavigationPlan(instruction, forceLifecycleMinimum) {
    var prev = instruction.previousInstruction;
    var config = instruction.config;
    var plan = {};
    if ('redirect' in config) {
      var redirectLocation = _resolveUrl(config.redirect, getInstructionBaseUrl(instruction));
      if (instruction.queryString) {
        redirectLocation += '?' + instruction.queryString;
      }
      return Promise.reject(new Redirect(redirectLocation));
    }
    if (prev) {
      var newParams = hasDifferentParameterValues(prev, instruction);
      var pending = [];
      var _loop2 = function _loop2(viewPortName) {
        var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
        var nextViewPortConfig = config.viewPorts[viewPortName];
        if (!nextViewPortConfig)
          throw new Error('Invalid Route Config: Configuration for viewPort "' + viewPortName + '" was not found for route: "' + instruction.config.route + '."');
        var viewPortPlan = plan[viewPortName] = {
          name: viewPortName,
          config: nextViewPortConfig,
          prevComponent: prevViewPortInstruction.component,
          prevModuleId: prevViewPortInstruction.moduleId
        };
        if (prevViewPortInstruction.moduleId !== nextViewPortConfig.moduleId) {
          viewPortPlan.strategy = activationStrategy.replace;
        } else if ('determineActivationStrategy' in prevViewPortInstruction.component.viewModel) {
          var _prevViewPortInstruct;
          viewPortPlan.strategy = (_prevViewPortInstruct = prevViewPortInstruction.component.viewModel).determineActivationStrategy.apply(_prevViewPortInstruct, instruction.lifecycleArgs);
        } else if (config.activationStrategy) {
          viewPortPlan.strategy = config.activationStrategy;
        } else if (newParams || forceLifecycleMinimum) {
          viewPortPlan.strategy = activationStrategy.invokeLifecycle;
        } else {
          viewPortPlan.strategy = activationStrategy.noChange;
        }
        if (viewPortPlan.strategy !== activationStrategy.replace && prevViewPortInstruction.childRouter) {
          var path = instruction.getWildcardPath();
          var task = prevViewPortInstruction.childRouter._createNavigationInstruction(path, instruction).then(function(childInstruction) {
            viewPortPlan.childNavigationInstruction = childInstruction;
            return _buildNavigationPlan(childInstruction, viewPortPlan.strategy === activationStrategy.invokeLifecycle).then(function(childPlan) {
              childInstruction.plan = childPlan;
            });
          });
          pending.push(task);
        }
      };
      for (var viewPortName in prev.viewPortInstructions) {
        _loop2(viewPortName);
      }
      return Promise.all(pending).then(function() {
        return plan;
      });
    }
    for (var _viewPortName in config.viewPorts) {
      plan[_viewPortName] = {
        name: _viewPortName,
        strategy: activationStrategy.replace,
        config: instruction.config.viewPorts[_viewPortName]
      };
    }
    return Promise.resolve(plan);
  }
  function hasDifferentParameterValues(prev, next) {
    var prevParams = prev.params;
    var nextParams = next.params;
    var nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
    for (var key in nextParams) {
      if (key === nextWildCardName) {
        continue;
      }
      if (prevParams[key] !== nextParams[key]) {
        return true;
      }
    }
    for (var _key in prevParams) {
      if (_key === nextWildCardName) {
        continue;
      }
      if (prevParams[_key] !== nextParams[_key]) {
        return true;
      }
    }
    if (!next.options.compareQueryParams) {
      return false;
    }
    var prevQueryParams = prev.queryParams;
    var nextQueryParams = next.queryParams;
    for (var _key2 in nextQueryParams) {
      if (prevQueryParams[_key2] !== nextQueryParams[_key2]) {
        return true;
      }
    }
    for (var _key3 in prevQueryParams) {
      if (prevQueryParams[_key3] !== nextQueryParams[_key3]) {
        return true;
      }
    }
    return false;
  }
  function getInstructionBaseUrl(instruction) {
    var instructionBaseUrlParts = [];
    instruction = instruction.parentInstruction;
    while (instruction) {
      instructionBaseUrlParts.unshift(instruction.getBaseUrl());
      instruction = instruction.parentInstruction;
    }
    instructionBaseUrlParts.unshift('/');
    return instructionBaseUrlParts.join('');
  }
  var Router = exports.Router = function() {
    function Router(container, history) {
      _classCallCheck(this, Router);
      this.parent = null;
      this.options = {};
      this.container = container;
      this.history = history;
      this.reset();
    }
    Router.prototype.reset = function reset() {
      var _this2 = this;
      this.viewPorts = {};
      this.routes = [];
      this.baseUrl = '';
      this.isConfigured = false;
      this.isNavigating = false;
      this.navigation = [];
      this.currentInstruction = null;
      this._fallbackOrder = 100;
      this._recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
      this._childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
      this._configuredPromise = new Promise(function(resolve) {
        _this2._resolveConfiguredPromise = resolve;
      });
    };
    Router.prototype.registerViewPort = function registerViewPort(viewPort, name) {
      name = name || 'default';
      this.viewPorts[name] = viewPort;
    };
    Router.prototype.ensureConfigured = function ensureConfigured() {
      return this._configuredPromise;
    };
    Router.prototype.configure = function configure(callbackOrConfig) {
      var _this3 = this;
      this.isConfigured = true;
      var result = callbackOrConfig;
      var config = void 0;
      if (typeof callbackOrConfig === 'function') {
        config = new RouterConfiguration();
        result = callbackOrConfig(config);
      }
      return Promise.resolve(result).then(function(c) {
        if (c && c.exportToRouter) {
          config = c;
        }
        config.exportToRouter(_this3);
        _this3.isConfigured = true;
        _this3._resolveConfiguredPromise();
      });
    };
    Router.prototype.navigate = function navigate(fragment, options) {
      if (!this.isConfigured && this.parent) {
        return this.parent.navigate(fragment, options);
      }
      return this.history.navigate(_resolveUrl(fragment, this.baseUrl, this.history._hasPushState), options);
    };
    Router.prototype.navigateToRoute = function navigateToRoute(route, params, options) {
      var path = this.generate(route, params);
      return this.navigate(path, options);
    };
    Router.prototype.navigateBack = function navigateBack() {
      this.history.navigateBack();
    };
    Router.prototype.createChild = function createChild(container) {
      var childRouter = new Router(container || this.container.createChild(), this.history);
      childRouter.parent = this;
      return childRouter;
    };
    Router.prototype.generate = function generate(name, params) {
      var hasRoute = this._recognizer.hasRoute(name);
      if ((!this.isConfigured || !hasRoute) && this.parent) {
        return this.parent.generate(name, params);
      }
      if (!hasRoute) {
        throw new Error('A route with name \'' + name + '\' could not be found. Check that `name: \'' + name + '\'` was specified in the route\'s config.');
      }
      var path = this._recognizer.generate(name, params);
      return _createRootedPath(path, this.baseUrl, this.history._hasPushState);
    };
    Router.prototype.createNavModel = function createNavModel(config) {
      var navModel = new NavModel(this, 'href' in config ? config.href : config.route);
      navModel.title = config.title;
      navModel.order = config.nav;
      navModel.href = config.href;
      navModel.settings = config.settings;
      navModel.config = config;
      return navModel;
    };
    Router.prototype.addRoute = function addRoute(config, navModel) {
      validateRouteConfig(config);
      if (!('viewPorts' in config) && !config.navigationStrategy) {
        config.viewPorts = {'default': {
            moduleId: config.moduleId,
            view: config.view
          }};
      }
      if (!navModel) {
        navModel = this.createNavModel(config);
      }
      this.routes.push(config);
      var path = config.route;
      if (path.charAt(0) === '/') {
        path = path.substr(1);
      }
      var state = this._recognizer.add({
        path: path,
        handler: config
      });
      if (path) {
        var _settings = config.settings;
        delete config.settings;
        var withChild = JSON.parse(JSON.stringify(config));
        config.settings = _settings;
        withChild.route = path + '/*childRoute';
        withChild.hasChildRouter = true;
        this._childRecognizer.add({
          path: withChild.route,
          handler: withChild
        });
        withChild.navModel = navModel;
        withChild.settings = config.settings;
      }
      config.navModel = navModel;
      if ((navModel.order || navModel.order === 0) && this.navigation.indexOf(navModel) === -1) {
        if (!navModel.href && navModel.href !== '' && (state.types.dynamics || state.types.stars)) {
          throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
        }
        if (typeof navModel.order !== 'number') {
          navModel.order = ++this._fallbackOrder;
        }
        this.navigation.push(navModel);
        this.navigation = this.navigation.sort(function(a, b) {
          return a.order - b.order;
        });
      }
    };
    Router.prototype.hasRoute = function hasRoute(name) {
      return !!(this._recognizer.hasRoute(name) || this.parent && this.parent.hasRoute(name));
    };
    Router.prototype.hasOwnRoute = function hasOwnRoute(name) {
      return this._recognizer.hasRoute(name);
    };
    Router.prototype.handleUnknownRoutes = function handleUnknownRoutes(config) {
      var _this4 = this;
      if (!config) {
        throw new Error('Invalid unknown route handler');
      }
      this.catchAllHandler = function(instruction) {
        return _this4._createRouteConfig(config, instruction).then(function(c) {
          instruction.config = c;
          return instruction;
        });
      };
    };
    Router.prototype.updateTitle = function updateTitle() {
      if (this.parent) {
        return this.parent.updateTitle();
      }
      this.currentInstruction._updateTitle();
    };
    Router.prototype.refreshNavigation = function refreshNavigation() {
      var nav = this.navigation;
      for (var i = 0,
          length = nav.length; i < length; i++) {
        var _current2 = nav[i];
        if (!_current2.href) {
          _current2.href = _createRootedPath(_current2.relativeHref, this.baseUrl, this.history._hasPushState);
        }
      }
    };
    Router.prototype._refreshBaseUrl = function _refreshBaseUrl() {
      if (this.parent) {
        var baseUrl = this.parent.currentInstruction.getBaseUrl();
        this.baseUrl = this.parent.baseUrl + baseUrl;
      }
    };
    Router.prototype._createNavigationInstruction = function _createNavigationInstruction() {
      var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var parentInstruction = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var fragment = url;
      var queryString = '';
      var queryIndex = url.indexOf('?');
      if (queryIndex !== -1) {
        fragment = url.substr(0, queryIndex);
        queryString = url.substr(queryIndex + 1);
      }
      var results = this._recognizer.recognize(url);
      if (!results || !results.length) {
        results = this._childRecognizer.recognize(url);
      }
      var instructionInit = {
        fragment: fragment,
        queryString: queryString,
        config: null,
        parentInstruction: parentInstruction,
        previousInstruction: this.currentInstruction,
        router: this,
        options: {compareQueryParams: this.options.compareQueryParams}
      };
      if (results && results.length) {
        var first = results[0];
        var _instruction = new NavigationInstruction(Object.assign({}, instructionInit, {
          params: first.params,
          queryParams: first.queryParams || results.queryParams,
          config: first.config || first.handler
        }));
        if (typeof first.handler === 'function') {
          return evaluateNavigationStrategy(_instruction, first.handler, first);
        } else if (first.handler && 'navigationStrategy' in first.handler) {
          return evaluateNavigationStrategy(_instruction, first.handler.navigationStrategy, first.handler);
        }
        return Promise.resolve(_instruction);
      } else if (this.catchAllHandler) {
        var _instruction2 = new NavigationInstruction(Object.assign({}, instructionInit, {
          params: {path: fragment},
          queryParams: results && results.queryParams,
          config: null
        }));
        return evaluateNavigationStrategy(_instruction2, this.catchAllHandler);
      }
      return Promise.reject(new Error('Route not found: ' + url));
    };
    Router.prototype._createRouteConfig = function _createRouteConfig(config, instruction) {
      var _this5 = this;
      return Promise.resolve(config).then(function(c) {
        if (typeof c === 'string') {
          return {moduleId: c};
        } else if (typeof c === 'function') {
          return c(instruction);
        }
        return c;
      }).then(function(c) {
        return typeof c === 'string' ? {moduleId: c} : c;
      }).then(function(c) {
        c.route = instruction.params.path;
        validateRouteConfig(c);
        if (!c.navModel) {
          c.navModel = _this5.createNavModel(c);
        }
        return c;
      });
    };
    _createClass(Router, [{
      key: 'isRoot',
      get: function get() {
        return !this.parent;
      }
    }]);
    return Router;
  }();
  function validateRouteConfig(config) {
    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      throw new Error('Invalid Route Config');
    }
    if (typeof config.route !== 'string') {
      throw new Error('Invalid Route Config: You must specify a route pattern.');
    }
    if (!('redirect' in config || config.moduleId || config.navigationStrategy || config.viewPorts)) {
      throw new Error('Invalid Route Config: You must specify a moduleId, redirect, navigationStrategy, or viewPorts.');
    }
  }
  function evaluateNavigationStrategy(instruction, evaluator, context) {
    return Promise.resolve(evaluator.call(context, instruction)).then(function() {
      if (!('viewPorts' in instruction.config)) {
        instruction.config.viewPorts = {'default': {moduleId: instruction.config.moduleId}};
      }
      return instruction;
    });
  }
  var CanDeactivatePreviousStep = exports.CanDeactivatePreviousStep = function() {
    function CanDeactivatePreviousStep() {
      _classCallCheck(this, CanDeactivatePreviousStep);
    }
    CanDeactivatePreviousStep.prototype.run = function run(navigationInstruction, next) {
      return processDeactivatable(navigationInstruction.plan, 'canDeactivate', next);
    };
    return CanDeactivatePreviousStep;
  }();
  var CanActivateNextStep = exports.CanActivateNextStep = function() {
    function CanActivateNextStep() {
      _classCallCheck(this, CanActivateNextStep);
    }
    CanActivateNextStep.prototype.run = function run(navigationInstruction, next) {
      return processActivatable(navigationInstruction, 'canActivate', next);
    };
    return CanActivateNextStep;
  }();
  var DeactivatePreviousStep = exports.DeactivatePreviousStep = function() {
    function DeactivatePreviousStep() {
      _classCallCheck(this, DeactivatePreviousStep);
    }
    DeactivatePreviousStep.prototype.run = function run(navigationInstruction, next) {
      return processDeactivatable(navigationInstruction.plan, 'deactivate', next, true);
    };
    return DeactivatePreviousStep;
  }();
  var ActivateNextStep = exports.ActivateNextStep = function() {
    function ActivateNextStep() {
      _classCallCheck(this, ActivateNextStep);
    }
    ActivateNextStep.prototype.run = function run(navigationInstruction, next) {
      return processActivatable(navigationInstruction, 'activate', next, true);
    };
    return ActivateNextStep;
  }();
  function processDeactivatable(plan, callbackName, next, ignoreResult) {
    var infos = findDeactivatable(plan, callbackName);
    var i = infos.length;
    function inspect(val) {
      if (ignoreResult || shouldContinue(val)) {
        return iterate();
      }
      return next.cancel(val);
    }
    function iterate() {
      if (i--) {
        try {
          var viewModel = infos[i];
          var _result = viewModel[callbackName]();
          return processPotential(_result, inspect, next.cancel);
        } catch (error) {
          return next.cancel(error);
        }
      }
      return next();
    }
    return iterate();
  }
  function findDeactivatable(plan, callbackName) {
    var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    for (var viewPortName in plan) {
      var _viewPortPlan = plan[viewPortName];
      var prevComponent = _viewPortPlan.prevComponent;
      if ((_viewPortPlan.strategy === activationStrategy.invokeLifecycle || _viewPortPlan.strategy === activationStrategy.replace) && prevComponent) {
        var viewModel = prevComponent.viewModel;
        if (callbackName in viewModel) {
          list.push(viewModel);
        }
      }
      if (_viewPortPlan.childNavigationInstruction) {
        findDeactivatable(_viewPortPlan.childNavigationInstruction.plan, callbackName, list);
      } else if (prevComponent) {
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
    return list;
  }
  function addPreviousDeactivatable(component, callbackName, list) {
    var childRouter = component.childRouter;
    if (childRouter && childRouter.currentInstruction) {
      var viewPortInstructions = childRouter.currentInstruction.viewPortInstructions;
      for (var viewPortName in viewPortInstructions) {
        var _viewPortInstruction2 = viewPortInstructions[viewPortName];
        var prevComponent = _viewPortInstruction2.component;
        var prevViewModel = prevComponent.viewModel;
        if (callbackName in prevViewModel) {
          list.push(prevViewModel);
        }
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
  }
  function processActivatable(navigationInstruction, callbackName, next, ignoreResult) {
    var infos = findActivatable(navigationInstruction, callbackName);
    var length = infos.length;
    var i = -1;
    function inspect(val, router) {
      if (ignoreResult || shouldContinue(val, router)) {
        return iterate();
      }
      return next.cancel(val);
    }
    function iterate() {
      i++;
      if (i < length) {
        try {
          var _ret3 = function() {
            var _current$viewModel;
            var current = infos[i];
            var result = (_current$viewModel = current.viewModel)[callbackName].apply(_current$viewModel, current.lifecycleArgs);
            return {v: processPotential(result, function(val) {
                return inspect(val, current.router);
              }, next.cancel)};
          }();
          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object")
            return _ret3.v;
        } catch (error) {
          return next.cancel(error);
        }
      }
      return next();
    }
    return iterate();
  }
  function findActivatable(navigationInstruction, callbackName) {
    var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    var router = arguments[3];
    var plan = navigationInstruction.plan;
    Object.keys(plan).filter(function(viewPortName) {
      var viewPortPlan = plan[viewPortName];
      var viewPortInstruction = navigationInstruction.viewPortInstructions[viewPortName];
      var viewModel = viewPortInstruction.component.viewModel;
      if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && callbackName in viewModel) {
        list.push({
          viewModel: viewModel,
          lifecycleArgs: viewPortInstruction.lifecycleArgs,
          router: router
        });
      }
      if (viewPortPlan.childNavigationInstruction) {
        findActivatable(viewPortPlan.childNavigationInstruction, callbackName, list, viewPortInstruction.component.childRouter || router);
      }
    });
    return list;
  }
  function shouldContinue(output, router) {
    if (output instanceof Error) {
      return false;
    }
    if (isNavigationCommand(output)) {
      if (typeof output.setRouter === 'function') {
        output.setRouter(router);
      }
      return !!output.shouldContinueProcessing;
    }
    if (output === undefined) {
      return true;
    }
    return output;
  }
  function processPotential(obj, resolve, reject) {
    if (obj && typeof obj.then === 'function') {
      return Promise.resolve(obj).then(resolve).catch(reject);
    }
    try {
      return resolve(obj);
    } catch (error) {
      return reject(error);
    }
  }
  var RouteLoader = exports.RouteLoader = function() {
    function RouteLoader() {
      _classCallCheck(this, RouteLoader);
    }
    RouteLoader.prototype.loadRoute = function loadRoute(router, config, navigationInstruction) {
      throw Error('Route loaders must implement "loadRoute(router, config, navigationInstruction)".');
    };
    return RouteLoader;
  }();
  var LoadRouteStep = exports.LoadRouteStep = function() {
    LoadRouteStep.inject = function inject() {
      return [RouteLoader];
    };
    function LoadRouteStep(routeLoader) {
      _classCallCheck(this, LoadRouteStep);
      this.routeLoader = routeLoader;
    }
    LoadRouteStep.prototype.run = function run(navigationInstruction, next) {
      return loadNewRoute(this.routeLoader, navigationInstruction).then(next).catch(next.cancel);
    };
    return LoadRouteStep;
  }();
  function loadNewRoute(routeLoader, navigationInstruction) {
    var toLoad = determineWhatToLoad(navigationInstruction);
    var loadPromises = toLoad.map(function(current) {
      return loadRoute(routeLoader, current.navigationInstruction, current.viewPortPlan);
    });
    return Promise.all(loadPromises);
  }
  function determineWhatToLoad(navigationInstruction) {
    var toLoad = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var plan = navigationInstruction.plan;
    for (var viewPortName in plan) {
      var _viewPortPlan2 = plan[viewPortName];
      if (_viewPortPlan2.strategy === activationStrategy.replace) {
        toLoad.push({
          viewPortPlan: _viewPortPlan2,
          navigationInstruction: navigationInstruction
        });
        if (_viewPortPlan2.childNavigationInstruction) {
          determineWhatToLoad(_viewPortPlan2.childNavigationInstruction, toLoad);
        }
      } else {
        var _viewPortInstruction3 = navigationInstruction.addViewPortInstruction(viewPortName, _viewPortPlan2.strategy, _viewPortPlan2.prevModuleId, _viewPortPlan2.prevComponent);
        if (_viewPortPlan2.childNavigationInstruction) {
          _viewPortInstruction3.childNavigationInstruction = _viewPortPlan2.childNavigationInstruction;
          determineWhatToLoad(_viewPortPlan2.childNavigationInstruction, toLoad);
        }
      }
    }
    return toLoad;
  }
  function loadRoute(routeLoader, navigationInstruction, viewPortPlan) {
    var moduleId = viewPortPlan.config.moduleId;
    return loadComponent(routeLoader, navigationInstruction, viewPortPlan.config).then(function(component) {
      var viewPortInstruction = navigationInstruction.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
      var childRouter = component.childRouter;
      if (childRouter) {
        var path = navigationInstruction.getWildcardPath();
        return childRouter._createNavigationInstruction(path, navigationInstruction).then(function(childInstruction) {
          viewPortPlan.childNavigationInstruction = childInstruction;
          return _buildNavigationPlan(childInstruction).then(function(childPlan) {
            childInstruction.plan = childPlan;
            viewPortInstruction.childNavigationInstruction = childInstruction;
            return loadNewRoute(routeLoader, childInstruction);
          });
        });
      }
    });
  }
  function loadComponent(routeLoader, navigationInstruction, config) {
    var router = navigationInstruction.router;
    var lifecycleArgs = navigationInstruction.lifecycleArgs;
    return routeLoader.loadRoute(router, config, navigationInstruction).then(function(component) {
      var viewModel = component.viewModel;
      var childContainer = component.childContainer;
      component.router = router;
      component.config = config;
      if ('configureRouter' in viewModel) {
        var _ret4 = function() {
          var childRouter = childContainer.getChildRouter();
          component.childRouter = childRouter;
          return {v: childRouter.configure(function(c) {
              return viewModel.configureRouter.apply(viewModel, [c, childRouter].concat(lifecycleArgs));
            }).then(function() {
              return component;
            })};
        }();
        if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object")
          return _ret4.v;
      }
      return component;
    });
  }
  var PipelineProvider = exports.PipelineProvider = function() {
    PipelineProvider.inject = function inject() {
      return [_aureliaDependencyInjection.Container];
    };
    function PipelineProvider(container) {
      _classCallCheck(this, PipelineProvider);
      this.container = container;
      this.steps = [BuildNavigationPlanStep, CanDeactivatePreviousStep, LoadRouteStep, this._createPipelineSlot('authorize'), CanActivateNextStep, this._createPipelineSlot('preActivate', 'modelbind'), DeactivatePreviousStep, ActivateNextStep, this._createPipelineSlot('preRender', 'precommit'), CommitChangesStep, this._createPipelineSlot('postRender', 'postcomplete')];
    }
    PipelineProvider.prototype.createPipeline = function createPipeline() {
      var _this6 = this;
      var pipeline = new Pipeline();
      this.steps.forEach(function(step) {
        return pipeline.addStep(_this6.container.get(step));
      });
      return pipeline;
    };
    PipelineProvider.prototype.addStep = function addStep(name, step) {
      var found = this.steps.find(function(x) {
        return x.slotName === name || x.slotAlias === name;
      });
      if (found) {
        found.steps.push(step);
      } else {
        throw new Error('Invalid pipeline slot name: ' + name + '.');
      }
    };
    PipelineProvider.prototype._createPipelineSlot = function _createPipelineSlot(name, alias) {
      var _class6,
          _temp;
      var PipelineSlot = (_temp = _class6 = function() {
        function PipelineSlot(container) {
          _classCallCheck(this, PipelineSlot);
          this.container = container;
        }
        PipelineSlot.prototype.getSteps = function getSteps() {
          var _this7 = this;
          return PipelineSlot.steps.map(function(x) {
            return _this7.container.get(x);
          });
        };
        return PipelineSlot;
      }(), _class6.inject = [_aureliaDependencyInjection.Container], _class6.slotName = name, _class6.slotAlias = alias, _class6.steps = [], _temp);
      return PipelineSlot;
    };
    return PipelineProvider;
  }();
  var logger = LogManager.getLogger('app-router');
  var AppRouter = exports.AppRouter = function(_Router) {
    _inherits(AppRouter, _Router);
    AppRouter.inject = function inject() {
      return [_aureliaDependencyInjection.Container, _aureliaHistory.History, PipelineProvider, _aureliaEventAggregator.EventAggregator];
    };
    function AppRouter(container, history, pipelineProvider, events) {
      _classCallCheck(this, AppRouter);
      var _this8 = _possibleConstructorReturn(this, _Router.call(this, container, history));
      _this8.pipelineProvider = pipelineProvider;
      _this8.events = events;
      return _this8;
    }
    AppRouter.prototype.reset = function reset() {
      _Router.prototype.reset.call(this);
      this.maxInstructionCount = 10;
      if (!this._queue) {
        this._queue = [];
      } else {
        this._queue.length = 0;
      }
    };
    AppRouter.prototype.loadUrl = function loadUrl(url) {
      var _this9 = this;
      return this._createNavigationInstruction(url).then(function(instruction) {
        return _this9._queueInstruction(instruction);
      }).catch(function(error) {
        logger.error(error);
        restorePreviousLocation(_this9);
      });
    };
    AppRouter.prototype.registerViewPort = function registerViewPort(viewPort, name) {
      var _this10 = this;
      _Router.prototype.registerViewPort.call(this, viewPort, name);
      if (!this.isActive) {
        var _ret5 = function() {
          var viewModel = _this10._findViewModel(viewPort);
          if ('configureRouter' in viewModel) {
            if (!_this10.isConfigured) {
              var _ret6 = function() {
                var resolveConfiguredPromise = _this10._resolveConfiguredPromise;
                _this10._resolveConfiguredPromise = function() {};
                return {v: {v: _this10.configure(function(config) {
                      return viewModel.configureRouter(config, _this10);
                    }).then(function() {
                      _this10.activate();
                      resolveConfiguredPromise();
                    })}};
              }();
              if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object")
                return _ret6.v;
            }
          } else {
            _this10.activate();
          }
        }();
        if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object")
          return _ret5.v;
      } else {
        this._dequeueInstruction();
      }
      return Promise.resolve();
    };
    AppRouter.prototype.activate = function activate(options) {
      if (this.isActive) {
        return;
      }
      this.isActive = true;
      this.options = Object.assign({routeHandler: this.loadUrl.bind(this)}, this.options, options);
      this.history.activate(this.options);
      this._dequeueInstruction();
    };
    AppRouter.prototype.deactivate = function deactivate() {
      this.isActive = false;
      this.history.deactivate();
    };
    AppRouter.prototype._queueInstruction = function _queueInstruction(instruction) {
      var _this11 = this;
      return new Promise(function(resolve) {
        instruction.resolve = resolve;
        _this11._queue.unshift(instruction);
        _this11._dequeueInstruction();
      });
    };
    AppRouter.prototype._dequeueInstruction = function _dequeueInstruction() {
      var _this12 = this;
      var instructionCount = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      return Promise.resolve().then(function() {
        if (_this12.isNavigating && !instructionCount) {
          return undefined;
        }
        var instruction = _this12._queue.shift();
        _this12._queue.length = 0;
        if (!instruction) {
          return undefined;
        }
        _this12.isNavigating = true;
        instruction.previousInstruction = _this12.currentInstruction;
        if (!instructionCount) {
          _this12.events.publish('router:navigation:processing', {instruction: instruction});
        } else if (instructionCount === _this12.maxInstructionCount - 1) {
          logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
          restorePreviousLocation(_this12);
          return _this12._dequeueInstruction(instructionCount + 1);
        } else if (instructionCount > _this12.maxInstructionCount) {
          throw new Error('Maximum navigation attempts exceeded. Giving up.');
        }
        var pipeline = _this12.pipelineProvider.createPipeline();
        return pipeline.run(instruction).then(function(result) {
          return processResult(instruction, result, instructionCount, _this12);
        }).catch(function(error) {
          return {output: error instanceof Error ? error : new Error(error)};
        }).then(function(result) {
          return resolveInstruction(instruction, result, !!instructionCount, _this12);
        });
      });
    };
    AppRouter.prototype._findViewModel = function _findViewModel(viewPort) {
      if (this.container.viewModel) {
        return this.container.viewModel;
      }
      if (viewPort.container) {
        var container = viewPort.container;
        while (container) {
          if (container.viewModel) {
            this.container.viewModel = container.viewModel;
            return container.viewModel;
          }
          container = container.parent;
        }
      }
    };
    return AppRouter;
  }(Router);
  function processResult(instruction, result, instructionCount, router) {
    if (!(result && 'completed' in result && 'output' in result)) {
      result = result || {};
      result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
    }
    var finalResult = null;
    if (isNavigationCommand(result.output)) {
      result.output.navigate(router);
    } else {
      finalResult = result;
      if (!result.completed) {
        if (result.output instanceof Error) {
          logger.error(result.output);
        }
        restorePreviousLocation(router);
      }
    }
    return router._dequeueInstruction(instructionCount + 1).then(function(innerResult) {
      return finalResult || innerResult || result;
    });
  }
  function resolveInstruction(instruction, result, isInnerInstruction, router) {
    instruction.resolve(result);
    if (!isInnerInstruction) {
      router.isNavigating = false;
      var eventArgs = {
        instruction: instruction,
        result: result
      };
      var eventName = void 0;
      if (result.output instanceof Error) {
        eventName = 'error';
      } else if (!result.completed) {
        eventName = 'canceled';
      } else {
        var _queryString = instruction.queryString ? '?' + instruction.queryString : '';
        router.history.previousLocation = instruction.fragment + _queryString;
        eventName = 'success';
      }
      router.events.publish('router:navigation:' + eventName, eventArgs);
      router.events.publish('router:navigation:complete', eventArgs);
    }
    return result;
  }
  function restorePreviousLocation(router) {
    var previousLocation = router.history.previousLocation;
    if (previousLocation) {
      router.navigate(router.history.previousLocation, {
        trigger: false,
        replace: true
      });
    } else {
      logger.error('Router navigation failed, and no previous location could be restored.');
    }
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-router@1.0.0-beta.1.2.1", ["npm:aurelia-router@1.0.0-beta.1.2.1/aurelia-router"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer", ["exports", "npm:aurelia-path@1.0.0-beta.1.2.1"], function(exports, _aureliaPath) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RouteRecognizer = exports.EpsilonSegment = exports.StarSegment = exports.DynamicSegment = exports.StaticSegment = exports.State = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var State = exports.State = function() {
    function State(charSpec) {
      _classCallCheck(this, State);
      this.charSpec = charSpec;
      this.nextStates = [];
    }
    State.prototype.get = function get(charSpec) {
      for (var _iterator = this.nextStates,
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
        var _ref;
        if (_isArray) {
          if (_i >= _iterator.length)
            break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done)
            break;
          _ref = _i.value;
        }
        var child = _ref;
        var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;
        if (isEqual) {
          return child;
        }
      }
    };
    State.prototype.put = function put(charSpec) {
      var state = this.get(charSpec);
      if (state) {
        return state;
      }
      state = new State(charSpec);
      this.nextStates.push(state);
      if (charSpec.repeat) {
        state.nextStates.push(state);
      }
      return state;
    };
    State.prototype.match = function match(ch) {
      var nextStates = this.nextStates;
      var results = [];
      for (var i = 0,
          l = nextStates.length; i < l; i++) {
        var child = nextStates[i];
        var charSpec = child.charSpec;
        if (charSpec.validChars !== undefined) {
          if (charSpec.validChars.indexOf(ch) !== -1) {
            results.push(child);
          }
        } else if (charSpec.invalidChars !== undefined) {
          if (charSpec.invalidChars.indexOf(ch) === -1) {
            results.push(child);
          }
        }
      }
      return results;
    };
    return State;
  }();
  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
  var StaticSegment = exports.StaticSegment = function() {
    function StaticSegment(string) {
      _classCallCheck(this, StaticSegment);
      this.string = string;
    }
    StaticSegment.prototype.eachChar = function eachChar(callback) {
      var s = this.string;
      for (var i = 0,
          ii = s.length; i < ii; ++i) {
        var ch = s[i];
        callback({validChars: ch});
      }
    };
    StaticSegment.prototype.regex = function regex() {
      return this.string.replace(escapeRegex, '\\$1');
    };
    StaticSegment.prototype.generate = function generate() {
      return this.string;
    };
    return StaticSegment;
  }();
  var DynamicSegment = exports.DynamicSegment = function() {
    function DynamicSegment(name) {
      _classCallCheck(this, DynamicSegment);
      this.name = name;
    }
    DynamicSegment.prototype.eachChar = function eachChar(callback) {
      callback({
        invalidChars: '/',
        repeat: true
      });
    };
    DynamicSegment.prototype.regex = function regex() {
      return '([^/]+)';
    };
    DynamicSegment.prototype.generate = function generate(params, consumed) {
      consumed[this.name] = true;
      return params[this.name];
    };
    return DynamicSegment;
  }();
  var StarSegment = exports.StarSegment = function() {
    function StarSegment(name) {
      _classCallCheck(this, StarSegment);
      this.name = name;
    }
    StarSegment.prototype.eachChar = function eachChar(callback) {
      callback({
        invalidChars: '',
        repeat: true
      });
    };
    StarSegment.prototype.regex = function regex() {
      return '(.+)';
    };
    StarSegment.prototype.generate = function generate(params, consumed) {
      consumed[this.name] = true;
      return params[this.name];
    };
    return StarSegment;
  }();
  var EpsilonSegment = exports.EpsilonSegment = function() {
    function EpsilonSegment() {
      _classCallCheck(this, EpsilonSegment);
    }
    EpsilonSegment.prototype.eachChar = function eachChar() {};
    EpsilonSegment.prototype.regex = function regex() {
      return '';
    };
    EpsilonSegment.prototype.generate = function generate() {
      return '';
    };
    return EpsilonSegment;
  }();
  var RouteRecognizer = exports.RouteRecognizer = function() {
    function RouteRecognizer() {
      _classCallCheck(this, RouteRecognizer);
      this.rootState = new State();
      this.names = {};
    }
    RouteRecognizer.prototype.add = function add(route) {
      var _this = this;
      if (Array.isArray(route)) {
        route.forEach(function(r) {
          return _this.add(r);
        });
        return undefined;
      }
      var currentState = this.rootState;
      var regex = '^';
      var types = {
        statics: 0,
        dynamics: 0,
        stars: 0
      };
      var names = [];
      var routeName = route.handler.name;
      var isEmpty = true;
      var segments = parse(route.path, names, types);
      for (var i = 0,
          ii = segments.length; i < ii; i++) {
        var segment = segments[i];
        if (segment instanceof EpsilonSegment) {
          continue;
        }
        isEmpty = false;
        currentState = currentState.put({validChars: '/'});
        regex += '/';
        currentState = addSegment(currentState, segment);
        regex += segment.regex();
      }
      if (isEmpty) {
        currentState = currentState.put({validChars: '/'});
        regex += '/';
      }
      var handlers = [{
        handler: route.handler,
        names: names
      }];
      if (routeName) {
        var routeNames = Array.isArray(routeName) ? routeName : [routeName];
        for (var _i2 = 0; _i2 < routeNames.length; _i2++) {
          this.names[routeNames[_i2]] = {
            segments: segments,
            handlers: handlers
          };
        }
      }
      currentState.handlers = handlers;
      currentState.regex = new RegExp(regex + '$');
      currentState.types = types;
      return currentState;
    };
    RouteRecognizer.prototype.handlersFor = function handlersFor(name) {
      var route = this.names[name];
      if (!route) {
        throw new Error('There is no route named ' + name);
      }
      return [].concat(route.handlers);
    };
    RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
      return !!this.names[name];
    };
    RouteRecognizer.prototype.generate = function generate(name, params) {
      var routeParams = Object.assign({}, params);
      var route = this.names[name];
      if (!route) {
        throw new Error('There is no route named ' + name);
      }
      var segments = route.segments;
      var consumed = {};
      var output = '';
      for (var i = 0,
          l = segments.length; i < l; i++) {
        var segment = segments[i];
        if (segment instanceof EpsilonSegment) {
          continue;
        }
        output += '/';
        var segmentValue = segment.generate(routeParams, consumed);
        if (segmentValue === null || segmentValue === undefined) {
          throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
        }
        output += segmentValue;
      }
      if (output.charAt(0) !== '/') {
        output = '/' + output;
      }
      for (var param in consumed) {
        delete routeParams[param];
      }
      var queryString = (0, _aureliaPath.buildQueryString)(routeParams);
      output += queryString ? '?' + queryString : '';
      return output;
    };
    RouteRecognizer.prototype.recognize = function recognize(path) {
      var states = [this.rootState];
      var queryParams = {};
      var isSlashDropped = false;
      var normalizedPath = path;
      var queryStart = normalizedPath.indexOf('?');
      if (queryStart !== -1) {
        var queryString = normalizedPath.substr(queryStart + 1, normalizedPath.length);
        normalizedPath = normalizedPath.substr(0, queryStart);
        queryParams = (0, _aureliaPath.parseQueryString)(queryString);
      }
      normalizedPath = decodeURI(normalizedPath);
      if (normalizedPath.charAt(0) !== '/') {
        normalizedPath = '/' + normalizedPath;
      }
      var pathLen = normalizedPath.length;
      if (pathLen > 1 && normalizedPath.charAt(pathLen - 1) === '/') {
        normalizedPath = normalizedPath.substr(0, pathLen - 1);
        isSlashDropped = true;
      }
      for (var i = 0,
          l = normalizedPath.length; i < l; i++) {
        states = recognizeChar(states, normalizedPath.charAt(i));
        if (!states.length) {
          break;
        }
      }
      var solutions = [];
      for (var _i3 = 0,
          _l = states.length; _i3 < _l; _i3++) {
        if (states[_i3].handlers) {
          solutions.push(states[_i3]);
        }
      }
      states = sortSolutions(solutions);
      var state = solutions[0];
      if (state && state.handlers) {
        if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
          normalizedPath = normalizedPath + '/';
        }
        return findHandler(state, normalizedPath, queryParams);
      }
    };
    return RouteRecognizer;
  }();
  var RecognizeResults = function RecognizeResults(queryParams) {
    _classCallCheck(this, RecognizeResults);
    this.splice = Array.prototype.splice;
    this.slice = Array.prototype.slice;
    this.push = Array.prototype.push;
    this.length = 0;
    this.queryParams = queryParams || {};
  };
  function parse(route, names, types) {
    var normalizedRoute = route;
    if (route.charAt(0) === '/') {
      normalizedRoute = route.substr(1);
    }
    var results = [];
    var splitRoute = normalizedRoute.split('/');
    for (var i = 0,
        ii = splitRoute.length; i < ii; ++i) {
      var segment = splitRoute[i];
      var match = segment.match(/^:([^\/]+)$/);
      if (match) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        types.dynamics++;
        continue;
      }
      match = segment.match(/^\*([^\/]+)$/);
      if (match) {
        results.push(new StarSegment(match[1]));
        names.push(match[1]);
        types.stars++;
      } else if (segment === '') {
        results.push(new EpsilonSegment());
      } else {
        results.push(new StaticSegment(segment));
        types.statics++;
      }
    }
    return results;
  }
  function sortSolutions(states) {
    return states.sort(function(a, b) {
      if (a.types.stars !== b.types.stars) {
        return a.types.stars - b.types.stars;
      }
      if (a.types.stars) {
        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }
        if (a.types.dynamics !== b.types.dynamics) {
          return b.types.dynamics - a.types.dynamics;
        }
      }
      if (a.types.dynamics !== b.types.dynamics) {
        return a.types.dynamics - b.types.dynamics;
      }
      if (a.types.statics !== b.types.statics) {
        return b.types.statics - a.types.statics;
      }
      return 0;
    });
  }
  function recognizeChar(states, ch) {
    var nextStates = [];
    for (var i = 0,
        l = states.length; i < l; i++) {
      var state = states[i];
      nextStates.push.apply(nextStates, state.match(ch));
    }
    return nextStates;
  }
  function findHandler(state, path, queryParams) {
    var handlers = state.handlers;
    var regex = state.regex;
    var captures = path.match(regex);
    var currentCapture = 1;
    var result = new RecognizeResults(queryParams);
    for (var i = 0,
        l = handlers.length; i < l; i++) {
      var _handler = handlers[i];
      var _names = _handler.names;
      var _params = {};
      for (var j = 0,
          m = _names.length; j < m; j++) {
        _params[_names[j]] = captures[currentCapture++];
      }
      result.push({
        handler: _handler.handler,
        params: _params,
        isDynamic: !!_names.length
      });
    }
    return result;
  }
  function addSegment(currentState, segment) {
    var state = currentState;
    segment.eachChar(function(ch) {
      state = state.put(ch);
    });
    return state;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-route-recognizer@1.0.0-beta.1.2.0", ["npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-logging@1.0.0-beta.1.2.0"], function(exports, _aureliaPal, _aureliaLogging) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.ConsoleAppender = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  (function(global) {
    global.console = global.console || {};
    var con = global.console;
    var prop = void 0;
    var method = void 0;
    var empty = {};
    var dummy = function dummy() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop()) {
      if (!con[prop])
        con[prop] = empty;
    }
    while (method = methods.pop()) {
      if (!con[method])
        con[method] = dummy;
    }
  })(_aureliaPal.PLATFORM.global);
  if (_aureliaPal.PLATFORM.global.console && _typeof(console.log) === 'object') {
    ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
      console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
  }
  var ConsoleAppender = exports.ConsoleAppender = function() {
    function ConsoleAppender() {
      _classCallCheck(this, ConsoleAppender);
    }
    ConsoleAppender.prototype.debug = function debug(logger) {
      var _console;
      for (var _len = arguments.length,
          rest = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      (_console = console).debug.apply(_console, ['DEBUG [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.info = function info(logger) {
      var _console2;
      for (var _len2 = arguments.length,
          rest = Array(_len2 > 1 ? _len2 - 1 : 0),
          _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }
      (_console2 = console).info.apply(_console2, ['INFO [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.warn = function warn(logger) {
      var _console3;
      for (var _len3 = arguments.length,
          rest = Array(_len3 > 1 ? _len3 - 1 : 0),
          _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3];
      }
      (_console3 = console).warn.apply(_console3, ['WARN [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.error = function error(logger) {
      var _console4;
      for (var _len4 = arguments.length,
          rest = Array(_len4 > 1 ? _len4 - 1 : 0),
          _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4];
      }
      (_console4 = console).error.apply(_console4, ['ERROR [' + logger.id + ']'].concat(rest));
    };
    return ConsoleAppender;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging-console@1.0.0-beta.1.2.0", ["npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader-default@1.0.0-beta.1.2.1/aurelia-loader-default", ["exports", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-metadata@1.0.0-beta.1.2.0"], function(exports, _aureliaLoader, _aureliaPal, _aureliaMetadata) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.DefaultLoader = exports.TextTemplateLoader = undefined;
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var TextTemplateLoader = exports.TextTemplateLoader = function() {
    function TextTemplateLoader() {
      _classCallCheck(this, TextTemplateLoader);
    }
    TextTemplateLoader.prototype.loadTemplate = function loadTemplate(loader, entry) {
      return loader.loadText(entry.address).then(function(text) {
        entry.template = _aureliaPal.DOM.createTemplateFromMarkup(text);
      });
    };
    return TextTemplateLoader;
  }();
  function ensureOriginOnExports(executed, name) {
    var target = executed;
    var key = void 0;
    var exportedValue = void 0;
    if (target.__useDefault) {
      target = target['default'];
    }
    _aureliaMetadata.Origin.set(target, new _aureliaMetadata.Origin(name, 'default'));
    for (key in target) {
      exportedValue = target[key];
      if (typeof exportedValue === 'function') {
        _aureliaMetadata.Origin.set(exportedValue, new _aureliaMetadata.Origin(name, key));
      }
    }
    return executed;
  }
  var DefaultLoader = exports.DefaultLoader = function(_Loader) {
    _inherits(DefaultLoader, _Loader);
    function DefaultLoader() {
      _classCallCheck(this, DefaultLoader);
      var _this = _possibleConstructorReturn(this, _Loader.call(this));
      _this.textPluginName = 'text';
      _this.moduleRegistry = Object.create(null);
      _this.useTemplateLoader(new TextTemplateLoader());
      var that = _this;
      _this.addPlugin('template-registry-entry', {'fetch': function fetch(address) {
          var entry = that.getOrCreateTemplateRegistryEntry(address);
          return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(function(x) {
            return entry;
          });
        }});
      return _this;
    }
    DefaultLoader.prototype.useTemplateLoader = function useTemplateLoader(templateLoader) {
      this.templateLoader = templateLoader;
    };
    DefaultLoader.prototype.loadAllModules = function loadAllModules(ids) {
      var loads = [];
      for (var i = 0,
          ii = ids.length; i < ii; ++i) {
        loads.push(this.loadModule(ids[i]));
      }
      return Promise.all(loads);
    };
    DefaultLoader.prototype.loadTemplate = function loadTemplate(url) {
      return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
    };
    DefaultLoader.prototype.loadText = function loadText(url) {
      return this._import(this.applyPluginToUrl(url, this.textPluginName));
    };
    return DefaultLoader;
  }(_aureliaLoader.Loader);
  _aureliaPal.PLATFORM.Loader = DefaultLoader;
  if (!_aureliaPal.PLATFORM.global.System || !_aureliaPal.PLATFORM.global.System.import) {
    if (_aureliaPal.PLATFORM.global.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
      _aureliaPal.PLATFORM.eachModule = function(callback) {
        var defined = requirejs.s.contexts._.defined;
        for (var key in defined) {
          try {
            if (callback(key, defined[key]))
              return;
          } catch (e) {}
        }
      };
    } else {
      _aureliaPal.PLATFORM.eachModule = function(callback) {};
    }
    DefaultLoader.prototype._import = function(moduleId) {
      return new Promise(function(resolve, reject) {
        require([moduleId], resolve, reject);
      });
    };
    DefaultLoader.prototype.loadModule = function(id) {
      var _this2 = this;
      var existing = this.moduleRegistry[id];
      if (existing !== undefined) {
        return Promise.resolve(existing);
      }
      return new Promise(function(resolve, reject) {
        require([id], function(m) {
          _this2.moduleRegistry[id] = m;
          resolve(ensureOriginOnExports(m, id));
        }, reject);
      });
    };
    DefaultLoader.prototype.map = function(id, source) {};
    DefaultLoader.prototype.normalize = function(moduleId, relativeTo) {
      return Promise.resolve(moduleId);
    };
    DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
      return moduleId;
    };
    DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
      return pluginName + '!' + url;
    };
    DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
      var nonAnonDefine = define;
      nonAnonDefine(pluginName, [], {'load': function load(name, req, onload) {
          var result = implementation.fetch(name);
          Promise.resolve(result).then(onload);
        }});
    };
  } else {
    _aureliaPal.PLATFORM.eachModule = function(callback) {
      var modules = System._loader.modules;
      for (var key in modules) {
        try {
          if (callback(key, modules[key].module))
            return;
        } catch (e) {}
      }
    };
    System.set('text', System.newModule({'translate': function translate(load) {
        return 'module.exports = "' + load.source.replace(/(["\\])/g, '\\$1').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r').replace(/[\u2028]/g, '\\u2028').replace(/[\u2029]/g, '\\u2029') + '";';
      }}));
    DefaultLoader.prototype._import = function(moduleId) {
      return System.import(moduleId);
    };
    DefaultLoader.prototype.loadModule = function(id) {
      var _this3 = this;
      return System.normalize(id).then(function(newId) {
        var existing = _this3.moduleRegistry[newId];
        if (existing !== undefined) {
          return Promise.resolve(existing);
        }
        return System.import(newId).then(function(m) {
          _this3.moduleRegistry[newId] = m;
          return ensureOriginOnExports(m, newId);
        });
      });
    };
    DefaultLoader.prototype.map = function(id, source) {
      System.map[id] = source;
    };
    DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
      return System.normalizeSync(moduleId, relativeTo);
    };
    DefaultLoader.prototype.normalize = function(moduleId, relativeTo) {
      return System.normalize(moduleId, relativeTo);
    };
    DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
      return url + '!' + pluginName;
    };
    DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
      System.set(pluginName, System.newModule({
        'fetch': function fetch(load, _fetch) {
          var result = implementation.fetch(load.address);
          return Promise.resolve(result).then(function(x) {
            load.metadata.result = x;
            return '';
          });
        },
        'instantiate': function instantiate(load) {
          return load.metadata.result;
        }
      }));
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader-default@1.0.0-beta.1.2.1", ["npm:aurelia-loader-default@1.0.0-beta.1.2.1/aurelia-loader-default"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-http-client@1.0.0-beta.1.2.0/aurelia-http-client", ["exports", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaPath, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.HttpClient = exports.RequestBuilder = exports.HttpRequestMessage = exports.JSONPRequestMessage = exports.RequestMessageProcessor = exports.mimeTypes = exports.HttpResponseMessage = exports.RequestMessage = exports.Headers = undefined;
  exports.timeoutTransformer = timeoutTransformer;
  exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
  exports.credentialsTransformer = credentialsTransformer;
  exports.progressTransformer = progressTransformer;
  exports.responseTypeTransformer = responseTypeTransformer;
  exports.headerTransformer = headerTransformer;
  exports.contentTransformer = contentTransformer;
  exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
  exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
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
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Headers = exports.Headers = function() {
    function Headers() {
      var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      _classCallCheck(this, Headers);
      this.headers = headers;
    }
    Headers.prototype.add = function add(key, value) {
      this.headers[key] = value;
    };
    Headers.prototype.get = function get(key) {
      return this.headers[key];
    };
    Headers.prototype.clear = function clear() {
      this.headers = {};
    };
    Headers.prototype.has = function has(header) {
      var lowered = header.toLowerCase();
      var headers = this.headers;
      for (var _key in headers) {
        if (_key.toLowerCase() === lowered) {
          return true;
        }
      }
      return false;
    };
    Headers.prototype.configureXHR = function configureXHR(xhr) {
      var headers = this.headers;
      for (var _key2 in headers) {
        xhr.setRequestHeader(_key2, headers[_key2]);
      }
    };
    Headers.parse = function parse(headerStr) {
      var headers = new Headers();
      if (!headerStr) {
        return headers;
      }
      var headerPairs = headerStr.split('\r\n');
      for (var i = 0; i < headerPairs.length; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf(': ');
        if (index > 0) {
          var _key3 = headerPair.substring(0, index);
          var val = headerPair.substring(index + 2);
          headers.add(_key3, val);
        }
      }
      return headers;
    };
    return Headers;
  }();
  var RequestMessage = exports.RequestMessage = function() {
    function RequestMessage(method, url, content, headers) {
      _classCallCheck(this, RequestMessage);
      this.method = method;
      this.url = url;
      this.content = content;
      this.headers = headers || new Headers();
      this.baseUrl = '';
    }
    RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
      var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
      var url = absoluteUrl.test(this.url) ? this.url : (0, _aureliaPath.join)(this.baseUrl, this.url);
      if (this.params) {
        var qs = (0, _aureliaPath.buildQueryString)(this.params);
        url = qs ? url + '?' + qs : url;
      }
      return url;
    };
    return RequestMessage;
  }();
  var HttpResponseMessage = exports.HttpResponseMessage = function() {
    function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
      _classCallCheck(this, HttpResponseMessage);
      this.requestMessage = requestMessage;
      this.statusCode = xhr.status;
      this.response = xhr.response || xhr.responseText;
      this.isSuccess = xhr.status >= 200 && xhr.status < 400;
      this.statusText = xhr.statusText;
      this.reviver = reviver;
      this.mimeType = null;
      if (xhr.getAllResponseHeaders) {
        try {
          this.headers = Headers.parse(xhr.getAllResponseHeaders());
        } catch (err) {
          if (xhr.requestHeaders)
            this.headers = {headers: xhr.requestHeaders};
        }
      } else {
        this.headers = new Headers();
      }
      var contentType = void 0;
      if (this.headers && this.headers.headers)
        contentType = this.headers.headers['Content-Type'];
      if (contentType) {
        this.mimeType = responseType = contentType.split(';')[0].trim();
        if (mimeTypes.hasOwnProperty(this.mimeType))
          responseType = mimeTypes[this.mimeType];
      }
      this.responseType = responseType;
    }
    _createClass(HttpResponseMessage, [{
      key: 'content',
      get: function get() {
        try {
          if (this._content !== undefined) {
            return this._content;
          }
          if (this.response === undefined || this.response === null) {
            this._content = this.response;
            return this._content;
          }
          if (this.responseType === 'json') {
            this._content = JSON.parse(this.response, this.reviver);
            return this._content;
          }
          if (this.reviver) {
            this._content = this.reviver(this.response);
            return this._content;
          }
          this._content = this.response;
          return this._content;
        } catch (e) {
          if (this.isSuccess) {
            throw e;
          }
          this._content = null;
          return this._content;
        }
      }
    }]);
    return HttpResponseMessage;
  }();
  var mimeTypes = exports.mimeTypes = {
    'text/html': 'html',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'text/json': 'json',
    'application/json': 'json',
    'application/rss+xml': 'rss',
    'application/atom+xml': 'atom',
    'application/xhtml+xml': 'xhtml',
    'text/markdown': 'md',
    'text/xml': 'xml',
    'text/mathml': 'mml',
    'application/xml': 'xml',
    'text/yml': 'yml',
    'text/csv': 'csv',
    'text/css': 'css',
    'text/less': 'less',
    'text/stylus': 'styl',
    'text/scss': 'scss',
    'text/sass': 'sass',
    'text/plain': 'txt'
  };
  function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
    var i = void 0;
    var ii = void 0;
    for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
      xhrTransformers[i](client, processor, message, xhr);
    }
  }
  var RequestMessageProcessor = exports.RequestMessageProcessor = function() {
    function RequestMessageProcessor(xhrType, xhrTransformers) {
      _classCallCheck(this, RequestMessageProcessor);
      this.XHRType = xhrType;
      this.xhrTransformers = xhrTransformers;
      this.isAborted = false;
    }
    RequestMessageProcessor.prototype.abort = function abort() {
      if (this.xhr && this.xhr.readyState !== _aureliaPal.PLATFORM.XMLHttpRequest.UNSENT) {
        this.xhr.abort();
      }
      this.isAborted = true;
    };
    RequestMessageProcessor.prototype.process = function process(client, requestMessage) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        var xhr = _this.xhr = new _this.XHRType();
        xhr.onload = function(e) {
          var response = new HttpResponseMessage(requestMessage, xhr, requestMessage.responseType, requestMessage.reviver);
          if (response.isSuccess) {
            resolve(response);
          } else {
            reject(response);
          }
        };
        xhr.ontimeout = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'timeout'));
        };
        xhr.onerror = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'error'));
        };
        xhr.onabort = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'abort'));
        };
      });
      return Promise.resolve(requestMessage).then(function(message) {
        var processRequest = function processRequest() {
          if (_this.isAborted) {
            _this.xhr.abort();
          } else {
            _this.xhr.open(message.method, message.buildFullUrl(), true, message.user, message.password);
            applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
            _this.xhr.send(message.content);
          }
          return promise;
        };
        var chain = [[processRequest, undefined]];
        var interceptors = message.interceptors || [];
        interceptors.forEach(function(interceptor) {
          if (interceptor.request || interceptor.requestError) {
            chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
          }
          if (interceptor.response || interceptor.responseError) {
            chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
          }
        });
        var interceptorsPromise = Promise.resolve(message);
        while (chain.length) {
          var _interceptorsPromise;
          interceptorsPromise = (_interceptorsPromise = interceptorsPromise).then.apply(_interceptorsPromise, chain.shift());
        }
        return interceptorsPromise;
      });
    };
    return RequestMessageProcessor;
  }();
  function timeoutTransformer(client, processor, message, xhr) {
    if (message.timeout !== undefined) {
      xhr.timeout = message.timeout;
    }
  }
  function callbackParameterNameTransformer(client, processor, message, xhr) {
    if (message.callbackParameterName !== undefined) {
      xhr.callbackParameterName = message.callbackParameterName;
    }
  }
  function credentialsTransformer(client, processor, message, xhr) {
    if (message.withCredentials !== undefined) {
      xhr.withCredentials = message.withCredentials;
    }
  }
  function progressTransformer(client, processor, message, xhr) {
    if (message.progressCallback) {
      xhr.upload.onprogress = message.progressCallback;
    }
  }
  function responseTypeTransformer(client, processor, message, xhr) {
    var responseType = message.responseType;
    if (responseType === 'json') {
      responseType = 'text';
    }
    xhr.responseType = responseType;
  }
  function headerTransformer(client, processor, message, xhr) {
    message.headers.configureXHR(xhr);
  }
  function contentTransformer(client, processor, message, xhr) {
    if (message.skipContentProcessing) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.FormData && message.content instanceof FormData) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.Blob && message.content instanceof Blob) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.ArrayBufferView && message.content instanceof ArrayBufferView) {
      return;
    }
    if (message.content instanceof Document) {
      return;
    }
    if (typeof message.content === 'string') {
      return;
    }
    if (message.content === null || message.content === undefined) {
      return;
    }
    message.content = JSON.stringify(message.content, message.replacer);
    if (!message.headers.has('Content-Type')) {
      message.headers.add('Content-Type', 'application/json');
    }
  }
  var JSONPRequestMessage = exports.JSONPRequestMessage = function(_RequestMessage) {
    _inherits(JSONPRequestMessage, _RequestMessage);
    function JSONPRequestMessage(url, callbackParameterName) {
      _classCallCheck(this, JSONPRequestMessage);
      var _this2 = _possibleConstructorReturn(this, _RequestMessage.call(this, 'JSONP', url));
      _this2.responseType = 'jsonp';
      _this2.callbackParameterName = callbackParameterName;
      return _this2;
    }
    return JSONPRequestMessage;
  }(RequestMessage);
  var JSONPXHR = function() {
    function JSONPXHR() {
      _classCallCheck(this, JSONPXHR);
    }
    JSONPXHR.prototype.open = function open(method, url) {
      this.method = method;
      this.url = url;
      this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    };
    JSONPXHR.prototype.send = function send() {
      var _this3 = this;
      var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
      var script = _aureliaPal.DOM.createElement('script');
      script.src = url;
      script.onerror = function(e) {
        cleanUp();
        _this3.status = 0;
        _this3.onerror(new Error('error'));
      };
      var cleanUp = function cleanUp() {
        delete _aureliaPal.PLATFORM.global[_this3.callbackName];
        _aureliaPal.DOM.removeNode(script);
      };
      _aureliaPal.PLATFORM.global[this.callbackName] = function(data) {
        cleanUp();
        if (_this3.status === undefined) {
          _this3.status = 200;
          _this3.statusText = 'OK';
          _this3.response = data;
          _this3.onload(_this3);
        }
      };
      _aureliaPal.DOM.appendNode(script);
      if (this.timeout !== undefined) {
        setTimeout(function() {
          if (_this3.status === undefined) {
            _this3.status = 0;
            _this3.ontimeout(new Error('timeout'));
          }
        }, this.timeout);
      }
    };
    JSONPXHR.prototype.abort = function abort() {
      if (this.status === undefined) {
        this.status = 0;
        this.onabort(new Error('abort'));
      }
    };
    JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};
    return JSONPXHR;
  }();
  function createJSONPRequestMessageProcessor() {
    return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
  }
  var HttpRequestMessage = exports.HttpRequestMessage = function(_RequestMessage2) {
    _inherits(HttpRequestMessage, _RequestMessage2);
    function HttpRequestMessage(method, url, content, headers) {
      _classCallCheck(this, HttpRequestMessage);
      var _this4 = _possibleConstructorReturn(this, _RequestMessage2.call(this, method, url, content, headers));
      _this4.responseType = 'json';
      return _this4;
    }
    return HttpRequestMessage;
  }(RequestMessage);
  function createHttpRequestMessageProcessor() {
    return new RequestMessageProcessor(_aureliaPal.PLATFORM.XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
  }
  var RequestBuilder = exports.RequestBuilder = function() {
    function RequestBuilder(client) {
      _classCallCheck(this, RequestBuilder);
      this.client = client;
      this.transformers = client.requestTransformers.slice(0);
      this.useJsonp = false;
    }
    RequestBuilder.prototype.asDelete = function asDelete() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'DELETE';
      });
    };
    RequestBuilder.prototype.asGet = function asGet() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'GET';
      });
    };
    RequestBuilder.prototype.asHead = function asHead() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'HEAD';
      });
    };
    RequestBuilder.prototype.asOptions = function asOptions() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'OPTIONS';
      });
    };
    RequestBuilder.prototype.asPatch = function asPatch() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'PATCH';
      });
    };
    RequestBuilder.prototype.asPost = function asPost() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'POST';
      });
    };
    RequestBuilder.prototype.asPut = function asPut() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'PUT';
      });
    };
    RequestBuilder.prototype.asJsonp = function asJsonp(callbackParameterName) {
      this.useJsonp = true;
      return this._addTransformer(function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      });
    };
    RequestBuilder.prototype.withUrl = function withUrl(url) {
      return this._addTransformer(function(client, processor, message) {
        message.url = url;
      });
    };
    RequestBuilder.prototype.withContent = function withContent(content) {
      return this._addTransformer(function(client, processor, message) {
        message.content = content;
      });
    };
    RequestBuilder.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
      return this._addTransformer(function(client, processor, message) {
        message.baseUrl = baseUrl;
      });
    };
    RequestBuilder.prototype.withParams = function withParams(params) {
      return this._addTransformer(function(client, processor, message) {
        message.params = params;
      });
    };
    RequestBuilder.prototype.withResponseType = function withResponseType(responseType) {
      return this._addTransformer(function(client, processor, message) {
        message.responseType = responseType;
      });
    };
    RequestBuilder.prototype.withTimeout = function withTimeout(timeout) {
      return this._addTransformer(function(client, processor, message) {
        message.timeout = timeout;
      });
    };
    RequestBuilder.prototype.withHeader = function withHeader(key, value) {
      return this._addTransformer(function(client, processor, message) {
        message.headers.add(key, value);
      });
    };
    RequestBuilder.prototype.withCredentials = function withCredentials(value) {
      return this._addTransformer(function(client, processor, message) {
        message.withCredentials = value;
      });
    };
    RequestBuilder.prototype.withLogin = function withLogin(user, password) {
      return this._addTransformer(function(client, processor, message) {
        message.user = user;
        message.password = password;
      });
    };
    RequestBuilder.prototype.withReviver = function withReviver(reviver) {
      return this._addTransformer(function(client, processor, message) {
        message.reviver = reviver;
      });
    };
    RequestBuilder.prototype.withReplacer = function withReplacer(replacer) {
      return this._addTransformer(function(client, processor, message) {
        message.replacer = replacer;
      });
    };
    RequestBuilder.prototype.withProgressCallback = function withProgressCallback(progressCallback) {
      return this._addTransformer(function(client, processor, message) {
        message.progressCallback = progressCallback;
      });
    };
    RequestBuilder.prototype.withCallbackParameterName = function withCallbackParameterName(callbackParameterName) {
      return this._addTransformer(function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      });
    };
    RequestBuilder.prototype.withInterceptor = function withInterceptor(interceptor) {
      return this._addTransformer(function(client, processor, message) {
        message.interceptors = message.interceptors || [];
        message.interceptors.unshift(interceptor);
      });
    };
    RequestBuilder.prototype.skipContentProcessing = function skipContentProcessing() {
      return this._addTransformer(function(client, processor, message) {
        message.skipContentProcessing = true;
      });
    };
    RequestBuilder.prototype._addTransformer = function _addTransformer(fn) {
      this.transformers.push(fn);
      return this;
    };
    RequestBuilder.addHelper = function addHelper(name, fn) {
      RequestBuilder.prototype[name] = function() {
        return this._addTransformer(fn.apply(this, arguments));
      };
    };
    RequestBuilder.prototype.send = function send() {
      var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
      return this.client.send(message, this.transformers);
    };
    return RequestBuilder;
  }();
  function trackRequestStart(client, processor) {
    client.pendingRequests.push(processor);
    client.isRequesting = true;
  }
  function trackRequestEnd(client, processor) {
    var index = client.pendingRequests.indexOf(processor);
    client.pendingRequests.splice(index, 1);
    client.isRequesting = client.pendingRequests.length > 0;
    if (!client.isRequesting) {
      (function() {
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-http-client-requests-drained', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(function() {
          return _aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      })();
    }
  }
  var HttpClient = exports.HttpClient = function() {
    function HttpClient() {
      _classCallCheck(this, HttpClient);
      this.isRequesting = false;
      this.requestTransformers = [];
      this.requestProcessorFactories = new Map();
      this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
      this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
      this.pendingRequests = [];
    }
    HttpClient.prototype.configure = function configure(fn) {
      var builder = new RequestBuilder(this);
      fn(builder);
      this.requestTransformers = builder.transformers;
      return this;
    };
    HttpClient.prototype.createRequest = function createRequest(url) {
      var builder = new RequestBuilder(this);
      if (url) {
        builder.withUrl(url);
      }
      return builder;
    };
    HttpClient.prototype.send = function send(requestMessage, transformers) {
      var _this5 = this;
      var createProcessor = this.requestProcessorFactories.get(requestMessage.constructor);
      var processor = void 0;
      var promise = void 0;
      var i = void 0;
      var ii = void 0;
      if (!createProcessor) {
        throw new Error('No request message processor factory for ' + requestMessage.constructor + '.');
      }
      processor = createProcessor();
      trackRequestStart(this, processor);
      transformers = transformers || this.requestTransformers;
      promise = Promise.resolve(requestMessage).then(function(message) {
        for (i = 0, ii = transformers.length; i < ii; ++i) {
          transformers[i](_this5, processor, message);
        }
        return processor.process(_this5, message).then(function(response) {
          trackRequestEnd(_this5, processor);
          return response;
        }).catch(function(response) {
          trackRequestEnd(_this5, processor);
          throw response;
        });
      });
      promise.abort = promise.cancel = function() {
        processor.abort();
      };
      return promise;
    };
    HttpClient.prototype.delete = function _delete(url) {
      return this.createRequest(url).asDelete().send();
    };
    HttpClient.prototype.get = function get(url) {
      return this.createRequest(url).asGet().send();
    };
    HttpClient.prototype.head = function head(url) {
      return this.createRequest(url).asHead().send();
    };
    HttpClient.prototype.jsonp = function jsonp(url) {
      var callbackParameterName = arguments.length <= 1 || arguments[1] === undefined ? 'jsoncallback' : arguments[1];
      return this.createRequest(url).asJsonp(callbackParameterName).send();
    };
    HttpClient.prototype.options = function options(url) {
      return this.createRequest(url).asOptions().send();
    };
    HttpClient.prototype.put = function put(url, content) {
      return this.createRequest(url).asPut().withContent(content).send();
    };
    HttpClient.prototype.patch = function patch(url, content) {
      return this.createRequest(url).asPatch().withContent(content).send();
    };
    HttpClient.prototype.post = function post(url, content) {
      return this.createRequest(url).asPost().withContent(content).send();
    };
    return HttpClient;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-http-client@1.0.0-beta.1.2.0", ["npm:aurelia-http-client@1.0.0-beta.1.2.0/aurelia-http-client"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-history@1.0.0-beta.1.2.0"], function(exports, _aureliaPal, _aureliaHistory) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.BrowserHistory = exports.DefaultLinkHandler = exports.LinkHandler = undefined;
  exports.configure = configure;
  var _class,
      _temp;
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var LinkHandler = exports.LinkHandler = function() {
    function LinkHandler() {
      _classCallCheck(this, LinkHandler);
    }
    LinkHandler.prototype.activate = function activate(history) {};
    LinkHandler.prototype.deactivate = function deactivate() {};
    return LinkHandler;
  }();
  var DefaultLinkHandler = exports.DefaultLinkHandler = function(_LinkHandler) {
    _inherits(DefaultLinkHandler, _LinkHandler);
    function DefaultLinkHandler() {
      _classCallCheck(this, DefaultLinkHandler);
      var _this = _possibleConstructorReturn(this, _LinkHandler.call(this));
      _this.handler = function(e) {
        var _DefaultLinkHandler$g = DefaultLinkHandler.getEventInfo(e);
        var shouldHandleEvent = _DefaultLinkHandler$g.shouldHandleEvent;
        var href = _DefaultLinkHandler$g.href;
        if (shouldHandleEvent) {
          e.preventDefault();
          _this.history.navigate(href);
        }
      };
      return _this;
    }
    DefaultLinkHandler.prototype.activate = function activate(history) {
      if (history._hasPushState) {
        this.history = history;
        _aureliaPal.DOM.addEventListener('click', this.handler, true);
      }
    };
    DefaultLinkHandler.prototype.deactivate = function deactivate() {
      _aureliaPal.DOM.removeEventListener('click', this.handler);
    };
    DefaultLinkHandler.getEventInfo = function getEventInfo(event) {
      var info = {
        shouldHandleEvent: false,
        href: null,
        anchor: null
      };
      var target = DefaultLinkHandler.findClosestAnchor(event.target);
      if (!target || !DefaultLinkHandler.targetIsThisWindow(target)) {
        return info;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return info;
      }
      var href = target.getAttribute('href');
      info.anchor = target;
      info.href = href;
      var leftButtonClicked = event.which === 1;
      var isRelative = href && !(href.charAt(0) === '#' || /^[a-z]+:/i.test(href));
      info.shouldHandleEvent = leftButtonClicked && isRelative;
      return info;
    };
    DefaultLinkHandler.findClosestAnchor = function findClosestAnchor(el) {
      while (el) {
        if (el.tagName === 'A') {
          return el;
        }
        el = el.parentNode;
      }
    };
    DefaultLinkHandler.targetIsThisWindow = function targetIsThisWindow(target) {
      var targetWindow = target.getAttribute('target');
      var win = _aureliaPal.PLATFORM.global;
      return !targetWindow || targetWindow === win.name || targetWindow === '_self' || targetWindow === 'top' && win === win.top;
    };
    return DefaultLinkHandler;
  }(LinkHandler);
  function configure(config) {
    config.singleton(_aureliaHistory.History, BrowserHistory);
    config.transient(LinkHandler, DefaultLinkHandler);
  }
  var BrowserHistory = exports.BrowserHistory = (_temp = _class = function(_History) {
    _inherits(BrowserHistory, _History);
    function BrowserHistory(linkHandler) {
      _classCallCheck(this, BrowserHistory);
      var _this2 = _possibleConstructorReturn(this, _History.call(this));
      _this2._isActive = false;
      _this2._checkUrlCallback = _this2._checkUrl.bind(_this2);
      _this2.location = _aureliaPal.PLATFORM.location;
      _this2.history = _aureliaPal.PLATFORM.history;
      _this2.linkHandler = linkHandler;
      return _this2;
    }
    BrowserHistory.prototype.activate = function activate(options) {
      if (this._isActive) {
        throw new Error('History has already been activated.');
      }
      var wantsPushState = !!options.pushState;
      this._isActive = true;
      this.options = Object.assign({}, {root: '/'}, this.options, options);
      this.root = ('/' + this.options.root + '/').replace(rootStripper, '/');
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
      var eventName = void 0;
      if (this._hasPushState) {
        eventName = 'popstate';
      } else if (this._wantsHashChange) {
        eventName = 'hashchange';
      }
      _aureliaPal.PLATFORM.addEventListener(eventName, this._checkUrlCallback);
      if (this._wantsHashChange && wantsPushState) {
        var loc = this.location;
        var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
        if (!this._hasPushState && !atRoot) {
          this.fragment = this._getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          return true;
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this._getHash().replace(routeStripper, '');
          this.history.replaceState({}, _aureliaPal.DOM.title, this.root + this.fragment + loc.search);
        }
      }
      if (!this.fragment) {
        this.fragment = this._getFragment();
      }
      this.linkHandler.activate(this);
      if (!this.options.silent) {
        return this._loadUrl();
      }
    };
    BrowserHistory.prototype.deactivate = function deactivate() {
      _aureliaPal.PLATFORM.removeEventListener('popstate', this._checkUrlCallback);
      _aureliaPal.PLATFORM.removeEventListener('hashchange', this._checkUrlCallback);
      this._isActive = false;
      this.linkHandler.deactivate();
    };
    BrowserHistory.prototype.navigate = function navigate(fragment) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var _ref$trigger = _ref.trigger;
      var trigger = _ref$trigger === undefined ? true : _ref$trigger;
      var _ref$replace = _ref.replace;
      var replace = _ref$replace === undefined ? false : _ref$replace;
      if (fragment && absoluteUrl.test(fragment)) {
        this.location.href = fragment;
        return true;
      }
      if (!this._isActive) {
        return false;
      }
      fragment = this._getFragment(fragment || '');
      if (this.fragment === fragment && !replace) {
        return false;
      }
      this.fragment = fragment;
      var url = this.root + fragment;
      if (fragment === '' && url !== '/') {
        url = url.slice(0, -1);
      }
      if (this._hasPushState) {
        url = url.replace('//', '/');
        this.history[replace ? 'replaceState' : 'pushState']({}, _aureliaPal.DOM.title, url);
      } else if (this._wantsHashChange) {
        updateHash(this.location, fragment, replace);
      } else {
        return this.location.assign(url);
      }
      if (trigger) {
        return this._loadUrl(fragment);
      }
    };
    BrowserHistory.prototype.navigateBack = function navigateBack() {
      this.history.back();
    };
    BrowserHistory.prototype.setTitle = function setTitle(title) {
      _aureliaPal.DOM.title = title;
    };
    BrowserHistory.prototype._getHash = function _getHash() {
      return this.location.hash.substr(1);
    };
    BrowserHistory.prototype._getFragment = function _getFragment(fragment, forcePushState) {
      var root = void 0;
      if (!fragment) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname + this.location.search;
          root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) {
            fragment = fragment.substr(root.length);
          }
        } else {
          fragment = this._getHash();
        }
      }
      return '/' + fragment.replace(routeStripper, '');
    };
    BrowserHistory.prototype._checkUrl = function _checkUrl() {
      var current = this._getFragment();
      if (current !== this.fragment) {
        this._loadUrl();
      }
    };
    BrowserHistory.prototype._loadUrl = function _loadUrl(fragmentOverride) {
      var fragment = this.fragment = this._getFragment(fragmentOverride);
      return this.options.routeHandler ? this.options.routeHandler(fragment) : false;
    };
    return BrowserHistory;
  }(_aureliaHistory.History), _class.inject = [LinkHandler], _temp);
  var routeStripper = /^#?\/*|\s+$/g;
  var rootStripper = /^\/+|\/+$/g;
  var trailingSlash = /\/$/;
  var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  function updateHash(location, fragment, replace) {
    if (replace) {
      var href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(href + '#' + fragment);
    } else {
      location.hash = '#' + fragment;
    }
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history-browser@1.0.0-beta.1.2.0", ["npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var History = exports.History = function() {
    function History() {
      _classCallCheck(this, History);
    }
    History.prototype.activate = function activate(options) {
      throw new Error('History must implement activate().');
    };
    History.prototype.deactivate = function deactivate() {
      throw new Error('History must implement deactivate().');
    };
    History.prototype.navigate = function navigate(fragment, options) {
      throw new Error('History must implement navigate().');
    };
    History.prototype.navigateBack = function navigateBack() {
      throw new Error('History must implement navigateBack().');
    };
    History.prototype.setTitle = function setTitle(title) {
      throw new Error('History must implement setTitle().');
    };
    return History;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history@1.0.0-beta.1.2.0", ["npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader", ["exports", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-metadata@1.0.0-beta.1.2.0"], function(exports, _aureliaPath, _aureliaMetadata) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Loader = exports.TemplateRegistryEntry = exports.TemplateDependency = undefined;
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
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
    _classCallCheck(this, TemplateDependency);
    this.src = src;
    this.name = name;
  };
  var TemplateRegistryEntry = exports.TemplateRegistryEntry = function() {
    function TemplateRegistryEntry(address) {
      _classCallCheck(this, TemplateRegistryEntry);
      this.templateIsLoaded = false;
      this.factoryIsReady = false;
      this.resources = null;
      this.dependencies = null;
      this.address = address;
      this.onReady = null;
      this._template = null;
      this._factory = null;
    }
    TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
      var finalSrc = typeof src === 'string' ? (0, _aureliaPath.relativeToFile)(src, this.address) : _aureliaMetadata.Origin.get(src).moduleId;
      this.dependencies.push(new TemplateDependency(finalSrc, name));
    };
    _createClass(TemplateRegistryEntry, [{
      key: 'template',
      get: function get() {
        return this._template;
      },
      set: function set(value) {
        var address = this.address;
        var requires = void 0;
        var current = void 0;
        var src = void 0;
        var dependencies = void 0;
        this._template = value;
        this.templateIsLoaded = true;
        requires = value.content.querySelectorAll('require');
        dependencies = this.dependencies = new Array(requires.length);
        for (var i = 0,
            ii = requires.length; i < ii; ++i) {
          current = requires[i];
          src = current.getAttribute('from');
          if (!src) {
            throw new Error('<require> element in ' + address + ' has no "from" attribute.');
          }
          dependencies[i] = new TemplateDependency((0, _aureliaPath.relativeToFile)(src, address), current.getAttribute('as'));
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }
      }
    }, {
      key: 'factory',
      get: function get() {
        return this._factory;
      },
      set: function set(value) {
        this._factory = value;
        this.factoryIsReady = true;
      }
    }]);
    return TemplateRegistryEntry;
  }();
  var Loader = exports.Loader = function() {
    function Loader() {
      _classCallCheck(this, Loader);
      this.templateRegistry = {};
    }
    Loader.prototype.map = function map(id, source) {
      throw new Error('Loaders must implement map(id, source).');
    };
    Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
      throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
    };
    Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
      throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
    };
    Loader.prototype.loadModule = function loadModule(id) {
      throw new Error('Loaders must implement loadModule(id).');
    };
    Loader.prototype.loadAllModules = function loadAllModules(ids) {
      throw new Error('Loader must implement loadAllModules(ids).');
    };
    Loader.prototype.loadTemplate = function loadTemplate(url) {
      throw new Error('Loader must implement loadTemplate(url).');
    };
    Loader.prototype.loadText = function loadText(url) {
      throw new Error('Loader must implement loadText(url).');
    };
    Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
      throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
    };
    Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
      throw new Error('Loader must implement addPlugin(pluginName, implementation).');
    };
    Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
      return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
    };
    return Loader;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader@1.0.0-beta.1.2.0", ["npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-path@1.0.0-beta.1.2.1/aurelia-path", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.relativeToFile = relativeToFile;
  exports.join = join;
  exports.buildQueryString = buildQueryString;
  exports.parseQueryString = parseQueryString;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  function trimDots(ary) {
    for (var i = 0; i < ary.length; ++i) {
      var part = ary[i];
      if (part === '.') {
        ary.splice(i, 1);
        i -= 1;
      } else if (part === '..') {
        if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
          continue;
        } else if (i > 0) {
          ary.splice(i - 1, 2);
          i -= 2;
        }
      }
    }
  }
  function relativeToFile(name, file) {
    var fileParts = file && file.split('/');
    var nameParts = name.trim().split('/');
    if (nameParts[0].charAt(0) === '.' && fileParts) {
      var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
      nameParts.unshift.apply(nameParts, normalizedBaseParts);
    }
    trimDots(nameParts);
    return nameParts.join('/');
  }
  function join(path1, path2) {
    if (!path1) {
      return path2;
    }
    if (!path2) {
      return path1;
    }
    var schemeMatch = path1.match(/^([^/]*?:)\//);
    var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
    path1 = path1.substr(scheme.length);
    var urlPrefix = void 0;
    if (path1.indexOf('///') === 0 && scheme === 'file:') {
      urlPrefix = '///';
    } else if (path1.indexOf('//') === 0) {
      urlPrefix = '//';
    } else if (path1.indexOf('/') === 0) {
      urlPrefix = '/';
    } else {
      urlPrefix = '';
    }
    var trailingSlash = path2.slice(-1) === '/' ? '/' : '';
    var url1 = path1.split('/');
    var url2 = path2.split('/');
    var url3 = [];
    for (var i = 0,
        ii = url1.length; i < ii; ++i) {
      if (url1[i] === '..') {
        url3.pop();
      } else if (url1[i] === '.' || url1[i] === '') {
        continue;
      } else {
        url3.push(url1[i]);
      }
    }
    for (var _i = 0,
        _ii = url2.length; _i < _ii; ++_i) {
      if (url2[_i] === '..') {
        url3.pop();
      } else if (url2[_i] === '.' || url2[_i] === '') {
        continue;
      } else {
        url3.push(url2[_i]);
      }
    }
    return scheme + urlPrefix + url3.join('/') + trailingSlash;
  }
  var encode = encodeURIComponent;
  var encodeKey = function encodeKey(k) {
    return encode(k).replace('%24', '$');
  };
  function buildParam(key, value) {
    var result = [];
    if (value === null || value === undefined) {
      return result;
    }
    if (Array.isArray(value)) {
      for (var i = 0,
          l = value.length; i < l; i++) {
        var arrayKey = key + '[' + (_typeof(value[i]) === 'object' && value[i] !== null ? i : '') + ']';
        result = result.concat(buildParam(arrayKey, value[i]));
      }
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      for (var propertyName in value) {
        result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
      }
    } else {
      result.push(encodeKey(key) + '=' + encode(value));
    }
    return result;
  }
  function buildQueryString(params) {
    var pairs = [];
    var keys = Object.keys(params || {}).sort();
    for (var i = 0,
        len = keys.length; i < len; i++) {
      var key = keys[i];
      pairs = pairs.concat(buildParam(key, params[key]));
    }
    if (pairs.length === 0) {
      return '';
    }
    return pairs.join('&');
  }
  function processScalarParam(existedParam, value, isPrimitive) {
    if (Array.isArray(existedParam)) {
      existedParam.push(value);
      return existedParam;
    }
    if (existedParam !== undefined) {
      return isPrimitive ? value : [existedParam, value];
    }
    return value;
  }
  function parseComplexParam(queryParams, keys, value) {
    var currentParams = queryParams;
    var keysLastIndex = keys.length - 1;
    for (var j = 0; j <= keysLastIndex; j++) {
      var key = keys[j] === '' ? currentParams.length : keys[j];
      if (j < keysLastIndex) {
        currentParams = currentParams[key] = currentParams[key] || (isNaN(keys[j + 1]) ? {} : []);
      } else {
        currentParams = currentParams[key] = value;
      }
    }
  }
  function parseQueryString(queryString) {
    var queryParams = {};
    if (!queryString || typeof queryString !== 'string') {
      return queryParams;
    }
    var query = queryString;
    if (query.charAt(0) === '?') {
      query = query.substr(1);
    }
    var pairs = query.replace(/\+/g, ' ').split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var key = decodeURIComponent(pair[0]);
      var isPrimitive = false;
      if (!key) {
        continue;
      }
      var keys = key.split('][');
      var keysLastIndex = keys.length - 1;
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
        keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
        keys = keys.shift().split('[').concat(keys);
        keysLastIndex = keys.length - 1;
      } else {
        isPrimitive = true;
        keysLastIndex = 0;
      }
      if (pair.length >= 2) {
        var value = pair[1] ? decodeURIComponent(pair[1]) : '';
        if (keysLastIndex) {
          parseComplexParam(queryParams, keys, value);
        } else {
          queryParams[key] = processScalarParam(queryParams[key], value, isPrimitive);
        }
      } else {
        queryParams[key] = true;
      }
    }
    return queryParams;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-path@1.0.0-beta.1.2.1", ["npm:aurelia-path@1.0.0-beta.1.2.1/aurelia-path"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating@1.0.0-beta.1.2.4/aurelia-templating", ["exports", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-metadata@1.0.0-beta.1.2.0", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-task-queue@1.0.0-beta.1.2.0"], function(exports, _aureliaLogging, _aureliaPal, _aureliaMetadata, _aureliaPath, _aureliaLoader, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TemplatingEngine = exports.ElementConfigResource = exports.CompositionEngine = exports.HtmlBehaviorResource = exports.BindableProperty = exports.BehaviorPropertyObserver = exports.Controller = exports.ViewEngine = exports.ModuleAnalyzer = exports.ResourceDescription = exports.ResourceModule = exports.ViewCompiler = exports.ViewFactory = exports.BoundViewFactory = exports.ViewSlot = exports._ContentSelector = exports.View = exports.ViewResources = exports.BindingLanguage = exports.ViewLocator = exports.InlineViewStrategy = exports.TemplateRegistryViewStrategy = exports.NoViewStrategy = exports.ConventionalViewStrategy = exports.RelativeViewStrategy = exports.viewStrategy = exports.TargetInstruction = exports.BehaviorInstruction = exports.ViewCompileInstruction = exports.ResourceLoadContext = exports.ElementEvents = exports.CompositionTransaction = exports.Animator = exports.animationEvent = undefined;
  exports._hyphenate = _hyphenate;
  exports.children = children;
  exports.child = child;
  exports.resource = resource;
  exports.behavior = behavior;
  exports.customElement = customElement;
  exports.customAttribute = customAttribute;
  exports.templateController = templateController;
  exports.bindable = bindable;
  exports.dynamicOptions = dynamicOptions;
  exports.useShadowDOM = useShadowDOM;
  exports.processAttributes = processAttributes;
  exports.processContent = processContent;
  exports.containerless = containerless;
  exports.useViewStrategy = useViewStrategy;
  exports.useView = useView;
  exports.inlineView = inlineView;
  exports.noView = noView;
  exports.elementConfig = elementConfig;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var _class3,
      _temp,
      _dec,
      _class4,
      _dec2,
      _class5,
      _dec3,
      _class6,
      _dec4,
      _class7,
      _dec5,
      _class8,
      _class9,
      _temp2,
      _class11,
      _dec6,
      _class13,
      _dec7,
      _class14,
      _dec8,
      _class16,
      _dec9,
      _class17,
      _dec10,
      _class18;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var animationEvent = exports.animationEvent = {
    enterBegin: 'animation:enter:begin',
    enterActive: 'animation:enter:active',
    enterDone: 'animation:enter:done',
    enterTimeout: 'animation:enter:timeout',
    leaveBegin: 'animation:leave:begin',
    leaveActive: 'animation:leave:active',
    leaveDone: 'animation:leave:done',
    leaveTimeout: 'animation:leave:timeout',
    staggerNext: 'animation:stagger:next',
    removeClassBegin: 'animation:remove-class:begin',
    removeClassActive: 'animation:remove-class:active',
    removeClassDone: 'animation:remove-class:done',
    removeClassTimeout: 'animation:remove-class:timeout',
    addClassBegin: 'animation:add-class:begin',
    addClassActive: 'animation:add-class:active',
    addClassDone: 'animation:add-class:done',
    addClassTimeout: 'animation:add-class:timeout',
    animateBegin: 'animation:animate:begin',
    animateActive: 'animation:animate:active',
    animateDone: 'animation:animate:done',
    animateTimeout: 'animation:animate:timeout',
    sequenceBegin: 'animation:sequence:begin',
    sequenceDone: 'animation:sequence:done'
  };
  var Animator = exports.Animator = function() {
    function Animator() {
      _classCallCheck(this, Animator);
    }
    Animator.prototype.enter = function enter(element) {
      return Promise.resolve(false);
    };
    Animator.prototype.leave = function leave(element) {
      return Promise.resolve(false);
    };
    Animator.prototype.removeClass = function removeClass(element, className) {
      element.classList.remove(className);
      return Promise.resolve(false);
    };
    Animator.prototype.addClass = function addClass(element, className) {
      element.classList.add(className);
      return Promise.resolve(false);
    };
    Animator.prototype.animate = function animate(element, className) {
      return Promise.resolve(false);
    };
    Animator.prototype.runSequence = function runSequence(animations) {};
    Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};
    Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};
    return Animator;
  }();
  var CompositionTransaction = exports.CompositionTransaction = function() {
    function CompositionTransaction() {
      _classCallCheck(this, CompositionTransaction);
      this._ownershipToken = null;
      this._compositionCount = 0;
    }
    CompositionTransaction.prototype.tryCapture = function tryCapture() {
      if (this._ownershipToken !== null) {
        return null;
      }
      return this._ownershipToken = this._createOwnershipToken();
    };
    CompositionTransaction.prototype.enlist = function enlist() {
      var that = this;
      that._compositionCount++;
      return {done: function done() {
          that._compositionCount--;
          that._tryCompleteTransaction();
        }};
    };
    CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
      if (this._compositionCount <= 0) {
        this._compositionCount = 0;
        if (this._ownershipToken !== null) {
          var capture = this._ownershipToken;
          this._ownershipToken = null;
          capture._resolve();
        }
      }
    };
    CompositionTransaction.prototype._createOwnershipToken = function _createOwnershipToken() {
      var _this = this;
      var token = {};
      var promise = new Promise(function(resolve, reject) {
        token._resolve = resolve;
      });
      token.waitForCompositionComplete = function() {
        _this._tryCompleteTransaction();
        return promise;
      };
      return token;
    };
    return CompositionTransaction;
  }();
  var capitalMatcher = /([A-Z])/g;
  function addHyphenAndLower(char) {
    return '-' + char.toLowerCase();
  }
  function _hyphenate(name) {
    return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
  }
  var ElementEvents = exports.ElementEvents = function() {
    function ElementEvents(element) {
      _classCallCheck(this, ElementEvents);
      this.element = element;
      this.subscriptions = {};
    }
    ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
      this.subscriptions[handler.eventName] = this.subscriptions[handler.eventName] || [];
      this.subscriptions[handler.eventName].push(handler);
    };
    ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
      var index = void 0;
      var subscriptions = this.subscriptions[handler.eventName];
      if (subscriptions) {
        index = subscriptions.indexOf(handler);
        if (index > -1) {
          subscriptions.splice(index, 1);
        }
      }
      return handler;
    };
    ElementEvents.prototype.publish = function publish(eventName) {
      var detail = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var cancelable = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
      var event = _aureliaPal.DOM.createCustomEvent(eventName, {
        cancelable: cancelable,
        bubbles: bubbles,
        detail: detail
      });
      this.element.dispatchEvent(event);
    };
    ElementEvents.prototype.subscribe = function subscribe(eventName, handler) {
      var _this2 = this;
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      if (handler && typeof handler === 'function') {
        handler.eventName = eventName;
        handler.handler = handler;
        handler.bubbles = bubbles;
        handler.dispose = function() {
          _this2.element.removeEventListener(eventName, handler, bubbles);
          _this2._dequeueHandler(handler);
        };
        this.element.addEventListener(eventName, handler, bubbles);
        this._enqueueHandler(handler);
        return handler;
      }
    };
    ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler) {
      var _this3 = this;
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      if (handler && typeof handler === 'function') {
        var _ret = function() {
          var _handler = function _handler(event) {
            handler(event);
            _handler.dispose();
          };
          return {v: _this3.subscribe(eventName, _handler, bubbles)};
        }();
        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
          return _ret.v;
      }
    };
    ElementEvents.prototype.dispose = function dispose(eventName) {
      if (eventName && typeof eventName === 'string') {
        var subscriptions = this.subscriptions[eventName];
        if (subscriptions) {
          while (subscriptions.length) {
            var subscription = subscriptions.pop();
            if (subscription) {
              subscription.dispose();
            }
          }
        }
      } else {
        this.disposeAll();
      }
    };
    ElementEvents.prototype.disposeAll = function disposeAll() {
      for (var key in this.subscriptions) {
        this.dispose(key);
      }
    };
    return ElementEvents;
  }();
  var ResourceLoadContext = exports.ResourceLoadContext = function() {
    function ResourceLoadContext() {
      _classCallCheck(this, ResourceLoadContext);
      this.dependencies = {};
    }
    ResourceLoadContext.prototype.addDependency = function addDependency(url) {
      this.dependencies[url] = true;
    };
    ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
      return url in this.dependencies;
    };
    return ResourceLoadContext;
  }();
  var ViewCompileInstruction = exports.ViewCompileInstruction = function ViewCompileInstruction() {
    var targetShadowDOM = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var compileSurrogate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    _classCallCheck(this, ViewCompileInstruction);
    this.targetShadowDOM = targetShadowDOM;
    this.compileSurrogate = compileSurrogate;
    this.associatedModuleId = null;
  };
  ViewCompileInstruction.normal = new ViewCompileInstruction();
  var BehaviorInstruction = exports.BehaviorInstruction = function() {
    BehaviorInstruction.enhance = function enhance() {
      var instruction = new BehaviorInstruction();
      instruction.enhance = true;
      return instruction;
    };
    BehaviorInstruction.unitTest = function unitTest(type, attributes) {
      var instruction = new BehaviorInstruction();
      instruction.type = type;
      instruction.attributes = attributes || {};
      return instruction;
    };
    BehaviorInstruction.element = function element(node, type) {
      var instruction = new BehaviorInstruction();
      instruction.type = type;
      instruction.attributes = {};
      instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
      instruction.initiatedByBehavior = true;
      return instruction;
    };
    BehaviorInstruction.attribute = function attribute(attrName, type) {
      var instruction = new BehaviorInstruction();
      instruction.attrName = attrName;
      instruction.type = type || null;
      instruction.attributes = {};
      return instruction;
    };
    BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
      var instruction = new BehaviorInstruction();
      instruction.host = host;
      instruction.viewModel = viewModel;
      instruction.viewFactory = viewFactory;
      instruction.inheritBindingContext = true;
      return instruction;
    };
    function BehaviorInstruction() {
      _classCallCheck(this, BehaviorInstruction);
      this.initiatedByBehavior = false;
      this.enhance = false;
      this.partReplacements = null;
      this.viewFactory = null;
      this.originalAttrName = null;
      this.skipContentProcessing = false;
      this.contentFactory = null;
      this.viewModel = null;
      this.anchorIsContainer = false;
      this.host = null;
      this.attributes = null;
      this.type = null;
      this.attrName = null;
      this.inheritBindingContext = false;
    }
    return BehaviorInstruction;
  }();
  BehaviorInstruction.normal = new BehaviorInstruction();
  var TargetInstruction = exports.TargetInstruction = (_temp = _class3 = function() {
    TargetInstruction.contentSelector = function contentSelector(node, parentInjectorId) {
      var instruction = new TargetInstruction();
      instruction.parentInjectorId = parentInjectorId;
      instruction.contentSelector = true;
      instruction.selector = node.getAttribute('select');
      return instruction;
    };
    TargetInstruction.contentExpression = function contentExpression(expression) {
      var instruction = new TargetInstruction();
      instruction.contentExpression = expression;
      return instruction;
    };
    TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
      var instruction = new TargetInstruction();
      instruction.parentInjectorId = parentInjectorId;
      instruction.expressions = TargetInstruction.noExpressions;
      instruction.behaviorInstructions = [liftingInstruction];
      instruction.viewFactory = liftingInstruction.viewFactory;
      instruction.providers = [liftingInstruction.type.target];
      instruction.lifting = true;
      return instruction;
    };
    TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
      var instruction = new TargetInstruction();
      instruction.injectorId = injectorId;
      instruction.parentInjectorId = parentInjectorId;
      instruction.providers = providers;
      instruction.behaviorInstructions = behaviorInstructions;
      instruction.expressions = expressions;
      instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
      instruction.elementInstruction = elementInstruction;
      return instruction;
    };
    TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
      var instruction = new TargetInstruction();
      instruction.expressions = expressions;
      instruction.behaviorInstructions = behaviorInstructions;
      instruction.providers = providers;
      instruction.values = values;
      return instruction;
    };
    function TargetInstruction() {
      _classCallCheck(this, TargetInstruction);
      this.injectorId = null;
      this.parentInjectorId = null;
      this.contentSelector = false;
      this.selector = null;
      this.contentExpression = null;
      this.expressions = null;
      this.behaviorInstructions = null;
      this.providers = null;
      this.viewFactory = null;
      this.anchorIsContainer = false;
      this.elementInstruction = null;
      this.lifting = false;
      this.values = null;
    }
    return TargetInstruction;
  }(), _class3.noExpressions = Object.freeze([]), _temp);
  var viewStrategy = exports.viewStrategy = _aureliaMetadata.protocol.create('aurelia:view-strategy', {
    validate: function validate(target) {
      if (!(typeof target.loadViewFactory === 'function')) {
        return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
      }
      return true;
    },
    compose: function compose(target) {
      if (!(typeof target.makeRelativeTo === 'function')) {
        target.makeRelativeTo = _aureliaPal.PLATFORM.noop;
      }
    }
  });
  var RelativeViewStrategy = exports.RelativeViewStrategy = (_dec = viewStrategy(), _dec(_class4 = function() {
    function RelativeViewStrategy(path) {
      _classCallCheck(this, RelativeViewStrategy);
      this.path = path;
      this.absolutePath = null;
    }
    RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      if (this.absolutePath === null && this.moduleId) {
        this.absolutePath = (0, _aureliaPath.relativeToFile)(this.path, this.moduleId);
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext);
    };
    RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
      if (this.absolutePath === null) {
        this.absolutePath = (0, _aureliaPath.relativeToFile)(this.path, file);
      }
    };
    return RelativeViewStrategy;
  }()) || _class4);
  var ConventionalViewStrategy = exports.ConventionalViewStrategy = (_dec2 = viewStrategy(), _dec2(_class5 = function() {
    function ConventionalViewStrategy(viewLocator, origin) {
      _classCallCheck(this, ConventionalViewStrategy);
      this.moduleId = origin.moduleId;
      this.viewUrl = viewLocator.convertOriginToViewUrl(origin);
    }
    ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext);
    };
    return ConventionalViewStrategy;
  }()) || _class5);
  var NoViewStrategy = exports.NoViewStrategy = (_dec3 = viewStrategy(), _dec3(_class6 = function() {
    function NoViewStrategy() {
      _classCallCheck(this, NoViewStrategy);
    }
    NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      return Promise.resolve(null);
    };
    return NoViewStrategy;
  }()) || _class6);
  var TemplateRegistryViewStrategy = exports.TemplateRegistryViewStrategy = (_dec4 = viewStrategy(), _dec4(_class7 = function() {
    function TemplateRegistryViewStrategy(moduleId, entry) {
      _classCallCheck(this, TemplateRegistryViewStrategy);
      this.moduleId = moduleId;
      this.entry = entry;
    }
    TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      var entry = this.entry;
      if (entry.factoryIsReady) {
        return Promise.resolve(entry.factory);
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
    };
    return TemplateRegistryViewStrategy;
  }()) || _class7);
  var InlineViewStrategy = exports.InlineViewStrategy = (_dec5 = viewStrategy(), _dec5(_class8 = function() {
    function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
      _classCallCheck(this, InlineViewStrategy);
      this.markup = markup;
      this.dependencies = dependencies || null;
      this.dependencyBaseUrl = dependencyBaseUrl || '';
    }
    InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      var entry = this.entry;
      var dependencies = this.dependencies;
      if (entry && entry.factoryIsReady) {
        return Promise.resolve(entry.factory);
      }
      this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
      entry.template = _aureliaPal.DOM.createTemplateFromMarkup(this.markup);
      if (dependencies !== null) {
        for (var i = 0,
            ii = dependencies.length; i < ii; ++i) {
          var current = dependencies[i];
          if (typeof current === 'string' || typeof current === 'function') {
            entry.addDependency(current);
          } else {
            entry.addDependency(current.from, current.as);
          }
        }
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
    };
    return InlineViewStrategy;
  }()) || _class8);
  var ViewLocator = exports.ViewLocator = (_temp2 = _class9 = function() {
    function ViewLocator() {
      _classCallCheck(this, ViewLocator);
    }
    ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
      if (!value) {
        return null;
      }
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'getViewStrategy' in value) {
        var _origin = _aureliaMetadata.Origin.get(value.constructor);
        value = value.getViewStrategy();
        if (typeof value === 'string') {
          value = new RelativeViewStrategy(value);
        }
        viewStrategy.assert(value);
        if (_origin) {
          value.makeRelativeTo(_origin.moduleId);
        }
        return value;
      }
      if (typeof value === 'string') {
        value = new RelativeViewStrategy(value);
      }
      if (viewStrategy.validate(value)) {
        return value;
      }
      if (typeof value !== 'function') {
        value = value.constructor;
      }
      var origin = _aureliaMetadata.Origin.get(value);
      var strategy = _aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);
      if (!strategy) {
        if (!origin) {
          throw new Error('Cannot determinte default view strategy for object.', value);
        }
        strategy = this.createFallbackViewStrategy(origin);
      } else if (origin) {
        strategy.moduleId = origin.moduleId;
      }
      return strategy;
    };
    ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
      return new ConventionalViewStrategy(this, origin);
    };
    ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
      var moduleId = origin.moduleId;
      var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
      return id + '.html';
    };
    return ViewLocator;
  }(), _class9.viewStrategyMetadataKey = 'aurelia:view-strategy', _temp2);
  var BindingLanguage = exports.BindingLanguage = function() {
    function BindingLanguage() {
      _classCallCheck(this, BindingLanguage);
    }
    BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
      throw new Error('A BindingLanguage must implement inspectAttribute(...)');
    };
    BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
      throw new Error('A BindingLanguage must implement createAttributeInstruction(...)');
    };
    BindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
      throw new Error('A BindingLanguage must implement inspectTextContent(...)');
    };
    return BindingLanguage;
  }();
  function register(lookup, name, resource, type) {
    if (!name) {
      return;
    }
    var existing = lookup[name];
    if (existing) {
      if (existing !== resource) {
        throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
      }
      return;
    }
    lookup[name] = resource;
  }
  var ViewResources = exports.ViewResources = function() {
    function ViewResources(parent, viewUrl) {
      _classCallCheck(this, ViewResources);
      this.bindingLanguage = null;
      this.parent = parent || null;
      this.hasParent = this.parent !== null;
      this.viewUrl = viewUrl || '';
      this.lookupFunctions = {
        valueConverters: this.getValueConverter.bind(this),
        bindingBehaviors: this.getBindingBehavior.bind(this)
      };
      this.attributes = Object.create(null);
      this.elements = Object.create(null);
      this.valueConverters = Object.create(null);
      this.bindingBehaviors = Object.create(null);
      this.attributeMap = Object.create(null);
      this.beforeCompile = this.afterCompile = this.beforeCreate = this.afterCreate = this.beforeBind = this.beforeUnbind = false;
    }
    ViewResources.prototype._tryAddHook = function _tryAddHook(obj, name) {
      if (typeof obj[name] === 'function') {
        var func = obj[name].bind(obj);
        var counter = 1;
        var callbackName = void 0;
        while (this[callbackName = name + counter.toString()] !== undefined) {
          counter++;
        }
        this[name] = true;
        this[callbackName] = func;
      }
    };
    ViewResources.prototype._invokeHook = function _invokeHook(name, one, two, three, four) {
      if (this.hasParent) {
        this.parent._invokeHook(name, one, two, three, four);
      }
      if (this[name]) {
        this[name + '1'](one, two, three, four);
        var callbackName = name + '2';
        if (this[callbackName]) {
          this[callbackName](one, two, three, four);
          callbackName = name + '3';
          if (this[callbackName]) {
            this[callbackName](one, two, three, four);
            var counter = 4;
            while (this[callbackName = name + counter.toString()] !== undefined) {
              this[callbackName](one, two, three, four);
              counter++;
            }
          }
        }
      }
    };
    ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
      this._tryAddHook(hooks, 'beforeCompile');
      this._tryAddHook(hooks, 'afterCompile');
      this._tryAddHook(hooks, 'beforeCreate');
      this._tryAddHook(hooks, 'afterCreate');
      this._tryAddHook(hooks, 'beforeBind');
      this._tryAddHook(hooks, 'beforeUnbind');
    };
    ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
      return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
    };
    ViewResources.prototype.patchInParent = function patchInParent(newParent) {
      var originalParent = this.parent;
      this.parent = newParent || null;
      this.hasParent = this.parent !== null;
      if (newParent.parent === null) {
        newParent.parent = originalParent;
        newParent.hasParent = originalParent !== null;
      }
    };
    ViewResources.prototype.relativeToView = function relativeToView(path) {
      return (0, _aureliaPath.relativeToFile)(path, this.viewUrl);
    };
    ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
      register(this.elements, tagName, behavior, 'an Element');
    };
    ViewResources.prototype.getElement = function getElement(tagName) {
      return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
    };
    ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
      return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
    };
    ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
      this.attributeMap[attribute] = knownAttribute;
      register(this.attributes, attribute, behavior, 'an Attribute');
    };
    ViewResources.prototype.getAttribute = function getAttribute(attribute) {
      return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
    };
    ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
      register(this.valueConverters, name, valueConverter, 'a ValueConverter');
    };
    ViewResources.prototype.getValueConverter = function getValueConverter(name) {
      return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
    };
    ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
      register(this.bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
    };
    ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
      return this.bindingBehaviors[name] || (this.hasParent ? this.parent.getBindingBehavior(name) : null);
    };
    return ViewResources;
  }();
  var View = exports.View = function() {
    function View(container, viewFactory, fragment, controllers, bindings, children, contentSelectors) {
      _classCallCheck(this, View);
      this.container = container;
      this.viewFactory = viewFactory;
      this.resources = viewFactory.resources;
      this.fragment = fragment;
      this.controllers = controllers;
      this.bindings = bindings;
      this.children = children;
      this.contentSelectors = contentSelectors;
      this.firstChild = fragment.firstChild;
      this.lastChild = fragment.lastChild;
      this.fromCache = false;
      this.isBound = false;
      this.isAttached = false;
      this.fromCache = false;
      this.bindingContext = null;
      this.overrideContext = null;
      this.controller = null;
      this.viewModelScope = null;
      this._isUserControlled = false;
    }
    View.prototype.returnToCache = function returnToCache() {
      this.viewFactory.returnViewToCache(this);
    };
    View.prototype.created = function created() {
      var i = void 0;
      var ii = void 0;
      var controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].created(this);
      }
    };
    View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
      var controllers = void 0;
      var bindings = void 0;
      var children = void 0;
      var i = void 0;
      var ii = void 0;
      if (_systemUpdate && this._isUserControlled) {
        return;
      }
      if (this.isBound) {
        if (this.bindingContext === bindingContext) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)(bindingContext);
      this.resources._invokeHook('beforeBind', this);
      bindings = this.bindings;
      for (i = 0, ii = bindings.length; i < ii; ++i) {
        bindings[i].bind(this);
      }
      if (this.viewModelScope !== null) {
        bindingContext.bind(this.viewModelScope.bindingContext, this.viewModelScope.overrideContext);
        this.viewModelScope = null;
      }
      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].bind(this);
      }
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].bind(bindingContext, overrideContext, true);
      }
    };
    View.prototype.addBinding = function addBinding(binding) {
      this.bindings.push(binding);
      if (this.isBound) {
        binding.bind(this);
      }
    };
    View.prototype.unbind = function unbind() {
      var controllers = void 0;
      var bindings = void 0;
      var children = void 0;
      var i = void 0;
      var ii = void 0;
      if (this.isBound) {
        this.isBound = false;
        this.resources._invokeHook('beforeUnbind', this);
        if (this.controller !== null) {
          this.controller.unbind();
        }
        bindings = this.bindings;
        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].unbind();
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].unbind();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].unbind();
        }
        this.bindingContext = null;
        this.overrideContext = null;
      }
    };
    View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
      var parent = refNode.parentNode;
      parent.insertBefore(this.fragment, refNode);
    };
    View.prototype.appendNodesTo = function appendNodesTo(parent) {
      parent.appendChild(this.fragment);
    };
    View.prototype.removeNodes = function removeNodes() {
      var start = this.firstChild;
      var end = this.lastChild;
      var fragment = this.fragment;
      var next = void 0;
      var current = start;
      var loop = true;
      while (loop) {
        if (current === end) {
          loop = false;
        }
        next = current.nextSibling;
        fragment.appendChild(current);
        current = next;
      }
    };
    View.prototype.attached = function attached() {
      var controllers = void 0;
      var children = void 0;
      var i = void 0;
      var ii = void 0;
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      if (this.controller !== null) {
        this.controller.attached();
      }
      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].attached();
      }
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].attached();
      }
    };
    View.prototype.detached = function detached() {
      var controllers = void 0;
      var children = void 0;
      var i = void 0;
      var ii = void 0;
      if (this.isAttached) {
        this.isAttached = false;
        if (this.controller !== null) {
          this.controller.detached();
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].detached();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].detached();
        }
      }
    };
    return View;
  }();
  var placeholder = [];
  function findInsertionPoint(groups, index) {
    var insertionPoint = void 0;
    while (!insertionPoint && index >= 0) {
      insertionPoint = groups[index][0];
      index--;
    }
    return insertionPoint;
  }
  var _ContentSelector = exports._ContentSelector = function() {
    _ContentSelector.applySelectors = function applySelectors(view, contentSelectors, callback) {
      var currentChild = view.fragment.firstChild;
      var contentMap = new Map();
      var nextSibling = void 0;
      var i = void 0;
      var ii = void 0;
      var contentSelector = void 0;
      while (currentChild) {
        nextSibling = currentChild.nextSibling;
        if (currentChild.isContentProjectionSource) {
          var viewSlotSelectors = contentSelectors.map(function(x) {
            return x.copyForViewSlot();
          });
          currentChild.viewSlot._installContentSelectors(viewSlotSelectors);
        } else {
          for (i = 0, ii = contentSelectors.length; i < ii; i++) {
            contentSelector = contentSelectors[i];
            if (contentSelector.matches(currentChild)) {
              var elements = contentMap.get(contentSelector);
              if (!elements) {
                elements = [];
                contentMap.set(contentSelector, elements);
              }
              elements.push(currentChild);
              break;
            }
          }
        }
        currentChild = nextSibling;
      }
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelector = contentSelectors[i];
        callback(contentSelector, contentMap.get(contentSelector) || placeholder);
      }
    };
    function _ContentSelector(anchor, selector) {
      _classCallCheck(this, _ContentSelector);
      this.anchor = anchor;
      this.selector = selector;
      this.all = !this.selector;
      this.groups = [];
    }
    _ContentSelector.prototype.copyForViewSlot = function copyForViewSlot() {
      return new _ContentSelector(this.anchor, this.selector);
    };
    _ContentSelector.prototype.matches = function matches(node) {
      return this.all || node.nodeType === 1 && node.matches(this.selector);
    };
    _ContentSelector.prototype.add = function add(group) {
      var anchor = this.anchor;
      var parent = anchor.parentNode;
      var i = void 0;
      var ii = void 0;
      for (i = 0, ii = group.length; i < ii; ++i) {
        parent.insertBefore(group[i], anchor);
      }
      this.groups.push(group);
    };
    _ContentSelector.prototype.insert = function insert(index, group) {
      if (group.length) {
        var anchor = findInsertionPoint(this.groups, index) || this.anchor;
        var parent = anchor.parentNode;
        var i = void 0;
        var ii = void 0;
        for (i = 0, ii = group.length; i < ii; ++i) {
          parent.insertBefore(group[i], anchor);
        }
      }
      this.groups.splice(index, 0, group);
    };
    _ContentSelector.prototype.removeAt = function removeAt(index, fragment) {
      var group = this.groups[index];
      var i = void 0;
      var ii = void 0;
      for (i = 0, ii = group.length; i < ii; ++i) {
        fragment.appendChild(group[i]);
      }
      this.groups.splice(index, 1);
    };
    return _ContentSelector;
  }();
  function getAnimatableElement(view) {
    var firstChild = view.firstChild;
    if (firstChild !== null && firstChild !== undefined && firstChild.nodeType === 8) {
      var _element = _aureliaPal.DOM.nextElementSibling(firstChild);
      if (_element !== null && _element !== undefined && _element.nodeType === 1 && _element.classList.contains('au-animate')) {
        return _element;
      }
    }
    return null;
  }
  var ViewSlot = exports.ViewSlot = function() {
    function ViewSlot(anchor, anchorIsContainer) {
      var animator = arguments.length <= 2 || arguments[2] === undefined ? Animator.instance : arguments[2];
      _classCallCheck(this, ViewSlot);
      this.anchor = anchor;
      this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
      this.bindingContext = null;
      this.overrideContext = null;
      this.animator = animator;
      this.children = [];
      this.isBound = false;
      this.isAttached = false;
      this.contentSelectors = null;
      anchor.viewSlot = this;
      anchor.isContentProjectionSource = false;
    }
    ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
      var parent = this.anchor;
      this.children.push({
        fragment: parent,
        firstChild: parent.firstChild,
        lastChild: parent.lastChild,
        returnToCache: function returnToCache() {},
        removeNodes: function removeNodes() {
          var last = void 0;
          while (last = parent.lastChild) {
            parent.removeChild(last);
          }
        },
        created: function created() {},
        bind: function bind() {},
        unbind: function unbind() {},
        attached: function attached() {},
        detached: function detached() {}
      });
    };
    ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
      var i = void 0;
      var ii = void 0;
      var children = void 0;
      if (this.isBound) {
        if (this.bindingContext === bindingContext) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.bindingContext = bindingContext = bindingContext || this.bindingContext;
      this.overrideContext = overrideContext = overrideContext || this.overrideContext;
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].bind(bindingContext, overrideContext, true);
      }
    };
    ViewSlot.prototype.unbind = function unbind() {
      if (this.isBound) {
        var i = void 0;
        var ii = void 0;
        var _children = this.children;
        this.isBound = false;
        this.bindingContext = null;
        this.overrideContext = null;
        for (i = 0, ii = _children.length; i < ii; ++i) {
          _children[i].unbind();
        }
      }
    };
    ViewSlot.prototype.add = function add(view) {
      view[this.viewAddMethod](this.anchor);
      this.children.push(view);
      if (this.isAttached) {
        view.attached();
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.enter(animatableElement);
        }
      }
    };
    ViewSlot.prototype.insert = function insert(index, view) {
      var children = this.children;
      var length = children.length;
      if (index === 0 && length === 0 || index >= length) {
        return this.add(view);
      }
      view.insertNodesBefore(children[index].firstChild);
      children.splice(index, 0, view);
      if (this.isAttached) {
        view.attached();
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.enter(animatableElement);
        }
      }
    };
    ViewSlot.prototype.move = function move(sourceIndex, targetIndex) {
      if (sourceIndex === targetIndex) {
        return;
      }
      var children = this.children;
      var view = children[sourceIndex];
      view.removeNodes();
      view.insertNodesBefore(children[targetIndex].firstChild);
      children.splice(sourceIndex, 1);
      children.splice(targetIndex, 0, view);
    };
    ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
      return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
    };
    ViewSlot.prototype.removeMany = function removeMany(viewsToRemove, returnToCache, skipAnimation) {
      var _this4 = this;
      var children = this.children;
      var ii = viewsToRemove.length;
      var i = void 0;
      var rmPromises = [];
      viewsToRemove.forEach(function(child) {
        if (skipAnimation) {
          child.removeNodes();
          return;
        }
        var animatableElement = getAnimatableElement(child);
        if (animatableElement !== null) {
          rmPromises.push(_this4.animator.leave(animatableElement).then(function() {
            return child.removeNodes();
          }));
        } else {
          child.removeNodes();
        }
      });
      var removeAction = function removeAction() {
        if (_this4.isAttached) {
          for (i = 0; i < ii; ++i) {
            viewsToRemove[i].detached();
          }
        }
        if (returnToCache) {
          for (i = 0; i < ii; ++i) {
            viewsToRemove[i].returnToCache();
          }
        }
        for (i = 0; i < ii; ++i) {
          var index = children.indexOf(viewsToRemove[i]);
          if (index >= 0) {
            children.splice(index, 1);
          }
        }
      };
      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function() {
          return removeAction();
        });
      }
      removeAction();
    };
    ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
      var _this5 = this;
      var view = this.children[index];
      var removeAction = function removeAction() {
        index = _this5.children.indexOf(view);
        view.removeNodes();
        _this5.children.splice(index, 1);
        if (_this5.isAttached) {
          view.detached();
        }
        if (returnToCache) {
          view.returnToCache();
        }
        return view;
      };
      if (!skipAnimation) {
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.leave(animatableElement).then(function() {
            return removeAction();
          });
        }
      }
      return removeAction();
    };
    ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
      var _this6 = this;
      var children = this.children;
      var ii = children.length;
      var i = void 0;
      var rmPromises = [];
      children.forEach(function(child) {
        if (skipAnimation) {
          child.removeNodes();
          return;
        }
        var animatableElement = getAnimatableElement(child);
        if (animatableElement !== null) {
          rmPromises.push(_this6.animator.leave(animatableElement).then(function() {
            return child.removeNodes();
          }));
        } else {
          child.removeNodes();
        }
      });
      var removeAction = function removeAction() {
        if (_this6.isAttached) {
          for (i = 0; i < ii; ++i) {
            children[i].detached();
          }
        }
        if (returnToCache) {
          for (i = 0; i < ii; ++i) {
            children[i].returnToCache();
          }
        }
        _this6.children = [];
      };
      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function() {
          return removeAction();
        });
      }
      removeAction();
    };
    ViewSlot.prototype.attached = function attached() {
      var i = void 0;
      var ii = void 0;
      var children = void 0;
      var child = void 0;
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        child = children[i];
        child.attached();
        var _element2 = child.firstChild ? _aureliaPal.DOM.nextElementSibling(child.firstChild) : null;
        if (child.firstChild && child.firstChild.nodeType === 8 && _element2 && _element2.nodeType === 1 && _element2.classList.contains('au-animate')) {
          this.animator.enter(_element2);
        }
      }
    };
    ViewSlot.prototype.detached = function detached() {
      var i = void 0;
      var ii = void 0;
      var children = void 0;
      if (this.isAttached) {
        this.isAttached = false;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].detached();
        }
      }
    };
    ViewSlot.prototype._installContentSelectors = function _installContentSelectors(contentSelectors) {
      this.contentSelectors = contentSelectors;
      this.add = this._contentSelectorAdd;
      this.insert = this._contentSelectorInsert;
      this.remove = this._contentSelectorRemove;
      this.removeAt = this._contentSelectorRemoveAt;
      this.removeAll = this._contentSelectorRemoveAll;
    };
    ViewSlot.prototype._contentSelectorAdd = function _contentSelectorAdd(view) {
      _ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
        return contentSelector.add(group);
      });
      this.children.push(view);
      if (this.isAttached) {
        view.attached();
      }
    };
    ViewSlot.prototype._contentSelectorInsert = function _contentSelectorInsert(index, view) {
      if (index === 0 && !this.children.length || index >= this.children.length) {
        this.add(view);
      } else {
        _ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
          return contentSelector.insert(index, group);
        });
        this.children.splice(index, 0, view);
        if (this.isAttached) {
          view.attached();
        }
      }
    };
    ViewSlot.prototype._contentSelectorRemove = function _contentSelectorRemove(view) {
      var index = this.children.indexOf(view);
      var contentSelectors = this.contentSelectors;
      var i = void 0;
      var ii = void 0;
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelectors[i].removeAt(index, view.fragment);
      }
      this.children.splice(index, 1);
      if (this.isAttached) {
        view.detached();
      }
    };
    ViewSlot.prototype._contentSelectorRemoveAt = function _contentSelectorRemoveAt(index) {
      var view = this.children[index];
      var contentSelectors = this.contentSelectors;
      var i = void 0;
      var ii = void 0;
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelectors[i].removeAt(index, view.fragment);
      }
      this.children.splice(index, 1);
      if (this.isAttached) {
        view.detached();
      }
      return view;
    };
    ViewSlot.prototype._contentSelectorRemoveAll = function _contentSelectorRemoveAll() {
      var children = this.children;
      var contentSelectors = this.contentSelectors;
      var ii = children.length;
      var jj = contentSelectors.length;
      var i = void 0;
      var j = void 0;
      var view = void 0;
      for (i = 0; i < ii; ++i) {
        view = children[i];
        for (j = 0; j < jj; ++j) {
          contentSelectors[j].removeAt(0, view.fragment);
        }
      }
      if (this.isAttached) {
        for (i = 0; i < ii; ++i) {
          children[i].detached();
        }
      }
      this.children = [];
    };
    return ViewSlot;
  }();
  var ProviderResolver = (0, _aureliaDependencyInjection.resolver)(_class11 = function() {
    function ProviderResolver() {
      _classCallCheck(this, ProviderResolver);
    }
    ProviderResolver.prototype.get = function get(container, key) {
      var id = key.__providerId__;
      return id in container ? container[id] : container[id] = container.invoke(key);
    };
    return ProviderResolver;
  }()) || _class11;
  var providerResolverInstance = new ProviderResolver();
  function elementContainerGet(key) {
    if (key === _aureliaPal.DOM.Element) {
      return this.element;
    }
    if (key === BoundViewFactory) {
      if (this.boundViewFactory) {
        return this.boundViewFactory;
      }
      var factory = this.instruction.viewFactory;
      var _partReplacements = this.partReplacements;
      if (_partReplacements) {
        factory = _partReplacements[factory.part] || factory;
      }
      this.boundViewFactory = new BoundViewFactory(this, factory, _partReplacements);
      return this.boundViewFactory;
    }
    if (key === ViewSlot) {
      if (this.viewSlot === undefined) {
        this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer);
        this.element.isContentProjectionSource = this.instruction.lifting;
        this.children.push(this.viewSlot);
      }
      return this.viewSlot;
    }
    if (key === ElementEvents) {
      return this.elementEvents || (this.elementEvents = new ElementEvents(this.element));
    }
    if (key === CompositionTransaction) {
      return this.compositionTransaction || (this.compositionTransaction = this.parent.get(key));
    }
    if (key === ViewResources) {
      return this.viewResources;
    }
    if (key === TargetInstruction) {
      return this.instruction;
    }
    return this.superGet(key);
  }
  function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
    var container = parent.createChild();
    var providers = void 0;
    var i = void 0;
    container.element = element;
    container.instruction = instruction;
    container.children = children;
    container.viewResources = resources;
    container.partReplacements = partReplacements;
    providers = instruction.providers;
    i = providers.length;
    while (i--) {
      container._resolvers.set(providers[i], providerResolverInstance);
    }
    container.superGet = container.get;
    container.get = elementContainerGet;
    return container;
  }
  function makeElementIntoAnchor(element, elementInstruction) {
    var anchor = _aureliaPal.DOM.createComment('anchor');
    if (elementInstruction) {
      anchor.hasAttribute = function(name) {
        return element.hasAttribute(name);
      };
      anchor.getAttribute = function(name) {
        return element.getAttribute(name);
      };
      anchor.setAttribute = function(name, value) {
        element.setAttribute(name, value);
      };
    }
    _aureliaPal.DOM.replaceNode(anchor, element);
    return anchor;
  }
  function applyInstructions(containers, element, instruction, controllers, bindings, children, contentSelectors, partReplacements, resources) {
    var behaviorInstructions = instruction.behaviorInstructions;
    var expressions = instruction.expressions;
    var elementContainer = void 0;
    var i = void 0;
    var ii = void 0;
    var current = void 0;
    var instance = void 0;
    if (instruction.contentExpression) {
      bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
      element.parentNode.removeChild(element);
      return;
    }
    if (instruction.contentSelector) {
      var commentAnchor = _aureliaPal.DOM.createComment('anchor');
      _aureliaPal.DOM.replaceNode(commentAnchor, element);
      contentSelectors.push(new _ContentSelector(commentAnchor, instruction.selector));
      return;
    }
    if (behaviorInstructions.length) {
      if (!instruction.anchorIsContainer) {
        element = makeElementIntoAnchor(element, instruction.elementInstruction);
      }
      containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        current = behaviorInstructions[i];
        instance = current.type.create(elementContainer, current, element, bindings);
        if (instance.contentView) {
          children.push(instance.contentView);
        }
        controllers.push(instance);
      }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
      bindings.push(expressions[i].createBinding(element));
    }
  }
  function styleStringToObject(style, target) {
    var attributes = style.split(';');
    var firstIndexOfColon = void 0;
    var i = void 0;
    var current = void 0;
    var key = void 0;
    var value = void 0;
    target = target || {};
    for (i = 0; i < attributes.length; i++) {
      current = attributes[i];
      firstIndexOfColon = current.indexOf(':');
      key = current.substring(0, firstIndexOfColon).trim();
      value = current.substring(firstIndexOfColon + 1).trim();
      target[key] = value;
    }
    return target;
  }
  function styleObjectToString(obj) {
    var result = '';
    for (var key in obj) {
      result += key + ':' + obj[key] + ';';
    }
    return result;
  }
  function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
    var behaviorInstructions = instruction.behaviorInstructions;
    var expressions = instruction.expressions;
    var providers = instruction.providers;
    var values = instruction.values;
    var i = void 0;
    var ii = void 0;
    var current = void 0;
    var instance = void 0;
    var currentAttributeValue = void 0;
    i = providers.length;
    while (i--) {
      container._resolvers.set(providers[i], providerResolverInstance);
    }
    for (var key in values) {
      currentAttributeValue = element.getAttribute(key);
      if (currentAttributeValue) {
        if (key === 'class') {
          element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
        } else if (key === 'style') {
          var styleObject = styleStringToObject(values[key]);
          styleStringToObject(currentAttributeValue, styleObject);
          element.setAttribute('style', styleObjectToString(styleObject));
        }
      } else {
        element.setAttribute(key, values[key]);
      }
    }
    if (behaviorInstructions.length) {
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        current = behaviorInstructions[i];
        instance = current.type.create(container, current, element, bindings);
        if (instance.contentView) {
          children.push(instance.contentView);
        }
        controllers.push(instance);
      }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
      bindings.push(expressions[i].createBinding(element));
    }
  }
  var BoundViewFactory = exports.BoundViewFactory = function() {
    function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
      _classCallCheck(this, BoundViewFactory);
      this.parentContainer = parentContainer;
      this.viewFactory = viewFactory;
      this.factoryCreateInstruction = {partReplacements: partReplacements};
    }
    BoundViewFactory.prototype.create = function create() {
      var view = this.viewFactory.create(this.parentContainer.createChild(), this.factoryCreateInstruction);
      view._isUserControlled = true;
      return view;
    };
    BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
    };
    BoundViewFactory.prototype.getCachedView = function getCachedView() {
      return this.viewFactory.getCachedView();
    };
    BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      this.viewFactory.returnViewToCache(view);
    };
    _createClass(BoundViewFactory, [{
      key: 'isCaching',
      get: function get() {
        return this.viewFactory.isCaching;
      }
    }]);
    return BoundViewFactory;
  }();
  var ViewFactory = exports.ViewFactory = function() {
    function ViewFactory(template, instructions, resources) {
      _classCallCheck(this, ViewFactory);
      this.isCaching = false;
      this.template = template;
      this.instructions = instructions;
      this.resources = resources;
      this.cacheSize = -1;
      this.cache = null;
    }
    ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      if (size) {
        if (size === '*') {
          size = Number.MAX_VALUE;
        } else if (typeof size === 'string') {
          size = parseInt(size, 10);
        }
      }
      if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
        this.cacheSize = size;
      }
      if (this.cacheSize > 0) {
        this.cache = [];
      } else {
        this.cache = null;
      }
      this.isCaching = this.cacheSize > 0;
    };
    ViewFactory.prototype.getCachedView = function getCachedView() {
      return this.cache !== null ? this.cache.pop() || null : null;
    };
    ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      if (view.isAttached) {
        view.detached();
      }
      if (view.isBound) {
        view.unbind();
      }
      if (this.cache !== null && this.cache.length < this.cacheSize) {
        view.fromCache = true;
        this.cache.push(view);
      }
    };
    ViewFactory.prototype.create = function create(container, createInstruction, element) {
      createInstruction = createInstruction || BehaviorInstruction.normal;
      element = element || null;
      var cachedView = this.getCachedView();
      if (cachedView !== null) {
        return cachedView;
      }
      var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
      var instructables = fragment.querySelectorAll('.au-target');
      var instructions = this.instructions;
      var resources = this.resources;
      var controllers = [];
      var bindings = [];
      var children = [];
      var contentSelectors = [];
      var containers = {root: container};
      var partReplacements = createInstruction.partReplacements;
      var i = void 0;
      var ii = void 0;
      var view = void 0;
      var instructable = void 0;
      var instruction = void 0;
      this.resources._invokeHook('beforeCreate', this, container, fragment, createInstruction);
      if (element !== null && this.surrogateInstruction !== null) {
        applySurrogateInstruction(container, element, this.surrogateInstruction, controllers, bindings, children);
      }
      for (i = 0, ii = instructables.length; i < ii; ++i) {
        instructable = instructables[i];
        instruction = instructions[instructable.getAttribute('au-target-id')];
        applyInstructions(containers, instructable, instruction, controllers, bindings, children, contentSelectors, partReplacements, resources);
      }
      view = new View(container, this, fragment, controllers, bindings, children, contentSelectors);
      if (!createInstruction.initiatedByBehavior) {
        view.created();
      }
      this.resources._invokeHook('afterCreate', view);
      return view;
    };
    return ViewFactory;
  }();
  var nextInjectorId = 0;
  function getNextInjectorId() {
    return ++nextInjectorId;
  }
  function configureProperties(instruction, resources) {
    var type = instruction.type;
    var attrName = instruction.attrName;
    var attributes = instruction.attributes;
    var property = void 0;
    var key = void 0;
    var value = void 0;
    var knownAttribute = resources.mapAttribute(attrName);
    if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
      attributes[knownAttribute] = attributes[attrName];
      delete attributes[attrName];
    }
    for (key in attributes) {
      value = attributes[key];
      if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        property = type.attributes[key];
        if (property !== undefined) {
          value.targetProperty = property.name;
        } else {
          value.targetProperty = key;
        }
      }
    }
  }
  var lastAUTargetID = 0;
  function getNextAUTargetID() {
    return (++lastAUTargetID).toString();
  }
  function makeIntoInstructionTarget(element) {
    var value = element.getAttribute('class');
    var auTargetID = getNextAUTargetID();
    element.setAttribute('class', value ? value += ' au-target' : 'au-target');
    element.setAttribute('au-target-id', auTargetID);
    return auTargetID;
  }
  var ViewCompiler = exports.ViewCompiler = (_dec6 = (0, _aureliaDependencyInjection.inject)(BindingLanguage, ViewResources), _dec6(_class13 = function() {
    function ViewCompiler(bindingLanguage, resources) {
      _classCallCheck(this, ViewCompiler);
      this.bindingLanguage = bindingLanguage;
      this.resources = resources;
    }
    ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
      resources = resources || this.resources;
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      source = typeof source === 'string' ? _aureliaPal.DOM.createTemplateFromMarkup(source) : source;
      var content = void 0;
      var part = void 0;
      var cacheSize = void 0;
      if (source.content) {
        part = source.getAttribute('part');
        cacheSize = source.getAttribute('view-cache');
        content = _aureliaPal.DOM.adoptNode(source.content);
      } else {
        content = source;
      }
      compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
      resources._invokeHook('beforeCompile', content, resources, compileInstruction);
      var instructions = {};
      this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);
      content.insertBefore(_aureliaPal.DOM.createComment('<view>'), content.firstChild);
      content.appendChild(_aureliaPal.DOM.createComment('</view>'));
      var factory = new ViewFactory(content, instructions, resources);
      factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
      factory.part = part;
      if (cacheSize) {
        factory.setCacheSize(cacheSize);
      }
      resources._invokeHook('afterCompile', factory);
      return factory;
    };
    ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
      switch (node.nodeType) {
        case 1:
          return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
        case 3:
          var expression = resources.getBindingLanguage(this.bindingLanguage).inspectTextContent(resources, node.wholeText);
          if (expression) {
            var marker = _aureliaPal.DOM.createElement('au-marker');
            var auTargetID = makeIntoInstructionTarget(marker);
            (node.parentNode || parentNode).insertBefore(marker, node);
            node.textContent = ' ';
            instructions[auTargetID] = TargetInstruction.contentExpression(expression);
            while (node.nextSibling && node.nextSibling.nodeType === 3) {
              (node.parentNode || parentNode).removeChild(node.nextSibling);
            }
          } else {
            while (node.nextSibling && node.nextSibling.nodeType === 3) {
              node = node.nextSibling;
            }
          }
          return node.nextSibling;
        case 11:
          var currentChild = node.firstChild;
          while (currentChild) {
            currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
          }
          break;
        default:
          break;
      }
      return node.nextSibling;
    };
    ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
      var tagName = node.tagName.toLowerCase();
      var attributes = node.attributes;
      var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
      var knownAttribute = void 0;
      var property = void 0;
      var instruction = void 0;
      var i = void 0;
      var ii = void 0;
      var attr = void 0;
      var attrName = void 0;
      var attrValue = void 0;
      var info = void 0;
      var type = void 0;
      var expressions = [];
      var expression = void 0;
      var behaviorInstructions = [];
      var values = {};
      var hasValues = false;
      var providers = [];
      for (i = 0, ii = attributes.length; i < ii; ++i) {
        attr = attributes[i];
        attrName = attr.name;
        attrValue = attr.value;
        info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
        type = resources.getAttribute(info.attrName);
        if (type) {
          knownAttribute = resources.mapAttribute(info.attrName);
          if (knownAttribute) {
            property = type.attributes[knownAttribute];
            if (property) {
              info.defaultBindingMode = property.defaultBindingMode;
              if (!info.command && !info.expression) {
                info.command = property.hasOptions ? 'options' : null;
              }
            }
          }
        }
        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
        if (instruction) {
          if (instruction.alteredAttr) {
            type = resources.getAttribute(instruction.attrName);
          }
          if (instruction.discrete) {
            expressions.push(instruction);
          } else {
            if (type) {
              instruction.type = type;
              configureProperties(instruction, resources);
              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else {
              expressions.push(instruction.attributes[instruction.attrName]);
            }
          }
        } else {
          if (type) {
            instruction = BehaviorInstruction.attribute(attrName, type);
            instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
            if (type.liftsContent) {
              throw new Error('You cannot place a template controller on a surrogate element.');
            } else {
              behaviorInstructions.push(instruction);
            }
          } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
            hasValues = true;
            values[attrName] = attrValue;
          }
        }
      }
      if (expressions.length || behaviorInstructions.length || hasValues) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          instruction = behaviorInstructions[i];
          instruction.type.compile(this, resources, node, instruction);
          providers.push(instruction.type.target);
        }
        for (i = 0, ii = expressions.length; i < ii; ++i) {
          expression = expressions[i];
          if (expression.attrToRemove !== undefined) {
            node.removeAttribute(expression.attrToRemove);
          }
        }
        return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
      }
      return null;
    };
    ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
      var tagName = node.tagName.toLowerCase();
      var attributes = node.attributes;
      var expressions = [];
      var expression = void 0;
      var behaviorInstructions = [];
      var providers = [];
      var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
      var liftingInstruction = void 0;
      var viewFactory = void 0;
      var type = void 0;
      var elementInstruction = void 0;
      var elementProperty = void 0;
      var i = void 0;
      var ii = void 0;
      var attr = void 0;
      var attrName = void 0;
      var attrValue = void 0;
      var instruction = void 0;
      var info = void 0;
      var property = void 0;
      var knownAttribute = void 0;
      var auTargetID = void 0;
      var injectorId = void 0;
      if (tagName === 'content') {
        if (targetLightDOM) {
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.contentSelector(node, parentInjectorId);
        }
        return node.nextSibling;
      } else if (tagName === 'template') {
        viewFactory = this.compile(node, resources);
        viewFactory.part = node.getAttribute('part');
      } else {
        type = resources.getElement(node.getAttribute('as-element') || tagName);
        if (type) {
          elementInstruction = BehaviorInstruction.element(node, type);
          type.processAttributes(this, resources, attributes, elementInstruction);
          behaviorInstructions.push(elementInstruction);
        }
      }
      for (i = 0, ii = attributes.length; i < ii; ++i) {
        attr = attributes[i];
        attrName = attr.name;
        attrValue = attr.value;
        info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
        type = resources.getAttribute(info.attrName);
        elementProperty = null;
        if (type) {
          knownAttribute = resources.mapAttribute(info.attrName);
          if (knownAttribute) {
            property = type.attributes[knownAttribute];
            if (property) {
              info.defaultBindingMode = property.defaultBindingMode;
              if (!info.command && !info.expression) {
                info.command = property.hasOptions ? 'options' : null;
              }
            }
          }
        } else if (elementInstruction) {
          elementProperty = elementInstruction.type.attributes[info.attrName];
          if (elementProperty) {
            info.defaultBindingMode = elementProperty.defaultBindingMode;
          }
        }
        if (elementProperty) {
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
        } else {
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
        }
        if (instruction) {
          if (instruction.alteredAttr) {
            type = resources.getAttribute(instruction.attrName);
          }
          if (instruction.discrete) {
            expressions.push(instruction);
          } else {
            if (type) {
              instruction.type = type;
              configureProperties(instruction, resources);
              if (type.liftsContent) {
                instruction.originalAttrName = attrName;
                liftingInstruction = instruction;
                break;
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (elementProperty) {
              elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
            } else {
              expressions.push(instruction.attributes[instruction.attrName]);
            }
          }
        } else {
          if (type) {
            instruction = BehaviorInstruction.attribute(attrName, type);
            instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
            if (type.liftsContent) {
              instruction.originalAttrName = attrName;
              liftingInstruction = instruction;
              break;
            } else {
              behaviorInstructions.push(instruction);
            }
          } else if (elementProperty) {
            elementInstruction.attributes[attrName] = attrValue;
          }
        }
      }
      if (liftingInstruction) {
        liftingInstruction.viewFactory = viewFactory;
        node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
        auTargetID = makeIntoInstructionTarget(node);
        instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
      } else {
        if (expressions.length || behaviorInstructions.length) {
          injectorId = behaviorInstructions.length ? getNextInjectorId() : false;
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this, resources, node, instruction, parentNode);
            providers.push(instruction.type.target);
          }
          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];
            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
        }
        if (elementInstruction && elementInstruction.skipContentProcessing) {
          return node.nextSibling;
        }
        var currentChild = node.firstChild;
        while (currentChild) {
          currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
        }
      }
      return node.nextSibling;
    };
    return ViewCompiler;
  }()) || _class13);
  var ResourceModule = exports.ResourceModule = function() {
    function ResourceModule(moduleId) {
      _classCallCheck(this, ResourceModule);
      this.id = moduleId;
      this.moduleInstance = null;
      this.mainResource = null;
      this.resources = null;
      this.viewStrategy = null;
      this.isInitialized = false;
      this.onLoaded = null;
    }
    ResourceModule.prototype.initialize = function initialize(container) {
      var current = this.mainResource;
      var resources = this.resources;
      var vs = this.viewStrategy;
      if (this.isInitialized) {
        return;
      }
      this.isInitialized = true;
      if (current !== undefined) {
        current.metadata.viewStrategy = vs;
        current.initialize(container);
      }
      for (var i = 0,
          ii = resources.length; i < ii; ++i) {
        current = resources[i];
        current.metadata.viewStrategy = vs;
        current.initialize(container);
      }
    };
    ResourceModule.prototype.register = function register(registry, name) {
      var main = this.mainResource;
      var resources = this.resources;
      if (main !== undefined) {
        main.register(registry, name);
        name = null;
      }
      for (var i = 0,
          ii = resources.length; i < ii; ++i) {
        resources[i].register(registry, name);
        name = null;
      }
    };
    ResourceModule.prototype.load = function load(container, loadContext) {
      if (this.onLoaded !== null) {
        return this.onLoaded;
      }
      var main = this.mainResource;
      var resources = this.resources;
      var loads = void 0;
      if (main !== undefined) {
        loads = new Array(resources.length + 1);
        loads[0] = main.load(container, loadContext);
        for (var i = 0,
            ii = resources.length; i < ii; ++i) {
          loads[i + 1] = resources[i].load(container, loadContext);
        }
      } else {
        loads = new Array(resources.length);
        for (var _i = 0,
            _ii = resources.length; _i < _ii; ++_i) {
          loads[_i] = resources[_i].load(container, loadContext);
        }
      }
      this.onLoaded = Promise.all(loads);
      return this.onLoaded;
    };
    return ResourceModule;
  }();
  var ResourceDescription = exports.ResourceDescription = function() {
    function ResourceDescription(key, exportedValue, resourceTypeMeta) {
      _classCallCheck(this, ResourceDescription);
      if (!resourceTypeMeta) {
        resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
        if (!resourceTypeMeta) {
          resourceTypeMeta = new HtmlBehaviorResource();
          resourceTypeMeta.elementName = _hyphenate(key);
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
        }
      }
      if (resourceTypeMeta instanceof HtmlBehaviorResource) {
        if (resourceTypeMeta.elementName === undefined) {
          resourceTypeMeta.elementName = _hyphenate(key);
        } else if (resourceTypeMeta.attributeName === undefined) {
          resourceTypeMeta.attributeName = _hyphenate(key);
        } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
          HtmlBehaviorResource.convention(key, resourceTypeMeta);
        }
      } else if (!resourceTypeMeta.name) {
        resourceTypeMeta.name = _hyphenate(key);
      }
      this.metadata = resourceTypeMeta;
      this.value = exportedValue;
    }
    ResourceDescription.prototype.initialize = function initialize(container) {
      this.metadata.initialize(container, this.value);
    };
    ResourceDescription.prototype.register = function register(registry, name) {
      this.metadata.register(registry, name);
    };
    ResourceDescription.prototype.load = function load(container, loadContext) {
      return this.metadata.load(container, this.value, loadContext);
    };
    return ResourceDescription;
  }();
  var ModuleAnalyzer = exports.ModuleAnalyzer = function() {
    function ModuleAnalyzer() {
      _classCallCheck(this, ModuleAnalyzer);
      this.cache = Object.create(null);
    }
    ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
      return this.cache[moduleId];
    };
    ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
      var mainResource = void 0;
      var fallbackValue = void 0;
      var fallbackKey = void 0;
      var resourceTypeMeta = void 0;
      var key = void 0;
      var exportedValue = void 0;
      var resources = [];
      var conventional = void 0;
      var vs = void 0;
      var resourceModule = void 0;
      resourceModule = this.cache[moduleId];
      if (resourceModule) {
        return resourceModule;
      }
      resourceModule = new ResourceModule(moduleId);
      this.cache[moduleId] = resourceModule;
      if (typeof moduleInstance === 'function') {
        moduleInstance = {'default': moduleInstance};
      }
      if (mainResourceKey) {
        mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
      }
      for (key in moduleInstance) {
        exportedValue = moduleInstance[key];
        if (key === mainResourceKey || typeof exportedValue !== 'function') {
          continue;
        }
        resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
        if (resourceTypeMeta) {
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            resourceTypeMeta.elementName = _hyphenate(key);
          }
          if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
            mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
          } else {
            resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
          }
        } else if (viewStrategy.decorates(exportedValue)) {
          vs = exportedValue;
        } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
          vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
        } else {
          if (conventional = HtmlBehaviorResource.convention(key)) {
            if (conventional.elementName !== null && !mainResource) {
              mainResource = new ResourceDescription(key, exportedValue, conventional);
            } else {
              resources.push(new ResourceDescription(key, exportedValue, conventional));
            }
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key)) {
            resources.push(new ResourceDescription(key, exportedValue, conventional));
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (conventional = _aureliaBinding.BindingBehaviorResource.convention(key)) {
            resources.push(new ResourceDescription(key, exportedValue, conventional));
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (!fallbackValue) {
            fallbackValue = exportedValue;
            fallbackKey = key;
          }
        }
      }
      if (!mainResource && fallbackValue) {
        mainResource = new ResourceDescription(fallbackKey, fallbackValue);
      }
      resourceModule.moduleInstance = moduleInstance;
      resourceModule.mainResource = mainResource;
      resourceModule.resources = resources;
      resourceModule.viewStrategy = vs;
      return resourceModule;
    };
    return ModuleAnalyzer;
  }();
  var logger = LogManager.getLogger('templating');
  function ensureRegistryEntry(loader, urlOrRegistryEntry) {
    if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
      return Promise.resolve(urlOrRegistryEntry);
    }
    return loader.loadTemplate(urlOrRegistryEntry);
  }
  var ProxyViewFactory = function() {
    function ProxyViewFactory(promise) {
      var _this7 = this;
      _classCallCheck(this, ProxyViewFactory);
      promise.then(function(x) {
        return _this7.viewFactory = x;
      });
    }
    ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
      return this.viewFactory.create(container, bindingContext, createInstruction, element);
    };
    ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
    };
    ProxyViewFactory.prototype.getCachedView = function getCachedView() {
      return this.viewFactory.getCachedView();
    };
    ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      this.viewFactory.returnViewToCache(view);
    };
    _createClass(ProxyViewFactory, [{
      key: 'isCaching',
      get: function get() {
        return this.viewFactory.isCaching;
      }
    }]);
    return ProxyViewFactory;
  }();
  var ViewEngine = exports.ViewEngine = (_dec7 = (0, _aureliaDependencyInjection.inject)(_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources), _dec7(_class14 = function() {
    function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
      _classCallCheck(this, ViewEngine);
      this.loader = loader;
      this.container = container;
      this.viewCompiler = viewCompiler;
      this.moduleAnalyzer = moduleAnalyzer;
      this.appResources = appResources;
      this._pluginMap = {};
    }
    ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
      var name = extension.replace('.', '') + '-resource-plugin';
      this._pluginMap[extension] = name;
      this.loader.addPlugin(name, implementation);
    };
    ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext) {
      var _this8 = this;
      loadContext = loadContext || new ResourceLoadContext();
      return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function(registryEntry) {
        if (registryEntry.onReady) {
          if (!loadContext.hasDependency(urlOrRegistryEntry)) {
            loadContext.addDependency(urlOrRegistryEntry);
            return registryEntry.onReady;
          }
          return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
        }
        loadContext.addDependency(urlOrRegistryEntry);
        registryEntry.onReady = _this8.loadTemplateResources(registryEntry, compileInstruction, loadContext).then(function(resources) {
          registryEntry.resources = resources;
          var viewFactory = _this8.viewCompiler.compile(registryEntry.template, resources, compileInstruction);
          registryEntry.factory = viewFactory;
          return viewFactory;
        });
        return registryEntry.onReady;
      });
    };
    ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext) {
      var resources = new ViewResources(this.appResources, registryEntry.address);
      var dependencies = registryEntry.dependencies;
      var importIds = void 0;
      var names = void 0;
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
        return Promise.resolve(resources);
      }
      importIds = dependencies.map(function(x) {
        return x.src;
      });
      names = dependencies.map(function(x) {
        return x.name;
      });
      logger.debug('importing resources for ' + registryEntry.address, importIds);
      return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
    };
    ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
      var _this9 = this;
      return this.loader.loadModule(moduleImport).then(function(viewModelModule) {
        var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId;
        var resourceModule = _this9.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
        if (!resourceModule.mainResource) {
          throw new Error('No view model found in module "' + moduleImport + '".');
        }
        resourceModule.initialize(_this9.container);
        return resourceModule.mainResource;
      });
    };
    ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
      var _this10 = this;
      loadContext = loadContext || new ResourceLoadContext();
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      moduleIds = moduleIds.map(function(x) {
        return _this10._applyLoaderPlugin(x);
      });
      return this.loader.loadAllModules(moduleIds).then(function(imports) {
        var i = void 0;
        var ii = void 0;
        var analysis = void 0;
        var normalizedId = void 0;
        var current = void 0;
        var associatedModule = void 0;
        var container = _this10.container;
        var moduleAnalyzer = _this10.moduleAnalyzer;
        var allAnalysis = new Array(imports.length);
        for (i = 0, ii = imports.length; i < ii; ++i) {
          current = imports[i];
          normalizedId = _aureliaMetadata.Origin.get(current).moduleId;
          analysis = moduleAnalyzer.analyze(normalizedId, current);
          analysis.initialize(container);
          analysis.register(resources, names[i]);
          allAnalysis[i] = analysis;
        }
        if (compileInstruction.associatedModuleId) {
          associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);
          if (associatedModule) {
            associatedModule.register(resources);
          }
        }
        for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
          allAnalysis[i] = allAnalysis[i].load(container, loadContext);
        }
        return Promise.all(allAnalysis).then(function() {
          return resources;
        });
      });
    };
    ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
      var index = id.lastIndexOf('.');
      if (index !== -1) {
        var ext = id.substring(index);
        var pluginName = this._pluginMap[ext];
        if (pluginName === undefined) {
          return id;
        }
        return this.loader.applyPluginToUrl(id, pluginName);
      }
      return id;
    };
    return ViewEngine;
  }()) || _class14);
  var Controller = exports.Controller = function() {
    function Controller(behavior, instruction, viewModel, elementEvents) {
      _classCallCheck(this, Controller);
      this.behavior = behavior;
      this.instruction = instruction;
      this.viewModel = viewModel;
      this.isAttached = false;
      this.view = null;
      this.isBound = false;
      this.scope = null;
      this.elementEvents = elementEvents || null;
      var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
      var handlesBind = behavior.handlesBind;
      var attributes = instruction.attributes;
      var boundProperties = this.boundProperties = [];
      var properties = behavior.properties;
      var i = void 0;
      var ii = void 0;
      behavior._ensurePropertiesDefined(viewModel, observerLookup);
      for (i = 0, ii = properties.length; i < ii; ++i) {
        properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
      }
    }
    Controller.prototype.created = function created(owningView) {
      if (this.behavior.handlesCreated) {
        this.viewModel.created(owningView, this.view);
      }
    };
    Controller.prototype.automate = function automate(overrideContext, owningView) {
      this.view.bindingContext = this.viewModel;
      this.view.overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)(this.viewModel);
      this.view._isUserControlled = true;
      if (this.behavior.handlesCreated) {
        this.viewModel.created(owningView || null, this.view);
      }
      this.bind(this.view);
    };
    Controller.prototype.bind = function bind(scope) {
      var skipSelfSubscriber = this.behavior.handlesBind;
      var boundProperties = this.boundProperties;
      var i = void 0;
      var ii = void 0;
      var x = void 0;
      var observer = void 0;
      var selfSubscriber = void 0;
      if (this.isBound) {
        if (this.scope === scope) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.scope = scope;
      for (i = 0, ii = boundProperties.length; i < ii; ++i) {
        x = boundProperties[i];
        observer = x.observer;
        selfSubscriber = observer.selfSubscriber;
        observer.publishing = false;
        if (skipSelfSubscriber) {
          observer.selfSubscriber = null;
        }
        x.binding.bind(scope);
        observer.call();
        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      }
      var overrideContext = void 0;
      if (this.view !== null) {
        if (skipSelfSubscriber) {
          this.view.viewModelScope = scope;
        }
        if (this.viewModel === scope.overrideContext.bindingContext) {
          overrideContext = scope.overrideContext;
        } else if (this.instruction.inheritBindingContext) {
          overrideContext = (0, _aureliaBinding.createOverrideContext)(this.viewModel, scope.overrideContext);
        } else {
          overrideContext = (0, _aureliaBinding.createOverrideContext)(this.viewModel);
          overrideContext.__parentOverrideContext = scope.overrideContext;
        }
        this.view.bind(this.viewModel, overrideContext);
      } else if (skipSelfSubscriber) {
        overrideContext = scope.overrideContext;
        if (scope.overrideContext.__parentOverrideContext !== undefined && this.viewModel.viewFactory && this.viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
          overrideContext = Object.assign({}, scope.overrideContext);
          overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
        }
        this.viewModel.bind(scope.bindingContext, overrideContext);
      }
    };
    Controller.prototype.unbind = function unbind() {
      if (this.isBound) {
        var boundProperties = this.boundProperties;
        var i = void 0;
        var ii = void 0;
        this.isBound = false;
        this.scope = null;
        if (this.view !== null) {
          this.view.unbind();
        }
        if (this.behavior.handlesUnbind) {
          this.viewModel.unbind();
        }
        if (this.elementEvents !== null) {
          this.elementEvents.disposeAll();
        }
        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          boundProperties[i].binding.unbind();
        }
      }
    };
    Controller.prototype.attached = function attached() {
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      if (this.behavior.handlesAttached) {
        this.viewModel.attached();
      }
      if (this.view !== null) {
        this.view.attached();
      }
    };
    Controller.prototype.detached = function detached() {
      if (this.isAttached) {
        this.isAttached = false;
        if (this.view !== null) {
          this.view.detached();
        }
        if (this.behavior.handlesDetached) {
          this.viewModel.detached();
        }
      }
    };
    return Controller;
  }();
  var BehaviorPropertyObserver = exports.BehaviorPropertyObserver = (_dec8 = (0, _aureliaBinding.subscriberCollection)(), _dec8(_class16 = function() {
    function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
      _classCallCheck(this, BehaviorPropertyObserver);
      this.taskQueue = taskQueue;
      this.obj = obj;
      this.propertyName = propertyName;
      this.notqueued = true;
      this.publishing = false;
      this.selfSubscriber = selfSubscriber;
      this.currentValue = this.oldValue = initialValue;
    }
    BehaviorPropertyObserver.prototype.getValue = function getValue() {
      return this.currentValue;
    };
    BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
      var oldValue = this.currentValue;
      if (oldValue !== newValue) {
        if (this.publishing && this.notqueued) {
          this.notqueued = false;
          this.taskQueue.queueMicroTask(this);
        }
        this.oldValue = oldValue;
        this.currentValue = newValue;
      }
    };
    BehaviorPropertyObserver.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.currentValue;
      this.notqueued = true;
      if (newValue === oldValue) {
        return;
      }
      if (this.selfSubscriber) {
        this.selfSubscriber(newValue, oldValue);
      }
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    return BehaviorPropertyObserver;
  }()) || _class16);
  function getObserver(behavior, instance, name) {
    var lookup = instance.__observers__;
    if (lookup === undefined) {
      if (!behavior.isInitialized) {
        behavior.initialize(_aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container(), instance.constructor);
      }
      lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
      behavior._ensurePropertiesDefined(instance, lookup);
    }
    return lookup[name];
  }
  var BindableProperty = exports.BindableProperty = function() {
    function BindableProperty(nameOrConfig) {
      _classCallCheck(this, BindableProperty);
      if (typeof nameOrConfig === 'string') {
        this.name = nameOrConfig;
      } else {
        Object.assign(this, nameOrConfig);
      }
      this.attribute = this.attribute || _hyphenate(this.name);
      if (this.defaultBindingMode === null || this.defaultBindingMode === undefined) {
        this.defaultBindingMode = _aureliaBinding.bindingMode.oneWay;
      }
      this.changeHandler = this.changeHandler || null;
      this.owner = null;
      this.descriptor = null;
    }
    BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
      behavior.properties.push(this);
      behavior.attributes[this.attribute] = this;
      this.owner = behavior;
      if (descriptor) {
        this.descriptor = descriptor;
        return this._configureDescriptor(behavior, descriptor);
      }
    };
    BindableProperty.prototype._configureDescriptor = function _configureDescriptor(behavior, descriptor) {
      var name = this.name;
      descriptor.configurable = true;
      descriptor.enumerable = true;
      if ('initializer' in descriptor) {
        this.defaultValue = descriptor.initializer;
        delete descriptor.initializer;
        delete descriptor.writable;
      }
      if ('value' in descriptor) {
        this.defaultValue = descriptor.value;
        delete descriptor.value;
        delete descriptor.writable;
      }
      descriptor.get = function() {
        return getObserver(behavior, this, name).getValue();
      };
      descriptor.set = function(value) {
        getObserver(behavior, this, name).setValue(value);
      };
      descriptor.get.getObserver = function(obj) {
        return getObserver(behavior, obj, name);
      };
      return descriptor;
    };
    BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
      var name = this.name;
      var handlerName = void 0;
      if (this.changeHandler === null) {
        handlerName = name + 'Changed';
        if (handlerName in target.prototype) {
          this.changeHandler = handlerName;
        }
      }
      if (this.descriptor === null) {
        Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
      }
    };
    BindableProperty.prototype.createObserver = function createObserver(viewModel) {
      var selfSubscriber = null;
      var defaultValue = this.defaultValue;
      var changeHandlerName = this.changeHandler;
      var name = this.name;
      var initialValue = void 0;
      if (this.hasOptions) {
        return undefined;
      }
      if (changeHandlerName in viewModel) {
        if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            viewModel[changeHandlerName](newValue, oldValue);
            viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel[changeHandlerName](newValue, oldValue);
          };
        }
      } else if ('propertyChanged' in viewModel) {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          return viewModel.propertyChanged(name, newValue, oldValue);
        };
      } else if (changeHandlerName !== null) {
        throw new Error('Change handler ' + changeHandlerName + ' was specified but not declared on the class.');
      }
      if (defaultValue !== undefined) {
        initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
      }
      return new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, this.name, selfSubscriber, initialValue);
    };
    BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
      var selfSubscriber = void 0;
      var observer = void 0;
      var attribute = void 0;
      var defaultValue = this.defaultValue;
      if (this.isDynamic) {
        for (var key in attributes) {
          this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
        }
      } else if (!this.hasOptions) {
        observer = observerLookup[this.name];
        if (attributes !== null) {
          selfSubscriber = observer.selfSubscriber;
          attribute = attributes[this.attribute];
          if (behaviorHandlesBind) {
            observer.selfSubscriber = null;
          }
          if (typeof attribute === 'string') {
            viewModel[this.name] = attribute;
            observer.call();
          } else if (attribute) {
            boundProperties.push({
              observer: observer,
              binding: attribute.createBinding(viewModel)
            });
          } else if (defaultValue !== undefined) {
            observer.call();
          }
          observer.selfSubscriber = selfSubscriber;
        }
        observer.publishing = true;
      }
    };
    BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
      var changeHandlerName = name + 'Changed';
      var selfSubscriber = null;
      var observer = void 0;
      var info = void 0;
      if (changeHandlerName in viewModel) {
        if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            viewModel[changeHandlerName](newValue, oldValue);
            viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel[changeHandlerName](newValue, oldValue);
          };
        }
      } else if ('propertyChanged' in viewModel) {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          return viewModel.propertyChanged(name, newValue, oldValue);
        };
      }
      observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, name, selfSubscriber);
      Object.defineProperty(viewModel, name, {
        configurable: true,
        enumerable: true,
        get: observer.getValue.bind(observer),
        set: observer.setValue.bind(observer)
      });
      if (behaviorHandlesBind) {
        observer.selfSubscriber = null;
      }
      if (typeof attribute === 'string') {
        viewModel[name] = attribute;
        observer.call();
      } else if (attribute) {
        info = {
          observer: observer,
          binding: attribute.createBinding(viewModel)
        };
        boundProperties.push(info);
      }
      observer.publishing = true;
      observer.selfSubscriber = selfSubscriber;
    };
    return BindableProperty;
  }();
  var contentSelectorViewCreateInstruction = {enhance: false};
  var lastProviderId = 0;
  function nextProviderId() {
    return ++lastProviderId;
  }
  function doProcessContent() {
    return true;
  }
  function doProcessAttributes() {}
  var HtmlBehaviorResource = exports.HtmlBehaviorResource = function() {
    function HtmlBehaviorResource() {
      _classCallCheck(this, HtmlBehaviorResource);
      this.elementName = null;
      this.attributeName = null;
      this.attributeDefaultBindingMode = undefined;
      this.liftsContent = false;
      this.targetShadowDOM = false;
      this.processAttributes = doProcessAttributes;
      this.processContent = doProcessContent;
      this.usesShadowDOM = false;
      this.childBindings = null;
      this.hasDynamicOptions = false;
      this.containerless = false;
      this.properties = [];
      this.attributes = {};
      this.isInitialized = false;
    }
    HtmlBehaviorResource.convention = function convention(name, existing) {
      var behavior = void 0;
      if (name.endsWith('CustomAttribute')) {
        behavior = existing || new HtmlBehaviorResource();
        behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
      }
      if (name.endsWith('CustomElement')) {
        behavior = existing || new HtmlBehaviorResource();
        behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
      }
      return behavior;
    };
    HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
      if (this.childBindings === null) {
        this.childBindings = [];
      }
      this.childBindings.push(behavior);
    };
    HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
      var proto = target.prototype;
      var properties = this.properties;
      var attributeName = this.attributeName;
      var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
      var i = void 0;
      var ii = void 0;
      var current = void 0;
      if (this.isInitialized) {
        return;
      }
      this.isInitialized = true;
      target.__providerId__ = nextProviderId();
      this.observerLocator = container.get(_aureliaBinding.ObserverLocator);
      this.taskQueue = container.get(_aureliaTaskQueue.TaskQueue);
      this.target = target;
      this.usesShadowDOM = this.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
      this.handlesCreated = 'created' in proto;
      this.handlesBind = 'bind' in proto;
      this.handlesUnbind = 'unbind' in proto;
      this.handlesAttached = 'attached' in proto;
      this.handlesDetached = 'detached' in proto;
      this.htmlName = this.elementName || this.attributeName;
      if (attributeName !== null) {
        if (properties.length === 0) {
          new BindableProperty({
            name: 'value',
            changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
            attribute: attributeName,
            defaultBindingMode: attributeDefaultBindingMode
          }).registerWith(target, this);
        }
        current = properties[0];
        if (properties.length === 1 && current.name === 'value') {
          current.isDynamic = current.hasOptions = this.hasDynamicOptions;
          current.defineOn(target, this);
        } else {
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].defineOn(target, this);
          }
          current = new BindableProperty({
            name: 'value',
            changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
            attribute: attributeName,
            defaultBindingMode: attributeDefaultBindingMode
          });
          current.hasOptions = true;
          current.registerWith(target, this);
        }
      } else {
        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i].defineOn(target, this);
        }
      }
    };
    HtmlBehaviorResource.prototype.register = function register(registry, name) {
      if (this.attributeName !== null) {
        registry.registerAttribute(name || this.attributeName, this, this.attributeName);
      }
      if (this.elementName !== null) {
        registry.registerElement(name || this.elementName, this);
      }
    };
    HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
      var _this11 = this;
      var options = void 0;
      if (this.elementName !== null) {
        viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || this.viewStrategy || target);
        options = new ViewCompileInstruction(this.targetShadowDOM, true);
        if (!viewStrategy.moduleId) {
          viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
        }
        return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext).then(function(viewFactory) {
          if (!transientView || !_this11.viewFactory) {
            _this11.viewFactory = viewFactory;
          }
          return viewFactory;
        });
      }
      return Promise.resolve(this);
    };
    HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
      if (this.liftsContent) {
        if (!instruction.viewFactory) {
          var template = _aureliaPal.DOM.createElement('template');
          var fragment = _aureliaPal.DOM.createDocumentFragment();
          var cacheSize = node.getAttribute('view-cache');
          var part = node.getAttribute('part');
          node.removeAttribute(instruction.originalAttrName);
          _aureliaPal.DOM.replaceNode(template, node, parentNode);
          fragment.appendChild(node);
          instruction.viewFactory = compiler.compile(fragment, resources);
          if (part) {
            instruction.viewFactory.part = part;
            node.removeAttribute('part');
          }
          if (cacheSize) {
            instruction.viewFactory.setCacheSize(cacheSize);
            node.removeAttribute('view-cache');
          }
          node = template;
        }
      } else if (this.elementName !== null) {
        var _partReplacements2 = {};
        if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
          if (this.usesShadowDOM) {
            var currentChild = node.firstChild;
            var nextSibling = void 0;
            var toReplace = void 0;
            while (currentChild) {
              nextSibling = currentChild.nextSibling;
              if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                _aureliaPal.DOM.removeNode(currentChild, parentNode);
                instruction.partReplacements = _partReplacements2;
              }
              currentChild = nextSibling;
            }
            instruction.skipContentProcessing = false;
          } else {
            var _fragment = _aureliaPal.DOM.createDocumentFragment();
            var _currentChild = node.firstChild;
            var _nextSibling = void 0;
            var _toReplace = void 0;
            while (_currentChild) {
              _nextSibling = _currentChild.nextSibling;
              if (_currentChild.tagName === 'TEMPLATE' && (_toReplace = _currentChild.getAttribute('replace-part'))) {
                _partReplacements2[_toReplace] = compiler.compile(_currentChild, resources);
                _aureliaPal.DOM.removeNode(_currentChild, parentNode);
                instruction.partReplacements = _partReplacements2;
              } else {
                _fragment.appendChild(_currentChild);
              }
              _currentChild = _nextSibling;
            }
            instruction.contentFactory = compiler.compile(_fragment, resources);
            instruction.skipContentProcessing = true;
          }
        } else {
          instruction.skipContentProcessing = true;
        }
      }
      return node;
    };
    HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
      var host = void 0;
      var au = null;
      instruction = instruction || BehaviorInstruction.normal;
      element = element || null;
      bindings = bindings || null;
      if (this.elementName !== null && element) {
        if (this.usesShadowDOM) {
          host = element.createShadowRoot();
          container.registerInstance(_aureliaPal.DOM.boundary, host);
        } else {
          host = element;
          if (this.targetShadowDOM) {
            container.registerInstance(_aureliaPal.DOM.boundary, host);
          }
        }
      }
      if (element !== null) {
        element.au = au = element.au || {};
      }
      var viewModel = instruction.viewModel || container.get(this.target);
      var controller = new Controller(this, instruction, viewModel, container.elementEvents);
      var childBindings = this.childBindings;
      var viewFactory = void 0;
      if (this.liftsContent) {
        au.controller = controller;
      } else if (this.elementName !== null) {
        viewFactory = instruction.viewFactory || this.viewFactory;
        container.viewModel = viewModel;
        if (viewFactory) {
          controller.view = viewFactory.create(container, instruction, element);
        }
        if (element !== null) {
          au.controller = controller;
          if (controller.view) {
            if (!this.usesShadowDOM) {
              if (instruction.contentFactory) {
                var contentView = instruction.contentFactory.create(container, contentSelectorViewCreateInstruction);
                _ContentSelector.applySelectors(contentView, controller.view.contentSelectors, function(contentSelector, group) {
                  return contentSelector.add(group);
                });
                controller.contentView = contentView;
              }
            }
            if (instruction.anchorIsContainer) {
              if (childBindings !== null) {
                for (var i = 0,
                    ii = childBindings.length; i < ii; ++i) {
                  controller.view.addBinding(childBindings[i].create(element, viewModel));
                }
              }
              controller.view.appendNodesTo(host);
            } else {
              controller.view.insertNodesBefore(host);
            }
          } else if (childBindings !== null) {
            for (var _i2 = 0,
                _ii2 = childBindings.length; _i2 < _ii2; ++_i2) {
              bindings.push(childBindings[_i2].create(element, viewModel));
            }
          }
        } else if (controller.view) {
          controller.view.controller = controller;
          if (childBindings !== null) {
            for (var _i3 = 0,
                _ii3 = childBindings.length; _i3 < _ii3; ++_i3) {
              controller.view.addBinding(childBindings[_i3].create(instruction.host, viewModel));
            }
          }
        } else if (childBindings !== null) {
          for (var _i4 = 0,
              _ii4 = childBindings.length; _i4 < _ii4; ++_i4) {
            bindings.push(childBindings[_i4].create(instruction.host, viewModel));
          }
        }
      } else if (childBindings !== null) {
        for (var _i5 = 0,
            _ii5 = childBindings.length; _i5 < _ii5; ++_i5) {
          bindings.push(childBindings[_i5].create(element, viewModel));
        }
      }
      if (au !== null) {
        au[this.htmlName] = controller;
      }
      if (instruction.initiatedByBehavior && viewFactory) {
        controller.view.created();
      }
      return controller;
    };
    HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
      var properties = void 0;
      var i = void 0;
      var ii = void 0;
      var observer = void 0;
      if ('__propertiesDefined__' in lookup) {
        return;
      }
      lookup.__propertiesDefined__ = true;
      properties = this.properties;
      for (i = 0, ii = properties.length; i < ii; ++i) {
        observer = properties[i].createObserver(instance);
        if (observer !== undefined) {
          lookup[observer.propertyName] = observer;
        }
      }
    };
    return HtmlBehaviorResource;
  }();
  function createChildObserverDecorator(selectorOrConfig, all) {
    return function(target, key, descriptor) {
      var actualTarget = typeof key === 'string' ? target.constructor : target;
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
      if (typeof selectorOrConfig === 'string') {
        selectorOrConfig = {
          selector: selectorOrConfig,
          name: key
        };
      }
      if (descriptor) {
        descriptor.writable = true;
      }
      selectorOrConfig.all = all;
      r.addChildBinding(new ChildObserver(selectorOrConfig));
    };
  }
  function children(selectorOrConfig) {
    return createChildObserverDecorator(selectorOrConfig, true);
  }
  function child(selectorOrConfig) {
    return createChildObserverDecorator(selectorOrConfig, false);
  }
  var ChildObserver = function() {
    function ChildObserver(config) {
      _classCallCheck(this, ChildObserver);
      this.name = config.name;
      this.changeHandler = config.changeHandler || this.name + 'Changed';
      this.selector = config.selector;
      this.all = config.all;
    }
    ChildObserver.prototype.create = function create(target, viewModel) {
      return new ChildObserverBinder(this.selector, target, this.name, viewModel, this.changeHandler, this.all);
    };
    return ChildObserver;
  }();
  var noMutations = [];
  function trackMutation(groupedMutations, binder, record) {
    var mutations = groupedMutations.get(binder);
    if (!mutations) {
      mutations = [];
      groupedMutations.set(binder, mutations);
    }
    mutations.push(record);
  }
  function onChildChange(mutations, observer) {
    var binders = observer.binders;
    var bindersLength = binders.length;
    var groupedMutations = new Map();
    for (var i = 0,
        ii = mutations.length; i < ii; ++i) {
      var record = mutations[i];
      var added = record.addedNodes;
      var removed = record.removedNodes;
      for (var j = 0,
          jj = removed.length; j < jj; ++j) {
        var node = removed[j];
        if (node.nodeType === 1) {
          for (var k = 0; k < bindersLength; ++k) {
            var binder = binders[k];
            if (binder.onRemove(node)) {
              trackMutation(groupedMutations, binder, record);
            }
          }
        }
      }
      for (var _j = 0,
          _jj = added.length; _j < _jj; ++_j) {
        var _node = added[_j];
        if (_node.nodeType === 1) {
          for (var _k = 0; _k < bindersLength; ++_k) {
            var _binder = binders[_k];
            if (_binder.onAdd(_node)) {
              trackMutation(groupedMutations, _binder, record);
            }
          }
        }
      }
    }
    groupedMutations.forEach(function(value, key) {
      if (key.changeHandler !== null) {
        key.viewModel[key.changeHandler](value);
      }
    });
  }
  var ChildObserverBinder = function() {
    function ChildObserverBinder(selector, target, property, viewModel, changeHandler, all) {
      _classCallCheck(this, ChildObserverBinder);
      this.selector = selector;
      this.target = target;
      this.property = property;
      this.viewModel = viewModel;
      this.changeHandler = changeHandler in viewModel ? changeHandler : null;
      this.all = all;
    }
    ChildObserverBinder.prototype.bind = function bind(source) {
      var target = this.target;
      var viewModel = this.viewModel;
      var selector = this.selector;
      var current = target.firstElementChild;
      var observer = target.__childObserver__;
      if (!observer) {
        observer = target.__childObserver__ = _aureliaPal.DOM.createMutationObserver(onChildChange);
        observer.observe(target, {childList: true});
        observer.binders = [];
      }
      observer.binders.push(this);
      if (this.all) {
        var items = viewModel[this.property];
        if (!items) {
          items = viewModel[this.property] = [];
        } else {
          items.length = 0;
        }
        while (current) {
          if (current.matches(selector)) {
            items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
          }
          current = current.nextElementSibling;
        }
        if (this.changeHandler !== null) {
          this.viewModel[this.changeHandler](noMutations);
        }
      } else {
        while (current) {
          if (current.matches(selector)) {
            var value = current.au && current.au.controller ? current.au.controller.viewModel : current;
            this.viewModel[this.property] = value;
            if (this.changeHandler !== null) {
              this.viewModel[this.changeHandler](value);
            }
            break;
          }
          current = current.nextElementSibling;
        }
      }
    };
    ChildObserverBinder.prototype.onRemove = function onRemove(element) {
      if (element.matches(this.selector)) {
        var value = element.au && element.au.controller ? element.au.controller.viewModel : element;
        if (this.all) {
          var items = this.viewModel[this.property];
          var index = items.indexOf(value);
          if (index !== -1) {
            items.splice(index, 1);
          }
          return true;
        }
        return false;
      }
    };
    ChildObserverBinder.prototype.onAdd = function onAdd(element) {
      var selector = this.selector;
      if (element.matches(selector)) {
        var value = element.au && element.au.controller ? element.au.controller.viewModel : element;
        if (this.all) {
          var items = this.viewModel[this.property];
          var index = 0;
          var prev = element.previousElementSibling;
          while (prev) {
            if (prev.matches(selector)) {
              index++;
            }
            prev = prev.previousElementSibling;
          }
          items.splice(index, 0, value);
          return true;
        }
        this.viewModel[this.property] = value;
        if (this.changeHandler !== null) {
          this.viewModel[this.changeHandler](value);
        }
      }
      return false;
    };
    ChildObserverBinder.prototype.unbind = function unbind() {
      if (this.target.__childObserver__) {
        this.target.__childObserver__.disconnect();
        this.target.__childObserver__ = null;
      }
    };
    return ChildObserverBinder;
  }();
  function tryActivateViewModel(context) {
    if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
      return Promise.resolve();
    }
    return context.viewModel.activate(context.model) || Promise.resolve();
  }
  var CompositionEngine = exports.CompositionEngine = (_dec9 = (0, _aureliaDependencyInjection.inject)(ViewEngine, ViewLocator), _dec9(_class17 = function() {
    function CompositionEngine(viewEngine, viewLocator) {
      _classCallCheck(this, CompositionEngine);
      this.viewEngine = viewEngine;
      this.viewLocator = viewLocator;
    }
    CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
      function swap(controller) {
        return Promise.resolve(context.viewSlot.removeAll(true)).then(function() {
          if (context.currentController) {
            context.currentController.unbind();
          }
          context.viewSlot.add(controller.view);
          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }
          return controller;
        });
      }
      return this.createController(context).then(function(controller) {
        controller.automate(context.overrideContext, context.owningView);
        if (context.compositionTransactionOwnershipToken) {
          return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function() {
            return swap(controller);
          });
        }
        return swap(controller);
      });
    };
    CompositionEngine.prototype.createController = function createController(context) {
      var _this12 = this;
      var childContainer = void 0;
      var viewModel = void 0;
      var viewModelResource = void 0;
      var m = void 0;
      return this.ensureViewModel(context).then(tryActivateViewModel).then(function() {
        childContainer = context.childContainer;
        viewModel = context.viewModel;
        viewModelResource = context.viewModelResource;
        m = viewModelResource.metadata;
        var viewStrategy = _this12.viewLocator.getViewStrategy(context.view || viewModel);
        if (context.viewResources) {
          viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
        }
        return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
      }).then(function(viewFactory) {
        return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
      });
    };
    CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
      var childContainer = context.childContainer = context.childContainer || context.container.createChild();
      if (typeof context.viewModel === 'string') {
        context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;
        return this.viewEngine.importViewModelResource(context.viewModel).then(function(viewModelResource) {
          childContainer.autoRegister(viewModelResource.value);
          if (context.host) {
            childContainer.registerInstance(_aureliaPal.DOM.Element, context.host);
          }
          context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
          context.viewModelResource = viewModelResource;
          return context;
        });
      }
      var m = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, context.viewModel.constructor);
      m.elementName = m.elementName || 'dynamic-element';
      m.initialize(context.container || childContainer, context.viewModel.constructor);
      context.viewModelResource = {
        metadata: m,
        value: context.viewModel.constructor
      };
      childContainer.viewModel = context.viewModel;
      return Promise.resolve(context);
    };
    CompositionEngine.prototype.compose = function compose(context) {
      context.childContainer = context.childContainer || context.container.createChild();
      context.view = this.viewLocator.getViewStrategy(context.view);
      var transaction = context.childContainer.get(CompositionTransaction);
      var compositionTransactionOwnershipToken = transaction.tryCapture();
      if (compositionTransactionOwnershipToken) {
        context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
      } else {
        context.compositionTransactionNotifier = transaction.enlist();
      }
      if (context.viewModel) {
        return this._createControllerAndSwap(context);
      } else if (context.view) {
        if (context.viewResources) {
          context.view.makeRelativeTo(context.viewResources.viewUrl);
        }
        return context.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function(viewFactory) {
          var result = viewFactory.create(context.childContainer);
          result.bind(context.bindingContext, context.overrideContext);
          var work = function work() {
            return Promise.resolve(context.viewSlot.removeAll(true)).then(function() {
              context.viewSlot.add(result);
              if (context.compositionTransactionNotifier) {
                context.compositionTransactionNotifier.done();
              }
              return result;
            });
          };
          if (context.compositionTransactionOwnershipToken) {
            return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(work);
          }
          return work();
        });
      } else if (context.viewSlot) {
        context.viewSlot.removeAll();
        if (context.compositionTransactionNotifier) {
          context.compositionTransactionNotifier.done();
        }
        return Promise.resolve(null);
      }
    };
    return CompositionEngine;
  }()) || _class17);
  var ElementConfigResource = exports.ElementConfigResource = function() {
    function ElementConfigResource() {
      _classCallCheck(this, ElementConfigResource);
    }
    ElementConfigResource.prototype.initialize = function initialize(container, target) {};
    ElementConfigResource.prototype.register = function register(registry, name) {};
    ElementConfigResource.prototype.load = function load(container, target) {
      var config = new target();
      var eventManager = container.get(_aureliaBinding.EventManager);
      eventManager.registerElementConfig(config);
    };
    return ElementConfigResource;
  }();
  function validateBehaviorName(name, type) {
    if (/[A-Z]/.test(name)) {
      var newName = _hyphenate(name);
      LogManager.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
      return newName;
    }
    return name;
  }
  function resource(instance) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, instance, target);
    };
  }
  function behavior(override) {
    return function(target) {
      if (override instanceof HtmlBehaviorResource) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, override, target);
      } else {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        Object.assign(r, override);
      }
    };
  }
  function customElement(name) {
    return function(target) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
      r.elementName = validateBehaviorName(name, 'custom element');
    };
  }
  function customAttribute(name, defaultBindingMode) {
    return function(target) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
      r.attributeName = validateBehaviorName(name, 'custom attribute');
      r.attributeDefaultBindingMode = defaultBindingMode;
    };
  }
  function templateController(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.liftsContent = true;
    };
    return target ? deco(target) : deco;
  }
  function bindable(nameOrConfigOrTarget, key, descriptor) {
    var deco = function deco(target, key2, descriptor2) {
      var actualTarget = key2 ? target.constructor : target;
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
      var prop = void 0;
      if (key2) {
        nameOrConfigOrTarget = nameOrConfigOrTarget || {};
        nameOrConfigOrTarget.name = key2;
      }
      prop = new BindableProperty(nameOrConfigOrTarget);
      return prop.registerWith(actualTarget, r, descriptor2);
    };
    if (!nameOrConfigOrTarget) {
      return deco;
    }
    if (key) {
      var target = nameOrConfigOrTarget;
      nameOrConfigOrTarget = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
  function dynamicOptions(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.hasDynamicOptions = true;
    };
    return target ? deco(target) : deco;
  }
  function useShadowDOM(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.targetShadowDOM = true;
    };
    return target ? deco(target) : deco;
  }
  function processAttributes(processor) {
    return function(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.processAttributes = processor;
    };
  }
  function doNotProcessContent() {
    return false;
  }
  function processContent(processor) {
    return function(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.processContent = processor || doNotProcessContent;
    };
  }
  function containerless(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.containerless = true;
    };
    return target ? deco(target) : deco;
  }
  function useViewStrategy(strategy) {
    return function(target) {
      _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
    };
  }
  function useView(path) {
    return useViewStrategy(new RelativeViewStrategy(path));
  }
  function inlineView(markup, dependencies, dependencyBaseUrl) {
    return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
  }
  function noView(target) {
    var deco = function deco(t) {
      _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(), t);
    };
    return target ? deco(target) : deco;
  }
  function elementConfig(target) {
    var deco = function deco(t) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
    };
    return target ? deco(target) : deco;
  }
  var TemplatingEngine = exports.TemplatingEngine = (_dec10 = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine), _dec10(_class18 = function() {
    function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
      _classCallCheck(this, TemplatingEngine);
      this._container = container;
      this._moduleAnalyzer = moduleAnalyzer;
      this._viewCompiler = viewCompiler;
      this._compositionEngine = compositionEngine;
      container.registerInstance(Animator, Animator.instance = new Animator());
    }
    TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
      this._container.unregister(Animator);
      this._container.registerInstance(Animator, Animator.instance = animator);
    };
    TemplatingEngine.prototype.compose = function compose(context) {
      return this._compositionEngine.compose(context);
    };
    TemplatingEngine.prototype.enhance = function enhance(instruction) {
      if (instruction instanceof _aureliaPal.DOM.Element) {
        instruction = {element: instruction};
      }
      var compilerInstructions = {};
      var resources = instruction.resources || this._container.get(ViewResources);
      this._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);
      var factory = new ViewFactory(instruction.element, compilerInstructions, resources);
      var container = instruction.container || this._container.createChild();
      var view = factory.create(container, BehaviorInstruction.enhance());
      view.bind(instruction.bindingContext || {}, instruction.overrideContext);
      return view;
    };
    TemplatingEngine.prototype.createControllerForUnitTest = function createControllerForUnitTest(viewModelType, attributesFromHTML) {
      var _moduleAnalyzer$analy;
      var exportName = viewModelType.name;
      var resourceModule = this._moduleAnalyzer.analyze('test-module', (_moduleAnalyzer$analy = {}, _moduleAnalyzer$analy[exportName] = viewModelType, _moduleAnalyzer$analy), exportName);
      var description = resourceModule.mainResource;
      description.initialize(this._container);
      var viewModel = this._container.get(viewModelType);
      var instruction = BehaviorInstruction.unitTest(description, attributesFromHTML);
      return new Controller(description.metadata, instruction, viewModel);
    };
    TemplatingEngine.prototype.createViewModelForUnitTest = function createViewModelForUnitTest(viewModelType, attributesFromHTML, bindingContext) {
      var controller = this.createControllerForUnitTest(viewModelType, attributesFromHTML);
      controller.bind((0, _aureliaBinding.createScopeForTest)(bindingContext));
      return controller.viewModel;
    };
    return TemplatingEngine;
  }()) || _class18);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating@1.0.0-beta.1.2.4", ["npm:aurelia-templating@1.0.0-beta.1.2.4/aurelia-templating"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-framework@1.0.0-beta.1.2.2/aurelia-framework", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-metadata@1.0.0-beta.1.2.0", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-task-queue@1.0.0-beta.1.2.0", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-logging@1.0.0-beta.1.2.0"], function(exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaMetadata, _aureliaTemplating, _aureliaLoader, _aureliaTaskQueue, _aureliaPath, _aureliaPal, _aureliaLogging) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.LogManager = exports.FrameworkConfiguration = exports.Aurelia = undefined;
  Object.keys(_aureliaDependencyInjection).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaDependencyInjection[key];
      }
    });
  });
  Object.keys(_aureliaBinding).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaBinding[key];
      }
    });
  });
  Object.keys(_aureliaMetadata).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaMetadata[key];
      }
    });
  });
  Object.keys(_aureliaTemplating).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaTemplating[key];
      }
    });
  });
  Object.keys(_aureliaLoader).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaLoader[key];
      }
    });
  });
  Object.keys(_aureliaTaskQueue).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaTaskQueue[key];
      }
    });
  });
  Object.keys(_aureliaPath).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaPath[key];
      }
    });
  });
  Object.keys(_aureliaPal).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _aureliaPal[key];
      }
    });
  });
  var TheLogManager = _interopRequireWildcard(_aureliaLogging);
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
  function preventActionlessFormSubmit() {
    _aureliaPal.DOM.addEventListener('submit', function(evt) {
      var target = evt.target;
      var action = target.action;
      if (target.tagName.toLowerCase() === 'form' && !action) {
        evt.preventDefault();
      }
    });
  }
  var Aurelia = exports.Aurelia = function() {
    function Aurelia(loader, container, resources) {
      _classCallCheck(this, Aurelia);
      this.loader = loader || new _aureliaPal.PLATFORM.Loader();
      this.container = container || new _aureliaDependencyInjection.Container().makeGlobal();
      this.resources = resources || new _aureliaTemplating.ViewResources();
      this.use = new FrameworkConfiguration(this);
      this.logger = TheLogManager.getLogger('aurelia');
      this.hostConfigured = false;
      this.host = null;
      this.use.instance(Aurelia, this);
      this.use.instance(_aureliaLoader.Loader, this.loader);
      this.use.instance(_aureliaTemplating.ViewResources, this.resources);
    }
    Aurelia.prototype.start = function start() {
      var _this = this;
      if (this.started) {
        return Promise.resolve(this);
      }
      this.started = true;
      this.logger.info('Aurelia Starting');
      return this.use.apply().then(function() {
        preventActionlessFormSubmit();
        if (!_this.container.hasResolver(_aureliaTemplating.BindingLanguage)) {
          var message = 'You must configure Aurelia with a BindingLanguage implementation.';
          _this.logger.error(message);
          throw new Error(message);
        }
        _this.logger.info('Aurelia Started');
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-started', {
          bubbles: true,
          cancelable: true
        });
        _aureliaPal.DOM.dispatchEvent(evt);
        return _this;
      });
    };
    Aurelia.prototype.enhance = function enhance() {
      var _this2 = this;
      var bindingContext = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      this._configureHost(applicationHost || _aureliaPal.DOM.querySelectorAll('body')[0]);
      return new Promise(function(resolve) {
        var engine = _this2.container.get(_aureliaTemplating.TemplatingEngine);
        _this2.root = engine.enhance({
          container: _this2.container,
          element: _this2.host,
          resources: _this2.resources,
          bindingContext: bindingContext
        });
        _this2.root.attached();
        _this2._onAureliaComposed();
        return _this2;
      });
    };
    Aurelia.prototype.setRoot = function setRoot() {
      var _this3 = this;
      var root = arguments.length <= 0 || arguments[0] === undefined ? 'app' : arguments[0];
      var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var instruction = {};
      if (this.root && this.root.viewModel && this.root.viewModel.router) {
        this.root.viewModel.router.deactivate();
        this.root.viewModel.router.reset();
      }
      this._configureHost(applicationHost);
      var engine = this.container.get(_aureliaTemplating.TemplatingEngine);
      var transaction = this.container.get(_aureliaTemplating.CompositionTransaction);
      delete transaction.initialComposition;
      instruction.viewModel = root;
      instruction.container = instruction.childContainer = this.container;
      instruction.viewSlot = this.hostSlot;
      instruction.host = this.host;
      return engine.compose(instruction).then(function(r) {
        _this3.root = r;
        instruction.viewSlot.attached();
        _this3._onAureliaComposed();
        return _this3;
      });
    };
    Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
      if (this.hostConfigured) {
        return;
      }
      applicationHost = applicationHost || this.host;
      if (!applicationHost || typeof applicationHost === 'string') {
        this.host = _aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
      } else {
        this.host = applicationHost;
      }
      if (!this.host) {
        throw new Error('No applicationHost was specified.');
      }
      this.hostConfigured = true;
      this.host.aurelia = this;
      this.hostSlot = new _aureliaTemplating.ViewSlot(this.host, true);
      this.hostSlot.transformChildNodesIntoView();
      this.container.registerInstance(_aureliaPal.DOM.boundary, this.host);
    };
    Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
      var evt = _aureliaPal.DOM.createCustomEvent('aurelia-composed', {
        bubbles: true,
        cancelable: true
      });
      setTimeout(function() {
        return _aureliaPal.DOM.dispatchEvent(evt);
      }, 1);
    };
    return Aurelia;
  }();
  var logger = TheLogManager.getLogger('aurelia');
  var extPattern = /\.[^/.]+$/;
  function runTasks(config, tasks) {
    var current = void 0;
    var next = function next() {
      if (current = tasks.shift()) {
        return Promise.resolve(current(config)).then(next);
      }
      return Promise.resolve();
    };
    return next();
  }
  function loadPlugin(config, loader, info) {
    logger.debug('Loading plugin ' + info.moduleId + '.');
    config.resourcesRelativeTo = info.resourcesRelativeTo;
    var id = info.moduleId;
    if (info.resourcesRelativeTo.length > 1) {
      return loader.normalize(info.moduleId, info.resourcesRelativeTo[1]).then(function(normalizedId) {
        return _loadPlugin(normalizedId);
      });
    }
    return _loadPlugin(id);
    function _loadPlugin(moduleId) {
      return loader.loadModule(moduleId).then(function(m) {
        if ('configure' in m) {
          return Promise.resolve(m.configure(config, info.config || {})).then(function() {
            config.resourcesRelativeTo = null;
            logger.debug('Configured plugin ' + info.moduleId + '.');
          });
        }
        config.resourcesRelativeTo = null;
        logger.debug('Loaded plugin ' + info.moduleId + '.');
      });
    }
  }
  function loadResources(aurelia, resourcesToLoad, appResources) {
    var viewEngine = aurelia.container.get(_aureliaTemplating.ViewEngine);
    return Promise.all(Object.keys(resourcesToLoad).map(function(n) {
      return _normalize(resourcesToLoad[n]);
    })).then(function(loads) {
      var names = [];
      var importIds = [];
      loads.forEach(function(l) {
        names.push(undefined);
        importIds.push(l.importId);
      });
      return viewEngine.importViewResources(importIds, names, appResources);
    });
    function _normalize(load) {
      var moduleId = load.moduleId;
      var ext = getExt(moduleId);
      if (isOtherResource(moduleId)) {
        moduleId = removeExt(moduleId);
      }
      return aurelia.loader.normalize(moduleId, load.relativeTo).then(function(normalized) {
        return {
          name: load.moduleId,
          importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
        };
      });
    }
    function isOtherResource(name) {
      var ext = getExt(name);
      if (!ext)
        return false;
      if (ext === '')
        return false;
      if (ext === '.js' || ext === '.ts')
        return false;
      return true;
    }
    function removeExt(name) {
      return name.replace(extPattern, '');
    }
    function addOriginalExt(normalized, ext) {
      return removeExt(normalized) + '.' + ext;
    }
  }
  function getExt(name) {
    var match = name.match(extPattern);
    if (match && match.length > 0) {
      return match[0].split('.')[1];
    }
  }
  function assertProcessed(plugins) {
    if (plugins.processed) {
      throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
    }
  }
  var FrameworkConfiguration = function() {
    function FrameworkConfiguration(aurelia) {
      var _this4 = this;
      _classCallCheck(this, FrameworkConfiguration);
      this.aurelia = aurelia;
      this.container = aurelia.container;
      this.info = [];
      this.processed = false;
      this.preTasks = [];
      this.postTasks = [];
      this.resourcesToLoad = {};
      this.preTask(function() {
        return aurelia.loader.normalize('aurelia-bootstrapper').then(function(name) {
          return _this4.bootstrapperName = name;
        });
      });
      this.postTask(function() {
        return loadResources(aurelia, _this4.resourcesToLoad, aurelia.resources);
      });
    }
    FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
      this.container.registerInstance(type, _instance);
      return this;
    };
    FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
      this.container.registerSingleton(type, implementation);
      return this;
    };
    FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
      this.container.registerTransient(type, implementation);
      return this;
    };
    FrameworkConfiguration.prototype.preTask = function preTask(task) {
      assertProcessed(this);
      this.preTasks.push(task);
      return this;
    };
    FrameworkConfiguration.prototype.postTask = function postTask(task) {
      assertProcessed(this);
      this.postTasks.push(task);
      return this;
    };
    FrameworkConfiguration.prototype.feature = function feature(plugin, config) {
      if (getExt(plugin)) {
        return this.plugin({
          moduleId: plugin,
          resourcesRelativeTo: [plugin, ''],
          config: config || {}
        });
      }
      return this.plugin({
        moduleId: plugin + '/index',
        resourcesRelativeTo: [plugin, ''],
        config: config || {}
      });
    };
    FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
      assertProcessed(this);
      var toAdd = Array.isArray(resources) ? resources : arguments;
      var resource = void 0;
      var path = void 0;
      var resourcesRelativeTo = this.resourcesRelativeTo || ['', ''];
      for (var i = 0,
          ii = toAdd.length; i < ii; ++i) {
        resource = toAdd[i];
        if (typeof resource !== 'string') {
          throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
        }
        var parent = resourcesRelativeTo[0];
        var grandParent = resourcesRelativeTo[1];
        var name = resource;
        if (resource.startsWith('./') && parent !== '') {
          name = parent + resource.substr(1);
        }
        this.resourcesToLoad[name] = {
          moduleId: name,
          relativeTo: grandParent
        };
      }
      return this;
    };
    FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
      assertProcessed(this);
      this.resourcesToLoad[resourcePath] = {
        moduleId: newName,
        relativeTo: ''
      };
      return this;
    };
    FrameworkConfiguration.prototype.plugin = function plugin(_plugin, config) {
      assertProcessed(this);
      if (typeof _plugin === 'string') {
        return this.plugin({
          moduleId: _plugin,
          resourcesRelativeTo: [_plugin, ''],
          config: config || {}
        });
      }
      this.info.push(_plugin);
      return this;
    };
    FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
      var _this5 = this;
      var plugin = {
        moduleId: name,
        resourcesRelativeTo: [name, ''],
        config: config || {}
      };
      this.plugin(plugin);
      this.preTask(function() {
        var relativeTo = [name, _this5.bootstrapperName];
        plugin.moduleId = name;
        plugin.resourcesRelativeTo = relativeTo;
        return Promise.resolve();
      });
      return this;
    };
    FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
      return this._addNormalizedPlugin('aurelia-templating-binding');
    };
    FrameworkConfiguration.prototype.router = function router() {
      return this._addNormalizedPlugin('aurelia-templating-router');
    };
    FrameworkConfiguration.prototype.history = function history() {
      return this._addNormalizedPlugin('aurelia-history-browser');
    };
    FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
      return this._addNormalizedPlugin('aurelia-templating-resources');
    };
    FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
      return this._addNormalizedPlugin('aurelia-event-aggregator');
    };
    FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
      return this.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
    };
    FrameworkConfiguration.prototype.developmentLogging = function developmentLogging() {
      var _this6 = this;
      this.preTask(function() {
        return _this6.aurelia.loader.normalize('aurelia-logging-console', _this6.bootstrapperName).then(function(name) {
          return _this6.aurelia.loader.loadModule(name).then(function(m) {
            TheLogManager.addAppender(new m.ConsoleAppender());
            TheLogManager.setLevel(TheLogManager.logLevel.debug);
          });
        });
      });
      return this;
    };
    FrameworkConfiguration.prototype.apply = function apply() {
      var _this7 = this;
      if (this.processed) {
        return Promise.resolve();
      }
      return runTasks(this, this.preTasks).then(function() {
        var loader = _this7.aurelia.loader;
        var info = _this7.info;
        var current = void 0;
        var next = function next() {
          if (current = info.shift()) {
            return loadPlugin(_this7, loader, current).then(next);
          }
          _this7.processed = true;
          return Promise.resolve();
        };
        return next().then(function() {
          return runTasks(_this7, _this7.postTasks);
        });
      });
    };
    return FrameworkConfiguration;
  }();
  exports.FrameworkConfiguration = FrameworkConfiguration;
  var LogManager = exports.LogManager = TheLogManager;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-framework@1.0.0-beta.1.2.2", ["npm:aurelia-framework@1.0.0-beta.1.2.2/aurelia-framework"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-fetch-client@1.0.0-beta.1.2.3/aurelia-fetch-client", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.json = json;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function json(body) {
    return new Blob([JSON.stringify(body)], {type: 'application/json'});
  }
  var HttpClientConfiguration = exports.HttpClientConfiguration = function() {
    function HttpClientConfiguration() {
      _classCallCheck(this, HttpClientConfiguration);
      this.baseUrl = '';
      this.defaults = {};
      this.interceptors = [];
    }
    HttpClientConfiguration.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
      return this;
    };
    HttpClientConfiguration.prototype.withDefaults = function withDefaults(defaults) {
      this.defaults = defaults;
      return this;
    };
    HttpClientConfiguration.prototype.withInterceptor = function withInterceptor(interceptor) {
      this.interceptors.push(interceptor);
      return this;
    };
    HttpClientConfiguration.prototype.useStandardConfiguration = function useStandardConfiguration() {
      var standardConfig = {credentials: 'same-origin'};
      Object.assign(this.defaults, standardConfig, this.defaults);
      return this.rejectErrorResponses();
    };
    HttpClientConfiguration.prototype.rejectErrorResponses = function rejectErrorResponses() {
      return this.withInterceptor({response: rejectOnError});
    };
    return HttpClientConfiguration;
  }();
  function rejectOnError(response) {
    if (!response.ok) {
      throw response;
    }
    return response;
  }
  var HttpClient = exports.HttpClient = function() {
    function HttpClient() {
      _classCallCheck(this, HttpClient);
      this.activeRequestCount = 0;
      this.isRequesting = false;
      this.isConfigured = false;
      this.baseUrl = '';
      this.defaults = null;
      this.interceptors = [];
      if (typeof fetch === 'undefined') {
        throw new Error('HttpClient requires a Fetch API implementation, but the current environment doesn\'t support it. You may need to load a polyfill such as https://github.com/github/fetch.');
      }
    }
    HttpClient.prototype.configure = function configure(config) {
      var _interceptors;
      var normalizedConfig = void 0;
      if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
        normalizedConfig = {defaults: config};
      } else if (typeof config === 'function') {
        normalizedConfig = new HttpClientConfiguration();
        var c = config(normalizedConfig);
        if (HttpClientConfiguration.prototype.isPrototypeOf(c)) {
          normalizedConfig = c;
        }
      } else {
        throw new Error('invalid config');
      }
      var defaults = normalizedConfig.defaults;
      if (defaults && Headers.prototype.isPrototypeOf(defaults.headers)) {
        throw new Error('Default headers must be a plain object.');
      }
      this.baseUrl = normalizedConfig.baseUrl;
      this.defaults = defaults;
      (_interceptors = this.interceptors).push.apply(_interceptors, normalizedConfig.interceptors || []);
      this.isConfigured = true;
      return this;
    };
    HttpClient.prototype.fetch = function(_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function() {
        return _fetch.toString();
      };
      return fetch;
    }(function(input, init) {
      var _this = this;
      trackRequestStart.call(this);
      var request = Promise.resolve().then(function() {
        return buildRequest.call(_this, input, init, _this.defaults);
      });
      var promise = processRequest(request, this.interceptors).then(function(result) {
        var response = null;
        if (Response.prototype.isPrototypeOf(result)) {
          response = result;
        } else if (Request.prototype.isPrototypeOf(result)) {
          request = Promise.resolve(result);
          response = fetch(result);
        } else {
          throw new Error('An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got [' + result + ']');
        }
        return request.then(function(_request) {
          return processResponse(response, _this.interceptors, _request);
        });
      });
      return trackRequestEndWith.call(this, promise);
    });
    return HttpClient;
  }();
  var absoluteUrlRegexp = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  function trackRequestStart() {
    this.isRequesting = !!++this.activeRequestCount;
  }
  function trackRequestEnd() {
    this.isRequesting = !!--this.activeRequestCount;
  }
  function trackRequestEndWith(promise) {
    var handle = trackRequestEnd.bind(this);
    promise.then(handle, handle);
    return promise;
  }
  function parseHeaderValues(headers) {
    var parsedHeaders = {};
    for (var name in headers || {}) {
      if (headers.hasOwnProperty(name)) {
        parsedHeaders[name] = typeof headers[name] === 'function' ? headers[name]() : headers[name];
      }
    }
    return parsedHeaders;
  }
  function buildRequest(input, init) {
    var defaults = this.defaults || {};
    var request = void 0;
    var body = void 0;
    var requestContentType = void 0;
    var parsedDefaultHeaders = parseHeaderValues(defaults.headers);
    if (Request.prototype.isPrototypeOf(input)) {
      request = input;
      requestContentType = new Headers(request.headers).get('Content-Type');
    } else {
      init || (init = {});
      body = init.body;
      var bodyObj = body ? {body: body} : null;
      var requestInit = Object.assign({}, defaults, {headers: {}}, init, bodyObj);
      requestContentType = new Headers(requestInit.headers).get('Content-Type');
      request = new Request(getRequestUrl(this.baseUrl, input), requestInit);
    }
    if (!requestContentType && new Headers(parsedDefaultHeaders).has('content-type')) {
      request.headers.set('Content-Type', new Headers(parsedDefaultHeaders).get('content-type'));
    }
    setDefaultHeaders(request.headers, parsedDefaultHeaders);
    if (body && Blob.prototype.isPrototypeOf(body) && body.type) {
      request.headers.set('Content-Type', body.type);
    }
    return request;
  }
  function getRequestUrl(baseUrl, url) {
    if (absoluteUrlRegexp.test(url)) {
      return url;
    }
    return (baseUrl || '') + url;
  }
  function setDefaultHeaders(headers, defaultHeaders) {
    for (var name in defaultHeaders || {}) {
      if (defaultHeaders.hasOwnProperty(name) && !headers.has(name)) {
        headers.set(name, defaultHeaders[name]);
      }
    }
  }
  function processRequest(request, interceptors) {
    return applyInterceptors(request, interceptors, 'request', 'requestError');
  }
  function processResponse(response, interceptors, request) {
    return applyInterceptors(response, interceptors, 'response', 'responseError', request);
  }
  function applyInterceptors(input, interceptors, successName, errorName) {
    for (var _len = arguments.length,
        interceptorArgs = Array(_len > 4 ? _len - 4 : 0),
        _key = 4; _key < _len; _key++) {
      interceptorArgs[_key - 4] = arguments[_key];
    }
    return (interceptors || []).reduce(function(chain, interceptor) {
      var successHandler = interceptor[successName];
      var errorHandler = interceptor[errorName];
      return chain.then(successHandler && function(value) {
        return successHandler.call.apply(successHandler, [interceptor, value].concat(interceptorArgs));
      }, errorHandler && function(reason) {
        return errorHandler.call.apply(errorHandler, [interceptor, reason].concat(interceptorArgs));
      });
    }, Promise.resolve(input));
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-fetch-client@1.0.0-beta.1.2.3", ["npm:aurelia-fetch-client@1.0.0-beta.1.2.3/aurelia-fetch-client"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator", ["exports", "npm:aurelia-logging@1.0.0-beta.1.2.0"], function(exports, _aureliaLogging) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.EventAggregator = undefined;
  exports.includeEventsIn = includeEventsIn;
  exports.configure = configure;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var logger = LogManager.getLogger('event-aggregator');
  var Handler = function() {
    function Handler(messageType, callback) {
      _classCallCheck(this, Handler);
      this.messageType = messageType;
      this.callback = callback;
    }
    Handler.prototype.handle = function handle(message) {
      if (message instanceof this.messageType) {
        this.callback.call(null, message);
      }
    };
    return Handler;
  }();
  var EventAggregator = exports.EventAggregator = function() {
    function EventAggregator() {
      _classCallCheck(this, EventAggregator);
      this.eventLookup = {};
      this.messageHandlers = [];
    }
    EventAggregator.prototype.publish = function publish(event, data) {
      var subscribers = void 0;
      var i = void 0;
      if (!event) {
        throw new Error('Event was invalid.');
      }
      if (typeof event === 'string') {
        subscribers = this.eventLookup[event];
        if (subscribers) {
          subscribers = subscribers.slice();
          i = subscribers.length;
          try {
            while (i--) {
              subscribers[i](data, event);
            }
          } catch (e) {
            logger.error(e);
          }
        }
      } else {
        subscribers = this.messageHandlers.slice();
        i = subscribers.length;
        try {
          while (i--) {
            subscribers[i].handle(event);
          }
        } catch (e) {
          logger.error(e);
        }
      }
    };
    EventAggregator.prototype.subscribe = function subscribe(event, callback) {
      var handler = void 0;
      var subscribers = void 0;
      if (!event) {
        throw new Error('Event channel/type was invalid.');
      }
      if (typeof event === 'string') {
        handler = callback;
        subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
      } else {
        handler = new Handler(event, callback);
        subscribers = this.messageHandlers;
      }
      subscribers.push(handler);
      return {dispose: function dispose() {
          var idx = subscribers.indexOf(handler);
          if (idx !== -1) {
            subscribers.splice(idx, 1);
          }
        }};
    };
    EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
      var sub = this.subscribe(event, function(a, b) {
        sub.dispose();
        return callback(a, b);
      });
      return sub;
    };
    return EventAggregator;
  }();
  function includeEventsIn(obj) {
    var ea = new EventAggregator();
    obj.subscribeOnce = function(event, callback) {
      return ea.subscribeOnce(event, callback);
    };
    obj.subscribe = function(event, callback) {
      return ea.subscribe(event, callback);
    };
    obj.publish = function(event, data) {
      ea.publish(event, data);
    };
    return ea;
  }
  function configure(config) {
    config.instance(EventAggregator, includeEventsIn(config.aurelia));
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-event-aggregator@1.0.0-beta.1.2.0", ["npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-dependency-injection@1.0.0-beta.1.2.2/aurelia-dependency-injection", ["exports", "npm:aurelia-metadata@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaMetadata, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Container = exports.InvocationHandler = exports._emptyParameters = exports.SingletonRegistration = exports.TransientRegistration = exports.FactoryInvoker = exports.Factory = exports.StrategyResolver = exports.Parent = exports.Optional = exports.All = exports.Lazy = exports.resolver = undefined;
  exports.invoker = invoker;
  exports.factory = factory;
  exports.registration = registration;
  exports.transient = transient;
  exports.singleton = singleton;
  exports.autoinject = autoinject;
  exports.inject = inject;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var _dec,
      _class,
      _dec2,
      _class2,
      _dec3,
      _class3,
      _dec4,
      _class4,
      _dec5,
      _class5,
      _dec6,
      _class6,
      _classInvokers;
  var resolver = exports.resolver = _aureliaMetadata.protocol.create('aurelia:resolver', function(target) {
    if (!(typeof target.get === 'function')) {
      return 'Resolvers must implement: get(container: Container, key: any): any';
    }
    return true;
  });
  var Lazy = exports.Lazy = (_dec = resolver(), _dec(_class = function() {
    function Lazy(key) {
      _classCallCheck(this, Lazy);
      this._key = key;
    }
    Lazy.prototype.get = function get(container) {
      var _this = this;
      return function() {
        return container.get(_this._key);
      };
    };
    Lazy.of = function of(key) {
      return new Lazy(key);
    };
    return Lazy;
  }()) || _class);
  var All = exports.All = (_dec2 = resolver(), _dec2(_class2 = function() {
    function All(key) {
      _classCallCheck(this, All);
      this._key = key;
    }
    All.prototype.get = function get(container) {
      return container.getAll(this._key);
    };
    All.of = function of(key) {
      return new All(key);
    };
    return All;
  }()) || _class2);
  var Optional = exports.Optional = (_dec3 = resolver(), _dec3(_class3 = function() {
    function Optional(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, Optional);
      this._key = key;
      this._checkParent = checkParent;
    }
    Optional.prototype.get = function get(container) {
      if (container.hasResolver(this._key, this._checkParent)) {
        return container.get(this._key);
      }
      return null;
    };
    Optional.of = function of(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      return new Optional(key, checkParent);
    };
    return Optional;
  }()) || _class3);
  var Parent = exports.Parent = (_dec4 = resolver(), _dec4(_class4 = function() {
    function Parent(key) {
      _classCallCheck(this, Parent);
      this._key = key;
    }
    Parent.prototype.get = function get(container) {
      return container.parent ? container.parent.get(this._key) : null;
    };
    Parent.of = function of(key) {
      return new Parent(key);
    };
    return Parent;
  }()) || _class4);
  var StrategyResolver = exports.StrategyResolver = (_dec5 = resolver(), _dec5(_class5 = function() {
    function StrategyResolver(strategy, state) {
      _classCallCheck(this, StrategyResolver);
      this.strategy = strategy;
      this.state = state;
    }
    StrategyResolver.prototype.get = function get(container, key) {
      switch (this.strategy) {
        case 0:
          return this.state;
        case 1:
          var singleton = container.invoke(this.state);
          this.state = singleton;
          this.strategy = 0;
          return singleton;
        case 2:
          return container.invoke(this.state);
        case 3:
          return this.state(container, key, this);
        case 4:
          return this.state[0].get(container, key);
        case 5:
          return container.get(this.state);
        default:
          throw new Error('Invalid strategy: ' + this.strategy);
      }
    };
    return StrategyResolver;
  }()) || _class5);
  var Factory = exports.Factory = (_dec6 = resolver(), _dec6(_class6 = function() {
    function Factory(key) {
      _classCallCheck(this, Factory);
      this._key = key;
    }
    Factory.prototype.get = function get(container) {
      var _this2 = this;
      return function() {
        for (var _len = arguments.length,
            rest = Array(_len),
            _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        return container.invoke(_this2._key, rest);
      };
    };
    Factory.of = function of(key) {
      return new Factory(key);
    };
    return Factory;
  }()) || _class6);
  function invoker(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, value, target);
    };
  }
  function factory(potentialTarget) {
    var deco = function deco(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  var FactoryInvoker = exports.FactoryInvoker = function() {
    function FactoryInvoker() {
      _classCallCheck(this, FactoryInvoker);
    }
    FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
      var i = dependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(dependencies[i]);
      }
      return fn.apply(undefined, args);
    };
    FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
      var i = staticDependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(staticDependencies[i]);
      }
      if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
      }
      return fn.apply(undefined, args);
    };
    return FactoryInvoker;
  }();
  FactoryInvoker.instance = new FactoryInvoker();
  function registration(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
    };
  }
  function transient(key) {
    return registration(new TransientRegistration(key));
  }
  function singleton(keyOrRegisterInChild) {
    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
  }
  var TransientRegistration = exports.TransientRegistration = function() {
    function TransientRegistration(key) {
      _classCallCheck(this, TransientRegistration);
      this._key = key;
    }
    TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(2, fn);
      container.registerResolver(this._key || key, resolver);
      return resolver;
    };
    return TransientRegistration;
  }();
  var SingletonRegistration = exports.SingletonRegistration = function() {
    function SingletonRegistration(keyOrRegisterInChild) {
      var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, SingletonRegistration);
      if (typeof keyOrRegisterInChild === 'boolean') {
        this._registerInChild = keyOrRegisterInChild;
      } else {
        this._key = keyOrRegisterInChild;
        this._registerInChild = registerInChild;
      }
    }
    SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(1, fn);
      if (this._registerInChild) {
        container.registerResolver(this._key || key, resolver);
      } else {
        container.root.registerResolver(this._key || key, resolver);
      }
      return resolver;
    };
    return SingletonRegistration;
  }();
  var badKeyError = 'key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?';
  var _emptyParameters = exports._emptyParameters = Object.freeze([]);
  _aureliaMetadata.metadata.registration = 'aurelia:registration';
  _aureliaMetadata.metadata.invoker = 'aurelia:invoker';
  var resolverDecorates = resolver.decorates;
  var InvocationHandler = exports.InvocationHandler = function() {
    function InvocationHandler(fn, invoker, dependencies) {
      _classCallCheck(this, InvocationHandler);
      this.fn = fn;
      this.invoker = invoker;
      this.dependencies = dependencies;
    }
    InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
      return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
    };
    return InvocationHandler;
  }();
  function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
    var i = staticDependencies.length;
    var args = new Array(i);
    while (i--) {
      args[i] = container.get(staticDependencies[i]);
    }
    if (dynamicDependencies !== undefined) {
      args = args.concat(dynamicDependencies);
    }
    return Reflect.construct(fn, args);
  }
  var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
    invoke: function invoke(container, Type) {
      return new Type();
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[1] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[2] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[3] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[4] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[5] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers.fallback = {
    invoke: invokeWithDynamicDependencies,
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers);
  function getDependencies(f) {
    if (!f.hasOwnProperty('inject')) {
      return [];
    }
    if (typeof f.inject === 'function') {
      return f.inject();
    }
    return f.inject;
  }
  var Container = exports.Container = function() {
    function Container(configuration) {
      _classCallCheck(this, Container);
      if (configuration === undefined) {
        configuration = {};
      }
      this._configuration = configuration;
      this._onHandlerCreated = configuration.onHandlerCreated;
      this._handlers = configuration.handlers || (configuration.handlers = new Map());
      this._resolvers = new Map();
      this.root = this;
      this.parent = null;
    }
    Container.prototype.makeGlobal = function makeGlobal() {
      Container.instance = this;
      return this;
    };
    Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
      this._onHandlerCreated = onHandlerCreated;
      this._configuration.onHandlerCreated = onHandlerCreated;
    };
    Container.prototype.registerInstance = function registerInstance(key, instance) {
      this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
    };
    Container.prototype.registerSingleton = function registerSingleton(key, fn) {
      this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
    };
    Container.prototype.registerTransient = function registerTransient(key, fn) {
      this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
    };
    Container.prototype.registerHandler = function registerHandler(key, handler) {
      this.registerResolver(key, new StrategyResolver(3, handler));
    };
    Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
      this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
    };
    Container.prototype.registerResolver = function registerResolver(key, resolver) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var allResolvers = this._resolvers;
      var result = allResolvers.get(key);
      if (result === undefined) {
        allResolvers.set(key, resolver);
      } else if (result.strategy === 4) {
        result.state.push(resolver);
      } else {
        allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
      }
    };
    Container.prototype.autoRegister = function autoRegister(fn, key) {
      var resolver = void 0;
      if (typeof fn === 'function') {
        var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);
        if (_registration === undefined) {
          resolver = new StrategyResolver(1, fn);
          this.registerResolver(key === undefined ? fn : key, resolver);
        } else {
          resolver = _registration.registerResolver(this, key === undefined ? fn : key, fn);
        }
      } else {
        resolver = new StrategyResolver(0, fn);
        this.registerResolver(key === undefined ? fn : key, resolver);
      }
      return resolver;
    };
    Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
      var i = fns.length;
      while (i--) {
        this.autoRegister(fns[i]);
      }
    };
    Container.prototype.unregister = function unregister(key) {
      this._resolvers.delete(key);
    };
    Container.prototype.hasResolver = function hasResolver(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
    };
    Container.prototype.get = function get(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      if (key === Container) {
        return this;
      }
      if (resolverDecorates(key)) {
        return key.get(this, key);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype._get = function _get(key) {
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype.getAll = function getAll(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return _emptyParameters;
        }
        return this.parent.getAll(key);
      }
      if (resolver.strategy === 4) {
        var state = resolver.state;
        var i = state.length;
        var results = new Array(i);
        while (i--) {
          results[i] = state[i].get(this, key);
        }
        return results;
      }
      return [resolver.get(this, key)];
    };
    Container.prototype.createChild = function createChild() {
      var child = new Container(this._configuration);
      child.root = this.root;
      child.parent = this;
      return child;
    };
    Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
      try {
        var _handler = this._handlers.get(fn);
        if (_handler === undefined) {
          _handler = this._createInvocationHandler(fn);
          this._handlers.set(fn, _handler);
        }
        return _handler.invoke(this, dynamicDependencies);
      } catch (e) {
        throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
      }
    };
    Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
      var dependencies = void 0;
      if (fn.inject === undefined) {
        dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
      } else {
        dependencies = [];
        var ctor = fn;
        while (typeof ctor === 'function') {
          var _dependencies;
          (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
          ctor = Object.getPrototypeOf(ctor);
        }
      }
      var invoker = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;
      var handler = new InvocationHandler(fn, invoker, dependencies);
      return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
    };
    return Container;
  }();
  function autoinject(potentialTarget) {
    var deco = function deco(target) {
      target.inject = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  function inject() {
    for (var _len2 = arguments.length,
        rest = Array(_len2),
        _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }
    return function(target, key, descriptor) {
      if (descriptor) {
        var _fn = descriptor.value;
        _fn.inject = rest;
      } else {
        target.inject = rest;
      }
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", ["npm:aurelia-dependency-injection@1.0.0-beta.1.2.2/aurelia-dependency-injection"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-polyfills@1.0.0-beta.1.1.3/aurelia-polyfills", ["npm:aurelia-pal@1.0.0-beta.1.2.1"], function(_aureliaPal) {
  'use strict';
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  (function(Object, GOPS) {
    'use strict';
    if (GOPS in Object)
      return;
    var setDescriptor,
        G = _aureliaPal.PLATFORM.global,
        id = 0,
        random = '' + Math.random(),
        prefix = '__\x01symbol:',
        prefixLength = prefix.length,
        internalSymbol = '__\x01symbol@@' + random,
        DP = 'defineProperty',
        DPies = 'defineProperties',
        GOPN = 'getOwnPropertyNames',
        GOPD = 'getOwnPropertyDescriptor',
        PIE = 'propertyIsEnumerable',
        gOPN = Object[GOPN],
        gOPD = Object[GOPD],
        create = Object.create,
        keys = Object.keys,
        defineProperty = Object[DP],
        $defineProperties = Object[DPies],
        descriptor = gOPD(Object, GOPN),
        ObjectProto = Object.prototype,
        hOP = ObjectProto.hasOwnProperty,
        pIE = ObjectProto[PIE],
        toString = ObjectProto.toString,
        indexOf = Array.prototype.indexOf || function(v) {
          for (var i = this.length; i-- && this[i] !== v; ) {}
          return i;
        },
        addInternalIfNeeded = function addInternalIfNeeded(o, uid, enumerable) {
          if (!hOP.call(o, internalSymbol)) {
            defineProperty(o, internalSymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: {}
            });
          }
          o[internalSymbol]['@@' + uid] = enumerable;
        },
        createWithSymbols = function createWithSymbols(proto, descriptors) {
          var self = create(proto);
          gOPN(descriptors).forEach(function(key) {
            if (propertyIsEnumerable.call(descriptors, key)) {
              $defineProperty(self, key, descriptors[key]);
            }
          });
          return self;
        },
        copyAsNonEnumerable = function copyAsNonEnumerable(descriptor) {
          var newDescriptor = create(descriptor);
          newDescriptor.enumerable = false;
          return newDescriptor;
        },
        get = function get() {},
        onlyNonSymbols = function onlyNonSymbols(name) {
          return name != internalSymbol && !hOP.call(source, name);
        },
        onlySymbols = function onlySymbols(name) {
          return name != internalSymbol && hOP.call(source, name);
        },
        propertyIsEnumerable = function propertyIsEnumerable(key) {
          var uid = '' + key;
          return onlySymbols(uid) ? hOP.call(this, uid) && this[internalSymbol]['@@' + uid] : pIE.call(this, key);
        },
        setAndGetSymbol = function setAndGetSymbol(uid) {
          var descriptor = {
            enumerable: false,
            configurable: true,
            get: get,
            set: function set(value) {
              setDescriptor(this, uid, {
                enumerable: false,
                configurable: true,
                writable: true,
                value: value
              });
              addInternalIfNeeded(this, uid, true);
            }
          };
          defineProperty(ObjectProto, uid, descriptor);
          return source[uid] = defineProperty(Object(uid), 'constructor', sourceConstructor);
        },
        _Symbol = function _Symbol2(description) {
          if (this && this !== G) {
            throw new TypeError('Symbol is not a constructor');
          }
          return setAndGetSymbol(prefix.concat(description || '', random, ++id));
        },
        source = create(null),
        sourceConstructor = {value: _Symbol},
        sourceMap = function sourceMap(uid) {
          return source[uid];
        },
        $defineProperty = function defineProp(o, key, descriptor) {
          var uid = '' + key;
          if (onlySymbols(uid)) {
            setDescriptor(o, uid, descriptor.enumerable ? copyAsNonEnumerable(descriptor) : descriptor);
            addInternalIfNeeded(o, uid, !!descriptor.enumerable);
          } else {
            defineProperty(o, key, descriptor);
          }
          return o;
        },
        $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
          var cof = toString.call(o);
          o = cof === '[object String]' ? o.split('') : Object(o);
          return gOPN(o).filter(onlySymbols).map(sourceMap);
        };
    descriptor.value = $defineProperty;
    defineProperty(Object, DP, descriptor);
    descriptor.value = $getOwnPropertySymbols;
    defineProperty(Object, GOPS, descriptor);
    descriptor.value = function getOwnPropertyNames(o) {
      return gOPN(o).filter(onlyNonSymbols);
    };
    defineProperty(Object, GOPN, descriptor);
    descriptor.value = function defineProperties(o, descriptors) {
      var symbols = $getOwnPropertySymbols(descriptors);
      if (symbols.length) {
        keys(descriptors).concat(symbols).forEach(function(uid) {
          if (propertyIsEnumerable.call(descriptors, uid)) {
            $defineProperty(o, uid, descriptors[uid]);
          }
        });
      } else {
        $defineProperties(o, descriptors);
      }
      return o;
    };
    defineProperty(Object, DPies, descriptor);
    descriptor.value = propertyIsEnumerable;
    defineProperty(ObjectProto, PIE, descriptor);
    descriptor.value = _Symbol;
    defineProperty(G, 'Symbol', descriptor);
    descriptor.value = function(key) {
      var uid = prefix.concat(prefix, key, random);
      return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
    };
    defineProperty(_Symbol, 'for', descriptor);
    descriptor.value = function(symbol) {
      return hOP.call(source, symbol) ? symbol.slice(prefixLength * 2, -random.length) : void 0;
    };
    defineProperty(_Symbol, 'keyFor', descriptor);
    descriptor.value = function getOwnPropertyDescriptor(o, key) {
      var descriptor = gOPD(o, key);
      if (descriptor && onlySymbols(key)) {
        descriptor.enumerable = propertyIsEnumerable.call(o, key);
      }
      return descriptor;
    };
    defineProperty(Object, GOPD, descriptor);
    descriptor.value = function(proto, descriptors) {
      return arguments.length === 1 ? create(proto) : createWithSymbols(proto, descriptors);
    };
    defineProperty(Object, 'create', descriptor);
    descriptor.value = function() {
      var str = toString.call(this);
      return str === '[object String]' && onlySymbols(this) ? '[object Symbol]' : str;
    };
    defineProperty(ObjectProto, 'toString', descriptor);
    try {
      setDescriptor = create(defineProperty({}, prefix, {get: function get() {
          return defineProperty(this, prefix, {value: false})[prefix];
        }}))[prefix] || defineProperty;
    } catch (o_O) {
      setDescriptor = function setDescriptor(o, key, descriptor) {
        var protoDescriptor = gOPD(ObjectProto, key);
        delete ObjectProto[key];
        defineProperty(o, key, descriptor);
        defineProperty(ObjectProto, key, protoDescriptor);
      };
    }
  })(Object, 'getOwnPropertySymbols');
  (function(O, S) {
    var dP = O.defineProperty,
        ObjectProto = O.prototype,
        toString = ObjectProto.toString,
        toStringTag = 'toStringTag',
        descriptor;
    ['iterator', 'match', 'replace', 'search', 'split', 'hasInstance', 'isConcatSpreadable', 'unscopables', 'species', 'toPrimitive', toStringTag].forEach(function(name) {
      if (!(name in Symbol)) {
        dP(Symbol, name, {value: Symbol(name)});
        switch (name) {
          case toStringTag:
            descriptor = O.getOwnPropertyDescriptor(ObjectProto, 'toString');
            descriptor.value = function() {
              var str = toString.call(this),
                  tst = typeof this === 'undefined' || this === null ? undefined : this[Symbol.toStringTag];
              return typeof tst === 'undefined' ? str : '[object ' + tst + ']';
            };
            dP(ObjectProto, 'toString', descriptor);
            break;
        }
      }
    });
  })(Object, Symbol);
  (function(Si, AP, SP) {
    function returnThis() {
      return this;
    }
    if (!AP[Si])
      AP[Si] = function() {
        var i = 0,
            self = this,
            iterator = {next: function next() {
                var done = self.length <= i;
                return done ? {done: done} : {
                  done: done,
                  value: self[i++]
                };
              }};
        iterator[Si] = returnThis;
        return iterator;
      };
    if (!SP[Si])
      SP[Si] = function() {
        var fromCodePoint = String.fromCodePoint,
            self = this,
            i = 0,
            length = self.length,
            iterator = {next: function next() {
                var done = length <= i,
                    c = done ? '' : fromCodePoint(self.codePointAt(i));
                i += c.length;
                return done ? {done: done} : {
                  done: done,
                  value: c
                };
              }};
        iterator[Si] = returnThis;
        return iterator;
      };
  })(Symbol.iterator, Array.prototype, String.prototype);
  Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
  };
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
  };
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }
  if (!Array.from) {
    Array.from = function() {
      var toInteger = function toInteger(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? Math.floor : Math.ceil)(it);
      };
      var toLength = function toLength(it) {
        return it > 0 ? Math.min(toInteger(it), 0x1fffffffffffff) : 0;
      };
      var iterCall = function iterCall(iter, fn, a1, a2) {
        try {
          fn(a1, a2);
        } catch (E) {
          if (typeof iter.return == 'function')
            iter.return();
          throw E;
        }
      };
      return function from(arrayLike) {
        var O = Object(arrayLike),
            C = typeof this == 'function' ? this : Array,
            aLen = arguments.length,
            mapfn = aLen > 1 ? arguments[1] : undefined,
            mapping = mapfn !== undefined,
            index = 0,
            iterFn = O[Symbol.iterator],
            length,
            result,
            step,
            iterator;
        if (mapping)
          mapfn = mapfn.bind(aLen > 2 ? arguments[2] : undefined);
        if (iterFn != undefined && !Array.isArray(arrayLike)) {
          for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
            result[index] = mapping ? iterCall(mapfn, step.value, index) : step.value;
          }
        } else {
          length = toLength(O.length);
          for (result = new C(length); length > index; index++) {
            result[index] = mapping ? mapfn(O[index], index) : O[index];
          }
        }
        result.length = index;
        return result;
      };
    }();
  }
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: function value(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      }
    });
  }
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: function value(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return i;
          }
        }
        return -1;
      }
    });
  }
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: function value(searchElement) {
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) {
            k = 0;
          }
        }
        var currentElement;
        while (k < len) {
          currentElement = O[k];
          if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
            return true;
          }
          k++;
        }
        return false;
      }
    });
  }
  (function() {
    var needsFix = false;
    try {
      var s = Object.keys('a');
      needsFix = s.length !== 1 || s[0] !== '0';
    } catch (e) {
      needsFix = true;
    }
    if (needsFix) {
      Object.keys = function() {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !{toString: null}.propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function(obj) {
          if (obj === undefined || obj === null) {
            throw TypeError('Cannot convert undefined or null to object');
          }
          obj = Object(obj);
          var result = [],
              prop,
              i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      }();
    }
  })();
  (function(O) {
    if ('assign' in O) {
      return;
    }
    O.defineProperty(O, 'assign', {
      configurable: true,
      writable: true,
      value: function() {
        var gOPS = O.getOwnPropertySymbols,
            pIE = O.propertyIsEnumerable,
            filterOS = gOPS ? function(self) {
              return gOPS(self).filter(pIE, self);
            } : function() {
              return Array.prototype;
            };
        return function assign(where) {
          if (gOPS && !(where instanceof O)) {
            console.warn('problematic Symbols', where);
          }
          function set(keyOrSymbol) {
            where[keyOrSymbol] = arg[keyOrSymbol];
          }
          for (var i = 1,
              ii = arguments.length; i < ii; ++i) {
            var arg = arguments[i];
            if (arg === null || arg === undefined) {
              continue;
            }
            O.keys(arg).concat(filterOS(arg)).forEach(set);
          }
          return where;
        };
      }()
    });
  })(Object);
  (function(global) {
    var i;
    var defineProperty = Object.defineProperty,
        is = function is(a, b) {
          return a === b || a !== a && b !== b;
        };
    if (typeof WeakMap == 'undefined') {
      global.WeakMap = createCollection({
        'delete': sharedDelete,
        clear: sharedClear,
        get: sharedGet,
        has: mapHas,
        set: sharedSet
      }, true);
    }
    if (typeof Map == 'undefined' || typeof new Map().values !== 'function' || !new Map().values().next) {
      var _createCollection;
      global.Map = createCollection((_createCollection = {
        'delete': sharedDelete,
        has: mapHas,
        get: sharedGet,
        set: sharedSet,
        keys: sharedKeys,
        values: sharedValues,
        entries: mapEntries,
        forEach: sharedForEach,
        clear: sharedClear
      }, _createCollection[Symbol.iterator] = mapEntries, _createCollection));
    }
    if (typeof Set == 'undefined' || typeof new Set().values !== 'function' || !new Set().values().next) {
      var _createCollection2;
      global.Set = createCollection((_createCollection2 = {
        has: setHas,
        add: sharedAdd,
        'delete': sharedDelete,
        clear: sharedClear,
        keys: sharedValues,
        values: sharedValues,
        entries: setEntries,
        forEach: sharedForEach
      }, _createCollection2[Symbol.iterator] = sharedValues, _createCollection2));
    }
    if (typeof WeakSet == 'undefined') {
      global.WeakSet = createCollection({
        'delete': sharedDelete,
        add: sharedAdd,
        clear: sharedClear,
        has: setHas
      }, true);
    }
    function createCollection(proto, objectOnly) {
      function Collection(a) {
        if (!this || this.constructor !== Collection)
          return new Collection(a);
        this._keys = [];
        this._values = [];
        this._itp = [];
        this.objectOnly = objectOnly;
        if (a)
          init.call(this, a);
      }
      if (!objectOnly) {
        defineProperty(proto, 'size', {get: sharedSize});
      }
      proto.constructor = Collection;
      Collection.prototype = proto;
      return Collection;
    }
    function init(a) {
      var i;
      if (this.add)
        a.forEach(this.add, this);
      else
        a.forEach(function(a) {
          this.set(a[0], a[1]);
        }, this);
    }
    function sharedDelete(key) {
      if (this.has(key)) {
        this._keys.splice(i, 1);
        this._values.splice(i, 1);
        this._itp.forEach(function(p) {
          if (i < p[0])
            p[0]--;
        });
      }
      return -1 < i;
    }
    ;
    function sharedGet(key) {
      return this.has(key) ? this._values[i] : undefined;
    }
    function has(list, key) {
      if (this.objectOnly && key !== Object(key))
        throw new TypeError("Invalid value used as weak collection key");
      if (key != key || key === 0)
        for (i = list.length; i-- && !is(list[i], key); ) {}
      else
        i = list.indexOf(key);
      return -1 < i;
    }
    function setHas(value) {
      return has.call(this, this._values, value);
    }
    function mapHas(value) {
      return has.call(this, this._keys, value);
    }
    function sharedSet(key, value) {
      this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value;
      return this;
    }
    function sharedAdd(value) {
      if (!this.has(value))
        this._values.push(value);
      return this;
    }
    function sharedClear() {
      (this._keys || 0).length = this._values.length = 0;
    }
    function sharedKeys() {
      return sharedIterator(this._itp, this._keys);
    }
    function sharedValues() {
      return sharedIterator(this._itp, this._values);
    }
    function mapEntries() {
      return sharedIterator(this._itp, this._keys, this._values);
    }
    function setEntries() {
      return sharedIterator(this._itp, this._values, this._values);
    }
    function sharedIterator(itp, array, array2) {
      var _ref;
      var p = [0],
          done = false;
      itp.push(p);
      return _ref = {}, _ref[Symbol.iterator] = function() {
        return this;
      }, _ref.next = function next() {
        var v,
            k = p[0];
        if (!done && k < array.length) {
          v = array2 ? [array[k], array2[k]] : array[k];
          p[0]++;
        } else {
          done = true;
          itp.splice(itp.indexOf(p), 1);
        }
        return {
          done: done,
          value: v
        };
      }, _ref;
    }
    function sharedSize() {
      return this._values.length;
    }
    function sharedForEach(callback, context) {
      var it = this.entries();
      for (; ; ) {
        var r = it.next();
        if (r.done)
          break;
        callback.call(context, r.value[1], r.value[0], this);
      }
    }
  })(_aureliaPal.PLATFORM.global);
  var emptyMetadata = Object.freeze({});
  var metadataContainerKey = '__metadata__';
  var bind = Function.prototype.bind;
  if (typeof _aureliaPal.PLATFORM.global.Reflect === 'undefined') {
    _aureliaPal.PLATFORM.global.Reflect = {};
  }
  if (typeof Reflect.getOwnMetadata !== 'function') {
    Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
      if (target.hasOwnProperty(metadataContainerKey)) {
        return (target[metadataContainerKey][targetKey] || emptyMetadata)[metadataKey];
      }
    };
  }
  if (typeof Reflect.defineMetadata !== 'function') {
    Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
      var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
      var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
      targetContainer[metadataKey] = metadataValue;
    };
  }
  if (typeof Reflect.metadata !== 'function') {
    Reflect.metadata = function(metadataKey, metadataValue) {
      return function(target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      };
    };
  }
  if (typeof Reflect.defineProperty !== 'function') {
    Reflect.defineProperty = function(target, propertyKey, descriptor) {
      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' ? target === null : typeof target !== 'function') {
        throw new TypeError('Reflect.defineProperty called on non-object');
      }
      try {
        Object.defineProperty(target, propertyKey, descriptor);
        return true;
      } catch (e) {
        return false;
      }
    };
  }
  if (typeof Reflect.construct !== 'function') {
    Reflect.construct = function(Target, args) {
      if (args) {
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
      }
      var a = [null];
      a.push.apply(a, args);
      return new (bind.apply(Target, a))();
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-polyfills@1.0.0-beta.1.1.3", ["npm:aurelia-polyfills@1.0.0-beta.1.1.3/aurelia-polyfills"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports._PLATFORM = exports._DOM = exports._FEATURE = undefined;
  exports._ensureFunctionName = _ensureFunctionName;
  exports._ensureClassList = _ensureClassList;
  exports._ensurePerformance = _ensurePerformance;
  exports._ensureCustomEvent = _ensureCustomEvent;
  exports._ensureElementMatches = _ensureElementMatches;
  exports._ensureHTMLTemplateElement = _ensureHTMLTemplateElement;
  exports.initialize = initialize;
  function _ensureFunctionName() {
    function test() {}
    if (!test.name) {
      Object.defineProperty(Function.prototype, 'name', {get: function get() {
          var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
          Object.defineProperty(this, 'name', {value: name});
          return name;
        }});
    }
  }
  function _ensureClassList() {
    if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
      (function() {
        var protoProp = 'prototype';
        var strTrim = String.prototype.trim;
        var arrIndexOf = Array.prototype.indexOf;
        var emptyArray = [];
        var DOMEx = function DOMEx(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        };
        var checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
          if (token === '') {
            throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
          }
          if (/\s/.test(token)) {
            throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
          }
          return arrIndexOf.call(classList, token);
        };
        var ClassList = function ClassList(elem) {
          var trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
          var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;
          for (var i = 0,
              ii = classes.length; i < ii; ++i) {
            this.push(classes[i]);
          }
          this._updateClassName = function() {
            elem.setAttribute('class', this.toString());
          };
        };
        var classListProto = ClassList[protoProp] = [];
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function(i) {
          return this[i] || null;
        };
        classListProto.contains = function(token) {
          token += '';
          return checkTokenAndGetIndex(this, token) !== -1;
        };
        classListProto.add = function() {
          var tokens = arguments;
          var i = 0;
          var ii = tokens.length;
          var token = void 0;
          var updated = false;
          do {
            token = tokens[i] + '';
            if (checkTokenAndGetIndex(this, token) === -1) {
              this.push(token);
              updated = true;
            }
          } while (++i < ii);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.remove = function() {
          var tokens = arguments;
          var i = 0;
          var ii = tokens.length;
          var token = void 0;
          var updated = false;
          var index = void 0;
          do {
            token = tokens[i] + '';
            index = checkTokenAndGetIndex(this, token);
            while (index !== -1) {
              this.splice(index, 1);
              updated = true;
              index = checkTokenAndGetIndex(this, token);
            }
          } while (++i < ii);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.toggle = function(token, force) {
          token += '';
          var result = this.contains(token);
          var method = result ? force !== true && 'remove' : force !== false && 'add';
          if (method) {
            this[method](token);
          }
          if (force === true || force === false) {
            return force;
          }
          return !result;
        };
        classListProto.toString = function() {
          return this.join(' ');
        };
        Object.defineProperty(Element.prototype, 'classList', {
          get: function get() {
            return new ClassList(this);
          },
          enumerable: true,
          configurable: true
        });
      })();
    } else {
      var testElement = document.createElement('_');
      testElement.classList.add('c1', 'c2');
      if (!testElement.classList.contains('c2')) {
        var createMethod = function createMethod(method) {
          var original = DOMTokenList.prototype[method];
          DOMTokenList.prototype[method] = function(token) {
            for (var i = 0,
                ii = arguments.length; i < ii; ++i) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }
      testElement.classList.toggle('c3', false);
      if (testElement.classList.contains('c3')) {
        (function() {
          var _toggle = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
              return force;
            }
            return _toggle.call(this, token);
          };
        })();
      }
      testElement = null;
    }
  }
  function _ensurePerformance() {
    if ('performance' in window === false) {
      window.performance = {};
    }
    Date.now = Date.now || function() {
      return new Date().getTime();
    };
    if ('now' in window.performance === false) {
      (function() {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
          nowOffset = performance.timing.navigationStart;
        }
        window.performance.now = function now() {
          return Date.now() - nowOffset;
        };
      })();
    }
  }
  function _ensureCustomEvent() {
    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      var _CustomEvent = function _CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
      _CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = _CustomEvent;
    }
  }
  function _ensureElementMatches() {
    if (Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
    }
  }
  var _FEATURE = exports._FEATURE = {};
  _FEATURE.shadowDOM = function() {
    return !!HTMLElement.prototype.createShadowRoot;
  }();
  _FEATURE.scopedCSS = function() {
    return 'scoped' in document.createElement('style');
  }();
  _FEATURE.htmlTemplateElement = function() {
    return 'content' in document.createElement('template');
  }();
  _FEATURE.mutationObserver = function() {
    return !!(window.MutationObserver || window.WebKitMutationObserver);
  }();
  function _ensureHTMLTemplateElement() {
    function isSVGTemplate(el) {
      return el.tagName === 'template' && el.namespaceURI === 'http://www.w3.org/2000/svg';
    }
    function fixSVGTemplateElement(el) {
      var template = el.ownerDocument.createElement('template');
      var attrs = el.attributes;
      var length = attrs.length;
      var attr = void 0;
      el.parentNode.insertBefore(template, el);
      while (length-- > 0) {
        attr = attrs[length];
        template.setAttribute(attr.name, attr.value);
        el.removeAttribute(attr.name);
      }
      el.parentNode.removeChild(el);
      return fixHTMLTemplateElement(template);
    }
    function fixHTMLTemplateElement(template) {
      var content = template.content = document.createDocumentFragment();
      var child = void 0;
      while (child = template.firstChild) {
        content.appendChild(child);
      }
      return template;
    }
    function fixHTMLTemplateElementRoot(template) {
      var content = fixHTMLTemplateElement(template).content;
      var childTemplates = content.querySelectorAll('template');
      for (var i = 0,
          ii = childTemplates.length; i < ii; ++i) {
        var child = childTemplates[i];
        if (isSVGTemplate(child)) {
          fixSVGTemplateElement(child);
        } else {
          fixHTMLTemplateElement(child);
        }
      }
      return template;
    }
    if (_FEATURE.htmlTemplateElement) {
      _FEATURE.ensureHTMLTemplateElement = function(template) {
        return template;
      };
    } else {
      _FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
    }
  }
  var shadowPoly = window.ShadowDOMPolyfill || null;
  var _DOM = exports._DOM = {
    Element: Element,
    SVGElement: SVGElement,
    boundary: 'aurelia-dom-boundary',
    addEventListener: function addEventListener(eventName, callback, capture) {
      document.addEventListener(eventName, callback, capture);
    },
    removeEventListener: function removeEventListener(eventName, callback, capture) {
      document.removeEventListener(eventName, callback, capture);
    },
    adoptNode: function adoptNode(node) {
      return document.adoptNode(node, true);
    },
    createElement: function createElement(tagName) {
      return document.createElement(tagName);
    },
    createTextNode: function createTextNode(text) {
      return document.createTextNode(text);
    },
    createComment: function createComment(text) {
      return document.createComment(text);
    },
    createDocumentFragment: function createDocumentFragment() {
      return document.createDocumentFragment();
    },
    createMutationObserver: function createMutationObserver(callback) {
      return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
    },
    createCustomEvent: function createCustomEvent(eventType, options) {
      return new window.CustomEvent(eventType, options);
    },
    dispatchEvent: function dispatchEvent(evt) {
      document.dispatchEvent(evt);
    },
    getComputedStyle: function getComputedStyle(element) {
      return window.getComputedStyle(element);
    },
    getElementById: function getElementById(id) {
      return document.getElementById(id);
    },
    querySelectorAll: function querySelectorAll(query) {
      return document.querySelectorAll(query);
    },
    nextElementSibling: function nextElementSibling(element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      do {
        element = element.nextSibling;
      } while (element && element.nodeType !== 1);
      return element;
    },
    createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
      var parser = document.createElement('div');
      parser.innerHTML = markup;
      var temp = parser.firstElementChild;
      if (!temp || temp.nodeName !== 'TEMPLATE') {
        throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
      }
      return _FEATURE.ensureHTMLTemplateElement(temp);
    },
    appendNode: function appendNode(newNode, parentNode) {
      (parentNode || document.body).appendChild(newNode);
    },
    replaceNode: function replaceNode(newNode, node, parentNode) {
      if (node.parentNode) {
        node.parentNode.replaceChild(newNode, node);
      } else if (shadowPoly !== null) {
        shadowPoly.unwrap(parentNode).replaceChild(shadowPoly.unwrap(newNode), shadowPoly.unwrap(node));
      } else {
        parentNode.replaceChild(newNode, node);
      }
    },
    removeNode: function removeNode(node, parentNode) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      } else if (shadowPoly !== null) {
        shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
      } else {
        parentNode.removeChild(node);
      }
    },
    injectStyles: function injectStyles(styles, destination, prepend) {
      var node = document.createElement('style');
      node.innerHTML = styles;
      node.type = 'text/css';
      destination = destination || document.head;
      if (prepend && destination.childNodes.length > 0) {
        destination.insertBefore(node, destination.childNodes[0]);
      } else {
        destination.appendChild(node);
      }
      return node;
    }
  };
  var _PLATFORM = exports._PLATFORM = {
    location: window.location,
    history: window.history,
    addEventListener: function addEventListener(eventName, callback, capture) {
      this.global.addEventListener(eventName, callback, capture);
    },
    removeEventListener: function removeEventListener(eventName, callback, capture) {
      this.global.removeEventListener(eventName, callback, capture);
    },
    performance: window.performance,
    requestAnimationFrame: function requestAnimationFrame(callback) {
      return this.global.requestAnimationFrame(callback);
    }
  };
  var isInitialized = false;
  function initialize() {
    if (isInitialized) {
      return;
    }
    isInitialized = true;
    _ensureCustomEvent();
    _ensureFunctionName();
    _ensureHTMLTemplateElement();
    _ensureElementMatches();
    _ensureClassList();
    _ensurePerformance();
    (0, _aureliaPal.initializePAL)(function(platform, feature, dom) {
      Object.assign(platform, _PLATFORM);
      Object.assign(feature, _FEATURE);
      Object.assign(dom, _DOM);
      Object.defineProperty(dom, 'title', {
        get: function get() {
          return document.title;
        },
        set: function set(value) {
          document.title = value;
        }
      });
      Object.defineProperty(dom, 'activeElement', {get: function get() {
          return document.activeElement;
        }});
      Object.defineProperty(platform, 'XMLHttpRequest', {get: function get() {
          return platform.global.XMLHttpRequest;
        }});
    });
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal-browser@1.0.0-beta.1.2.0", ["npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-pal-browser@1.0.0-beta.1.2.0", "npm:aurelia-polyfills@1.0.0-beta.1.1.3"], function(exports, _aureliaPal, _aureliaPalBrowser) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.bootstrap = bootstrap;
  var bootstrapQueue = [];
  var sharedLoader = null;
  var Aurelia = null;
  function onBootstrap(callback) {
    return new Promise(function(resolve, reject) {
      if (sharedLoader) {
        resolve(callback(sharedLoader));
      } else {
        bootstrapQueue.push(function() {
          try {
            resolve(callback(sharedLoader));
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  }
  function ready(global) {
    return new Promise(function(resolve, reject) {
      if (global.document.readyState === 'complete') {
        resolve(global.document);
      } else {
        global.document.addEventListener('DOMContentLoaded', completed);
        global.addEventListener('load', completed);
      }
      function completed() {
        global.document.removeEventListener('DOMContentLoaded', completed);
        global.removeEventListener('load', completed);
        resolve(global.document);
      }
    });
  }
  function createLoader() {
    if (_aureliaPal.PLATFORM.Loader) {
      return Promise.resolve(new _aureliaPal.PLATFORM.Loader());
    }
    if (window.System && typeof window.System.import === 'function') {
      return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
        return System.normalize('aurelia-loader-default', bootstrapperName);
      }).then(function(loaderName) {
        return System.import(loaderName).then(function(m) {
          return new m.DefaultLoader();
        });
      });
    }
    if (typeof window.require === 'function') {
      return new Promise(function(resolve, reject) {
        return require(['aurelia-loader-default'], function(m) {
          return resolve(new m.DefaultLoader());
        }, reject);
      });
    }
    return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
  }
  function preparePlatform(loader) {
    return loader.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
      return loader.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName) {
        loader.map('aurelia-framework', frameworkName);
        return Promise.all([loader.normalize('aurelia-dependency-injection', frameworkName).then(function(diName) {
          return loader.map('aurelia-dependency-injection', diName);
        }), loader.normalize('aurelia-router', bootstrapperName).then(function(routerName) {
          return loader.map('aurelia-router', routerName);
        }), loader.normalize('aurelia-logging-console', bootstrapperName).then(function(loggingConsoleName) {
          return loader.map('aurelia-logging-console', loggingConsoleName);
        })]).then(function() {
          return loader.loadModule(frameworkName).then(function(m) {
            return Aurelia = m.Aurelia;
          });
        });
      });
    });
  }
  function handleApp(loader, appHost) {
    return config(loader, appHost, appHost.getAttribute('aurelia-app'));
  }
  function config(loader, appHost, configModuleId) {
    var aurelia = new Aurelia(loader);
    aurelia.host = appHost;
    if (configModuleId) {
      return loader.loadModule(configModuleId).then(function(customConfig) {
        return customConfig.configure(aurelia);
      });
    }
    aurelia.use.standardConfiguration().developmentLogging();
    return aurelia.start().then(function() {
      return aurelia.setRoot();
    });
  }
  function run() {
    return ready(window).then(function(doc) {
      (0, _aureliaPalBrowser.initialize)();
      var appHost = doc.querySelectorAll('[aurelia-app]');
      return createLoader().then(function(loader) {
        return preparePlatform(loader).then(function() {
          for (var i = 0,
              ii = appHost.length; i < ii; ++i) {
            handleApp(loader, appHost[i]).catch(console.error.bind(console));
          }
          sharedLoader = loader;
          for (var _i = 0,
              _ii = bootstrapQueue.length; _i < _ii; ++_i) {
            bootstrapQueue[_i]();
          }
          bootstrapQueue = null;
        });
      });
    });
  }
  function bootstrap(configure) {
    return onBootstrap(function(loader) {
      var aurelia = new Aurelia(loader);
      return configure(aurelia);
    });
  }
  run();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-bootstrapper@1.0.0-beta.1.2.0", ["npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Origin = exports.metadata = undefined;
  exports.decorators = decorators;
  exports.deprecated = deprecated;
  exports.mixin = mixin;
  exports.protocol = protocol;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var metadata = exports.metadata = {
    resource: 'aurelia:resource',
    paramTypes: 'design:paramtypes',
    properties: 'design:properties',
    get: function get(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      var result = metadata.getOwn(metadataKey, target, targetKey);
      return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
    },
    getOwn: function getOwn(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      return Reflect.getOwnMetadata(metadataKey, target, targetKey);
    },
    define: function define(metadataKey, metadataValue, target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    },
    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
      var result = metadata.getOwn(metadataKey, target, targetKey);
      if (result === undefined) {
        result = new Type();
        Reflect.defineMetadata(metadataKey, result, target, targetKey);
      }
      return result;
    }
  };
  var originStorage = new Map();
  var unknownOrigin = Object.freeze({
    moduleId: undefined,
    moduleMember: undefined
  });
  var Origin = exports.Origin = function() {
    function Origin(moduleId, moduleMember) {
      _classCallCheck(this, Origin);
      this.moduleId = moduleId;
      this.moduleMember = moduleMember;
    }
    Origin.get = function get(fn) {
      var origin = originStorage.get(fn);
      if (origin === undefined) {
        _aureliaPal.PLATFORM.eachModule(function(key, value) {
          for (var name in value) {
            var exp = value[name];
            if (exp === fn) {
              originStorage.set(fn, origin = new Origin(key, name));
              return true;
            }
          }
          if (value === fn) {
            originStorage.set(fn, origin = new Origin(key, 'default'));
            return true;
          }
        });
      }
      return origin || unknownOrigin;
    };
    Origin.set = function set(fn, origin) {
      originStorage.set(fn, origin);
    };
    return Origin;
  }();
  function decorators() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    var applicator = function applicator(target, key, descriptor) {
      var i = rest.length;
      if (key) {
        descriptor = descriptor || {
          value: target[key],
          writable: true,
          configurable: true,
          enumerable: true
        };
        while (i--) {
          descriptor = rest[i](target, key, descriptor) || descriptor;
        }
        Object.defineProperty(target, key, descriptor);
      } else {
        while (i--) {
          target = rest[i](target) || target;
        }
      }
      return target;
    };
    applicator.on = applicator;
    return applicator;
  }
  function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
    function decorator(target, key, descriptor) {
      var methodSignature = target.constructor.name + '#' + key;
      var options = maybeKey ? {} : optionsOrTarget || {};
      var message = 'DEPRECATION - ' + methodSignature;
      if (typeof descriptor.value !== 'function') {
        throw new SyntaxError('Only methods can be marked as deprecated.');
      }
      if (options.message) {
        message += ' - ' + options.message;
      }
      return _extends({}, descriptor, {value: function deprecationWrapper() {
          if (options.error) {
            throw new Error(message);
          } else {
            console.warn(message);
          }
          return descriptor.value.apply(this, arguments);
        }});
    }
    return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
  }
  function mixin(behavior) {
    var instanceKeys = Object.keys(behavior);
    function _mixin(possible) {
      var decorator = function decorator(target) {
        var resolvedTarget = typeof target === 'function' ? target.prototype : target;
        var i = instanceKeys.length;
        while (i--) {
          var property = instanceKeys[i];
          Object.defineProperty(resolvedTarget, property, {
            value: behavior[property],
            writable: true
          });
        }
      };
      return possible ? decorator(possible) : decorator;
    }
    return _mixin;
  }
  function alwaysValid() {
    return true;
  }
  function noCompose() {}
  function ensureProtocolOptions(options) {
    if (options === undefined) {
      options = {};
    } else if (typeof options === 'function') {
      options = {validate: options};
    }
    if (!options.validate) {
      options.validate = alwaysValid;
    }
    if (!options.compose) {
      options.compose = noCompose;
    }
    return options;
  }
  function createProtocolValidator(validate) {
    return function(target) {
      var result = validate(target);
      return result === true;
    };
  }
  function createProtocolAsserter(name, validate) {
    return function(target) {
      var result = validate(target);
      if (result !== true) {
        throw new Error(result || name + ' was not correctly implemented.');
      }
    };
  }
  function protocol(name, options) {
    options = ensureProtocolOptions(options);
    var result = function result(target) {
      var resolvedTarget = typeof target === 'function' ? target.prototype : target;
      options.compose(resolvedTarget);
      result.assert(resolvedTarget);
      Object.defineProperty(resolvedTarget, 'protocol:' + name, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: true
      });
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  }
  protocol.create = function(name, options) {
    options = ensureProtocolOptions(options);
    var hidden = 'protocol:' + name;
    var result = function result(target) {
      var decorator = protocol(name, options);
      return target ? decorator(target) : decorator;
    };
    result.decorates = function(obj) {
      return obj[hidden] === true;
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  };
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-metadata@1.0.0-beta.1.2.0", ["npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue", ["exports", "npm:aurelia-pal@1.0.0-beta.1.2.1"], function(exports, _aureliaPal) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TaskQueue = undefined;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var hasSetImmediate = typeof setImmediate === 'function';
  function makeRequestFlushFromMutationObserver(flush) {
    var toggle = 1;
    var observer = _aureliaPal.DOM.createMutationObserver(flush);
    var node = _aureliaPal.DOM.createTextNode('');
    observer.observe(node, {characterData: true});
    return function requestFlush() {
      toggle = -toggle;
      node.data = toggle;
    };
  }
  function makeRequestFlushFromTimer(flush) {
    return function requestFlush() {
      var timeoutHandle = setTimeout(handleFlushTimer, 0);
      var intervalHandle = setInterval(handleFlushTimer, 50);
      function handleFlushTimer() {
        clearTimeout(timeoutHandle);
        clearInterval(intervalHandle);
        flush();
      }
    };
  }
  function onError(error, task) {
    if ('onError' in task) {
      task.onError(error);
    } else if (hasSetImmediate) {
      setImmediate(function() {
        throw error;
      });
    } else {
      setTimeout(function() {
        throw error;
      }, 0);
    }
  }
  var TaskQueue = exports.TaskQueue = function() {
    function TaskQueue() {
      var _this = this;
      _classCallCheck(this, TaskQueue);
      this.microTaskQueue = [];
      this.microTaskQueueCapacity = 1024;
      this.taskQueue = [];
      if (_aureliaPal.FEATURE.mutationObserver) {
        this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function() {
          return _this.flushMicroTaskQueue();
        });
      } else {
        this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function() {
          return _this.flushMicroTaskQueue();
        });
      }
      this.requestFlushTaskQueue = makeRequestFlushFromTimer(function() {
        return _this.flushTaskQueue();
      });
    }
    TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
      if (this.microTaskQueue.length < 1) {
        this.requestFlushMicroTaskQueue();
      }
      this.microTaskQueue.push(task);
    };
    TaskQueue.prototype.queueTask = function queueTask(task) {
      if (this.taskQueue.length < 1) {
        this.requestFlushTaskQueue();
      }
      this.taskQueue.push(task);
    };
    TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
      var queue = this.taskQueue;
      var index = 0;
      var task = void 0;
      this.taskQueue = [];
      try {
        while (index < queue.length) {
          task = queue[index];
          task.call();
          index++;
        }
      } catch (error) {
        onError(error, task);
      }
    };
    TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
      var queue = this.microTaskQueue;
      var capacity = this.microTaskQueueCapacity;
      var index = 0;
      var task = void 0;
      try {
        while (index < queue.length) {
          task = queue[index];
          task.call();
          index++;
          if (index > capacity) {
            for (var scan = 0,
                newLength = queue.length - index; scan < newLength; scan++) {
              queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
          }
        }
      } catch (error) {
        onError(error, task);
      }
      queue.length = 0;
    };
    return TaskQueue;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-task-queue@1.0.0-beta.1.2.0", ["npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal@1.0.0-beta.1.2.1/aurelia-pal", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.AggregateError = AggregateError;
  exports.initializePAL = initializePAL;
  function AggregateError(message, innerError, skipIfAlreadyAggregate) {
    if (innerError) {
      if (innerError.innerError && skipIfAlreadyAggregate) {
        return innerError;
      }
      var separator = '\n------------------------------------------------\n';
      message += separator + 'Inner Error:\n';
      if (typeof innerError === 'string') {
        message += 'Message: ' + innerError;
      } else {
        if (innerError.message) {
          message += 'Message: ' + innerError.message;
        } else {
          message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
        }
        if (innerError.stack) {
          message += '\nInner Error Stack:\n' + innerError.stack;
          message += '\nEnd Inner Error Stack';
        }
      }
      message += separator;
    }
    var e = new Error(message);
    if (innerError) {
      e.innerError = innerError;
    }
    return e;
  }
  var FEATURE = exports.FEATURE = {};
  var PLATFORM = exports.PLATFORM = {
    noop: function noop() {},
    eachModule: function eachModule() {}
  };
  PLATFORM.global = function() {
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return new Function('return this')();
  }();
  var DOM = exports.DOM = {};
  function initializePAL(callback) {
    if (typeof Object.getPropertyDescriptor !== 'function') {
      Object.getPropertyDescriptor = function(subject, name) {
        var pd = Object.getOwnPropertyDescriptor(subject, name);
        var proto = Object.getPrototypeOf(subject);
        while (typeof pd === 'undefined' && proto !== null) {
          pd = Object.getOwnPropertyDescriptor(proto, name);
          proto = Object.getPrototypeOf(proto);
        }
        return pd;
      };
    }
    callback(PLATFORM, FEATURE, DOM);
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal@1.0.0-beta.1.2.1", ["npm:aurelia-pal@1.0.0-beta.1.2.1/aurelia-pal"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging", ["exports"], function(exports) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.getLogger = getLogger;
  exports.addAppender = addAppender;
  exports.setLevel = setLevel;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var logLevel = exports.logLevel = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  };
  var loggers = {};
  var currentLevel = logLevel.none;
  var appenders = [];
  var slice = Array.prototype.slice;
  var loggerConstructionKey = {};
  function log(logger, level, args) {
    var i = appenders.length;
    var current = void 0;
    args = slice.call(args);
    args.unshift(logger);
    while (i--) {
      current = appenders[i];
      current[level].apply(current, args);
    }
  }
  function debug() {
    if (currentLevel < 4) {
      return;
    }
    log(this, 'debug', arguments);
  }
  function info() {
    if (currentLevel < 3) {
      return;
    }
    log(this, 'info', arguments);
  }
  function warn() {
    if (currentLevel < 2) {
      return;
    }
    log(this, 'warn', arguments);
  }
  function error() {
    if (currentLevel < 1) {
      return;
    }
    log(this, 'error', arguments);
  }
  function connectLogger(logger) {
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;
  }
  function createLogger(id) {
    var logger = new Logger(id, loggerConstructionKey);
    if (appenders.length) {
      connectLogger(logger);
    }
    return logger;
  }
  function getLogger(id) {
    return loggers[id] || (loggers[id] = createLogger(id));
  }
  function addAppender(appender) {
    appenders.push(appender);
    if (appenders.length === 1) {
      for (var key in loggers) {
        connectLogger(loggers[key]);
      }
    }
  }
  function setLevel(level) {
    currentLevel = level;
  }
  var Logger = exports.Logger = function() {
    function Logger(id, key) {
      _classCallCheck(this, Logger);
      if (key !== loggerConstructionKey) {
        throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
      }
      this.id = id;
    }
    Logger.prototype.debug = function debug(message) {};
    Logger.prototype.info = function info(message) {};
    Logger.prototype.warn = function warn(message) {};
    Logger.prototype.error = function error(message) {};
    return Logger;
  }();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging@1.0.0-beta.1.2.0", ["npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-binding@1.0.0-beta.1.3.3/aurelia-binding", ["exports", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-pal@1.0.0-beta.1.2.1", "npm:aurelia-task-queue@1.0.0-beta.1.2.0", "npm:aurelia-metadata@1.0.0-beta.1.2.0"], function(exports, _aureliaLogging, _aureliaPal, _aureliaTaskQueue, _aureliaMetadata) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.getSetObserver = exports.BindingEngine = exports.NameExpression = exports.Listener = exports.ListenerExpression = exports.BindingBehaviorResource = exports.ValueConverterResource = exports.Call = exports.CallExpression = exports.Binding = exports.BindingExpression = exports.ObjectObservationAdapter = exports.ObserverLocator = exports.SVGAnalyzer = exports.presentationAttributes = exports.presentationElements = exports.elements = exports.ComputedExpression = exports.ClassObserver = exports.SelectValueObserver = exports.CheckedObserver = exports.ValueAttributeObserver = exports.StyleObserver = exports.DataAttributeObserver = exports.dataAttributeAccessor = exports.XLinkAttributeObserver = exports.SetterObserver = exports.PrimitiveObserver = exports.propertyAccessor = exports.DirtyCheckProperty = exports.DirtyChecker = exports.EventManager = exports.getMapObserver = exports.ParserImplementation = exports.Parser = exports.Scanner = exports.Lexer = exports.Token = exports.bindingMode = exports.ExpressionCloner = exports.Unparser = exports.LiteralObject = exports.LiteralArray = exports.LiteralString = exports.LiteralPrimitive = exports.PrefixNot = exports.Binary = exports.CallFunction = exports.CallMember = exports.CallScope = exports.AccessKeyed = exports.AccessMember = exports.AccessScope = exports.AccessThis = exports.Conditional = exports.Assign = exports.ValueConverter = exports.BindingBehavior = exports.Chain = exports.Expression = exports.getArrayObserver = exports.CollectionLengthObserver = exports.ModifyCollectionObserver = exports.ExpressionObserver = exports.sourceContext = undefined;
  exports.camelCase = camelCase;
  exports.createOverrideContext = createOverrideContext;
  exports.getContextFor = getContextFor;
  exports.createScopeForTest = createScopeForTest;
  exports.connectable = connectable;
  exports.enqueueBindingConnect = enqueueBindingConnect;
  exports.subscriberCollection = subscriberCollection;
  exports.calcSplices = calcSplices;
  exports.mergeSplice = mergeSplice;
  exports.projectArraySplices = projectArraySplices;
  exports.getChangeRecords = getChangeRecords;
  exports.cloneExpression = cloneExpression;
  exports.hasDeclaredDependencies = hasDeclaredDependencies;
  exports.declarePropertyDependencies = declarePropertyDependencies;
  exports.computedFrom = computedFrom;
  exports.createComputedObserver = createComputedObserver;
  exports.valueConverter = valueConverter;
  exports.bindingBehavior = bindingBehavior;
  exports.observable = observable;
  var LogManager = _interopRequireWildcard(_aureliaLogging);
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
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
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
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _dec,
      _dec2,
      _class,
      _dec3,
      _class2,
      _dec4,
      _class3,
      _dec5,
      _class5,
      _dec6,
      _class7,
      _dec7,
      _class8,
      _dec8,
      _class9,
      _dec9,
      _class10,
      _class11,
      _temp,
      _dec10,
      _class12,
      _class13,
      _temp2;
  var map = Object.create(null);
  function camelCase(name) {
    if (name in map) {
      return map[name];
    }
    var result = name.charAt(0).toLowerCase() + name.slice(1).replace(/[_.-](\w|$)/g, function(_, x) {
      return x.toUpperCase();
    });
    map[name] = result;
    return result;
  }
  function createOverrideContext(bindingContext, parentOverrideContext) {
    return {
      bindingContext: bindingContext,
      parentOverrideContext: parentOverrideContext || null
    };
  }
  function getContextFor(name, scope, ancestor) {
    var oc = scope.overrideContext;
    if (ancestor) {
      while (ancestor && oc) {
        ancestor--;
        oc = oc.parentOverrideContext;
      }
      if (ancestor || !oc) {
        return undefined;
      }
      return name in oc ? oc : oc.bindingContext;
    }
    while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
      oc = oc.parentOverrideContext;
    }
    if (oc) {
      return name in oc ? oc : oc.bindingContext;
    }
    return scope.bindingContext || scope.overrideContext;
  }
  function createScopeForTest(bindingContext, parentBindingContext) {
    if (parentBindingContext) {
      return {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
      };
    }
    return {
      bindingContext: bindingContext,
      overrideContext: createOverrideContext(bindingContext)
    };
  }
  var sourceContext = exports.sourceContext = 'Binding:source';
  var slotNames = [];
  var versionSlotNames = [];
  for (var i = 0; i < 100; i++) {
    slotNames.push('_observer' + i);
    versionSlotNames.push('_observerVersion' + i);
  }
  function addObserver(observer) {
    var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
    var i = observerSlots;
    while (i-- && this[slotNames[i]] !== observer) {}
    if (i === -1) {
      i = 0;
      while (this[slotNames[i]]) {
        i++;
      }
      this[slotNames[i]] = observer;
      observer.subscribe(sourceContext, this);
      if (i === observerSlots) {
        this._observerSlots = i + 1;
      }
    }
    if (this._version === undefined) {
      this._version = 0;
    }
    this[versionSlotNames[i]] = this._version;
  }
  function observeProperty(obj, propertyName) {
    var observer = this.observerLocator.getObserver(obj, propertyName);
    addObserver.call(this, observer);
  }
  function observeArray(array) {
    var observer = this.observerLocator.getArrayObserver(array);
    addObserver.call(this, observer);
  }
  function unobserve(all) {
    var i = this._observerSlots;
    while (i--) {
      if (all || this[versionSlotNames[i]] !== this._version) {
        var observer = this[slotNames[i]];
        this[slotNames[i]] = null;
        if (observer) {
          observer.unsubscribe(sourceContext, this);
        }
      }
    }
  }
  function connectable() {
    return function(target) {
      target.prototype.observeProperty = observeProperty;
      target.prototype.observeArray = observeArray;
      target.prototype.unobserve = unobserve;
      target.prototype.addObserver = addObserver;
    };
  }
  var bindings = new Map();
  var minimumImmediate = 100;
  var frameBudget = 15;
  var isFlushRequested = false;
  var immediate = 0;
  function flush(animationFrameStart) {
    var i = 0;
    var keys = bindings.keys();
    var item = void 0;
    while (item = keys.next()) {
      if (item.done) {
        break;
      }
      var binding = item.value;
      bindings.delete(binding);
      binding.connect(true);
      i++;
      if (i % 100 === 0 && _aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
        break;
      }
    }
    if (bindings.size) {
      _aureliaPal.PLATFORM.requestAnimationFrame(flush);
    } else {
      isFlushRequested = false;
      immediate = 0;
    }
  }
  function enqueueBindingConnect(binding) {
    if (immediate < minimumImmediate) {
      immediate++;
      binding.connect(false);
    } else {
      bindings.set(binding);
    }
    if (!isFlushRequested) {
      isFlushRequested = true;
      _aureliaPal.PLATFORM.requestAnimationFrame(flush);
    }
  }
  function addSubscriber(context, callable) {
    if (this.hasSubscriber(context, callable)) {
      return false;
    }
    if (!this._context0) {
      this._context0 = context;
      this._callable0 = callable;
      return true;
    }
    if (!this._context1) {
      this._context1 = context;
      this._callable1 = callable;
      return true;
    }
    if (!this._context2) {
      this._context2 = context;
      this._callable2 = callable;
      return true;
    }
    if (!this._contextsRest) {
      this._contextsRest = [context];
      this._callablesRest = [callable];
      return true;
    }
    this._contextsRest.push(context);
    this._callablesRest.push(callable);
    return true;
  }
  function removeSubscriber(context, callable) {
    if (this._context0 === context && this._callable0 === callable) {
      this._context0 = null;
      this._callable0 = null;
      return true;
    }
    if (this._context1 === context && this._callable1 === callable) {
      this._context1 = null;
      this._callable1 = null;
      return true;
    }
    if (this._context2 === context && this._callable2 === callable) {
      this._context2 = null;
      this._callable2 = null;
      return true;
    }
    var rest = this._contextsRest;
    var index = void 0;
    if (!rest || !rest.length || (index = rest.indexOf(context)) === -1 || this._callablesRest[index] !== callable) {
      return false;
    }
    rest.splice(index, 1);
    this._callablesRest.splice(index, 1);
    return true;
  }
  var arrayPool1 = [];
  var arrayPool2 = [];
  var poolUtilization = [];
  function callSubscribers(newValue, oldValue) {
    var context0 = this._context0;
    var callable0 = this._callable0;
    var context1 = this._context1;
    var callable1 = this._callable1;
    var context2 = this._context2;
    var callable2 = this._callable2;
    var length = this._contextsRest ? this._contextsRest.length : 0;
    var contextsRest = void 0;
    var callablesRest = void 0;
    var poolIndex = void 0;
    var i = void 0;
    if (length) {
      poolIndex = poolUtilization.length;
      while (poolIndex-- && poolUtilization[poolIndex]) {}
      if (poolIndex < 0) {
        poolIndex = poolUtilization.length;
        contextsRest = [];
        callablesRest = [];
        poolUtilization.push(true);
        arrayPool1.push(contextsRest);
        arrayPool2.push(callablesRest);
      } else {
        poolUtilization[poolIndex] = true;
        contextsRest = arrayPool1[poolIndex];
        callablesRest = arrayPool2[poolIndex];
      }
      i = length;
      while (i--) {
        contextsRest[i] = this._contextsRest[i];
        callablesRest[i] = this._callablesRest[i];
      }
    }
    if (context0) {
      if (callable0) {
        callable0.call(context0, newValue, oldValue);
      } else {
        context0(newValue, oldValue);
      }
    }
    if (context1) {
      if (callable1) {
        callable1.call(context1, newValue, oldValue);
      } else {
        context1(newValue, oldValue);
      }
    }
    if (context2) {
      if (callable2) {
        callable2.call(context2, newValue, oldValue);
      } else {
        context2(newValue, oldValue);
      }
    }
    if (length) {
      for (i = 0; i < length; i++) {
        var callable = callablesRest[i];
        var context = contextsRest[i];
        if (callable) {
          callable.call(context, newValue, oldValue);
        } else {
          context(newValue, oldValue);
        }
        contextsRest[i] = null;
        callablesRest[i] = null;
      }
      poolUtilization[poolIndex] = false;
    }
  }
  function hasSubscribers() {
    return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
  }
  function hasSubscriber(context, callable) {
    var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
    if (has) {
      return true;
    }
    var index = void 0;
    var contexts = this._contextsRest;
    if (!contexts || (index = contexts.length) === 0) {
      return false;
    }
    var callables = this._callablesRest;
    while (index--) {
      if (contexts[index] === context && callables[index] === callable) {
        return true;
      }
    }
    return false;
  }
  function subscriberCollection() {
    return function(target) {
      target.prototype.addSubscriber = addSubscriber;
      target.prototype.removeSubscriber = removeSubscriber;
      target.prototype.callSubscribers = callSubscribers;
      target.prototype.hasSubscribers = hasSubscribers;
      target.prototype.hasSubscriber = hasSubscriber;
    };
  }
  var ExpressionObserver = exports.ExpressionObserver = (_dec = connectable(), _dec2 = subscriberCollection(), _dec(_class = _dec2(_class = function() {
    function ExpressionObserver(scope, expression, observerLocator, lookupFunctions) {
      this.scope = scope;
      this.expression = expression;
      this.observerLocator = observerLocator;
      this.lookupFunctions = lookupFunctions;
    }
    ExpressionObserver.prototype.getValue = function getValue() {
      return this.expression.evaluate(this.scope, this.lookupFunctions);
    };
    ExpressionObserver.prototype.setValue = function setValue(newValue) {
      this.expression.assign(this.scope, newValue);
    };
    ExpressionObserver.prototype.subscribe = function subscribe(context, callable) {
      var _this = this;
      if (!this.hasSubscribers()) {
        this.oldValue = this.expression.evaluate(this.scope, this.lookupFunctions);
        this.expression.connect(this, this.scope);
      }
      this.addSubscriber(context, callable);
      if (arguments.length === 1 && context instanceof Function) {
        return {dispose: function dispose() {
            _this.unsubscribe(context, callable);
          }};
      }
    };
    ExpressionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.unobserve(true);
        this.oldValue = undefined;
      }
    };
    ExpressionObserver.prototype.call = function call() {
      var newValue = this.expression.evaluate(this.scope, this.lookupFunctions);
      var oldValue = this.oldValue;
      if (newValue !== oldValue) {
        this.oldValue = newValue;
        this.callSubscribers(newValue, oldValue);
      }
      this._version++;
      this.expression.connect(this, this.scope);
      this.unobserve(false);
    };
    return ExpressionObserver;
  }()) || _class) || _class);
  function isIndex(s) {
    return +s === s >>> 0;
  }
  function toNumber(s) {
    return +s;
  }
  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }
  var EDIT_LEAVE = 0;
  var EDIT_UPDATE = 1;
  var EDIT_ADD = 2;
  var EDIT_DELETE = 3;
  function ArraySplice() {}
  ArraySplice.prototype = {
    calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var rowCount = oldEnd - oldStart + 1;
      var columnCount = currentEnd - currentStart + 1;
      var distances = new Array(rowCount);
      var north = void 0;
      var west = void 0;
      for (var _i = 0; _i < rowCount; ++_i) {
        distances[_i] = new Array(columnCount);
        distances[_i][0] = _i;
      }
      for (var j = 0; j < columnCount; ++j) {
        distances[0][j] = j;
      }
      for (var _i2 = 1; _i2 < rowCount; ++_i2) {
        for (var _j = 1; _j < columnCount; ++_j) {
          if (this.equals(current[currentStart + _j - 1], old[oldStart + _i2 - 1])) {
            distances[_i2][_j] = distances[_i2 - 1][_j - 1];
          } else {
            north = distances[_i2 - 1][_j] + 1;
            west = distances[_i2][_j - 1] + 1;
            distances[_i2][_j] = north < west ? north : west;
          }
        }
      }
      return distances;
    },
    spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
      var i = distances.length - 1;
      var j = distances[0].length - 1;
      var current = distances[i][j];
      var edits = [];
      while (i > 0 || j > 0) {
        if (i === 0) {
          edits.push(EDIT_ADD);
          j--;
          continue;
        }
        if (j === 0) {
          edits.push(EDIT_DELETE);
          i--;
          continue;
        }
        var northWest = distances[i - 1][j - 1];
        var west = distances[i - 1][j];
        var north = distances[i][j - 1];
        var min = void 0;
        if (west < north) {
          min = west < northWest ? west : northWest;
        } else {
          min = north < northWest ? north : northWest;
        }
        if (min === northWest) {
          if (northWest === current) {
            edits.push(EDIT_LEAVE);
          } else {
            edits.push(EDIT_UPDATE);
            current = northWest;
          }
          i--;
          j--;
        } else if (min === west) {
          edits.push(EDIT_DELETE);
          i--;
          current = west;
        } else {
          edits.push(EDIT_ADD);
          j--;
          current = north;
        }
      }
      edits.reverse();
      return edits;
    },
    calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var prefixCount = 0;
      var suffixCount = 0;
      var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
      if (currentStart === 0 && oldStart === 0) {
        prefixCount = this.sharedPrefix(current, old, minLength);
      }
      if (currentEnd === current.length && oldEnd === old.length) {
        suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
      }
      currentStart += prefixCount;
      oldStart += prefixCount;
      currentEnd -= suffixCount;
      oldEnd -= suffixCount;
      if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
        return [];
      }
      if (currentStart === currentEnd) {
        var _splice = newSplice(currentStart, [], 0);
        while (oldStart < oldEnd) {
          _splice.removed.push(old[oldStart++]);
        }
        return [_splice];
      } else if (oldStart === oldEnd) {
        return [newSplice(currentStart, [], currentEnd - currentStart)];
      }
      var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
      var splice = undefined;
      var splices = [];
      var index = currentStart;
      var oldIndex = oldStart;
      for (var _i3 = 0; _i3 < ops.length; ++_i3) {
        switch (ops[_i3]) {
          case EDIT_LEAVE:
            if (splice) {
              splices.push(splice);
              splice = undefined;
            }
            index++;
            oldIndex++;
            break;
          case EDIT_UPDATE:
            if (!splice) {
              splice = newSplice(index, [], 0);
            }
            splice.addedCount++;
            index++;
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
          case EDIT_ADD:
            if (!splice) {
              splice = newSplice(index, [], 0);
            }
            splice.addedCount++;
            index++;
            break;
          case EDIT_DELETE:
            if (!splice) {
              splice = newSplice(index, [], 0);
            }
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
        }
      }
      if (splice) {
        splices.push(splice);
      }
      return splices;
    },
    sharedPrefix: function sharedPrefix(current, old, searchLength) {
      for (var _i4 = 0; _i4 < searchLength; ++_i4) {
        if (!this.equals(current[_i4], old[_i4])) {
          return _i4;
        }
      }
      return searchLength;
    },
    sharedSuffix: function sharedSuffix(current, old, searchLength) {
      var index1 = current.length;
      var index2 = old.length;
      var count = 0;
      while (count < searchLength && this.equals(current[--index1], old[--index2])) {
        count++;
      }
      return count;
    },
    calculateSplices: function calculateSplices(current, previous) {
      return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
    },
    equals: function equals(currentValue, previousValue) {
      return currentValue === previousValue;
    }
  };
  var arraySplice = new ArraySplice();
  function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
  }
  function intersect(start1, end1, start2, end2) {
    if (end1 < start2 || end2 < start1) {
      return -1;
    }
    if (end1 === start2 || end2 === start1) {
      return 0;
    }
    if (start1 < start2) {
      if (end1 < end2) {
        return end1 - start2;
      }
      return end2 - start2;
    }
    if (end2 < end1) {
      return end2 - start1;
    }
    return end1 - start1;
  }
  function mergeSplice(splices, index, removed, addedCount) {
    var splice = newSplice(index, removed, addedCount);
    var inserted = false;
    var insertionOffset = 0;
    for (var _i5 = 0; _i5 < splices.length; _i5++) {
      var current = splices[_i5];
      current.index += insertionOffset;
      if (inserted) {
        continue;
      }
      var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
      if (intersectCount >= 0) {
        splices.splice(_i5, 1);
        _i5--;
        insertionOffset -= current.addedCount - current.removed.length;
        splice.addedCount += current.addedCount - intersectCount;
        var deleteCount = splice.removed.length + current.removed.length - intersectCount;
        if (!splice.addedCount && !deleteCount) {
          inserted = true;
        } else {
          var currentRemoved = current.removed;
          if (splice.index < current.index) {
            var prepend = splice.removed.slice(0, current.index - splice.index);
            Array.prototype.push.apply(prepend, currentRemoved);
            currentRemoved = prepend;
          }
          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            var append = splice.removed.slice(current.index + current.addedCount - splice.index);
            Array.prototype.push.apply(currentRemoved, append);
          }
          splice.removed = currentRemoved;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        inserted = true;
        splices.splice(_i5, 0, splice);
        _i5++;
        var offset = splice.addedCount - splice.removed.length;
        current.index += offset;
        insertionOffset += offset;
      }
    }
    if (!inserted) {
      splices.push(splice);
    }
  }
  function createInitialSplices(array, changeRecords) {
    var splices = [];
    for (var _i6 = 0; _i6 < changeRecords.length; _i6++) {
      var record = changeRecords[_i6];
      switch (record.type) {
        case 'splice':
          mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
          break;
        case 'add':
        case 'update':
        case 'delete':
          if (!isIndex(record.name)) {
            continue;
          }
          var index = toNumber(record.name);
          if (index < 0) {
            continue;
          }
          mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
          break;
        default:
          console.error('Unexpected record type: ' + JSON.stringify(record));
          break;
      }
    }
    return splices;
  }
  function projectArraySplices(array, changeRecords) {
    var splices = [];
    createInitialSplices(array, changeRecords).forEach(function(splice) {
      if (splice.addedCount === 1 && splice.removed.length === 1) {
        if (splice.removed[0] !== array[splice.index]) {
          splices.push(splice);
        }
        return;
      }
      splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
    });
    return splices;
  }
  function newRecord(type, object, key, oldValue) {
    return {
      type: type,
      object: object,
      key: key,
      oldValue: oldValue
    };
  }
  function getChangeRecords(map) {
    var entries = new Array(map.size);
    var keys = map.keys();
    var i = 0;
    var item = void 0;
    while (item = keys.next()) {
      if (item.done) {
        break;
      }
      entries[i] = newRecord('added', map, item.value);
      i++;
    }
    return entries;
  }
  var ModifyCollectionObserver = exports.ModifyCollectionObserver = (_dec3 = subscriberCollection(), _dec3(_class2 = function() {
    function ModifyCollectionObserver(taskQueue, collection) {
      this.taskQueue = taskQueue;
      this.queued = false;
      this.changeRecords = null;
      this.oldCollection = null;
      this.collection = collection;
      this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
    }
    ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
      if (!this.hasSubscribers() && !this.lengthObserver) {
        return;
      }
      if (changeRecord.type === 'splice') {
        var index = changeRecord.index;
        var arrayLength = changeRecord.object.length;
        if (index > arrayLength) {
          index = arrayLength - changeRecord.addedCount;
        } else if (index < 0) {
          index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
        }
        if (index < 0) {
          index = 0;
        }
        changeRecord.index = index;
      }
      if (this.changeRecords === null) {
        this.changeRecords = [changeRecord];
      } else {
        this.changeRecords.push(changeRecord);
      }
      if (!this.queued) {
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }
    };
    ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
      if (this.changeRecords && this.changeRecords.length || this.oldCollection) {
        this.call();
      }
    };
    ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
      this.oldCollection = oldCollection;
      if (this.hasSubscribers() && !this.queued) {
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }
    };
    ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
      return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
    };
    ModifyCollectionObserver.prototype.call = function call() {
      var changeRecords = this.changeRecords;
      var oldCollection = this.oldCollection;
      var records = void 0;
      this.queued = false;
      this.changeRecords = [];
      this.oldCollection = null;
      if (this.hasSubscribers()) {
        if (oldCollection) {
          if (this.collection instanceof Map || this.collection instanceof Set) {
            records = getChangeRecords(oldCollection);
          } else {
            records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
          }
        } else {
          if (this.collection instanceof Map || this.collection instanceof Set) {
            records = changeRecords;
          } else {
            records = projectArraySplices(this.collection, changeRecords);
          }
        }
        this.callSubscribers(records);
      }
      if (this.lengthObserver) {
        this.lengthObserver.call(this.collection[this.lengthPropertyName]);
      }
    };
    return ModifyCollectionObserver;
  }()) || _class2);
  var CollectionLengthObserver = exports.CollectionLengthObserver = (_dec4 = subscriberCollection(), _dec4(_class3 = function() {
    function CollectionLengthObserver(collection) {
      this.collection = collection;
      this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
      this.currentValue = collection[this.lengthPropertyName];
    }
    CollectionLengthObserver.prototype.getValue = function getValue() {
      return this.collection[this.lengthPropertyName];
    };
    CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
      this.collection[this.lengthPropertyName] = newValue;
    };
    CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    CollectionLengthObserver.prototype.call = function call(newValue) {
      var oldValue = this.currentValue;
      this.callSubscribers(newValue, oldValue);
      this.currentValue = newValue;
    };
    return CollectionLengthObserver;
  }()) || _class3);
  var pop = Array.prototype.pop;
  var push = Array.prototype.push;
  var reverse = Array.prototype.reverse;
  var shift = Array.prototype.shift;
  var sort = Array.prototype.sort;
  var splice = Array.prototype.splice;
  var unshift = Array.prototype.unshift;
  Array.prototype.pop = function() {
    var notEmpty = this.length > 0;
    var methodCallResult = pop.apply(this, arguments);
    if (notEmpty && this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'delete',
        object: this,
        name: this.length,
        oldValue: methodCallResult
      });
    }
    return methodCallResult;
  };
  Array.prototype.push = function() {
    var methodCallResult = push.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: this.length - arguments.length,
        removed: [],
        addedCount: arguments.length
      });
    }
    return methodCallResult;
  };
  Array.prototype.reverse = function() {
    var oldArray = void 0;
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.flushChangeRecords();
      oldArray = this.slice();
    }
    var methodCallResult = reverse.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.reset(oldArray);
    }
    return methodCallResult;
  };
  Array.prototype.shift = function() {
    var notEmpty = this.length > 0;
    var methodCallResult = shift.apply(this, arguments);
    if (notEmpty && this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'delete',
        object: this,
        name: 0,
        oldValue: methodCallResult
      });
    }
    return methodCallResult;
  };
  Array.prototype.sort = function() {
    var oldArray = void 0;
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.flushChangeRecords();
      oldArray = this.slice();
    }
    var methodCallResult = sort.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.reset(oldArray);
    }
    return methodCallResult;
  };
  Array.prototype.splice = function() {
    var methodCallResult = splice.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: arguments[0],
        removed: methodCallResult,
        addedCount: arguments.length > 2 ? arguments.length - 2 : 0
      });
    }
    return methodCallResult;
  };
  Array.prototype.unshift = function() {
    var methodCallResult = unshift.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: 0,
        removed: [],
        addedCount: arguments.length
      });
    }
    return methodCallResult;
  };
  function _getArrayObserver(taskQueue, array) {
    return ModifyArrayObserver.for(taskQueue, array);
  }
  exports.getArrayObserver = _getArrayObserver;
  var ModifyArrayObserver = function(_ModifyCollectionObse) {
    _inherits(ModifyArrayObserver, _ModifyCollectionObse);
    function ModifyArrayObserver(taskQueue, array) {
      return _possibleConstructorReturn(this, _ModifyCollectionObse.call(this, taskQueue, array));
    }
    ModifyArrayObserver.for = function _for(taskQueue, array) {
      if (!('__array_observer__' in array)) {
        var observer = ModifyArrayObserver.create(taskQueue, array);
        Reflect.defineProperty(array, '__array_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return array.__array_observer__;
    };
    ModifyArrayObserver.create = function create(taskQueue, array) {
      var observer = new ModifyArrayObserver(taskQueue, array);
      return observer;
    };
    return ModifyArrayObserver;
  }(ModifyCollectionObserver);
  var Expression = exports.Expression = function() {
    function Expression() {
      this.isChain = false;
      this.isAssignable = false;
    }
    Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
      throw new Error('Binding expression "' + this + '" cannot be evaluated.');
    };
    Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
      throw new Error('Binding expression "' + this + '" cannot be assigned to.');
    };
    Expression.prototype.toString = function toString() {
      return Unparser.unparse(this);
    };
    return Expression;
  }();
  var Chain = exports.Chain = function(_Expression) {
    _inherits(Chain, _Expression);
    function Chain(expressions) {
      var _this3 = _possibleConstructorReturn(this, _Expression.call(this));
      _this3.expressions = expressions;
      _this3.isChain = true;
      return _this3;
    }
    Chain.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var result = void 0;
      var expressions = this.expressions;
      var last = void 0;
      for (var _i7 = 0,
          length = expressions.length; _i7 < length; ++_i7) {
        last = expressions[_i7].evaluate(scope, lookupFunctions);
        if (last !== null) {
          result = last;
        }
      }
      return result;
    };
    Chain.prototype.accept = function accept(visitor) {
      return visitor.visitChain(this);
    };
    return Chain;
  }(Expression);
  var BindingBehavior = exports.BindingBehavior = function(_Expression2) {
    _inherits(BindingBehavior, _Expression2);
    function BindingBehavior(expression, name, args) {
      var _this4 = _possibleConstructorReturn(this, _Expression2.call(this));
      _this4.expression = expression;
      _this4.name = name;
      _this4.args = args;
      return _this4;
    }
    BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.expression.evaluate(scope, lookupFunctions);
    };
    BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
      return this.expression.assign(scope, value, lookupFunctions);
    };
    BindingBehavior.prototype.accept = function accept(visitor) {
      return visitor.visitBindingBehavior(this);
    };
    BindingBehavior.prototype.connect = function connect(binding, scope) {
      this.expression.connect(binding, scope);
    };
    BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
      if (this.expression.expression && this.expression.bind) {
        this.expression.bind(binding, scope, lookupFunctions);
      }
      var behavior = lookupFunctions.bindingBehaviors(this.name);
      if (!behavior) {
        throw new Error('No BindingBehavior named "' + this.name + '" was found!');
      }
      var behaviorKey = 'behavior-' + this.name;
      if (binding[behaviorKey]) {
        throw new Error('A binding behavior named "' + this.name + '" has already been applied to "' + this.expression + '"');
      }
      binding[behaviorKey] = behavior;
      behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, this.args, binding.lookupFunctions)));
    };
    BindingBehavior.prototype.unbind = function unbind(binding, scope) {
      var behaviorKey = 'behavior-' + this.name;
      binding[behaviorKey].unbind(binding, scope);
      binding[behaviorKey] = null;
      if (this.expression.expression && this.expression.unbind) {
        this.expression.unbind(binding, scope);
      }
    };
    return BindingBehavior;
  }(Expression);
  var ValueConverter = exports.ValueConverter = function(_Expression3) {
    _inherits(ValueConverter, _Expression3);
    function ValueConverter(expression, name, args, allArgs) {
      var _this5 = _possibleConstructorReturn(this, _Expression3.call(this));
      _this5.expression = expression;
      _this5.name = name;
      _this5.args = args;
      _this5.allArgs = allArgs;
      return _this5;
    }
    ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var converter = lookupFunctions.valueConverters(this.name);
      if (!converter) {
        throw new Error('No ValueConverter named "' + this.name + '" was found!');
      }
      if ('toView' in converter) {
        return converter.toView.apply(converter, evalList(scope, this.allArgs, lookupFunctions));
      }
      return this.allArgs[0].evaluate(scope, lookupFunctions);
    };
    ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
      var converter = lookupFunctions.valueConverters(this.name);
      if (!converter) {
        throw new Error('No ValueConverter named "' + this.name + '" was found!');
      }
      if ('fromView' in converter) {
        value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, lookupFunctions)));
      }
      return this.allArgs[0].assign(scope, value, lookupFunctions);
    };
    ValueConverter.prototype.accept = function accept(visitor) {
      return visitor.visitValueConverter(this);
    };
    ValueConverter.prototype.connect = function connect(binding, scope) {
      var expressions = this.allArgs;
      var i = expressions.length;
      while (i--) {
        expressions[i].connect(binding, scope);
      }
    };
    return ValueConverter;
  }(Expression);
  var Assign = exports.Assign = function(_Expression4) {
    _inherits(Assign, _Expression4);
    function Assign(target, value) {
      var _this6 = _possibleConstructorReturn(this, _Expression4.call(this));
      _this6.target = target;
      _this6.value = value;
      return _this6;
    }
    Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.target.assign(scope, this.value.evaluate(scope, lookupFunctions));
    };
    Assign.prototype.accept = function accept(vistor) {
      vistor.visitAssign(this);
    };
    Assign.prototype.connect = function connect(binding, scope) {};
    return Assign;
  }(Expression);
  var Conditional = exports.Conditional = function(_Expression5) {
    _inherits(Conditional, _Expression5);
    function Conditional(condition, yes, no) {
      var _this7 = _possibleConstructorReturn(this, _Expression5.call(this));
      _this7.condition = condition;
      _this7.yes = yes;
      _this7.no = no;
      return _this7;
    }
    Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
    };
    Conditional.prototype.accept = function accept(visitor) {
      return visitor.visitConditional(this);
    };
    Conditional.prototype.connect = function connect(binding, scope) {
      this.condition.connect(binding, scope);
      if (this.condition.evaluate(scope)) {
        this.yes.connect(binding, scope);
      } else {
        this.no.connect(binding, scope);
      }
    };
    return Conditional;
  }(Expression);
  var AccessThis = exports.AccessThis = function(_Expression6) {
    _inherits(AccessThis, _Expression6);
    function AccessThis(ancestor) {
      var _this8 = _possibleConstructorReturn(this, _Expression6.call(this));
      _this8.ancestor = ancestor;
      return _this8;
    }
    AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var oc = scope.overrideContext;
      var i = this.ancestor;
      while (i-- && oc) {
        oc = oc.parentOverrideContext;
      }
      return i < 1 && oc ? oc.bindingContext : undefined;
    };
    AccessThis.prototype.accept = function accept(visitor) {
      return visitor.visitAccessThis(this);
    };
    AccessThis.prototype.connect = function connect(binding, scope) {};
    return AccessThis;
  }(Expression);
  var AccessScope = exports.AccessScope = function(_Expression7) {
    _inherits(AccessScope, _Expression7);
    function AccessScope(name, ancestor) {
      var _this9 = _possibleConstructorReturn(this, _Expression7.call(this));
      _this9.name = name;
      _this9.ancestor = ancestor;
      _this9.isAssignable = true;
      return _this9;
    }
    AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var context = getContextFor(this.name, scope, this.ancestor);
      return context[this.name];
    };
    AccessScope.prototype.assign = function assign(scope, value) {
      var context = getContextFor(this.name, scope, this.ancestor);
      return context ? context[this.name] = value : undefined;
    };
    AccessScope.prototype.accept = function accept(visitor) {
      return visitor.visitAccessScope(this);
    };
    AccessScope.prototype.connect = function connect(binding, scope) {
      var context = getContextFor(this.name, scope, this.ancestor);
      binding.observeProperty(context, this.name);
    };
    return AccessScope;
  }(Expression);
  var AccessMember = exports.AccessMember = function(_Expression8) {
    _inherits(AccessMember, _Expression8);
    function AccessMember(object, name) {
      var _this10 = _possibleConstructorReturn(this, _Expression8.call(this));
      _this10.object = object;
      _this10.name = name;
      _this10.isAssignable = true;
      return _this10;
    }
    AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      return instance === null || instance === undefined ? instance : instance[this.name];
    };
    AccessMember.prototype.assign = function assign(scope, value) {
      var instance = this.object.evaluate(scope);
      if (instance === null || instance === undefined) {
        instance = {};
        this.object.assign(scope, instance);
      }
      return instance[this.name] = value;
    };
    AccessMember.prototype.accept = function accept(visitor) {
      return visitor.visitAccessMember(this);
    };
    AccessMember.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (obj) {
        binding.observeProperty(obj, this.name);
      }
    };
    return AccessMember;
  }(Expression);
  var AccessKeyed = exports.AccessKeyed = function(_Expression9) {
    _inherits(AccessKeyed, _Expression9);
    function AccessKeyed(object, key) {
      var _this11 = _possibleConstructorReturn(this, _Expression9.call(this));
      _this11.object = object;
      _this11.key = key;
      _this11.isAssignable = true;
      return _this11;
    }
    AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      var lookup = this.key.evaluate(scope, lookupFunctions);
      return getKeyed(instance, lookup);
    };
    AccessKeyed.prototype.assign = function assign(scope, value) {
      var instance = this.object.evaluate(scope);
      var lookup = this.key.evaluate(scope);
      return setKeyed(instance, lookup, value);
    };
    AccessKeyed.prototype.accept = function accept(visitor) {
      return visitor.visitAccessKeyed(this);
    };
    AccessKeyed.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (obj instanceof Object) {
        this.key.connect(binding, scope);
        var key = this.key.evaluate(scope);
        if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
          binding.observeProperty(obj, key);
        }
      }
    };
    return AccessKeyed;
  }(Expression);
  var CallScope = exports.CallScope = function(_Expression10) {
    _inherits(CallScope, _Expression10);
    function CallScope(name, args, ancestor) {
      var _this12 = _possibleConstructorReturn(this, _Expression10.call(this));
      _this12.name = name;
      _this12.args = args;
      _this12.ancestor = ancestor;
      return _this12;
    }
    CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var args = evalList(scope, this.args, lookupFunctions);
      var context = getContextFor(this.name, scope, this.ancestor);
      var func = getFunction(context, this.name, mustEvaluate);
      if (func) {
        return func.apply(context, args);
      }
      return undefined;
    };
    CallScope.prototype.accept = function accept(visitor) {
      return visitor.visitCallScope(this);
    };
    CallScope.prototype.connect = function connect(binding, scope) {
      var args = this.args;
      var i = args.length;
      while (i--) {
        args[i].connect(binding, scope);
      }
    };
    return CallScope;
  }(Expression);
  var CallMember = exports.CallMember = function(_Expression11) {
    _inherits(CallMember, _Expression11);
    function CallMember(object, name, args) {
      var _this13 = _possibleConstructorReturn(this, _Expression11.call(this));
      _this13.object = object;
      _this13.name = name;
      _this13.args = args;
      return _this13;
    }
    CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      var args = evalList(scope, this.args, lookupFunctions);
      var func = getFunction(instance, this.name, mustEvaluate);
      if (func) {
        return func.apply(instance, args);
      }
      return undefined;
    };
    CallMember.prototype.accept = function accept(visitor) {
      return visitor.visitCallMember(this);
    };
    CallMember.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (getFunction(obj, this.name, false)) {
        var args = this.args;
        var _i8 = args.length;
        while (_i8--) {
          args[_i8].connect(binding, scope);
        }
      }
    };
    return CallMember;
  }(Expression);
  var CallFunction = exports.CallFunction = function(_Expression12) {
    _inherits(CallFunction, _Expression12);
    function CallFunction(func, args) {
      var _this14 = _possibleConstructorReturn(this, _Expression12.call(this));
      _this14.func = func;
      _this14.args = args;
      return _this14;
    }
    CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var func = this.func.evaluate(scope, lookupFunctions);
      if (typeof func === 'function') {
        return func.apply(null, evalList(scope, this.args, lookupFunctions));
      }
      if (!mustEvaluate && (func === null || func === undefined)) {
        return undefined;
      }
      throw new Error(this.func + ' is not a function');
    };
    CallFunction.prototype.accept = function accept(visitor) {
      return visitor.visitCallFunction(this);
    };
    CallFunction.prototype.connect = function connect(binding, scope) {
      this.func.connect(binding, scope);
      var func = this.func.evaluate(scope);
      if (typeof func === 'function') {
        var args = this.args;
        var _i9 = args.length;
        while (_i9--) {
          args[_i9].connect(binding, scope);
        }
      }
    };
    return CallFunction;
  }(Expression);
  var Binary = exports.Binary = function(_Expression13) {
    _inherits(Binary, _Expression13);
    function Binary(operation, left, right) {
      var _this15 = _possibleConstructorReturn(this, _Expression13.call(this));
      _this15.operation = operation;
      _this15.left = left;
      _this15.right = right;
      return _this15;
    }
    Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var left = this.left.evaluate(scope);
      switch (this.operation) {
        case '&&':
          return left && this.right.evaluate(scope);
        case '||':
          return left || this.right.evaluate(scope);
      }
      var right = this.right.evaluate(scope);
      switch (this.operation) {
        case '==':
          return left == right;
        case '===':
          return left === right;
        case '!=':
          return left != right;
        case '!==':
          return left !== right;
      }
      if (left === null || right === null || left === undefined || right === undefined) {
        switch (this.operation) {
          case '+':
            if (left !== null && left !== undefined)
              return left;
            if (right !== null && right !== undefined)
              return right;
            return 0;
          case '-':
            if (left !== null && left !== undefined)
              return left;
            if (right !== null && right !== undefined)
              return 0 - right;
            return 0;
        }
        return null;
      }
      switch (this.operation) {
        case '+':
          return autoConvertAdd(left, right);
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '%':
          return left % right;
        case '<':
          return left < right;
        case '>':
          return left > right;
        case '<=':
          return left <= right;
        case '>=':
          return left >= right;
        case '^':
          return left ^ right;
      }
      throw new Error('Internal error [' + this.operation + '] not handled');
    };
    Binary.prototype.accept = function accept(visitor) {
      return visitor.visitBinary(this);
    };
    Binary.prototype.connect = function connect(binding, scope) {
      this.left.connect(binding, scope);
      var left = this.left.evaluate(scope);
      if (this.operation === '&&' && !left || this.operation === '||' && left) {
        return;
      }
      this.right.connect(binding, scope);
    };
    return Binary;
  }(Expression);
  var PrefixNot = exports.PrefixNot = function(_Expression14) {
    _inherits(PrefixNot, _Expression14);
    function PrefixNot(operation, expression) {
      var _this16 = _possibleConstructorReturn(this, _Expression14.call(this));
      _this16.operation = operation;
      _this16.expression = expression;
      return _this16;
    }
    PrefixNot.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return !this.expression.evaluate(scope);
    };
    PrefixNot.prototype.accept = function accept(visitor) {
      return visitor.visitPrefix(this);
    };
    PrefixNot.prototype.connect = function connect(binding, scope) {
      this.expression.connect(binding, scope);
    };
    return PrefixNot;
  }(Expression);
  var LiteralPrimitive = exports.LiteralPrimitive = function(_Expression15) {
    _inherits(LiteralPrimitive, _Expression15);
    function LiteralPrimitive(value) {
      var _this17 = _possibleConstructorReturn(this, _Expression15.call(this));
      _this17.value = value;
      return _this17;
    }
    LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.value;
    };
    LiteralPrimitive.prototype.accept = function accept(visitor) {
      return visitor.visitLiteralPrimitive(this);
    };
    LiteralPrimitive.prototype.connect = function connect(binding, scope) {};
    return LiteralPrimitive;
  }(Expression);
  var LiteralString = exports.LiteralString = function(_Expression16) {
    _inherits(LiteralString, _Expression16);
    function LiteralString(value) {
      var _this18 = _possibleConstructorReturn(this, _Expression16.call(this));
      _this18.value = value;
      return _this18;
    }
    LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.value;
    };
    LiteralString.prototype.accept = function accept(visitor) {
      return visitor.visitLiteralString(this);
    };
    LiteralString.prototype.connect = function connect(binding, scope) {};
    return LiteralString;
  }(Expression);
  var LiteralArray = exports.LiteralArray = function(_Expression17) {
    _inherits(LiteralArray, _Expression17);
    function LiteralArray(elements) {
      var _this19 = _possibleConstructorReturn(this, _Expression17.call(this));
      _this19.elements = elements;
      return _this19;
    }
    LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var elements = this.elements;
      var result = [];
      for (var _i10 = 0,
          length = elements.length; _i10 < length; ++_i10) {
        result[_i10] = elements[_i10].evaluate(scope, lookupFunctions);
      }
      return result;
    };
    LiteralArray.prototype.accept = function accept(visitor) {
      return visitor.visitLiteralArray(this);
    };
    LiteralArray.prototype.connect = function connect(binding, scope) {
      var length = this.elements.length;
      for (var _i11 = 0; _i11 < length; _i11++) {
        this.elements[_i11].connect(binding, scope);
      }
    };
    return LiteralArray;
  }(Expression);
  var LiteralObject = exports.LiteralObject = function(_Expression18) {
    _inherits(LiteralObject, _Expression18);
    function LiteralObject(keys, values) {
      var _this20 = _possibleConstructorReturn(this, _Expression18.call(this));
      _this20.keys = keys;
      _this20.values = values;
      return _this20;
    }
    LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = {};
      var keys = this.keys;
      var values = this.values;
      for (var _i12 = 0,
          length = keys.length; _i12 < length; ++_i12) {
        instance[keys[_i12]] = values[_i12].evaluate(scope, lookupFunctions);
      }
      return instance;
    };
    LiteralObject.prototype.accept = function accept(visitor) {
      return visitor.visitLiteralObject(this);
    };
    LiteralObject.prototype.connect = function connect(binding, scope) {
      var length = this.keys.length;
      for (var _i13 = 0; _i13 < length; _i13++) {
        this.values[_i13].connect(binding, scope);
      }
    };
    return LiteralObject;
  }(Expression);
  var evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
  function evalList(scope, list, lookupFunctions) {
    var length = list.length;
    for (var cacheLength = evalListCache.length; cacheLength <= length; ++cacheLength) {
      evalListCache.push([]);
    }
    var result = evalListCache[length];
    for (var _i14 = 0; _i14 < length; ++_i14) {
      result[_i14] = list[_i14].evaluate(scope, lookupFunctions);
    }
    return result;
  }
  function autoConvertAdd(a, b) {
    if (a !== null && b !== null) {
      if (typeof a === 'string' && typeof b !== 'string') {
        return a + b.toString();
      }
      if (typeof a !== 'string' && typeof b === 'string') {
        return a.toString() + b;
      }
      return a + b;
    }
    if (a !== null) {
      return a;
    }
    if (b !== null) {
      return b;
    }
    return 0;
  }
  function getFunction(obj, name, mustExist) {
    var func = obj === null || obj === undefined ? null : obj[name];
    if (typeof func === 'function') {
      return func;
    }
    if (!mustExist && (func === null || func === undefined)) {
      return null;
    }
    throw new Error(name + ' is not a function');
  }
  function getKeyed(obj, key) {
    if (Array.isArray(obj)) {
      return obj[parseInt(key, 10)];
    } else if (obj) {
      return obj[key];
    } else if (obj === null || obj === undefined) {
      return undefined;
    }
    return obj[key];
  }
  function setKeyed(obj, key, value) {
    if (Array.isArray(obj)) {
      var index = parseInt(key, 10);
      if (obj.length <= index) {
        obj.length = index + 1;
      }
      obj[index] = value;
    } else {
      obj[key] = value;
    }
    return value;
  }
  var Unparser = exports.Unparser = function() {
    function Unparser(buffer) {
      this.buffer = buffer;
    }
    Unparser.unparse = function unparse(expression) {
      var buffer = [];
      var visitor = new Unparser(buffer);
      expression.accept(visitor);
      return buffer.join('');
    };
    Unparser.prototype.write = function write(text) {
      this.buffer.push(text);
    };
    Unparser.prototype.writeArgs = function writeArgs(args) {
      this.write('(');
      for (var _i15 = 0,
          length = args.length; _i15 < length; ++_i15) {
        if (_i15 !== 0) {
          this.write(',');
        }
        args[_i15].accept(this);
      }
      this.write(')');
    };
    Unparser.prototype.visitChain = function visitChain(chain) {
      var expressions = chain.expressions;
      for (var _i16 = 0,
          length = expression.length; _i16 < length; ++_i16) {
        if (_i16 !== 0) {
          this.write(';');
        }
        expressions[_i16].accept(this);
      }
    };
    Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
      var args = behavior.args;
      behavior.expression.accept(this);
      this.write('&' + behavior.name);
      for (var _i17 = 0,
          length = args.length; _i17 < length; ++_i17) {
        this.write(':');
        args[_i17].accept(this);
      }
    };
    Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
      var args = converter.args;
      converter.expression.accept(this);
      this.write('|' + converter.name);
      for (var _i18 = 0,
          length = args.length; _i18 < length; ++_i18) {
        this.write(':');
        args[_i18].accept(this);
      }
    };
    Unparser.prototype.visitAssign = function visitAssign(assign) {
      assign.target.accept(this);
      this.write('=');
      assign.value.accept(this);
    };
    Unparser.prototype.visitConditional = function visitConditional(conditional) {
      conditional.condition.accept(this);
      this.write('?');
      conditional.yes.accept(this);
      this.write(':');
      conditional.no.accept(this);
    };
    Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
      if (access.ancestor === 0) {
        this.write('$this');
        return;
      }
      this.write('$parent');
      var i = access.ancestor - 1;
      while (i--) {
        this.write('.$parent');
      }
    };
    Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
      var i = access.ancestor;
      while (i--) {
        this.write('$parent.');
      }
      this.write(access.name);
    };
    Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
      access.object.accept(this);
      this.write('.' + access.name);
    };
    Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
      access.object.accept(this);
      this.write('[');
      access.key.accept(this);
      this.write(']');
    };
    Unparser.prototype.visitCallScope = function visitCallScope(call) {
      var i = call.ancestor;
      while (i--) {
        this.write('$parent.');
      }
      this.write(call.name);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
      call.func.accept(this);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitCallMember = function visitCallMember(call) {
      call.object.accept(this);
      this.write('.' + call.name);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
      this.write('(' + prefix.operation);
      prefix.expression.accept(this);
      this.write(')');
    };
    Unparser.prototype.visitBinary = function visitBinary(binary) {
      binary.left.accept(this);
      this.write(binary.operation);
      binary.right.accept(this);
    };
    Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
      this.write('' + literal.value);
    };
    Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
      var elements = literal.elements;
      this.write('[');
      for (var _i19 = 0,
          length = elements.length; _i19 < length; ++_i19) {
        if (_i19 !== 0) {
          this.write(',');
        }
        elements[_i19].accept(this);
      }
      this.write(']');
    };
    Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
      var keys = literal.keys;
      var values = literal.values;
      this.write('{');
      for (var _i20 = 0,
          length = keys.length; _i20 < length; ++_i20) {
        if (_i20 !== 0) {
          this.write(',');
        }
        this.write('\'' + keys[_i20] + '\':');
        values[_i20].accept(this);
      }
      this.write('}');
    };
    Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
      var escaped = literal.value.replace(/'/g, "\'");
      this.write('\'' + escaped + '\'');
    };
    return Unparser;
  }();
  var ExpressionCloner = exports.ExpressionCloner = function() {
    function ExpressionCloner() {}
    ExpressionCloner.prototype.cloneExpressionArray = function cloneExpressionArray(array) {
      var clonedArray = [];
      var i = array.length;
      while (i--) {
        clonedArray[i] = array[i].accept(this);
      }
      return clonedArray;
    };
    ExpressionCloner.prototype.visitChain = function visitChain(chain) {
      return new Chain(this.cloneExpressionArray(chain.expressions));
    };
    ExpressionCloner.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
      return new BindingBehavior(behavior.expression.accept(this), behavior.name, this.cloneExpressionArray(behavior.args));
    };
    ExpressionCloner.prototype.visitValueConverter = function visitValueConverter(converter) {
      return new ValueConverter(converter.expression.accept(this), converter.name, this.cloneExpressionArray(converter.args));
    };
    ExpressionCloner.prototype.visitAssign = function visitAssign(assign) {
      return new Assign(assign.target.accept(this), assign.value.accept(this));
    };
    ExpressionCloner.prototype.visitConditional = function visitConditional(conditional) {
      return new Conditional(conditional.condition.accept(this), conditional.yes.accept(this), conditional.no.accept(this));
    };
    ExpressionCloner.prototype.visitAccessThis = function visitAccessThis(access) {
      return new AccessThis(access.ancestor);
    };
    ExpressionCloner.prototype.visitAccessScope = function visitAccessScope(access) {
      return new AccessScope(access.name, access.ancestor);
    };
    ExpressionCloner.prototype.visitAccessMember = function visitAccessMember(access) {
      return new AccessMember(access.object.accept(this), access.name);
    };
    ExpressionCloner.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
      return new AccessKeyed(access.object.accept(this), access.key.accept(this));
    };
    ExpressionCloner.prototype.visitCallScope = function visitCallScope(call) {
      return new CallScope(call.name, this.cloneExpressionArray(call.args), call.ancestor);
    };
    ExpressionCloner.prototype.visitCallFunction = function visitCallFunction(call) {
      return new CallFunction(call.func.accept(this), this.cloneExpressionArray(call.args));
    };
    ExpressionCloner.prototype.visitCallMember = function visitCallMember(call) {
      return new CallMember(call.object.accept(this), call.name, this.cloneExpressionArray(call.args));
    };
    ExpressionCloner.prototype.visitPrefix = function visitPrefix(prefix) {
      return new PrefixNot(prefix.operation, prefix.expression.accept(this));
    };
    ExpressionCloner.prototype.visitBinary = function visitBinary(binary) {
      return new Binary(binary.operation, binary.left.accept(this), binary.right.accept(this));
    };
    ExpressionCloner.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
      return new LiteralPrimitive(literal);
    };
    ExpressionCloner.prototype.visitLiteralArray = function visitLiteralArray(literal) {
      return new LiteralArray(this.cloneExpressionArray(literal.elements));
    };
    ExpressionCloner.prototype.visitLiteralObject = function visitLiteralObject(literal) {
      return new LiteralObject(literal.keys, this.cloneExpressionArray(literal.values));
    };
    ExpressionCloner.prototype.visitLiteralString = function visitLiteralString(literal) {
      return new LiteralString(literal.value);
    };
    return ExpressionCloner;
  }();
  function cloneExpression(expression) {
    var visitor = new ExpressionCloner();
    return expression.accept(visitor);
  }
  var bindingMode = exports.bindingMode = {
    oneTime: 0,
    oneWay: 1,
    twoWay: 2
  };
  var Token = exports.Token = function() {
    function Token(index, text) {
      this.index = index;
      this.text = text;
    }
    Token.prototype.withOp = function withOp(op) {
      this.opKey = op;
      return this;
    };
    Token.prototype.withGetterSetter = function withGetterSetter(key) {
      this.key = key;
      return this;
    };
    Token.prototype.withValue = function withValue(value) {
      this.value = value;
      return this;
    };
    Token.prototype.toString = function toString() {
      return 'Token(' + this.text + ')';
    };
    return Token;
  }();
  var Lexer = exports.Lexer = function() {
    function Lexer() {}
    Lexer.prototype.lex = function lex(text) {
      var scanner = new Scanner(text);
      var tokens = [];
      var token = scanner.scanToken();
      while (token) {
        tokens.push(token);
        token = scanner.scanToken();
      }
      return tokens;
    };
    return Lexer;
  }();
  var Scanner = exports.Scanner = function() {
    function Scanner(input) {
      this.input = input;
      this.length = input.length;
      this.peek = 0;
      this.index = -1;
      this.advance();
    }
    Scanner.prototype.scanToken = function scanToken() {
      while (this.peek <= $SPACE) {
        if (++this.index >= this.length) {
          this.peek = $EOF;
          return null;
        }
        this.peek = this.input.charCodeAt(this.index);
      }
      if (isIdentifierStart(this.peek)) {
        return this.scanIdentifier();
      }
      if (isDigit(this.peek)) {
        return this.scanNumber(this.index);
      }
      var start = this.index;
      switch (this.peek) {
        case $PERIOD:
          this.advance();
          return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
        case $LPAREN:
        case $RPAREN:
        case $LBRACE:
        case $RBRACE:
        case $LBRACKET:
        case $RBRACKET:
        case $COMMA:
        case $COLON:
        case $SEMICOLON:
          return this.scanCharacter(start, String.fromCharCode(this.peek));
        case $SQ:
        case $DQ:
          return this.scanString();
        case $PLUS:
        case $MINUS:
        case $STAR:
        case $SLASH:
        case $PERCENT:
        case $CARET:
        case $QUESTION:
          return this.scanOperator(start, String.fromCharCode(this.peek));
        case $LT:
        case $GT:
        case $BANG:
        case $EQ:
          return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
        case $AMPERSAND:
          return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
        case $BAR:
          return this.scanComplexOperator(start, $BAR, '|', '|');
        case $NBSP:
          while (isWhitespace(this.peek)) {
            this.advance();
          }
          return this.scanToken();
      }
      var character = String.fromCharCode(this.peek);
      this.error('Unexpected character [' + character + ']');
      return null;
    };
    Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
      assert(this.peek === text.charCodeAt(0));
      this.advance();
      return new Token(start, text);
    };
    Scanner.prototype.scanOperator = function scanOperator(start, text) {
      assert(this.peek === text.charCodeAt(0));
      assert(OPERATORS.indexOf(text) !== -1);
      this.advance();
      return new Token(start, text).withOp(text);
    };
    Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
      assert(this.peek === one.charCodeAt(0));
      this.advance();
      var text = one;
      if (this.peek === code) {
        this.advance();
        text += two;
      }
      if (this.peek === code) {
        this.advance();
        text += two;
      }
      assert(OPERATORS.indexOf(text) !== -1);
      return new Token(start, text).withOp(text);
    };
    Scanner.prototype.scanIdentifier = function scanIdentifier() {
      assert(isIdentifierStart(this.peek));
      var start = this.index;
      this.advance();
      while (isIdentifierPart(this.peek)) {
        this.advance();
      }
      var text = this.input.substring(start, this.index);
      var result = new Token(start, text);
      if (OPERATORS.indexOf(text) !== -1) {
        result.withOp(text);
      } else {
        result.withGetterSetter(text);
      }
      return result;
    };
    Scanner.prototype.scanNumber = function scanNumber(start) {
      assert(isDigit(this.peek));
      var simple = this.index === start;
      this.advance();
      while (true) {
        if (isDigit(this.peek)) {} else if (this.peek === $PERIOD) {
          simple = false;
        } else if (isExponentStart(this.peek)) {
          this.advance();
          if (isExponentSign(this.peek)) {
            this.advance();
          }
          if (!isDigit(this.peek)) {
            this.error('Invalid exponent', -1);
          }
          simple = false;
        } else {
          break;
        }
        this.advance();
      }
      var text = this.input.substring(start, this.index);
      var value = simple ? parseInt(text, 10) : parseFloat(text);
      return new Token(start, text).withValue(value);
    };
    Scanner.prototype.scanString = function scanString() {
      assert(this.peek === $SQ || this.peek === $DQ);
      var start = this.index;
      var quote = this.peek;
      this.advance();
      var buffer = void 0;
      var marker = this.index;
      while (this.peek !== quote) {
        if (this.peek === $BACKSLASH) {
          if (!buffer) {
            buffer = [];
          }
          buffer.push(this.input.substring(marker, this.index));
          this.advance();
          var _unescaped = void 0;
          if (this.peek === $u) {
            var hex = this.input.substring(this.index + 1, this.index + 5);
            if (!/[A-Z0-9]{4}/.test(hex)) {
              this.error('Invalid unicode escape [\\u' + hex + ']');
            }
            _unescaped = parseInt(hex, 16);
            for (var _i21 = 0; _i21 < 5; ++_i21) {
              this.advance();
            }
          } else {
            _unescaped = unescape(this.peek);
            this.advance();
          }
          buffer.push(String.fromCharCode(_unescaped));
          marker = this.index;
        } else if (this.peek === $EOF) {
          this.error('Unterminated quote');
        } else {
          this.advance();
        }
      }
      var last = this.input.substring(marker, this.index);
      this.advance();
      var text = this.input.substring(start, this.index);
      var unescaped = last;
      if (buffer !== null && buffer !== undefined) {
        buffer.push(last);
        unescaped = buffer.join('');
      }
      return new Token(start, text).withValue(unescaped);
    };
    Scanner.prototype.advance = function advance() {
      if (++this.index >= this.length) {
        this.peek = $EOF;
      } else {
        this.peek = this.input.charCodeAt(this.index);
      }
    };
    Scanner.prototype.error = function error(message) {
      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var position = this.index + offset;
      throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
    };
    return Scanner;
  }();
  var OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];
  var $EOF = 0;
  var $TAB = 9;
  var $LF = 10;
  var $VTAB = 11;
  var $FF = 12;
  var $CR = 13;
  var $SPACE = 32;
  var $BANG = 33;
  var $DQ = 34;
  var $$ = 36;
  var $PERCENT = 37;
  var $AMPERSAND = 38;
  var $SQ = 39;
  var $LPAREN = 40;
  var $RPAREN = 41;
  var $STAR = 42;
  var $PLUS = 43;
  var $COMMA = 44;
  var $MINUS = 45;
  var $PERIOD = 46;
  var $SLASH = 47;
  var $COLON = 58;
  var $SEMICOLON = 59;
  var $LT = 60;
  var $EQ = 61;
  var $GT = 62;
  var $QUESTION = 63;
  var $0 = 48;
  var $9 = 57;
  var $A = 65;
  var $E = 69;
  var $Z = 90;
  var $LBRACKET = 91;
  var $BACKSLASH = 92;
  var $RBRACKET = 93;
  var $CARET = 94;
  var $_ = 95;
  var $a = 97;
  var $e = 101;
  var $f = 102;
  var $n = 110;
  var $r = 114;
  var $t = 116;
  var $u = 117;
  var $v = 118;
  var $z = 122;
  var $LBRACE = 123;
  var $BAR = 124;
  var $RBRACE = 125;
  var $NBSP = 160;
  function isWhitespace(code) {
    return code >= $TAB && code <= $SPACE || code === $NBSP;
  }
  function isIdentifierStart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
  }
  function isIdentifierPart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code === $e || code === $E;
  }
  function isExponentSign(code) {
    return code === $MINUS || code === $PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return $LF;
      case $f:
        return $FF;
      case $r:
        return $CR;
      case $t:
        return $TAB;
      case $v:
        return $VTAB;
      default:
        return code;
    }
  }
  function assert(condition, message) {
    if (!condition) {
      throw message || 'Assertion failed';
    }
  }
  var EOF = new Token(-1, null);
  var Parser = exports.Parser = function() {
    function Parser() {
      this.cache = {};
      this.lexer = new Lexer();
    }
    Parser.prototype.parse = function parse(input) {
      input = input || '';
      return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
    };
    return Parser;
  }();
  var ParserImplementation = exports.ParserImplementation = function() {
    function ParserImplementation(lexer, input) {
      this.index = 0;
      this.input = input;
      this.tokens = lexer.lex(input);
    }
    ParserImplementation.prototype.parseChain = function parseChain() {
      var isChain = false;
      var expressions = [];
      while (this.optional(';')) {
        isChain = true;
      }
      while (this.index < this.tokens.length) {
        if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
          this.error('Unconsumed token ' + this.peek.text);
        }
        var expr = this.parseBindingBehavior();
        expressions.push(expr);
        while (this.optional(';')) {
          isChain = true;
        }
        if (isChain) {
          this.error('Multiple expressions are not allowed.');
        }
      }
      return expressions.length === 1 ? expressions[0] : new Chain(expressions);
    };
    ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
      var result = this.parseValueConverter();
      while (this.optional('&')) {
        var name = this.peek.text;
        var args = [];
        this.advance();
        while (this.optional(':')) {
          args.push(this.parseExpression());
        }
        result = new BindingBehavior(result, name, args);
      }
      return result;
    };
    ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
      var result = this.parseExpression();
      while (this.optional('|')) {
        var name = this.peek.text;
        var args = [];
        this.advance();
        while (this.optional(':')) {
          args.push(this.parseExpression());
        }
        result = new ValueConverter(result, name, args, [result].concat(args));
      }
      return result;
    };
    ParserImplementation.prototype.parseExpression = function parseExpression() {
      var start = this.peek.index;
      var result = this.parseConditional();
      while (this.peek.text === '=') {
        if (!result.isAssignable) {
          var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
          var _expression = this.input.substring(start, end);
          this.error('Expression ' + _expression + ' is not assignable');
        }
        this.expect('=');
        result = new Assign(result, this.parseConditional());
      }
      return result;
    };
    ParserImplementation.prototype.parseConditional = function parseConditional() {
      var start = this.peek.index;
      var result = this.parseLogicalOr();
      if (this.optional('?')) {
        var yes = this.parseExpression();
        if (!this.optional(':')) {
          var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
          var _expression2 = this.input.substring(start, end);
          this.error('Conditional expression ' + _expression2 + ' requires all 3 expressions');
        }
        var no = this.parseExpression();
        result = new Conditional(result, yes, no);
      }
      return result;
    };
    ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
      var result = this.parseLogicalAnd();
      while (this.optional('||')) {
        result = new Binary('||', result, this.parseLogicalAnd());
      }
      return result;
    };
    ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
      var result = this.parseEquality();
      while (this.optional('&&')) {
        result = new Binary('&&', result, this.parseEquality());
      }
      return result;
    };
    ParserImplementation.prototype.parseEquality = function parseEquality() {
      var result = this.parseRelational();
      while (true) {
        if (this.optional('==')) {
          result = new Binary('==', result, this.parseRelational());
        } else if (this.optional('!=')) {
          result = new Binary('!=', result, this.parseRelational());
        } else if (this.optional('===')) {
          result = new Binary('===', result, this.parseRelational());
        } else if (this.optional('!==')) {
          result = new Binary('!==', result, this.parseRelational());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseRelational = function parseRelational() {
      var result = this.parseAdditive();
      while (true) {
        if (this.optional('<')) {
          result = new Binary('<', result, this.parseAdditive());
        } else if (this.optional('>')) {
          result = new Binary('>', result, this.parseAdditive());
        } else if (this.optional('<=')) {
          result = new Binary('<=', result, this.parseAdditive());
        } else if (this.optional('>=')) {
          result = new Binary('>=', result, this.parseAdditive());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseAdditive = function parseAdditive() {
      var result = this.parseMultiplicative();
      while (true) {
        if (this.optional('+')) {
          result = new Binary('+', result, this.parseMultiplicative());
        } else if (this.optional('-')) {
          result = new Binary('-', result, this.parseMultiplicative());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
      var result = this.parsePrefix();
      while (true) {
        if (this.optional('*')) {
          result = new Binary('*', result, this.parsePrefix());
        } else if (this.optional('%')) {
          result = new Binary('%', result, this.parsePrefix());
        } else if (this.optional('/')) {
          result = new Binary('/', result, this.parsePrefix());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parsePrefix = function parsePrefix() {
      if (this.optional('+')) {
        return this.parsePrefix();
      } else if (this.optional('-')) {
        return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
      } else if (this.optional('!')) {
        return new PrefixNot('!', this.parsePrefix());
      }
      return this.parseAccessOrCallMember();
    };
    ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
      var result = this.parsePrimary();
      while (true) {
        if (this.optional('.')) {
          var name = this.peek.text;
          this.advance();
          if (this.optional('(')) {
            var args = this.parseExpressionList(')');
            this.expect(')');
            if (result instanceof AccessThis) {
              result = new CallScope(name, args, result.ancestor);
            } else {
              result = new CallMember(result, name, args);
            }
          } else {
            if (result instanceof AccessThis) {
              result = new AccessScope(name, result.ancestor);
            } else {
              result = new AccessMember(result, name);
            }
          }
        } else if (this.optional('[')) {
          var key = this.parseExpression();
          this.expect(']');
          result = new AccessKeyed(result, key);
        } else if (this.optional('(')) {
          var _args = this.parseExpressionList(')');
          this.expect(')');
          result = new CallFunction(result, _args);
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parsePrimary = function parsePrimary() {
      if (this.optional('(')) {
        var result = this.parseExpression();
        this.expect(')');
        return result;
      } else if (this.optional('null')) {
        return new LiteralPrimitive(null);
      } else if (this.optional('undefined')) {
        return new LiteralPrimitive(undefined);
      } else if (this.optional('true')) {
        return new LiteralPrimitive(true);
      } else if (this.optional('false')) {
        return new LiteralPrimitive(false);
      } else if (this.optional('[')) {
        var elements = this.parseExpressionList(']');
        this.expect(']');
        return new LiteralArray(elements);
      } else if (this.peek.text === '{') {
        return this.parseObject();
      } else if (this.peek.key !== null && this.peek.key !== undefined) {
        return this.parseAccessOrCallScope();
      } else if (this.peek.value !== null && this.peek.value !== undefined) {
        var value = this.peek.value;
        this.advance();
        return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
      } else if (this.index >= this.tokens.length) {
        throw new Error('Unexpected end of expression: ' + this.input);
      } else {
        this.error('Unexpected token ' + this.peek.text);
      }
    };
    ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
      var name = this.peek.key;
      this.advance();
      if (name === '$this') {
        return new AccessThis(0);
      }
      var ancestor = 0;
      while (name === '$parent') {
        ancestor++;
        if (this.optional('.')) {
          name = this.peek.key;
          this.advance();
        } else if (this.peek === EOF || this.peek.text === '(' || this.peek.text === '[' || this.peek.text === '}') {
          return new AccessThis(ancestor);
        } else {
          this.error('Unexpected token ' + this.peek.text);
        }
      }
      if (this.optional('(')) {
        var args = this.parseExpressionList(')');
        this.expect(')');
        return new CallScope(name, args, ancestor);
      }
      return new AccessScope(name, ancestor);
    };
    ParserImplementation.prototype.parseObject = function parseObject() {
      var keys = [];
      var values = [];
      this.expect('{');
      if (this.peek.text !== '}') {
        do {
          var peek = this.peek;
          var value = peek.value;
          keys.push(typeof value === 'string' ? value : peek.text);
          this.advance();
          if (peek.key && (this.peek.text === ',' || this.peek.text === '}')) {
            --this.index;
            values.push(this.parseAccessOrCallScope());
          } else {
            this.expect(':');
            values.push(this.parseExpression());
          }
        } while (this.optional(','));
      }
      this.expect('}');
      return new LiteralObject(keys, values);
    };
    ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
      var result = [];
      if (this.peek.text !== terminator) {
        do {
          result.push(this.parseExpression());
        } while (this.optional(','));
      }
      return result;
    };
    ParserImplementation.prototype.optional = function optional(text) {
      if (this.peek.text === text) {
        this.advance();
        return true;
      }
      return false;
    };
    ParserImplementation.prototype.expect = function expect(text) {
      if (this.peek.text === text) {
        this.advance();
      } else {
        this.error('Missing expected ' + text);
      }
    };
    ParserImplementation.prototype.advance = function advance() {
      this.index++;
    };
    ParserImplementation.prototype.error = function error(message) {
      var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';
      throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
    };
    _createClass(ParserImplementation, [{
      key: 'peek',
      get: function get() {
        return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
      }
    }]);
    return ParserImplementation;
  }();
  var mapProto = Map.prototype;
  function _getMapObserver(taskQueue, map) {
    return ModifyMapObserver.for(taskQueue, map);
  }
  exports.getMapObserver = _getMapObserver;
  var ModifyMapObserver = function(_ModifyCollectionObse2) {
    _inherits(ModifyMapObserver, _ModifyCollectionObse2);
    function ModifyMapObserver(taskQueue, map) {
      return _possibleConstructorReturn(this, _ModifyCollectionObse2.call(this, taskQueue, map));
    }
    ModifyMapObserver.for = function _for(taskQueue, map) {
      if (!('__map_observer__' in map)) {
        var observer = ModifyMapObserver.create(taskQueue, map);
        Reflect.defineProperty(map, '__map_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return map.__map_observer__;
    };
    ModifyMapObserver.create = function create(taskQueue, map) {
      var observer = new ModifyMapObserver(taskQueue, map);
      var proto = mapProto;
      if (proto.add !== map.add || proto.delete !== map.delete || proto.clear !== map.clear) {
        proto = {
          add: map.add,
          delete: map.delete,
          clear: map.clear
        };
      }
      map.set = function() {
        var hasValue = map.has(arguments[0]);
        var type = hasValue ? 'update' : 'add';
        var oldValue = map.get(arguments[0]);
        var methodCallResult = proto.set.apply(map, arguments);
        if (!hasValue || oldValue !== map.get(arguments[0])) {
          observer.addChangeRecord({
            type: type,
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
        }
        return methodCallResult;
      };
      map.delete = function() {
        var hasValue = map.has(arguments[0]);
        var oldValue = map.get(arguments[0]);
        var methodCallResult = proto.delete.apply(map, arguments);
        if (hasValue) {
          observer.addChangeRecord({
            type: 'delete',
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
        }
        return methodCallResult;
      };
      map.clear = function() {
        var methodCallResult = proto.clear.apply(map, arguments);
        observer.addChangeRecord({
          type: 'clear',
          object: map
        });
        return methodCallResult;
      };
      return observer;
    };
    return ModifyMapObserver;
  }(ModifyCollectionObserver);
  function findOriginalEventTarget(event) {
    return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
  }
  function handleDelegatedEvent(event) {
    var target = findOriginalEventTarget(event);
    var callback = void 0;
    while (target && !callback) {
      if (target.delegatedCallbacks) {
        callback = target.delegatedCallbacks[event.type];
      }
      if (!callback) {
        target = target.parentNode;
      }
    }
    if (callback) {
      callback(event);
    }
  }
  var DelegateHandlerEntry = function() {
    function DelegateHandlerEntry(eventName) {
      this.eventName = eventName;
      this.count = 0;
    }
    DelegateHandlerEntry.prototype.increment = function increment() {
      this.count++;
      if (this.count === 1) {
        _aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
      }
    };
    DelegateHandlerEntry.prototype.decrement = function decrement() {
      this.count--;
      if (this.count === 0) {
        _aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent);
      }
    };
    return DelegateHandlerEntry;
  }();
  var DefaultEventStrategy = function() {
    function DefaultEventStrategy() {
      this.delegatedHandlers = [];
    }
    DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, delegate) {
      var _this22 = this;
      if (delegate) {
        var _ret = function() {
          var delegatedHandlers = _this22.delegatedHandlers;
          var handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
          var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});
          handlerEntry.increment();
          delegatedCallbacks[targetEvent] = callback;
          return {v: function v() {
              handlerEntry.decrement();
              delegatedCallbacks[targetEvent] = null;
            }};
        }();
        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
          return _ret.v;
      }
      target.addEventListener(targetEvent, callback, false);
      return function() {
        target.removeEventListener(targetEvent, callback);
      };
    };
    return DefaultEventStrategy;
  }();
  var EventManager = exports.EventManager = function() {
    function EventManager() {
      this.elementHandlerLookup = {};
      this.eventStrategyLookup = {};
      this.registerElementConfig({
        tagName: 'input',
        properties: {
          value: ['change', 'input'],
          checked: ['change', 'input'],
          files: ['change', 'input']
        }
      });
      this.registerElementConfig({
        tagName: 'textarea',
        properties: {value: ['change', 'input']}
      });
      this.registerElementConfig({
        tagName: 'select',
        properties: {value: ['change']}
      });
      this.registerElementConfig({
        tagName: 'content editable',
        properties: {value: ['change', 'input', 'blur', 'keyup', 'paste']}
      });
      this.registerElementConfig({
        tagName: 'scrollable element',
        properties: {
          scrollTop: ['scroll'],
          scrollLeft: ['scroll']
        }
      });
      this.defaultEventStrategy = new DefaultEventStrategy();
    }
    EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
      var tagName = config.tagName.toLowerCase();
      var properties = config.properties;
      var propertyName = void 0;
      this.elementHandlerLookup[tagName] = {};
      for (propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
        }
      }
    };
    EventManager.prototype.registerElementPropertyConfig = function registerElementPropertyConfig(tagName, propertyName, events) {
      this.elementHandlerLookup[tagName][propertyName] = this.createElementHandler(events);
    };
    EventManager.prototype.createElementHandler = function createElementHandler(events) {
      return {subscribe: function subscribe(target, callback) {
          events.forEach(function(changeEvent) {
            target.addEventListener(changeEvent, callback, false);
          });
          return function() {
            events.forEach(function(changeEvent) {
              target.removeEventListener(changeEvent, callback);
            });
          };
        }};
    };
    EventManager.prototype.registerElementHandler = function registerElementHandler(tagName, handler) {
      this.elementHandlerLookup[tagName.toLowerCase()] = handler;
    };
    EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
      this.eventStrategyLookup[eventName] = strategy;
    };
    EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
      var tagName = void 0;
      var lookup = this.elementHandlerLookup;
      if (target.tagName) {
        tagName = target.tagName.toLowerCase();
        if (lookup[tagName] && lookup[tagName][propertyName]) {
          return lookup[tagName][propertyName];
        }
        if (propertyName === 'textContent' || propertyName === 'innerHTML') {
          return lookup['content editable'].value;
        }
        if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
          return lookup['scrollable element'][propertyName];
        }
      }
      return null;
    };
    EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callback, delegate) {
      return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callback, delegate);
    };
    return EventManager;
  }();
  var DirtyChecker = exports.DirtyChecker = function() {
    function DirtyChecker() {
      this.tracked = [];
      this.checkDelay = 120;
    }
    DirtyChecker.prototype.addProperty = function addProperty(property) {
      var tracked = this.tracked;
      tracked.push(property);
      if (tracked.length === 1) {
        this.scheduleDirtyCheck();
      }
    };
    DirtyChecker.prototype.removeProperty = function removeProperty(property) {
      var tracked = this.tracked;
      tracked.splice(tracked.indexOf(property), 1);
    };
    DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
      var _this23 = this;
      setTimeout(function() {
        return _this23.check();
      }, this.checkDelay);
    };
    DirtyChecker.prototype.check = function check() {
      var tracked = this.tracked;
      var i = tracked.length;
      while (i--) {
        var current = tracked[i];
        if (current.isDirty()) {
          current.call();
        }
      }
      if (tracked.length) {
        this.scheduleDirtyCheck();
      }
    };
    return DirtyChecker;
  }();
  var DirtyCheckProperty = exports.DirtyCheckProperty = (_dec5 = subscriberCollection(), _dec5(_class5 = function() {
    function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
      this.dirtyChecker = dirtyChecker;
      this.obj = obj;
      this.propertyName = propertyName;
    }
    DirtyCheckProperty.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };
    DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };
    DirtyCheckProperty.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.getValue();
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    DirtyCheckProperty.prototype.isDirty = function isDirty() {
      return this.oldValue !== this.obj[this.propertyName];
    };
    DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.oldValue = this.getValue();
        this.dirtyChecker.addProperty(this);
      }
      this.addSubscriber(context, callable);
    };
    DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.dirtyChecker.removeProperty(this);
      }
    };
    return DirtyCheckProperty;
  }()) || _class5);
  var logger = LogManager.getLogger('property-observation');
  var propertyAccessor = exports.propertyAccessor = {
    getValue: function getValue(obj, propertyName) {
      return obj[propertyName];
    },
    setValue: function setValue(value, obj, propertyName) {
      obj[propertyName] = value;
    }
  };
  var PrimitiveObserver = exports.PrimitiveObserver = function() {
    function PrimitiveObserver(primitive, propertyName) {
      this.doNotCache = true;
      this.primitive = primitive;
      this.propertyName = propertyName;
    }
    PrimitiveObserver.prototype.getValue = function getValue() {
      return this.primitive[this.propertyName];
    };
    PrimitiveObserver.prototype.setValue = function setValue() {
      var type = _typeof(this.primitive);
      throw new Error('The ' + this.propertyName + ' property of a ' + type + ' (' + this.primitive + ') cannot be assigned.');
    };
    PrimitiveObserver.prototype.subscribe = function subscribe() {};
    PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};
    return PrimitiveObserver;
  }();
  var SetterObserver = exports.SetterObserver = (_dec6 = subscriberCollection(), _dec6(_class7 = function() {
    function SetterObserver(taskQueue, obj, propertyName) {
      this.taskQueue = taskQueue;
      this.obj = obj;
      this.propertyName = propertyName;
      this.queued = false;
      this.observing = false;
    }
    SetterObserver.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };
    SetterObserver.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };
    SetterObserver.prototype.getterValue = function getterValue() {
      return this.currentValue;
    };
    SetterObserver.prototype.setterValue = function setterValue(newValue) {
      var oldValue = this.currentValue;
      if (oldValue !== newValue) {
        if (!this.queued) {
          this.oldValue = oldValue;
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
        this.currentValue = newValue;
      }
    };
    SetterObserver.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.currentValue;
      this.queued = false;
      this.callSubscribers(newValue, oldValue);
    };
    SetterObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.observing) {
        this.convertProperty();
      }
      this.addSubscriber(context, callable);
    };
    SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    SetterObserver.prototype.convertProperty = function convertProperty() {
      this.observing = true;
      this.currentValue = this.obj[this.propertyName];
      this.setValue = this.setterValue;
      this.getValue = this.getterValue;
      if (!Reflect.defineProperty(this.obj, this.propertyName, {
        configurable: true,
        enumerable: true,
        get: this.getValue.bind(this),
        set: this.setValue.bind(this)
      })) {
        logger.warn('Cannot observe property \'' + this.propertyName + '\' of object', this.obj);
      }
    };
    return SetterObserver;
  }()) || _class7);
  var XLinkAttributeObserver = exports.XLinkAttributeObserver = function() {
    function XLinkAttributeObserver(element, propertyName, attributeName) {
      this.element = element;
      this.propertyName = propertyName;
      this.attributeName = attributeName;
    }
    XLinkAttributeObserver.prototype.getValue = function getValue() {
      return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
    };
    XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
      return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
    };
    XLinkAttributeObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return XLinkAttributeObserver;
  }();
  var dataAttributeAccessor = exports.dataAttributeAccessor = {
    getValue: function getValue(obj, propertyName) {
      return obj.getAttribute(propertyName);
    },
    setValue: function setValue(value, obj, propertyName) {
      return obj.setAttribute(propertyName, value);
    }
  };
  var DataAttributeObserver = exports.DataAttributeObserver = function() {
    function DataAttributeObserver(element, propertyName) {
      this.element = element;
      this.propertyName = propertyName;
    }
    DataAttributeObserver.prototype.getValue = function getValue() {
      return this.element.getAttribute(this.propertyName);
    };
    DataAttributeObserver.prototype.setValue = function setValue(newValue) {
      return this.element.setAttribute(this.propertyName, newValue);
    };
    DataAttributeObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return DataAttributeObserver;
  }();
  var StyleObserver = exports.StyleObserver = function() {
    function StyleObserver(element, propertyName) {
      this.element = element;
      this.propertyName = propertyName;
      this.styles = null;
      this.version = 0;
    }
    StyleObserver.prototype.getValue = function getValue() {
      return this.element.style.cssText;
    };
    StyleObserver.prototype.setValue = function setValue(newValue) {
      var styles = this.styles || {};
      var style = void 0;
      var version = this.version;
      if (newValue !== null && newValue !== undefined) {
        if (newValue instanceof Object) {
          for (style in newValue) {
            if (newValue.hasOwnProperty(style)) {
              styles[style] = version;
              this.element.style[style] = newValue[style];
            }
          }
        } else if (newValue.length) {
          var pairs = newValue.split(/(?:;|:(?!\/))\s*/);
          for (var _i22 = 0,
              length = pairs.length; _i22 < length; _i22++) {
            style = pairs[_i22].trim();
            if (!style) {
              continue;
            }
            styles[style] = version;
            this.element.style[style] = pairs[++_i22];
          }
        }
      }
      this.styles = styles;
      this.version += 1;
      if (version === 0) {
        return;
      }
      version -= 1;
      for (style in styles) {
        if (!styles.hasOwnProperty(style) || styles[style] !== version) {
          continue;
        }
        this.element.style[style] = '';
      }
    };
    StyleObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return StyleObserver;
  }();
  var ValueAttributeObserver = exports.ValueAttributeObserver = (_dec7 = subscriberCollection(), _dec7(_class8 = function() {
    function ValueAttributeObserver(element, propertyName, handler) {
      this.element = element;
      this.propertyName = propertyName;
      this.handler = handler;
      if (propertyName === 'files') {
        this.setValue = function() {};
      }
    }
    ValueAttributeObserver.prototype.getValue = function getValue() {
      return this.element[this.propertyName];
    };
    ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
      newValue = newValue === undefined || newValue === null ? '' : newValue;
      if (this.element[this.propertyName] !== newValue) {
        this.element[this.propertyName] = newValue;
        this.notify();
      }
    };
    ValueAttributeObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.getValue();
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.oldValue = this.getValue();
        this.disposeHandler = this.handler.subscribe(this.element, this.notify.bind(this));
      }
      this.addSubscriber(context, callable);
    };
    ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    return ValueAttributeObserver;
  }()) || _class8);
  var checkedArrayContext = 'CheckedObserver:array';
  var checkedValueContext = 'CheckedObserver:value';
  var CheckedObserver = exports.CheckedObserver = (_dec8 = subscriberCollection(), _dec8(_class9 = function() {
    function CheckedObserver(element, handler, observerLocator) {
      this.element = element;
      this.handler = handler;
      this.observerLocator = observerLocator;
    }
    CheckedObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    CheckedObserver.prototype.setValue = function setValue(newValue) {
      if (this.value === newValue) {
        return;
      }
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(checkedArrayContext, this);
        this.arrayObserver = null;
      }
      if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
        this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
        this.arrayObserver.subscribe(checkedArrayContext, this);
      }
      this.oldValue = this.value;
      this.value = newValue;
      this.synchronizeElement();
      this.notify();
      if (!this.initialSync) {
        this.initialSync = true;
        this.observerLocator.taskQueue.queueMicroTask(this);
      }
    };
    CheckedObserver.prototype.call = function call(context, splices) {
      this.synchronizeElement();
      if (!this.valueObserver && (this.valueObserver = this.element.__observers__.model || this.element.__observers__.value)) {
        this.valueObserver.subscribe(checkedValueContext, this);
      }
    };
    CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
      var value = this.value;
      var element = this.element;
      var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
      var isRadio = element.type === 'radio';
      var matcher = element.matcher || function(a, b) {
        return a === b;
      };
      element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && !!value.find(function(item) {
        return !!matcher(item, elementValue);
      });
    };
    CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
      var value = this.value;
      var element = this.element;
      var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
      var index = void 0;
      var matcher = element.matcher || function(a, b) {
        return a === b;
      };
      if (element.type === 'checkbox') {
        if (Array.isArray(value)) {
          index = value.findIndex(function(item) {
            return !!matcher(item, elementValue);
          });
          if (element.checked && index === -1) {
            value.push(elementValue);
          } else if (!element.checked && index !== -1) {
            value.splice(index, 1);
          }
          return;
        }
        value = element.checked;
      } else if (element.checked) {
        value = elementValue;
      } else {
        return;
      }
      this.oldValue = this.value;
      this.value = value;
      this.notify();
    };
    CheckedObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.value;
      this.callSubscribers(newValue, oldValue);
    };
    CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
      }
      this.addSubscriber(context, callable);
    };
    CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    CheckedObserver.prototype.unbind = function unbind() {
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(checkedArrayContext, this);
        this.arrayObserver = null;
      }
      if (this.valueObserver) {
        this.valueObserver.unsubscribe(checkedValueContext, this);
      }
    };
    return CheckedObserver;
  }()) || _class9);
  var selectArrayContext = 'SelectValueObserver:array';
  var SelectValueObserver = exports.SelectValueObserver = (_dec9 = subscriberCollection(), _dec9(_class10 = function() {
    function SelectValueObserver(element, handler, observerLocator) {
      this.element = element;
      this.handler = handler;
      this.observerLocator = observerLocator;
    }
    SelectValueObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    SelectValueObserver.prototype.setValue = function setValue(newValue) {
      if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
        throw new Error('Only null or Array instances can be bound to a multi-select.');
      }
      if (this.value === newValue) {
        return;
      }
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(selectArrayContext, this);
        this.arrayObserver = null;
      }
      if (Array.isArray(newValue)) {
        this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
        this.arrayObserver.subscribe(selectArrayContext, this);
      }
      this.oldValue = this.value;
      this.value = newValue;
      this.synchronizeOptions();
      this.notify();
      if (!this.initialSync) {
        this.initialSync = true;
        this.observerLocator.taskQueue.queueMicroTask(this);
      }
    };
    SelectValueObserver.prototype.call = function call(context, splices) {
      this.synchronizeOptions();
    };
    SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
      var value = this.value;
      var clear = void 0;
      var isArray = void 0;
      if (value === null || value === undefined) {
        clear = true;
      } else if (Array.isArray(value)) {
        isArray = true;
      }
      var options = this.element.options;
      var i = options.length;
      var matcher = this.element.matcher || function(a, b) {
        return a === b;
      };
      var _loop = function _loop() {
        var option = options.item(i);
        if (clear) {
          option.selected = false;
          return 'continue';
        }
        var optionValue = option.hasOwnProperty('model') ? option.model : option.value;
        if (isArray) {
          option.selected = !!value.find(function(item) {
            return !!matcher(optionValue, item);
          });
          return 'continue';
        }
        option.selected = !!matcher(optionValue, value);
      };
      while (i--) {
        var _ret2 = _loop();
        if (_ret2 === 'continue')
          continue;
      }
    };
    SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
      var _this24 = this;
      var options = this.element.options;
      var count = 0;
      var value = [];
      for (var _i23 = 0,
          ii = options.length; _i23 < ii; _i23++) {
        var _option = options.item(_i23);
        if (!_option.selected) {
          continue;
        }
        value.push(_option.hasOwnProperty('model') ? _option.model : _option.value);
        count++;
      }
      if (this.element.multiple) {
        if (Array.isArray(this.value)) {
          var _ret3 = function() {
            var matcher = _this24.element.matcher || function(a, b) {
              return a === b;
            };
            var i = 0;
            var _loop2 = function _loop2() {
              var a = _this24.value[i];
              if (value.findIndex(function(b) {
                return matcher(a, b);
              }) === -1) {
                _this24.value.splice(i, 1);
              } else {
                i++;
              }
            };
            while (i < _this24.value.length) {
              _loop2();
            }
            i = 0;
            var _loop3 = function _loop3() {
              var a = value[i];
              if (_this24.value.findIndex(function(b) {
                return matcher(a, b);
              }) === -1) {
                _this24.value.push(a);
              }
              i++;
            };
            while (i < value.length) {
              _loop3();
            }
            return {v: void 0};
          }();
          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object")
            return _ret3.v;
        }
      } else {
        if (count === 0) {
          value = null;
        } else {
          value = value[0];
        }
      }
      if (value !== this.value) {
        this.oldValue = this.value;
        this.value = value;
        this.notify();
      }
    };
    SelectValueObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.value;
      this.callSubscribers(newValue, oldValue);
    };
    SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
      }
      this.addSubscriber(context, callable);
    };
    SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    SelectValueObserver.prototype.bind = function bind() {
      var _this25 = this;
      this.domObserver = _aureliaPal.DOM.createMutationObserver(function() {
        _this25.synchronizeOptions();
        _this25.synchronizeValue();
      });
      this.domObserver.observe(this.element, {
        childList: true,
        subtree: true
      });
    };
    SelectValueObserver.prototype.unbind = function unbind() {
      this.domObserver.disconnect();
      this.domObserver = null;
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(selectArrayContext, this);
        this.arrayObserver = null;
      }
    };
    return SelectValueObserver;
  }()) || _class10);
  var ClassObserver = exports.ClassObserver = function() {
    function ClassObserver(element) {
      this.element = element;
      this.doNotCache = true;
      this.value = '';
      this.version = 0;
    }
    ClassObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    ClassObserver.prototype.setValue = function setValue(newValue) {
      var nameIndex = this.nameIndex || {};
      var version = this.version;
      var names = void 0;
      var name = void 0;
      if (newValue !== null && newValue !== undefined && newValue.length) {
        names = newValue.split(/\s+/);
        for (var _i24 = 0,
            length = names.length; _i24 < length; _i24++) {
          name = names[_i24];
          if (name === '') {
            continue;
          }
          nameIndex[name] = version;
          this.element.classList.add(name);
        }
      }
      this.value = newValue;
      this.nameIndex = nameIndex;
      this.version += 1;
      if (version === 0) {
        return;
      }
      version -= 1;
      for (name in nameIndex) {
        if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
          continue;
        }
        this.element.classList.remove(name);
      }
    };
    ClassObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
    };
    return ClassObserver;
  }();
  function hasDeclaredDependencies(descriptor) {
    return !!(descriptor && descriptor.get && descriptor.get.dependencies);
  }
  function declarePropertyDependencies(ctor, propertyName, dependencies) {
    var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
    descriptor.get.dependencies = dependencies;
  }
  function computedFrom() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return function(target, key, descriptor) {
      descriptor.get.dependencies = rest;
      return descriptor;
    };
  }
  var ComputedExpression = exports.ComputedExpression = function(_Expression19) {
    _inherits(ComputedExpression, _Expression19);
    function ComputedExpression(name, dependencies) {
      var _this26 = _possibleConstructorReturn(this, _Expression19.call(this));
      _this26.name = name;
      _this26.dependencies = dependencies;
      _this26.isAssignable = true;
      return _this26;
    }
    ComputedExpression.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return scope.bindingContext[this.name];
    };
    ComputedExpression.prototype.assign = function assign(scope, value) {
      scope.bindingContext[this.name] = value;
    };
    ComputedExpression.prototype.accept = function accept(visitor) {
      throw new Error('not implemented');
    };
    ComputedExpression.prototype.connect = function connect(binding, scope) {
      var dependencies = this.dependencies;
      var i = dependencies.length;
      while (i--) {
        dependencies[i].connect(binding, scope);
      }
    };
    return ComputedExpression;
  }(Expression);
  function createComputedObserver(obj, propertyName, descriptor, observerLocator) {
    var dependencies = descriptor.get.dependencies;
    if (!(dependencies instanceof ComputedExpression)) {
      var _i25 = dependencies.length;
      while (_i25--) {
        dependencies[_i25] = observerLocator.parser.parse(dependencies[_i25]);
      }
      dependencies = descriptor.get.dependencies = new ComputedExpression(propertyName, dependencies);
    }
    var scope = {
      bindingContext: obj,
      overrideContext: createOverrideContext(obj)
    };
    return new ExpressionObserver(scope, dependencies, observerLocator);
  }
  var elements = exports.elements = {
    a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
    feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
    feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
    feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
    feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
    image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
    linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
    marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
    mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
    switch: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
    text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
    vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
  };
  var presentationElements = exports.presentationElements = {
    'a': true,
    'altGlyph': true,
    'animate': true,
    'animateColor': true,
    'circle': true,
    'clipPath': true,
    'defs': true,
    'ellipse': true,
    'feBlend': true,
    'feColorMatrix': true,
    'feComponentTransfer': true,
    'feComposite': true,
    'feConvolveMatrix': true,
    'feDiffuseLighting': true,
    'feDisplacementMap': true,
    'feFlood': true,
    'feGaussianBlur': true,
    'feImage': true,
    'feMerge': true,
    'feMorphology': true,
    'feOffset': true,
    'feSpecularLighting': true,
    'feTile': true,
    'feTurbulence': true,
    'filter': true,
    'font': true,
    'foreignObject': true,
    'g': true,
    'glyph': true,
    'glyphRef': true,
    'image': true,
    'line': true,
    'linearGradient': true,
    'marker': true,
    'mask': true,
    'missing-glyph': true,
    'path': true,
    'pattern': true,
    'polygon': true,
    'polyline': true,
    'radialGradient': true,
    'rect': true,
    'stop': true,
    'svg': true,
    'switch': true,
    'symbol': true,
    'text': true,
    'textPath': true,
    'tref': true,
    'tspan': true,
    'use': true
  };
  var presentationAttributes = exports.presentationAttributes = {
    'alignment-baseline': true,
    'baseline-shift': true,
    'clip-path': true,
    'clip-rule': true,
    'clip': true,
    'color-interpolation-filters': true,
    'color-interpolation': true,
    'color-profile': true,
    'color-rendering': true,
    'color': true,
    'cursor': true,
    'direction': true,
    'display': true,
    'dominant-baseline': true,
    'enable-background': true,
    'fill-opacity': true,
    'fill-rule': true,
    'fill': true,
    'filter': true,
    'flood-color': true,
    'flood-opacity': true,
    'font-family': true,
    'font-size-adjust': true,
    'font-size': true,
    'font-stretch': true,
    'font-style': true,
    'font-variant': true,
    'font-weight': true,
    'glyph-orientation-horizontal': true,
    'glyph-orientation-vertical': true,
    'image-rendering': true,
    'kerning': true,
    'letter-spacing': true,
    'lighting-color': true,
    'marker-end': true,
    'marker-mid': true,
    'marker-start': true,
    'mask': true,
    'opacity': true,
    'overflow': true,
    'pointer-events': true,
    'shape-rendering': true,
    'stop-color': true,
    'stop-opacity': true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    'stroke-linecap': true,
    'stroke-linejoin': true,
    'stroke-miterlimit': true,
    'stroke-opacity': true,
    'stroke-width': true,
    'stroke': true,
    'text-anchor': true,
    'text-decoration': true,
    'text-rendering': true,
    'unicode-bidi': true,
    'visibility': true,
    'word-spacing': true,
    'writing-mode': true
  };
  function createElement(html) {
    var div = _aureliaPal.DOM.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }
  var SVGAnalyzer = exports.SVGAnalyzer = function() {
    function SVGAnalyzer() {
      if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
        elements.altglyph = elements.altGlyph;
        delete elements.altGlyph;
        elements.altglyphdef = elements.altGlyphDef;
        delete elements.altGlyphDef;
        elements.altglyphitem = elements.altGlyphItem;
        delete elements.altGlyphItem;
        elements.glyphref = elements.glyphRef;
        delete elements.glyphRef;
      }
    }
    SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
      return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
    };
    return SVGAnalyzer;
  }();
  var ObserverLocator = exports.ObserverLocator = (_temp = _class11 = function() {
    function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer, parser) {
      this.taskQueue = taskQueue;
      this.eventManager = eventManager;
      this.dirtyChecker = dirtyChecker;
      this.svgAnalyzer = svgAnalyzer;
      this.parser = parser;
      this.adapters = [];
      this.logger = LogManager.getLogger('observer-locator');
    }
    ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
      var observersLookup = obj.__observers__;
      var observer = void 0;
      if (observersLookup && propertyName in observersLookup) {
        return observersLookup[propertyName];
      }
      observer = this.createPropertyObserver(obj, propertyName);
      if (!observer.doNotCache) {
        if (observersLookup === undefined) {
          observersLookup = this.getOrCreateObserversLookup(obj);
        }
        observersLookup[propertyName] = observer;
      }
      return observer;
    };
    ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
      return obj.__observers__ || this.createObserversLookup(obj);
    };
    ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
      var value = {};
      if (!Reflect.defineProperty(obj, '__observers__', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: value
      })) {
        this.logger.warn('Cannot add observers to object', obj);
      }
      return value;
    };
    ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
      this.adapters.push(adapter);
    };
    ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
      for (var _i26 = 0,
          ii = this.adapters.length; _i26 < ii; _i26++) {
        var adapter = this.adapters[_i26];
        var observer = adapter.getObserver(obj, propertyName, descriptor);
        if (observer) {
          return observer;
        }
      }
      return null;
    };
    ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
      var descriptor = void 0;
      var handler = void 0;
      var xlinkResult = void 0;
      if (!(obj instanceof Object)) {
        return new PrimitiveObserver(obj, propertyName);
      }
      if (obj instanceof _aureliaPal.DOM.Element) {
        if (propertyName === 'class') {
          return new ClassObserver(obj);
        }
        if (propertyName === 'style' || propertyName === 'css') {
          return new StyleObserver(obj, propertyName);
        }
        handler = this.eventManager.getElementHandler(obj, propertyName);
        if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
          return new SelectValueObserver(obj, handler, this);
        }
        if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
          return new CheckedObserver(obj, handler, this);
        }
        if (handler) {
          return new ValueAttributeObserver(obj, propertyName, handler);
        }
        xlinkResult = /^xlink:(.+)$/.exec(propertyName);
        if (xlinkResult) {
          return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
        }
        if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
          return new DataAttributeObserver(obj, propertyName);
        }
      }
      descriptor = Object.getPropertyDescriptor(obj, propertyName);
      if (hasDeclaredDependencies(descriptor)) {
        return createComputedObserver(obj, propertyName, descriptor, this);
      }
      var existingGetterOrSetter = void 0;
      if (descriptor && (existingGetterOrSetter = descriptor.get || descriptor.set)) {
        if (existingGetterOrSetter.getObserver) {
          return existingGetterOrSetter.getObserver(obj);
        }
        var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
        if (adapterObserver) {
          return adapterObserver;
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      }
      if (obj instanceof Array) {
        if (propertyName === 'length') {
          return this.getArrayObserver(obj).getLengthObserver();
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      } else if (obj instanceof Map) {
        if (propertyName === 'size') {
          return this.getMapObserver(obj).getLengthObserver();
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      } else if (obj instanceof Set) {
        if (propertyName === 'size') {
          return this.getSetObserver(obj).getLengthObserver();
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      }
      return new SetterObserver(this.taskQueue, obj, propertyName);
    };
    ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
      if (obj instanceof _aureliaPal.DOM.Element) {
        if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || propertyName === 'model' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
          return this.getObserver(obj, propertyName);
        }
        if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
          return dataAttributeAccessor;
        }
      }
      return propertyAccessor;
    };
    ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
      return _getArrayObserver(this.taskQueue, array);
    };
    ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
      return _getMapObserver(this.taskQueue, map);
    };
    ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
      return _getSetObserver(this.taskQueue, set);
    };
    return ObserverLocator;
  }(), _class11.inject = [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer, Parser], _temp);
  var ObjectObservationAdapter = exports.ObjectObservationAdapter = function() {
    function ObjectObservationAdapter() {}
    ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
      throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
    };
    return ObjectObservationAdapter;
  }();
  var BindingExpression = exports.BindingExpression = function() {
    function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.sourceExpression = sourceExpression;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.attribute = attribute;
      this.discrete = false;
    }
    BindingExpression.prototype.createBinding = function createBinding(target) {
      return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.lookupFunctions);
    };
    return BindingExpression;
  }();
  var targetContext = 'Binding:target';
  var Binding = exports.Binding = (_dec10 = connectable(), _dec10(_class12 = function() {
    function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
      this.observerLocator = observerLocator;
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.targetProperty = targetProperty;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
    }
    Binding.prototype.updateTarget = function updateTarget(value) {
      this.targetObserver.setValue(value, this.target, this.targetProperty);
    };
    Binding.prototype.updateSource = function updateSource(value) {
      this.sourceExpression.assign(this.source, value, this.lookupFunctions);
    };
    Binding.prototype.call = function call(context, newValue, oldValue) {
      if (!this.isBound) {
        return;
      }
      if (context === sourceContext) {
        oldValue = this.targetObserver.getValue(this.target, this.targetProperty);
        newValue = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        if (newValue !== oldValue) {
          this.updateTarget(newValue);
        }
        if (this.mode !== bindingMode.oneTime) {
          this._version++;
          this.sourceExpression.connect(this, this.source);
          this.unobserve(false);
        }
        return;
      }
      if (context === targetContext) {
        if (newValue !== this.sourceExpression.evaluate(this.source, this.lookupFunctions)) {
          this.updateSource(newValue);
        }
        return;
      }
      throw new Error('Unexpected call context ' + context);
    };
    Binding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      if (this.sourceExpression.bind) {
        this.sourceExpression.bind(this, source, this.lookupFunctions);
      }
      var mode = this.mode;
      if (!this.targetObserver) {
        var method = mode === bindingMode.twoWay ? 'getObserver' : 'getAccessor';
        this.targetObserver = this.observerLocator[method](this.target, this.targetProperty);
      }
      if ('bind' in this.targetObserver) {
        this.targetObserver.bind();
      }
      var value = this.sourceExpression.evaluate(source, this.lookupFunctions);
      this.updateTarget(value);
      if (mode === bindingMode.oneWay) {
        enqueueBindingConnect(this);
      } else if (mode === bindingMode.twoWay) {
        this.sourceExpression.connect(this, source);
        this.targetObserver.subscribe(targetContext, this);
      }
    };
    Binding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      if ('unbind' in this.targetObserver) {
        this.targetObserver.unbind();
      }
      if (this.targetObserver.unsubscribe) {
        this.targetObserver.unsubscribe(targetContext, this);
      }
      this.unobserve(true);
    };
    Binding.prototype.connect = function connect(evaluate) {
      if (!this.isBound) {
        return;
      }
      if (evaluate) {
        var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        this.updateTarget(value);
      }
      this.sourceExpression.connect(this, this.source);
    };
    return Binding;
  }()) || _class12);
  var CallExpression = exports.CallExpression = function() {
    function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.sourceExpression = sourceExpression;
      this.lookupFunctions = lookupFunctions;
    }
    CallExpression.prototype.createBinding = function createBinding(target) {
      return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.lookupFunctions);
    };
    return CallExpression;
  }();
  var Call = exports.Call = function() {
    function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.targetProperty = observerLocator.getObserver(target, targetProperty);
      this.lookupFunctions = lookupFunctions;
    }
    Call.prototype.callSource = function callSource($event) {
      var overrideContext = this.source.overrideContext;
      Object.assign(overrideContext, $event);
      overrideContext.$event = $event;
      var mustEvaluate = true;
      var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
      delete overrideContext.$event;
      for (var prop in $event) {
        delete overrideContext[prop];
      }
      return result;
    };
    Call.prototype.bind = function bind(source) {
      var _this27 = this;
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      if (this.sourceExpression.bind) {
        this.sourceExpression.bind(this, source, this.lookupFunctions);
      }
      this.targetProperty.setValue(function($event) {
        return _this27.callSource($event);
      });
    };
    Call.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this.targetProperty.setValue(null);
    };
    return Call;
  }();
  var ValueConverterResource = exports.ValueConverterResource = function() {
    function ValueConverterResource(name) {
      this.name = name;
    }
    ValueConverterResource.convention = function convention(name) {
      if (name.endsWith('ValueConverter')) {
        return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
      }
    };
    ValueConverterResource.prototype.initialize = function initialize(container, target) {
      this.instance = container.get(target);
    };
    ValueConverterResource.prototype.register = function register(registry, name) {
      registry.registerValueConverter(name || this.name, this.instance);
    };
    ValueConverterResource.prototype.load = function load(container, target) {};
    return ValueConverterResource;
  }();
  function valueConverter(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
      };
    }
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
  }
  var BindingBehaviorResource = exports.BindingBehaviorResource = function() {
    function BindingBehaviorResource(name) {
      this.name = name;
    }
    BindingBehaviorResource.convention = function convention(name) {
      if (name.endsWith('BindingBehavior')) {
        return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
      }
    };
    BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
      this.instance = container.get(target);
    };
    BindingBehaviorResource.prototype.register = function register(registry, name) {
      registry.registerBindingBehavior(name || this.name, this.instance);
    };
    BindingBehaviorResource.prototype.load = function load(container, target) {};
    return BindingBehaviorResource;
  }();
  function bindingBehavior(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
      };
    }
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
  }
  var ListenerExpression = exports.ListenerExpression = function() {
    function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault, lookupFunctions) {
      this.eventManager = eventManager;
      this.targetEvent = targetEvent;
      this.sourceExpression = sourceExpression;
      this.delegate = delegate;
      this.discrete = true;
      this.preventDefault = preventDefault;
      this.lookupFunctions = lookupFunctions;
    }
    ListenerExpression.prototype.createBinding = function createBinding(target) {
      return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault, this.lookupFunctions);
    };
    return ListenerExpression;
  }();
  var Listener = exports.Listener = function() {
    function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault, lookupFunctions) {
      this.eventManager = eventManager;
      this.targetEvent = targetEvent;
      this.delegate = delegate;
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.preventDefault = preventDefault;
      this.lookupFunctions = lookupFunctions;
    }
    Listener.prototype.callSource = function callSource(event) {
      var overrideContext = this.source.overrideContext;
      overrideContext.$event = event;
      var mustEvaluate = true;
      var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
      delete overrideContext.$event;
      if (result !== true && this.preventDefault) {
        event.preventDefault();
      }
      return result;
    };
    Listener.prototype.bind = function bind(source) {
      var _this28 = this;
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      if (this.sourceExpression.bind) {
        this.sourceExpression.bind(this, source, this.lookupFunctions);
      }
      this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function(event) {
        return _this28.callSource(event);
      }, this.delegate);
    };
    Listener.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this._disposeListener();
      this._disposeListener = null;
    };
    return Listener;
  }();
  function getAU(element) {
    var au = element.au;
    if (au === undefined) {
      throw new Error('No Aurelia APIs are defined for the referenced element.');
    }
    return au;
  }
  var NameExpression = exports.NameExpression = function() {
    function NameExpression(sourceExpression, apiName, lookupFunctions) {
      this.sourceExpression = sourceExpression;
      this.apiName = apiName;
      this.lookupFunctions = lookupFunctions;
      this.discrete = true;
    }
    NameExpression.prototype.createBinding = function createBinding(target) {
      return new NameBinder(this.sourceExpression, NameExpression.locateAPI(target, this.apiName), this.lookupFunctions);
    };
    NameExpression.locateAPI = function locateAPI(element, apiName) {
      switch (apiName) {
        case 'element':
          return element;
        case 'controller':
          return getAU(element).controller;
        case 'view-model':
          return getAU(element).controller.viewModel;
        case 'view':
          return getAU(element).controller.view;
        default:
          var target = getAU(element)[apiName];
          if (target === undefined) {
            throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
          }
          return target.viewModel;
      }
    };
    return NameExpression;
  }();
  var NameBinder = function() {
    function NameBinder(sourceExpression, target, lookupFunctions) {
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.lookupFunctions = lookupFunctions;
    }
    NameBinder.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      if (this.sourceExpression.bind) {
        this.sourceExpression.bind(this, source, this.lookupFunctions);
      }
      this.sourceExpression.assign(this.source, this.target, this.lookupFunctions);
    };
    NameBinder.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      this.sourceExpression.assign(this.source, null, this.lookupFunctions);
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
    };
    return NameBinder;
  }();
  var LookupFunctions = {
    bindingBehaviors: function bindingBehaviors(name) {
      return null;
    },
    valueConverters: function valueConverters(name) {
      return null;
    }
  };
  var BindingEngine = exports.BindingEngine = (_temp2 = _class13 = function() {
    function BindingEngine(observerLocator, parser) {
      this.observerLocator = observerLocator;
      this.parser = parser;
    }
    BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
      var mode = arguments.length <= 2 || arguments[2] === undefined ? bindingMode.oneWay : arguments[2];
      var lookupFunctions = arguments.length <= 3 || arguments[3] === undefined ? LookupFunctions : arguments[3];
      return new BindingExpression(this.observerLocator, targetProperty, this.parser.parse(sourceExpression), mode, lookupFunctions);
    };
    BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
      var _this29 = this;
      return {subscribe: function subscribe(callback) {
          var observer = _this29.observerLocator.getObserver(obj, propertyName);
          observer.subscribe(callback);
          return {dispose: function dispose() {
              return observer.unsubscribe(callback);
            }};
        }};
    };
    BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
      var _this30 = this;
      return {subscribe: function subscribe(callback) {
          var observer = void 0;
          if (collection instanceof Array) {
            observer = _this30.observerLocator.getArrayObserver(collection);
          } else if (collection instanceof Map) {
            observer = _this30.observerLocator.getMapObserver(collection);
          } else if (collection instanceof Set) {
            observer = _this30.observerLocator.getSetObserver(collection);
          } else {
            throw new Error('collection must be an instance of Array, Map or Set.');
          }
          observer.subscribe(callback);
          return {dispose: function dispose() {
              return observer.unsubscribe(callback);
            }};
        }};
    };
    BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
      var scope = {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext)
      };
      return new ExpressionObserver(scope, this.parser.parse(expression), this.observerLocator, LookupFunctions);
    };
    BindingEngine.prototype.parseExpression = function parseExpression(expression) {
      return this.parser.parse(expression);
    };
    BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
      this.observerLocator.addAdapter(adapter);
    };
    return BindingEngine;
  }(), _class13.inject = [ObserverLocator, Parser], _temp2);
  var setProto = Set.prototype;
  function _getSetObserver(taskQueue, set) {
    return ModifySetObserver.for(taskQueue, set);
  }
  exports.getSetObserver = _getSetObserver;
  var ModifySetObserver = function(_ModifyCollectionObse3) {
    _inherits(ModifySetObserver, _ModifyCollectionObse3);
    function ModifySetObserver(taskQueue, set) {
      return _possibleConstructorReturn(this, _ModifyCollectionObse3.call(this, taskQueue, set));
    }
    ModifySetObserver.for = function _for(taskQueue, set) {
      if (!('__set_observer__' in set)) {
        var observer = ModifySetObserver.create(taskQueue, set);
        Reflect.defineProperty(set, '__set_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return set.__set_observer__;
    };
    ModifySetObserver.create = function create(taskQueue, set) {
      var observer = new ModifySetObserver(taskQueue, set);
      var proto = setProto;
      if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
        proto = {
          add: set.add,
          delete: set.delete,
          clear: set.clear
        };
      }
      set.add = function() {
        var type = 'add';
        var oldSize = set.size;
        var methodCallResult = proto.add.apply(set, arguments);
        var hasValue = set.size === oldSize;
        if (!hasValue) {
          observer.addChangeRecord({
            type: type,
            object: set,
            value: Array.from(set).pop()
          });
        }
        return methodCallResult;
      };
      set.delete = function() {
        var hasValue = set.has(arguments[0]);
        var methodCallResult = proto.delete.apply(set, arguments);
        if (hasValue) {
          observer.addChangeRecord({
            type: 'delete',
            object: set,
            value: arguments[0]
          });
        }
        return methodCallResult;
      };
      set.clear = function() {
        var methodCallResult = proto.clear.apply(set, arguments);
        observer.addChangeRecord({
          type: 'clear',
          object: set
        });
        return methodCallResult;
      };
      return observer;
    };
    return ModifySetObserver;
  }(ModifyCollectionObserver);
  function observable(targetOrConfig, key, descriptor) {
    var deco = function deco(target, key2, descriptor2) {
      var innerPropertyName = '_' + key2;
      var callbackName = targetOrConfig && targetOrConfig.changeHandler || key2 + 'Changed';
      var babel = descriptor2 !== undefined;
      if (babel) {
        if (typeof descriptor2.initializer === 'function') {
          target[innerPropertyName] = descriptor2.initializer();
        }
      } else {
        descriptor2 = {};
      }
      delete descriptor2.writable;
      delete descriptor2.initializer;
      descriptor2.get = function() {
        return this[innerPropertyName];
      };
      descriptor2.set = function(newValue) {
        var oldValue = this[innerPropertyName];
        this[innerPropertyName] = newValue;
        if (this[callbackName]) {
          this[callbackName](newValue, oldValue);
        }
      };
      descriptor2.get.dependencies = [innerPropertyName];
      if (!babel) {
        Reflect.defineProperty(target, key2, descriptor2);
      }
    };
    if (key) {
      var target = targetOrConfig;
      targetOrConfig = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-binding@1.0.0-beta.1.3.3", ["npm:aurelia-binding@1.0.0-beta.1.3.3/aurelia-binding"], function(main) {
  return main;
});

_removeDefine();
})();
'use strict';
System.register("dist/zzzz.js", ["npm:aurelia-binding@1.0.0-beta.1.3.3", "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0", "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2", "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0", "npm:aurelia-fetch-client@1.0.0-beta.1.2.3", "npm:aurelia-framework@1.0.0-beta.1.2.2", "npm:aurelia-history@1.0.0-beta.1.2.0", "npm:aurelia-history-browser@1.0.0-beta.1.2.0", "npm:aurelia-http-client@1.0.0-beta.1.2.0", "npm:aurelia-loader@1.0.0-beta.1.2.0", "npm:aurelia-loader-default@1.0.0-beta.1.2.1", "npm:aurelia-logging@1.0.0-beta.1.2.0", "npm:aurelia-logging-console@1.0.0-beta.1.2.0", "npm:aurelia-metadata@1.0.0-beta.1.2.0", "npm:aurelia-path@1.0.0-beta.1.2.1", "npm:aurelia-polyfills@1.0.0-beta.1.1.3", "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0", "npm:aurelia-router@1.0.0-beta.1.2.1", "npm:aurelia-task-queue@1.0.0-beta.1.2.0", "npm:aurelia-templating@1.0.0-beta.1.2.4", "npm:aurelia-templating-binding@1.0.0-beta.1.2.2", "npm:aurelia-templating-resources@1.0.0-beta.1.2.3", "npm:aurelia-templating-router@1.0.0-beta.1.2.0", "npm:aurelia-i18n@0.5.2", "npm:i18next-xhr-backend@0.5.3", "github:systemjs/plugin-css@0.1.21", "github:github/fetch@1.0.0", "github:systemjs/plugin-text@0.0.8"], function(_export, _context) {
  return {
    setters: [function(_aureliaBinding) {}, function(_aureliaBootstrapper) {}, function(_aureliaDependencyInjection) {}, function(_aureliaEventAggregator) {}, function(_aureliaFetchClient) {}, function(_aureliaFramework) {}, function(_aureliaHistory) {}, function(_aureliaHistoryBrowser) {}, function(_aureliaHttpClient) {}, function(_aureliaLoader) {}, function(_aureliaLoaderDefault) {}, function(_aureliaLogging) {}, function(_aureliaLoggingConsole) {}, function(_aureliaMetadata) {}, function(_aureliaPath) {}, function(_aureliaPolyfills) {}, function(_aureliaRouteRecognizer) {}, function(_aureliaRouter) {}, function(_aureliaTaskQueue) {}, function(_aureliaTemplating) {}, function(_aureliaTemplatingBinding) {}, function(_aureliaTemplatingResources) {}, function(_aureliaTemplatingRouter) {}, function(_aureliaI18n) {}, function(_i18nextXhrBackend) {}, function(_css) {}, function(_fetch) {}, function(_text) {}],
    execute: function() {}
  };
});

//# sourceMappingURL=aurelia-bundle.js.map