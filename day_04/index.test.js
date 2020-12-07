const { eyeRule, hairRule, inRange, generatePassport, pidRule, validPassport } = require('./index')

describe('validPasspport', () => {
    test('returns 0 if no passport', () => {
        expect(validPassport(null, [])).toEqual(0)
        expect(validPassport(undefined, [])).toEqual(0)
    })
    test('returns 0 if passport does not include all required keys', () => {
        const passport = {
            a: 1,
            c: 2,
            e: 3
        }
        const requiredKeys = ['a', 'b']
        expect(validPassport(passport, requiredKeys)).toEqual(0)
    })
    // test('returns 1 if all required keys habve a valid value', () => {
    //     const passport = {
    //         a: 1,
    //         b: 2,
    //         c: 3
    //     }
    //     const requiredKeys = ['a', 'b']
    //     expect(validPassport(passport, requiredKeys)).toEqual(1)
    // })
})

describe('generatePassport', () => {
    test('returns passport if no string is provided', () => {
        expect(generatePassport("", {})).toEqual({})
        expect(generatePassport("", { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
    })
    test('returns key value object parsed from string', () => {
        const str = "abc:1 def:2 ghi:3";
        const passport = {}

        expect(generatePassport(str, passport)).toEqual(
            { abc: '1', def: '2', ghi: '3' })
    })
})

describe('rules', () => {
    test('inRange returns false if below minimum value', () => {
        expect(inRange(1920, 2002)(1910)).toEqual(false)
    })
    test('inRange returns false if above max value', () => {
        expect(inRange(1920, 2002)(2003)).toEqual(false)
    })
    test('inRange returns true if equal to min value', () => {
        expect(inRange(1920, 2002)(1920)).toEqual(true)
    })
    test('inRange returns true if equal to max value', () => {
        expect(inRange(1920, 2002)(2002)).toEqual(true)
    })
    test('inRange returns true if value within range of min and max', () => {
        expect(inRange(1920, 2002)(2002)).toEqual(true)
    })
    test('hairRule should return true if value begins with # and followed by exactly six characters 0-9 or a-f', () => {
        expect(hairRule(/^#[0-9a-f]{6}/)("#123456")).toEqual(true)
        expect(hairRule(/^#[0-9a-f]{6}/)("#123abc")).toEqual(true)
        expect(hairRule(/^#[0-9a-f]{6}/)("#abc123")).toEqual(true)
        expect(hairRule(/^#[0-9a-f]{6}/)("#def789")).toEqual(true)
    })
    test('hairRule should return false if value does not begin with # and followed by exactly six characters 0-9 or a-f', () => {
        expect(hairRule(/^#[0-9a-f]{6}/)("?123456")).toEqual(false)
        expect(hairRule(/^#[0-9a-f]{6}/)("#012")).toEqual(false)
        expect(hairRule(/^#[0-9a-f]{6}/)("#gab123")).toEqual(false)
    })
    test('eyeRule should return false if value is not one of the listed eye colors', () => {
        expect(eyeRule(['amb', 'blu',' brn', 'gry', 'hzl', 'oth'])('abc')).toEqual(false)
    })
    test('eyeRule should return true if value is one of the listed eye colors', () => {
        expect(eyeRule(['amb', 'blu',' brn', 'gry', 'hzl', 'oth'])('hzl')).toEqual(true)
        expect(eyeRule(['amb', 'blu',' brn', 'gry', 'hzl', 'oth'])('blu')).toEqual(true)
    })
    test('pid rule should return false if string does not have 9 digits', () => {
        expect(pidRule(/[0-9]{9}/)("000000001")).toEqual(true)
        expect(pidRule(/[0-9]{9}/)("000")).toEqual(false)
    })
})