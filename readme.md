# unicode-range-json [![Build Status](https://travis-ci.org/radiovisual/unicode-range-json.svg?branch=master)](https://travis-ci.org/radiovisual/unicode-range-json)

> A list of all the Unicode Range Names and their hex/decimal range numbers. Recent as of Unicode 15.1.0.

This module simply exposes the [unicode-ranges.json](https://github.com/radiovisual/unicode-range-json/blob/master/unicode-ranges.json) file.

## Install

```
$ npm install --save unicode-range-json
```

## Usage

```js
const unicodeRanges = require("unicode-range-json");

console.log(unicodeRanges);
/*
  {
    "category": "Control Character",
    "hexrange": [
      "0000",
      "001F"
    ],
    "range": [
      0,
      31
    ]
  },
  {
    "category": "Basic Latin",
    "hexrange": [
      "0000",
      "007F"
    ],
    "range": [
      0,
      127
    ]
  },
...
*/
```

## API

### unicodeRanges

A JSON object with the following information about the Unicode Ranges:

- `category` : `(String)` The range category name
- `hexrange` : `(Array)` The hexadecimal number range
- `range` : `(Array)` The decimal number range

## Contribution

Please open an issue or pull request of you discover any of the values or ranges to be incorrect. _Thanks!_

## Automatic Updates

To automatially update the JSON file with the latest unicode information, you can run:

```
npm run update-json
```

then create a PR with the updates (if any).

## Related

- [unicode-range](https://github.com/radiovisual/unicode-range) Get the category range name of any Unicode value. `U+3071 ➝ Hiragana`

## License

MIT © [Michael Wuergler](https://github.com/radiovisual)
