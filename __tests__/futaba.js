/* eslint-env jest */
const Futaba = require('..')

const EMAIL = 'sg-epk@jtk93.x29.jp'
const HASH = Buffer.from('cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=', 'base64')
const SALT = Buffer.from('AAA=', 'base64')

it('should export a function', () => {
  expect(typeof Futaba).toBe('function')
})

describe('static Futaba.create', () => {
  it('without salt', () => {
    const f = Futaba.create(EMAIL)
    expect(f.test(EMAIL)).toBe(true)
  })

  it('with salt', () => {
    const f = Futaba.create(EMAIL, SALT)
    expect(f.hash.compare(HASH)).toBe(0)
    expect(f.salt.compare(SALT)).toBe(0)
  })
})

describe('static Futaba.from', () => {
  it('with an object', () => {
    const val = {
      v: 'FUTABA10',
      h: 'cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=',
      s: 'AAA='
    }

    const f = Futaba.from(val)
    expect(f.hash.compare(HASH)).toBe(0)
    expect(f.salt.compare(SALT)).toBe(0)
  })

  it('with a string', () => {
    const val = '{"v": "FUTABA10","h": "cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=","s": "AAA="}'

    const f = Futaba.from(val)
    expect(f.hash.compare(HASH)).toBe(0)
    expect(f.salt.compare(SALT)).toBe(0)
  })
})

describe('static Futaba.test', () => {
  it('with a Futaba instance', () => {
    const val = Futaba.create(EMAIL, SALT)

    expect(Futaba.test(val, EMAIL)).toBe(true)
  })

  it('with an object', () => {
    const val = {
      v: 'FUTABA10',
      h: 'cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=',
      s: 'AAA='
    }

    expect(Futaba.test(val, EMAIL)).toBe(true)
  })

  it('with a string', () => {
    const val = '{"v": "FUTABA10","h": "cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=","s": "AAA="}'

    expect(Futaba.test(val, EMAIL)).toBe(true)
  })
})

describe('Futaba.test', () => {
  it('should return true for correct email', () => {
    const f = Futaba.create(EMAIL)
    expect(f.test(EMAIL)).toBe(true)
  })

  it('should return false for incorrect email', () => {
    const f = Futaba.create(EMAIL)
    expect(f.test('foo@bar.com')).toBe(false)
  })
})

describe('Futaba.toObject', () => {
  it('should return the correct object', () => {
    const f = Futaba.create(EMAIL, SALT)
    expect(f.toObject()).toEqual({
      v: 'FUTABA10',
      h: 'cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=',
      s: 'AAA='
    })
  })
})

describe('Futaba.toString', () => {
  it('should return the correct string', () => {
    const f = Futaba.create(EMAIL, SALT)
    expect(JSON.parse(f.toString())).toEqual({
      v: 'FUTABA10',
      h: 'cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=',
      s: 'AAA='
    })
  })
})

describe('Futaba.toJSON', () => {
  it('should return the correct string', () => {
    const f = Futaba.create(EMAIL, SALT)
    expect(JSON.parse(f.toJSON())).toEqual({
      v: 'FUTABA10',
      h: 'cNiTgPyRGjxHnYYa7iqlEJF7F5In3ATQ/v4gkLTnXmQ=',
      s: 'AAA='
    })
  })

  it('should return the same string', () => {
    const f = Futaba.create(EMAIL, SALT)
    expect(f.toJSON()).toEqual(f.toString())
  })
})
