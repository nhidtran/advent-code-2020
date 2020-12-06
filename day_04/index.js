const fs = require("fs");

function validPassport(passport, requiredKeys = []) {
    if (!passport) return 0
    return requiredKeys.every(requiredKey => 
        Object.keys(passport).includes(requiredKey)) ? 1 : 0
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
    byr: true,
    iyr: true,
    eyr: true,
    hgt: true,
    hcl: true,
    ecl: true,
    pid: true,
    cid: false
}

const requiredPassportFields = Object.keys(passportFields).filter(key => passportFields[key])

fs.readFile("input.txt", "utf8", function (err, data) {
    const lines = data.split(/\r?\n/);

    let stack = []
    let passports = []
    let str = "";

    lines.map(line => {
        if (line && !line == " ") {
            stack.push(line)
        } else {
            while (stack.length) {
                if (!str.length) str += stack.pop();
                else {
                    str += " " + stack.pop()
                }
            }
            passports.push(str);
            str = ""
        }

    })
    const count = passports.reduce((acc, curr, idx) => {
        const temp = generatePassport(curr);
        acc += validPassport(temp, requiredPassportFields);
        return acc;
    }, 0)

    console.log('adventCode Result', count);

  });
  

module.exports = {
    generatePassport,
    validPassport
}