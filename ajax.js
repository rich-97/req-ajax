class Ajax {
  constructor(config) {
    this.method   = config.method
    this.url      = config.url
    this.params   = config.params
    this.fragment = config.fragment
    this.headers  = config.headers
    this.xhr      = Ajax._createXHR()
    this.uri      = Ajax._parseQuery(this.url, this.params, this.fragment)

    const success = config.success, error = config.error

    if (this.headers) {
      // Set the request headers.
      Object.keys(this.headers).forEach(function(headerKey) {
        const headerValue = this.headers[headerKey]

        this.xhr.setRequestHeader(headerKey, headerValue)
      })
    }

    this.xhr.open(this.method, this.uri, true)
    this.xhr.send()

    const that = this

    this.xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const res = this.responseText
        const contentType = this.getResponseHeader('Content-Type')

        if (contentType.includes('application/json')) {
          res = JSON.parse(res)
        }

        if (success) {
          success(res)
        }
      } else {
        if (error && this.readyState === 4) {
          error(this.status, this.getAllResponseHeaders())
        }
      }
    }
  }

  static _createXHR() {
    try {
      return new window.XMLHttpRequest()
    } catch (err) {
      throw new Error('Error creating the XMLHttpRequest object')
    }
  }

  static _parseQuery(url, params, fragment) {
    let uri = url

    if (params) {
      uri += '?'

      for (let key in params) {
        uri += `${key}=${params[key]}&`
      }

      uri = uri.replace(/&$/, '')
    }

    if (fragment) {
      uri += `#${fragment}`
    }

    return uri
  }
}

module.exports = Ajax
