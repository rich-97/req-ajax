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

Also this can be used with `webpack` just require the module `req-ajax`.

## API documentation

### Ajax constructor

`new Ajax(config)`

the **config** object:

#### Properties

-  `url`      - **{String}** is required.
-  `method`   - **{String}** is required.
-  `params`   - **{Object}** is optional, this property is for specific queries. The queries like this `foo=bar&bar=foo` can be transformed to `{ foo: 'bar', bar: 'foo' }` in the JavaScript object notation, so is much better for make queries and easy.
-  `fragment` - **{String}** is optional, without the `#` character.

#### Methods

-  `success(response)` - **{Function}** is optional.
-  `error(status, headers)`   - **{Funcion}** is optional.

## Test

For the unit-test install the `devDependencies` and open the file `test/index.html` in your browser.

## License

[MIT](https://github.com/rich-97/req-ajax/blob/master/LICENSE)
