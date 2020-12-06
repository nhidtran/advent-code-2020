const { generatePassport, validPassport } = require('./index')

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
    test('returns 1 if passport does not include all required keys', () => {
        const passport = {
            a: 1,
            b: 2,
            c: 3
        }
        const requiredKeys = ['a', 'b']
        expect(validPassport(passport, requiredKeys)).toEqual(1)
    })
})

describe('generatePassport', () => {
    test('returns passport if no string is provided', () => {
        expect(generatePassport("", {})).toEqual({})
        expect(generatePassport("", { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
    })
    test('returns key value object parsed from string', () => {
        const str = "abc:1 def:2 ghi:3";
        const passport = {}

        console.log('%cgeneratePassport(str, passport, 0)', 'color:pink', generatePassport(str, passport, 0));
        expect(generatePassport(str, passport)).toEqual({ 'abc:': '1', 'def:': '2', 'ghi:': '3' })
    })
})