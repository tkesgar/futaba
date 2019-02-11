# futaba

> an interface to make hashing simpler

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Build Status](https://travis-ci.org/tkesgar/futaba.svg?branch=master)](https://travis-ci.org/tkesgar/futaba)
[![codecov](https://codecov.io/gh/tkesgar/futaba/branch/master/graph/badge.svg)](https://codecov.io/gh/tkesgar/futaba)
[![Greenkeeper badge](https://badges.greenkeeper.io/tkesgar/futaba.svg)](https://greenkeeper.io/)

futaba is an interface to make hashing simpler.

> **DO NOT use futaba to hash passwords!** See [@tkesgar/haru][haru] instead.

## Specification

A futaba JSON is a JSON string that, if parsed, results in an object with at least the following
fields:

  - `v` (type: `string`): specifying the futaba **version**
  - `h` (type: `string`): the computed and encoded **hash** string
  - `s` (type: `string`): the encoded **salt** used for computing the hash

For `FUTABA10`, the hash is computed from an arbitrary UTF-8 string using SHA-256, with hash and
salt encoded in Base64.

This is a futaba JSON for the famous email address `sg-epk@jtk93.x29.jp` with a random salt:

```json
{
  "v": "FUTABA10",
  "h": "Mpz5Ekptf4sXhxVARE9mHRxAKp1QJoRLq16jiFEkK8o=",
  "s": "QWACng=="
}
```

## Installation

```sh
$ npm install @tkesgar/futaba
```

## API

### `static Futaba.create(str[, salt])`

Calculates the hash value of `str` and create a new Futaba instance.

If salt is not provided, a 4-bytes cryptographically random value will be generated as salt.

```js
Futaba.create('sg-epk@jtk93.x29.jp')
// Futaba {
//   hash:
//    <Buffer 4f 0f 06 d4 de 21 4e 92 5c 3d a7 96 8c 4c ec 9e 83 66 1f 73 77 b1 81 78 0a a4 9b 50 7b a8 6b 99>,
//   salt: <Buffer 3c d7 c1 3c> }

Futaba.create('sg-epk@jtk93.x29.jp', Buffer.from('ffffffff', 'hex'))
// Futaba {
//   hash:
//    <Buffer 5e ef 5f e3 f7 93 fb 35 95 97 b2 b9 4f 6f ab b0 b9 ee c5 e4 aa 3b c1 47 8d 8c b7 ab fe f9 2e b4>,
//   salt: <Buffer ff ff ff ff> }
```

### `static Futaba.from(val)`

Reads the value of `h` and `s` from `val`, then create a new Futaba instance from the provided
values. `h` and `s` is expected to be Base64-encoded values that will be used as hash and salt,
respectively.

If `val` is a string, parse it as JSON and reads the values of `h` and `s` as above.

```js
Futaba.from({
  v: 'FUTABA10',
  h: 'Xu9f4/eT+zWVl7K5T2+rsLnuxeSqO8FHjYy3q/75LrQ=',
  s: '/////w=='
})
// Futaba {
//   hash:
//    <Buffer 5e ef 5f e3 f7 93 fb 35 95 97 b2 b9 4f 6f ab b0 b9 ee c5 e4 aa 3b c1 47 8d 8c b7 ab fe f9 2e b4>,
//   salt: <Buffer ff ff ff ff> }

Futaba.from('{"v":"FUTABA10","h":"Xu9f4/eT+zWVl7K5T2+rsLnuxeSqO8FHjYy3q/75LrQ=","s":"/////w=="}')
// Futaba {
//   hash:
//    <Buffer 5e ef 5f e3 f7 93 fb 35 95 97 b2 b9 4f 6f ab b0 b9 ee c5 e4 aa 3b c1 47 8d 8c b7 ab fe f9 2e b4>,
//   salt: <Buffer ff ff ff ff> }
```

### `static Futaba.test(val, str)`

Convenience function to call `test()`.

If `val` is an instance of Futaba, returns the value of `val.test()`. Otherwise, this function
calls `Futaba.from(val)` to get the Futaba instance from the provided value.

### `Futaba.test(str)`

Checks whether the stored hash matches `str`.

Returns `true` if the hash matches, `false` otherwise.

```js
const f = Futaba.create('sg-epk@jtk93.x29.jp')

f.test('sg-epk@jtk93.x29.jp')
// true

f.test('foo@bar.com')
// false
```

### `Futaba.toObject()`

Returns the object representation of the Futaba instance.

```js
const f = Futaba.create('sg-epk@jtk93.x29.jp')

f.toObject()
// { v: 'FUTABA10',
//   h: '2Uzg1eMWoL/ePKWHr35FtFM5tphRa47wdN9hr4KgumA=',
//   s: 'TsLRNA==' }
```

### `Futaba.toString()`

Returns the futaba JSON of the Futaba instance.

```js
const f = Futaba.create('sg-epk@jtk93.x29.jp')

f.toString()
// '{"v":"FUTABA10","h":"2Uzg1eMWoL/ePKWHr35FtFM5tphRa47wdN9hr4KgumA=","s":"TsLRNA=="}'
```

### `Futaba.toJSON()`

Alias for `Futaba.toString()`.

## Contribute

Feel free to create [issues][issue] or submit [pull requests][pull].

## Todo

  - Make futaba isomophic using Web Crypto API

## License

Licensed under [MIT License][license].

[issue]: https://github.com/tkesgar/futaba/issues
[pull]: https://github.com/tkesgar/futaba/pulls
[license]: https://github.com/tkesgar/futaba/blob/master/LICENSE
[haru]: https://www.npmjs.com/package/@tkesgar/haru
