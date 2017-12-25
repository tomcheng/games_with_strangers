import { makeList } from "./strings";

it("makes a string list from an array", () => {
  expect(makeList(["foo"])).toBe("foo");
  expect(makeList(["foo", "bar"])).toBe("foo and bar");
  expect(makeList(["foo", "bar", "baz"])).toBe("foo, bar and baz");
  expect(makeList(["foo", "bar", "baz", "qux"])).toBe("foo, bar, baz and qux");
});