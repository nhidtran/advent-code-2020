const { parseString, validPassword, validPasswords } = require("./index");

describe("adventCode challenge2", () => {
  describe("parseString", () => {
    expect(parseString("3-4 t: dttt")).toMatchObject({
      min: "3",
      max: "4",
      letter: "t",
      string: "dttt",
    });
  });
  describe("validPassword", () => {
    test("validPassword returns 1 if str appears within lower and upper bound", () => {
      const min = 1;
      const max = 3;
      const letter = "a";
      const str = "abcde";

      expect(validPassword(str, letter, min, max)).toEqual(1);
      expect(validPassword("ccccccccc", "c", 2, 9)).toEqual(1);
    });
    test("validPassword returns 0 if str does not contain minimum number of expected letter", () => {
      const min = 1;
      const max = 3;
      const letter = "b";
      const str = "cedfg";

      expect(validPassword(str, letter, min, max, 0, 0)).toEqual(0);
    });
    test("validPassword returns 0 if letter exceeds max count", () => {
      const min = 1;
      const max = 3;
      const letter = "c";
      const str = "cccc";

      expect(validPassword(str, letter, min, max)).toEqual(0);
    });
  });
  describe("validPasswords", () => {
    test("returns 0 if no passwords are valid", () => {
      expect(validPasswords([])).toEqual(0);
      expect(validPasswords(["1-3 b: cedfg"])).toEqual(0);
    });
    test("returns correct count of valid password", () => {
      expect(
        validPasswords(["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"])
      ).toEqual(2);
    });
  });
});
