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
/*
{
  "category": "Control character",
  "hexrange": ["0000", "001F"],
  "range": [0, 31]
},
{
  "category": "Basic Latin",
  "hexrange": ["0020", "007F"],
  "range": [32, 127]
},
...
*/
```


## API

### unicodeRanges()

Returns a JSON object with following information about the Unicode Ranges:

- `category` : `(String)` The range category name
- `hexrange` : `(Array)` The hexadecimal number range 
- `range` : `(Array)` The decimal number range


## Contribution

Please open an issue or pull request of you discover any of the values or ranges to be incorrect. *Thanks!*


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
