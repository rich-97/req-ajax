'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * (c) Ricardo Moreno <morenoricardo237@gmail.com>
 *
 * For more details about the license of this source code,
 * please view the license file LICENSE.
 */

/**
 * ajax - Standalone object for ajax request.
 *
 * @method query make a ajax request especific.
 *   @param {Object} config - object that represent the settings of the request.
 *      @property {String} url - the url of the request.
 *      @property {String} method - the method of the request.
 *      @property {Object} params - the parameters of the url.
 *      @property {String} fragment - the fragment of the url.
 * @method get shorthand for make a ajax request with the method GET.
 *   @param {String|Object} url - string or object that represent the url.
 *      @property {String} url - the url of the GET request.
 *      @property {Object} params - the parameters of the url.
 *      @property {String} fragment - the fragment of the url.
 *   @param {Boolean} json - indicate if the response will be parse as json.
 * @method post shorthand for make a ajax request with the method POST.
 *   @param {String|Object} url - string or object that represent the url.
 *      @property {String} url - the url of the request.
 *      @property {Object} params - the parameters of the url.
 *      @property {String} fragment - the fragment of the url.
 *   @param {String|Any} data - the data of the POST request.
 *   @param {Boolean} json - indicate if the request data will be parse as json.
 */
var ajax = {
  _createXHR: function _createXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (err) {
      throw new Error('Error creating the XMLHttpRequest object');
    }
  },
  _parseQuery: function _parseQuery(url, params, fragment) {
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
  },
  query: function query(config) {
    var xhr = this._createXHR();
    var url = config.url,
        method = config.method,
        params = config.params,
        fragment = config.fragment;


    var query = this._parseQuery(url, params, fragment);

    xhr.open(method, query, true);
    xhr.send();

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          resolve(this.responseText);
        } else if (this.status === 403 || this.status === 404) {
          reject('Status code ' + this.status);
        }
      };
    });
  },
  get: function get(url) {
    var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var xhr = this._createXHR();
    var method = 'GET';

    if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
      var _url = url,
          params = _url.params,
          fragment = _url.fragment;

      url = this._parseQuery(url.url, params, fragment);
    }

    xhr.open(method, url, true);
    xhr.send();

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          var responseText = this.responseText;
          var response = json ? JSON.parse(responseText) : responseText;

          resolve(response);
        } else if (this.status === 403 || this.status === 404) {
          reject('Status code ' + this.status);
        }
      };
    });
  },
  post: function post(url, data) {
    var json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var xhr = this._createXHR();
    var method = 'POST';

    var contentType = 'application/';

    if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
      var _url2 = url,
          params = _url2.params,
          fragment = _url2.fragment;

      url = this._parseQuery(url.url, params, fragment);
    }

    if (json) {
      data = JSON.stringify(data);
      contentType += 'json';
    } else {
      contentType += 'x-www-form-urlencoded';
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.send(data);

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          resolve(this.responseText);
        } else if (this.status === 403 || this.status === 404) {
          reject('Status code ' + this.status);
        }
      };
    });
  }
};

