'use strict';

/*
 * (c) Ricardo Moreno <morenoricardo237@gmail.com>
 *
 * For more details about the license of this source code,
 * please view the license file LICENSE.
 */

var ajax = {
  xhr: function xhr() {
    try {
      return new window.XMLHttpRequest();
    } catch (err) {
      throw err;
    }
  },

  query: function query(config) {
    var xhr = this.xhr();
    var url = config.url;
    var method = config.method;
    var params = config.params;
    var fragment = config.fragment;


    var query = url;

    if (params) {
      query += '?';

      for (var key in params) {
        query += key + '=' + params[key] + '&';
      }

      query = query.replace(/&$/, '');
    }

    if (fragment) {
      query += '#' + fragment;
    }

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

    var xhr = this.xhr();

    xhr.open('GET', url, true);
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

    var xhr = this.xhr();
    data = json ? JSON.stringify(data) : data;

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

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

