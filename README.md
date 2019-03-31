# wareki

[![CircleCI](https://circleci.com/gh/tohashi/wareki/tree/master.svg?style=svg)](https://circleci.com/gh/tohashi/wareki/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/tohashi/wareki/badge.svg?branch=master)](https://coveralls.io/github/tohashi/wareki?branch=master)

## Installation

```sh
$ npm install wareki
```

## Usage

```js
import wareki from 'wareki'

wareki('1989-01-07')
// -> 昭和64
wareki('1989-01-08')
// -> 平成元
wareki('2018-08-01', { unit: true })
// -> 平成30年
wareki('2019-05-01')
// -> 新元号元
```
