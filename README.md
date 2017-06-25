# req-ajax

[![npm](https://img.shields.io/npm/v/req-ajax.svg)](https://www.npmjs.com/package/req-ajax)
[![npm](https://img.shields.io/npm/dm/req-ajax.svg)](https://www.npmjs.com/package/req-ajax)

Standalone library for ajax requests.

## Installation

Execute this command in your project for install the package:

`npm install req-ajax --save`

## Usage

Simple external script in your **html** file:

```html
<script src="node_modules/req-ajax/dist/ajax.min.js"></script>
```

This can be used with `webpack` just requiring the module `req-ajax`.

## API documentation

> All methods return a `Promise` object.

## Methods

### Method `query`

Declaratation: `ajax.query(config)`

the **Object** is the config of that request, this object can have 3 properties:

1.  `url` **{String}** is required.
2.  `method` **{String}** is required.
3.  `params` **{Object}** is optional, this property is for specific queries. The queries like this `foo=bar&bar=foo` can be transformed to `{ foo: 'bar', bar: 'foo' }` in the JavaScript object notation, so is much better for make queries and easy.
4.  `fragment` **{String}** is optional.

Example:

```javascript
ajax.query({
    url: '/somepath',
    method: 'GET',
    params: {
        foo: 'bar'
    },
    fragment: '123'
    // the uri should be '/somepath?foo=bar#123'.
}).then(function (res) {
    // Do something with the response...
}).catch(function (err) {
    // Manage the error of the request (if appear).
})
```

### Method `get`

Declaratation: `ajax.get(url [, json])`

This method is an shorthand for **GET** requests.

Params:

1.  `url` **{String|Object}** is required, `url` can be an object like in `ajax.query` but without the property `method`.
2.  `json` **{Boolean}** is optional, default `false`. This param is for when the response is json string, if `json` is `true` the response is parser for convert it to a object normal.

Per Example the file `somefile.json` contain `{ "foo": "bar" }`:

```javascript
ajax.get('/somefile.json', true)
    .then(function (res) {
        if (res.foo === 'bar') {
            // Do something...
        }
    }).catch(function (err) {
        // Trap the error.
    })
```

### Method `post`

Declaratation: `ajax.post(url [, json])`

This method is an shorthand for **POST** requests.

Params:

1.  `url` **{String|Object}** is required, `url` can be an object like in `ajax.query` but without the property `method`.
2.  `data` **{String|Any}** is required, if the paramater json is true, `data` can be anything.
3.  `json` **{Boolean}** is optional, default `false`. This param is for when the data is object normal and will send it as a json string.

Example:

```javascript
const data = { foo: 'bar' }

// The data is transformed to '{ "foo": "bar"}'
ajax.post('/somepath', data, true)
    .then(function ()
        // The post request was complete.
    }).catch(function (err) {
        // Something it's wrong.
    })
```

## Test

For more examples and test execute `npm run test` and open your browser in the url `http://localhost:8080`.

## License

[MIT](https://github.com/rich-97/req-ajax/blob/master/LICENSE)
