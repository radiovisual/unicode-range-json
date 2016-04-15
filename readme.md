# unicode-range-json [![Build Status](https://travis-ci.org/radiovisual/unicode-range-json.svg?branch=master)](https://travis-ci.org/radiovisual/unicode-range-json)

> A list of all the Unicode Range Names and their hex/decimal range numbers.

This module simply returns the [unicode-range.json]() file. 

## Install

```
$ npm install --save unicode-range-json
```


## Usage

```js
const unicodeRanges = require('unicode-range-json');

unicodeRanges();
//=> 'unicorns & rainbows'
```


## API

### unicodeRanges()

Returns a JSON object with information about the Unicode Ranges.


## Contribution

Please open an issue or pull request of you discover any of the values or ranges to be incorrect. *Thanks!*


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
