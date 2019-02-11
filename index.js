const crypto = require('crypto')

const VERSION = 'FUTABA10'
const ALGORITHM = 'sha256'
const ENCODING = 'base64'
const SALTLEN = 4

class Futaba {
  static create(str, salt = createSalt()) {
    const hash = createHash(str, salt)
    return new Futaba(hash, salt)
  }

  static from(val) {
    if (typeof val === 'string') {
      return Futaba.from(JSON.parse(val))
    }

    const {h, s} = val

    const hash = Buffer.from(h, ENCODING)
    const salt = Buffer.from(s, ENCODING)
    return new Futaba(hash, salt)
  }

  static test(val, str) {
    if (val instanceof Futaba) {
      return val.test(str)
    }

    return Futaba.from(val).test(str)
  }

  constructor(hash, salt) {
    this.hash = hash
    this.salt = salt
  }

  test(str) {
    return createHash(str, this.salt).compare(this.hash) === 0
  }

  toObject() {
    return {
      v: VERSION,
      h: this.hash.toString(ENCODING),
      s: this.salt.toString(ENCODING)
    }
  }

  toString() {
    return JSON.stringify(this.toObject())
  }

  toJSON() {
    return this.toString()
  }
}

module.exports = Futaba

function createSalt() {
  return crypto.randomBytes(SALTLEN)
}

function createHash(str, salt) {
  return crypto.createHash(ALGORITHM)
    .update(VERSION)
    .update(str)
    .update(salt)
    .digest()
}
