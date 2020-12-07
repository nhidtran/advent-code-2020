const fs = require("fs");

function getRowNumber(rowStr, rowStrIdx = 0, arr) {
  if (arr.length == 1) {
    return arr[0];
  }

  if (rowStr[rowStrIdx] === "F" || rowStr[rowStrIdx] === "L") {
    const top = arr.slice(0, arr.length / 2);
    return getRowNumber(rowStr, ++rowStrIdx, top);
  } else if (rowStr[rowStrIdx] == "B" || rowStr[rowStrIdx] == "R") {
    const bottom = arr.slice(arr.length / 2);
    return getRowNumber(rowStr, ++rowStrIdx, bottom);
  }
}

fs.readFile("input.txt", "utf-8", function (err, data) {
  const code = data.split(/\r?\n/);
  const res = code.reduce((acc, curr, idx) => {
    const arr = Array.from(Array(128).keys());
    const arr2 = Array.from(Array(8).keys());

    const rowStr = curr.substr(0, 7);
    const colStr = curr.substr(7);

    const rowId = getRowNumber(rowStr, 0, arr);
    const colId = getRowNumber(colStr, 0, arr2);
    const productSum = rowId * 8 + colId;

    if (productSum > acc || !acc) {
      acc = productSum;
    }

    return acc;
  }, 0);

  console.log("%cadvent code day 5", res);
});
