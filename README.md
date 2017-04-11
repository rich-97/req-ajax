# req-ajax

[![npm](https://img.shields.io/npm/v/req-ajax.svg)](https://www.npmjs.com/package/req-ajax)
[![npm](https://img.shields.io/npm/dt/req-ajax.svg)](https://www.npmjs.com/package/req-ajax)

Standalone library for ajax requests.

## Installation

Execute this command in your project for install the package:

`npm install --save req-ajax`

After the download you should install the dependencies and build es2015 version with **babel.js**, so execute this:

`cd node_modules/req-ajax; npm run build; cd -`

The file `ajax.js` and `ajax.min.js` are in `dist` directory.

## Usage

Simple external script in your html file:

```html
<script src="node_modules/req-ajax/dist/ajax.min.js"></script>
```

## API

> All methods return a `Promise` object.

## Methods

### `ajax.query(Object)`

the **Object** is the config of that request, this object can have 3 properties:


1.  `url` **{String}** is required.
2.  `method` **{String}** is required.
3.  `params` **{Object}** is optional, this property is for specific queries. The queries like this `foo=bar&bar=foo` can be transformed to `{ foo: 'bar', bar: 'foo' }` in the JavaScript object notation, so is much better for make queries and easy.
4.  `fragment` **{String}** is optional.

Example:

```javascript
ajax.query({
    url: 'somepath',
    method: 'GET',
    params: {
        foo: 'bar'
    },
    fragment: '123'
    // the url should be 'somepath?foo=bar#123'.
}).then(function (res) {
    // Do something with the response...
}).catch(function (err) {
    // Manage the error of the request (if appear).
})
```

### `ajax.get(url [, json])`

This method is an shorthand for **GET** requests.

Params:

1.  `url` **{String}** is required.
2.  `json` **{Boolean}** is optional, default `false`. This param is for when the response is json string, if `json` is `true` the response is parser for convert it to a object normal.

Per Example the file `somefile.json` contain `{ "foo": "bar" }`:

```javascript
ajax.get('somefile.json', true)
    .then(function (res) {
        if (res.foo === 'bar') {
            // Do something...
        }
    }).catch(function (err) {
        // Trap the error.
    })
```

### `ajax.post(url, data [, json])`

This method is an shorthand for **POST** requests.

Params:

1.  `url` **{String}** is required.
2.  `data` **{String|Number|Object|Boolean}** is required.
3.  `json` **{Boolean}** is optional, default `false`. This param is for when the data is object normal and will send it as a json string.

Example:

```javascript
const data = { foo: 'bar' }

// The data is transformed to '{ "foo": "bar"}'
ajax.post('somepath', data, true)
    .then(function ()
        // The post request was complete.
    }).catch(function (err) {
        // Something it's wrong.
    })
```

For more examples and test execute `npm run test` and open your browser in the url `http://localhost:8080`.

## License

[MIT](https://github.com/rich-97/req-ajax/blob/master/LICENSE)
