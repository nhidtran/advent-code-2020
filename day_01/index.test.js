const { test, expect } = require("@jest/globals");
const { twoSumProduct } = require("./index");

test("twoSumProduct returns a and b that add up to k", () => {
  const k = 2020;
  const arr = [1721, 979, 366, 299, 675, 1456];
  expect(twoSumProduct(arr, k)).toEqual(514579);
});
