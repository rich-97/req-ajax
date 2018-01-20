const assert = chai.assert

const rootURL = 'https://jsonplaceholder.typicode.com'

describe('Ajax class', () => {
  beforeEach(function() {
    this.xhr      = sinon.useFakeXMLHttpRequest()
    this.requests = []
    
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr)
    }.bind(this)
  })

  afterEach(function() {
    this.xhr.restore()
  })

  it('Static method _parseQuery', () => {
    const params = { foo: 'bar', bar: 'foo' }, fragment = 'foo'
    const uri    = Ajax._parseQuery(rootURL, params, fragment)

    assert.equal(uri, rootURL + '?foo=bar&bar=foo#foo')
  })

  it('Static method _createXHR', () => {
    const xhr = Ajax._createXHR()

    assert.isTrue(xhr instanceof window.XMLHttpRequest)
  })

  it('GET request without params and fragment', function(done) {
    const config = {
      method: 'GET',
      url: rootURL + '/posts/1',
      success(res) {
        assert.typeOf(res, 'object')
        done()
      }
    }

    new Ajax(config)

    const dataJSON = JSON.stringify({ foo: 'bar' })

    this.requests[0].respond(200, { 'content-type' : 'application/json' }, dataJSON)
  })

  it('404 Not found handler', function(done) {
    const config = {
      method: 'GET',
      url: rootURL + '/foo/1',
      error(error) {
        assert.equal(error, 404)
        done()
      }
    }

    new Ajax(config)

    this.requests[0].respond(404)
  })
})