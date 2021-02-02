const { parseDirections, Ship } = require("./index");
test("initial test", () => {
  expect(1 + 1).toEqual(2);
});

describe("Ship", () => {
  test("constructor returns current position and degrees", () => {
    const ship = new Ship();
    expect(ship).toMatchObject({
      x: 0,
      y: 0,
      degrees: 90,
    });
  });
  test("getX returns x coordinate of ship", () => {
    const ship = new Ship();
    ship.setX(10);
    expect(ship.getX()).toEqual(10);
  });
  test("getY returns y coordinate of ship", () => {
    const ship = new Ship();
    ship.setY(10);
    expect(ship.getY()).toEqual(10);
  });
  test("getDegrees returns degrees relative to what the ship is facing", () => {
    const ship = new Ship();
    expect(ship.getDegrees()).toEqual(90);
  });
  test("setX changes the x to input value", () => {
    const ship = new Ship();
    ship.setX(5);
    expect(ship).toMatchObject({
      x: 5,
      y: 0,
      degrees: 90,
    });
  });
  test("setY changes the y to input value", () => {
    const ship = new Ship();
    ship.setY(5);
    expect(ship).toMatchObject({
      x: 0,
      y: 5,
      degrees: 90,
    });
  });
  test("set the degrees sets the ship facing degrees relative to 360", () => {
    const ship = new Ship();
    expect(ship.setDirection(90)).toMatchObject({ degrees: 90 });
    expect(ship.setDirection(180)).toMatchObject({ degrees: 180 });
  });
});

describe("parseDirections", () => {
  test("N10 returns an action of N and units of 10", () => {
    expect(parseDirections("N10")).toMatchObject({
      action: "N",
      units: 10,
    });
    expect(parseDirections("S4")).toMatchObject({
      action: "S",
      units: 4,
    });
  });
});
