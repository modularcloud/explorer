import { matchRoute, addRoute } from ".";

describe("Testing addRoute and matchRoute functions", () => {
  beforeAll(() => {
    // testing multiple routes initiated at once to ensure multiple routes are compatible with each other
    addRoute(["test1", "[id]"], { type: "test1", payload: "1" });
    addRoute(["test2", "[id]"], { type: "test2", payload: "2" });
    addRoute(["[test]", "[id]"], { type: "test1", payload: "3" });
    addRoute(["[test]", "[example]", "hello", "[world]"], {
      type: "test2",
      payload: "4",
    });
    addRoute(["[test]", "[example]", "hello", "world"], {
        type: "test2",
        payload: "5",
      });
    addRoute(["[test]", "[example]", "hello", "2"], {
        type: "test2",
        payload: "4",
      });
  });

  test("route with static and dynamic segments", () => {
    const result = matchRoute(["test1", "123"]);
    expect(result).toEqual({
      type: "test1",
      payload: "1",
      params: { id: "123" },
    });
  });

  test("similar route except with different static segments", () => {
    const result = matchRoute(["test2", "456"]);
    expect(result).toEqual({
      type: "test2",
      payload: "2",
      params: { id: "456" },
    });
  });

  test("all dynamic segments", () => {
    const result = matchRoute(["test3", "789"]);
    expect(result).toEqual({
      type: "test1",
      payload: "3",
      params: { test: "test3", id: "789" },
    });
  });

  test("more complex route", () => {
    const result = matchRoute(["test4", "example1", "hello", "world1"]);
    expect(result).toEqual({
      type: "test2",
      payload: "4",
      params: { test: "test4", example: "example1", world: "world1" },
    });
  });

  // New tests for new routes
  test("ending in a static rounte", () => {
    const result = matchRoute(["a", "b", "hello", "world"]);
    expect(result).toEqual({
      type: "test2",
      payload: "5",
      params: { test: "a", example: "b" },
    });
  });

  test("static rountes don't comflict", () => {
    const result = matchRoute(["a", "b", "hello", "2"]);
    expect(result).toEqual({
      type: "test2",
      payload: "4",
      params: { test: "a", example: "b" },
    });
  });

  test("addRoute with duplicate route should throw error", () => {
    expect(() => {
      addRoute(["test1", "[id]"], { type: "test1", payload: "1" });
    }).toThrow();
    expect(() => {
        addRoute(["test1", "[id2]"], { type: "test1", payload: "1" });
      }).toThrow();
    expect(() => {
      addRoute(["[test]", "[example]", "hello", "2"], { type: "test2", payload: "4" });
    }).toThrow();
  });

  test("matchRoute with non-existent route should return null", () => {
    const result = matchRoute(["my", "nonexistent", "route"]);
    expect(result).toBeNull();
  });
  
});