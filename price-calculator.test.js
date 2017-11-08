const computePrice = require("./price-calculator");
const { expect } = require("chai");

describe("price calculator", () => {
  describe(".computePrice", () => {
    it("computes package price", () => {
      const actual = computePrice(12, 'small');
      expect(actual).to.equal(440);
    });
  });
});
