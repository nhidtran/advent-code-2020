const fs = require("fs");
const { compileFunction } = require("vm");

function foundTree(character) {
  if (!character) return 0;
  if (character == "#") return 1;
  else return 0;
}

function countTrees(arr, x, y, currX, currY, count = 0) {
  const yCoordinate = currY + y;
  if (yCoordinate >= arr.length) {
    return count;
  }

  const slope = arr[yCoordinate];
  let xCoordinate = (x * yCoordinate) % slope.length;

  count += foundTree(slope[xCoordinate]);
  return countTrees(arr, x, y, xCoordinate, yCoordinate, count);
}

fs.readFile("input.txt", "utf8", function (err, data) {
  const lines = data.split(/\r?\n/);
  console.log(
    "advent code result should be 7:",
    countTrees(lines, 3, 1, 0, 0, 0)
  );
});



module.exports = {
  countTrees,
  foundTree,
};
