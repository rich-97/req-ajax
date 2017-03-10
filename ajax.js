const ajax = {
  xhr: function () {
    try {
      return new window.XMLHttpRequest()
    } catch (err) {
      throw err
    }
  },

  query: function (config) {
    const xhr = this.xhr()
    const { method } = config
    const { params } = config

    let { url } = config

    if (params) {
      let count = 0
      let query = '?'

      for (let key in params) {
        query += `${key}=${params[key]}&`
        count++
      }

      if (count < 2) {
        query = query.replace(/&$/, '')
      }

      url += query
    }

    xhr.open(method, url, true)
    xhr.send()

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          resolve(this.responseText)
        } else if (this.status === 403 || this.status === 404) {
          reject(`Status code ${this.status}`)
        }
      }
    })
  },

  get: function (url, json = false) {
    const xhr = this.xhr()

    xhr.open('GET', url, true)
    xhr.send()

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          let responseText = this.responseText
          let response = json ? JSON.parse(responseText) : responseText

          resolve(response)
        } else if (this.status === 403 || this.status === 404) {
          reject(`Status code ${this.status}`)
        }
      }
    })
  },

  post: function (url, data, json = false) {
    const xhr = this.xhr()
    data = json ? JSON.stringify(data) : data

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.send(data)

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          resolve(this.responseText)
        } else if (this.status === 403 || this.status === 404) {
          reject(`Status code ${this.status}`)
        }
      }
    })
  }
}
