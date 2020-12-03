const { TestScheduler } = require("jest");
const { countTrees, foundTree } = require("./index");

describe("countTrees", () => {
  test("foundTree returns 0 if character does not match #", () => {
    expect(foundTree(".")).toEqual(0);
  });
  test("foundTree returns 1 matches #", () => {
    expect(foundTree("#")).toEqual(1);
  });
  test("countTrees returns 0 if no trees are found", () => {
    const x = 3;
    const y = 1;

    const arr = ["..##.......", "#...#...#.."];
    expect(countTrees(arr, 3, 1, 0, 0, 0)).toEqual(0);
  });
  test("returns correct number of trees if trees are found", () => {
    const x = 3;
    const y = 1;

    const arr = [
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ];

    expect(countTrees(arr, x, y, 0, 0, 0, 0)).toEqual(7);
  });
});
