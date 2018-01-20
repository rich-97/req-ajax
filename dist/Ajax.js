'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax(config) {
    _classCallCheck(this, Ajax);

    this.method = config.method;
    this.url = config.url;
    this.params = config.params;
    this.fragment = config.fragment;
    this.headers = config.headers;
    this.xhr = Ajax._createXHR();
    this.uri = Ajax._parseQuery(this.url, this.params, this.fragment);

    var success = config.success,
        error = config.error;

    if (this.headers) {
      // Set the request headers.
      Object.keys(this.headers).forEach(function (headerKey) {
        var headerValue = this.headers[headerKey];

        this.xhr.setRequestHeader(headerKey, headerValue);
      });
    }

    this.xhr.open(this.method, this.uri, true);
    this.xhr.send();

    var that = this;

    this.xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var res = this.responseText;
        var contentType = this.getResponseHeader('Content-Type');

        console.log(contentType);

        if (contentType.includes('application/json')) {
          res = JSON.parse(res);
        }

        if (success) {
          success(res);
        }
      } else {
        if (error && this.readyState === 4) {
          error(this.status, this.getAllResponseHeaders());
        }
      }
    };
  }

  _createClass(Ajax, null, [{
    key: '_createXHR',
    value: function _createXHR() {
      try {
        return new window.XMLHttpRequest();
      } catch (err) {
        throw new Error('Error creating the XMLHttpRequest object');
      }
    }
  }, {
    key: '_parseQuery',
    value: function _parseQuery(url, params, fragment) {
      var uri = url;

      if (params) {
        uri += '?';

        for (var key in params) {
          uri += key + '=' + params[key] + '&';
        }

        uri = uri.replace(/&$/, '');
      }

      if (fragment) {
        uri += '#' + fragment;
      }

      return uri;
    }
  }]);

  return Ajax;
}();

