const fs = require("fs");

function parseString(str) {
  const split = str.split(" ");
  const min = split[0].substr(0, split[0].indexOf("-"));
  const max = split[0].substr(split[0].indexOf("-") + 1);
  const letter = split[1].substr(0, split[1].indexOf(":"));
  const string = split[2];

  return {
    min,
    max,
    letter,
    string,
  };
}

function validPassword(str, letter, min, max, count = 0, idx = 0) {
  if (count > max) return 0;
  if (idx >= str.length) {
    if (count <= max && count >= min) {
      return 1;
    }
    return 0;
  }

  if (str[idx] == letter) {
    ++count;
  }
  ++idx;
  return validPassword(str, letter, min, max, count, idx);
}

function validPasswords(list = []) {
  return list.reduce((acc, curr) => {
    const { string, min, max, letter } = parseString(curr);
    const res = validPassword(string, letter, min, max, 0, 0);
    acc += res;
    return acc;
  }, 0);
}

fs.readFile("input.txt", "utf8", function (err, data) {
  const lines = data.split(/\r?\n/);
  console.log("advent code result:", validPasswords(lines));
});

module.exports = {
  parseString,
  validPassword,
  validPasswords,
};
