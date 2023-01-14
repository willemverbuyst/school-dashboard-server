import { sortByKey } from "./genericSort";

const testObject1 = {
  foo: 1,
  bar: "Z_test",
  quuz: true,
};
const testObject2 = {
  foo: 2,
  bar: "A_test",
  quuz: true,
};

describe("sortByKey", () => {
  it("should return 1", () => {
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "foo",
        isDescending: true,
      })
    ).toBe(1);
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "bar",
        isDescending: false,
      })
    ).toBe(1);
  });

  it("should return -1", () => {
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "foo",
        isDescending: false,
      })
    ).toBe(-1);
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "bar",
        isDescending: true,
      })
    ).toBe(-1);
  });

  it("should return 0", () => {
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "quuz",
        isDescending: false,
      })
    ).toBe(0);
    expect(
      sortByKey({
        object1: testObject1,
        object2: testObject2,
        key: "quuz",
        isDescending: true,
      })
    ).toBe(-0);
  });
});
