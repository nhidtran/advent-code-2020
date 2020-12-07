const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");

fs.readFile("input.txt", "utf-8", function (err, data) {
  const arr = data.split(/\r?\n/);
  const visited = new Set();

  console.log("%carr:", "color:hotpink", arr);

  const count = arr.reduce((acc, curr, idx) => {
    for (let i = 0; i < curr.length; ++i) {
      visited.add(curr[i]);
    }
    if (!curr.length || curr == "") {
      acc += visited.size;
      visited.clear();
    }
    if (idx >= arr.length - 1) {
      acc += visited.size;
      visited.clear();
    }

    return acc;
  }, 0);
  console.log("%ccount:", "color:hotpink", count);
});
