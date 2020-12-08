const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");

function twoSum(arr, target) {
  const set = new Set();
  for (let i = 0; i < arr.length; ++i) {
    const res = target - arr[i];
    if (set.has(res)) {
      return [res, arr[i]];
    } else {
      set.add(+arr[i]);
    }
  }
}

function threeSumProduct(arr, target) {
  const set = new Set(arr);

  for(let i = 0; i < arr.length; ++i) {
    const temp = target - arr[i];
    const res = twoSum(arr.slice(i + 1), temp);
    if (res) {
      return arr[i] * res[0] * res[1]
    }
  }

}

fs.readFile("input.txt", "utf8", function (err, data) {
  const lines = data.split(/\r?\n/);
  const part1 = twoSum(lines, 2020);
  const part1Solution = part1[0] * part1[1];
  console.log("advent code result part1:", part1Solution);
  console.log('%cthreeSome', 'color:pink', threeSumProduct(lines, 2020));
});

exports.twoSumProduct = twoSum;
