const fs = require("fs");

const inRange = (min, max) => (value) => {
    return value >= min && value <= max;
}

const inHeightRange = rangeRule => str => {
    if (!str.match(/(cm|in)$/)) return false;

    // must start with nubmers
    const unit = str.slice(str.length - 2);
    const value = str.substr(0, str.length - 2)
    if (!unit && !value) return false

    return inRange(rangeRule[unit].min, rangeRule[unit].max)(value)
}

const eyeRule = eyeColors => value => eyeColors.includes(value)

const hairRule = regexExp => str => !!str.match(regexExp);

const pidRule = regexExp => str => !!str.match(regexExp);

function validPassport(passport, passportKeys) {
    if (!passport) return 0

    const requiredKeys = Object.keys(passportFields).filter(key => passportFields[key])

    if(!requiredKeys.every(requiredKey =>  Object.keys(passport).includes(requiredKey))) return 0;


    return passportKeys['byr'](passport['byr']) &&
    passportKeys['iyr'](passport['iyr']) &&
    passportKeys['eyr'](passport['eyr']) &&
    passportKeys['hgt'](passport['hgt']) &&
    passportKeys['hcl'](passport['hcl']) &&
    passportKeys['ecl'](passport['ecl']) &&
    passportKeys['pid'](passport['pid'])
}


function generatePassport(str, passport = {}) {
    if (!str.length) {
        return passport
    }
    
    const firstField = str.split(' ')[0];
    const firstFieldSplitIndex = str.indexOf(' ')  === -1 ? firstField.length - 1 :
    str.indexOf(' ') ;
    
    const fieldKey = firstField.slice(0, firstField.indexOf(":"))
    const fieldValue = firstField.slice(firstField.indexOf(":") + 1)

    passport = {
        ...passport,
        [fieldKey]: fieldValue
    }

    const nextField = str.slice(firstFieldSplitIndex + 1);

    return generatePassport(nextField, passport)
}

const passportFields = {
    byr: inRange(1920, 2002),
    iyr: inRange(2010, 2020),
    eyr: inRange(2020, 2030),
    hgt: inHeightRange({ "cm": {min: 150, max: 193}, "in": {min: 59, max: 76 }}),
    hcl: hairRule(/^#[0-9a-f]{6}/),
    ecl: eyeRule(['amb, blu',' brn', 'gry', 'hzl', 'oth']),
    pid: pidRule(/[0-9]{9}/),
    cid: false
}

const requiredPassportFields = Object.keys(passportFields).filter(key => passportFields[key])

fs.readFile("input.txt", "utf8", function (err, data) {
    const lines = data.split(/\r?\n/);

    console.log('%clines', 'color:pink', lines);
    let stack = []
    let passports = []
    let str = "";

    let i = 0;
    while ( i < lines.length) {
        while (lines[i] !== " " && lines[i]) {
            stack.push(lines[i])
            ++i;
        }
        while (stack.length) {
            if (!str.length) str += stack.pop();
            else {
                str += " " + stack.pop()
            }
        }
        passports.push(str);
        str = ""
        ++i;
    }

    console.log('%cpass', 'color:pink', passports);


    const count = passports.reduce((acc, curr, idx) => {
        const temp = generatePassport(curr);
        acc += validPassport(temp, passportFields)
        return acc;
    }, 0)



    console.log('adventCode Result', count);

  });
  

module.exports = {
    eyeRule,
    generatePassport,
    hairRule,
    pidRule,
    inRange,
    validPassport
}