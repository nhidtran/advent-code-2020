const fs = require("fs");

function twoSumProduct(arr, target) {
  const set = new Set();
  for (let i = 0; i < arr.length; ++i) {
    const res = target - arr[i];
    if (set.has(res)) {
      return res * arr[i];
    } else {
      set.add(+arr[i]);
    }
  }
}

fs.readFile("input.txt", "utf8", function (err, data) {
  const lines = data.split(/\r?\n/);
  console.log("advent code result:", twoSumProduct(lines, 2020));
});

exports.twoSumProduct = twoSumProduct;
