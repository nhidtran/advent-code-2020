const { Color } = require("chalk");
const fs = require("fs");

function GameOfLife() {
  this.layout = new Map();
  //   this.nextGen = new Map();
  this.nextGen = [];
  return this;
}

GameOfLife.prototype.getNextGeneration = function (seat) {
  const pos = this.createKey(seat.x, seat.y);
  const neighbors = this.getNeighbors(seat);

  if (
    seat.state === "L" &&
    neighbors.filter(({ state }) => state === "#").length == 0
  ) {
    this.nextGen.push({
      key: pos,
      ...seat,
      state: "#",
    });
  } else if (
    seat.state === "#" &&
    neighbors.filter(({ state }) => state == "#").length >= 4
  ) {
    {
      this.nextGen.push({
        key: pos,
        ...seat,
        state: "L",
      });
    }
  }
  return this;
};

GameOfLife.prototype.createKey = function (x, y) {
  return `[${x},${y}]`;
};

GameOfLife.prototype.getNeighbors = function (seat) {
  const { x, y, state } = seat;

  const top = this.layout.get(this.createKey(x, y - 1));
  const bottom = this.layout.get(this.createKey(x, y + 1));

  const right = this.layout.get(this.createKey(x + 1, y));
  const left = this.layout.get(this.createKey(x - 1, y));

  const diagBtmLeft = this.layout.get(this.createKey(x - 1, y + 1));
  const diagBtmRight = this.layout.get(this.createKey(x + 1, y + 1));

  const diagTopLeft = this.layout.get(this.createKey(x + 1, y - 1));
  const diagTopRight = this.layout.get(this.createKey(x - 1, y - 1));

  return [
    right || {},
    left || {},
    top || {},
    bottom || {},
    diagBtmLeft || {},
    diagBtmRight || {},
    diagTopLeft || {},
    diagTopRight || {},
  ];
};

GameOfLife.prototype.print = function () {};

GameOfLife.prototype.setPosition = function (x, y, state) {
  this.layout.set(`[${x},${y}]`, { x, y, state });
  return this;
};

fs.readFile("input.txt", "utf-8", function (err, data) {
  const universe = new GameOfLife();
  data.split(/\n/).forEach((curr, x) => {
    for (let y = 0; y < curr.length; ++y) {
      universe.setPosition(x, y, curr[y]);
    }
  });
  let continueGame = true;
  let i = 1;
  do {
    universe.layout.forEach((seat) => {
      universe.getNextGeneration(seat);
    });

    if (!universe.nextGen.length) {
      continueGame = false;
      break;
    }

    while (universe.nextGen.length) {
      const nextSeat = universe.nextGen.shift();
      universe.layout.set(nextSeat.key, {
        x: nextSeat.x,
        y: nextSeat.y,
        state: nextSeat.state,
      });
    }

    ++i;
  } while (continueGame);

  console.log(
    "occupied seats: ",
    Array.from(universe.layout.values()).filter(({ state }) => state === "#")
      .length
  );
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
  universe.layout.forEach((seat) => {
    grid[seat.x][seat.y] = seat.state;
  });
  console.log("Grid:", grid);
});

module.exports = {
  GameOfLife,
};
