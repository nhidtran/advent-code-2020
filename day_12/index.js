function Ship() {
  this.x = 0;
  this.y = 0;
  this.degrees = 90; // default facing East
  return this;
}

Ship.prototype = {
  getDegrees: function () {
    return this.degrees;
  },
  getX: function () {
    return this.x;
  },
  getY: function () {
    return this.y;
  },
  setX: function (val) {
    this.x = val;
    return this;
  },
  setY: function (val) {
    this.y = val;
    return this;
  },
  setDirection: function (val) {
    this.degrees = val;
    return this;
  },
};

function sailNorth(ship, units) {
  ship.setY(ship.getY() + units);
  return ship;
}

function sailSouth(ship, units) {
  ship.setY(ship.getY() - units);
  return ship;
}

function sailEast(ship, units) {
  ship.setX(ship.getX() + units);
  return ship;
}

function sailWest(ship, units) {
  ship.setY(ship.getX() - units);
  return ship;
}

function sailForward(ship, units) {
  switch (ship.getDegrees()) {
    case 0:
      sailNorth(ship, units);
      break;
    case 90:
      sailEast(ship, units);
      break;
    case 180:
      sailSouth(ship, units);
      break;
    case 270:
      sailWest(ship, units);
      break;
    default:
      break;
  }
}

function rotateShip(ship, degrees) {
  if (ship.getDegrees() + degrees >= 360) {
    ship.setDirection(Math.abs(360 - ship.getDegrees() + degrees));
    return ship;
  }
  ship.setDirection(ship.getDegrees() + degrees);
  return ship;
}

const parseDirections = (str) => {
  const action = str[0];
  const units = parseInt(str.substr(1));
  return {
    action,
    units,
  };
};

const manhattanDistance = (x, y) => {
  return Math.abs(x) + Math.abs(y);
};

const directions = ["F10", "N3", "F7", "R90", "F11"];
const ship = new Ship();

directions.forEach((str) => {
  const { action, units } = parseDirections(str);
  switch (action) {
    case "F":
      sailForward(ship, units);
      break;
    case "N":
      sailNorth(ship, units);
      break;
    case "E":
      sailEast(ship, units);
      break;
    case "S":
      sailSouth(ship, units);
      break;
    case "R":
      rotateShip(ship, units);
      break;
  }
});

const res = manhattanDistance(ship.getX(), ship.getY());
console.log("manhattan distance:", res);

module.exports = {
  parseDirections,
  Ship,
};
