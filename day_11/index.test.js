const { expect } = require("@jest/globals");
const { GameOfLife } = require("./index.js");

describe("Game of Life", () => {
  test("GameOfLife constructor returns a layout map", () => {
    const gol = new GameOfLife();
    expect(gol.layout.size).toBe(0);
    expect(gol.nextGen).toEqual([]);
  });
  test("setposition sets seat layout grid", () => {
    const gol = new GameOfLife();
    gol.setPosition(0, 0, "L");
    expect(gol.layout.get("[0,0]")).toMatchObject({
      x: 0,
      y: 0,
      state: "L",
    });
  });
  test("getNeighbors returns an array of all of the neighboring seats state", () => {
    const gol = new GameOfLife();
    gol.setPosition(0, 0, "L");
    gol.setPosition(0, 1, ".");
    gol.setPosition(1, 0, "L");
    gol.setPosition(1, 1, "L");

    expect(
      gol.getNeighbors({
        x: 0,
        y: 0,
        state: "L",
      })
    ).toMatchObject([
      { x: 1, y: 0, state: "L" },
      {},
      {},
      { x: 0, y: 1, state: "." },
      {},
      { x: 1, y: 1, state: "L" },
      {},
      {},
    ]);
  });
  test("createKey returns string of x and y coordinate", () => {
    const gol = new GameOfLife();
    expect(gol.createKey(1, 1)).toEqual("[1,1]");
  });
  describe("getNextGeneration", () => {
    test("if current seat is empty, and all of the neighbors are not occupied change current seat to occupied in the next gen stack", () => {
      const gol = new GameOfLife();
      gol.setPosition(0, 0, "L");
      gol.setPosition(0, 1, ".");
      gol.setPosition(1, 0, "L");
      gol.setPosition(1, 1, "L");

      const seat = gol.layout.get("[0,0]");
      expect(gol.getNextGeneration(seat).nextGen).toEqual([
        { key: "[0,0]", x: 0, y: 0, state: "#" },
      ]);
    });
    test("if current seat is occupied, and at least 4 are also occupied add seat to nextGen with state: L", () => {
      const gol = new GameOfLife();
      gol.setPosition(0, 0, "#");
      gol.setPosition(0, 1, ".");
      gol.setPosition(0, 2, "#");
      gol.setPosition(0, 3, "#");

      gol.setPosition(1, 0, "#");
      gol.setPosition(1, 1, "#");
      gol.setPosition(1, 2, "#");
      gol.setPosition(1, 3, "#");
      gol.setPosition(1, 4, "#");

      const seat = gol.layout.get("[0,2]");
      expect(gol.getNextGeneration(seat).nextGen).toEqual([
        { key: "[0,2]", x: 0, y: 2, state: "L" },
      ]);
    });
  });
});
