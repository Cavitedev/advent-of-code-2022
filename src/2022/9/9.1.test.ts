import { traversedCellsCounter } from "./9.js";
import { Bridge, Coordinate } from "./bridge.js";

describe("9.1", () => {
  it("Bridge has empty cells traverse and (0,0) as initial positions for T and H", () => {
    const bridge = new Bridge(0);

    expect(bridge.tail).toEqual({ x: 0, y: 0 });
    expect(bridge.head).toEqual({ x: 0, y: 0 });
    expect(bridge.cellsTraversed.length).toEqual(1);
  });

  it("Move Head, adds coordinate", () => {
    const bridge = new Bridge(0);
    const newCoordinate = new Coordinate(1, 1);
    bridge.tail = newCoordinate;
    expect(bridge.tail).toEqual(newCoordinate);
    expect(bridge.cellsTraversed).toEqual([
      new Coordinate(0, 0),
      newCoordinate,
    ]);
  });

  it("Move Tail right once, moves tail, but it doesn't move the head", () => {
    const bridge = new Bridge(0);
    bridge.moveHead("R", 1);
    expect(bridge.tail).toEqual(new Coordinate(0, 0));
    expect(bridge.head).toEqual(new Coordinate(1, 0));
    expect(bridge.cellsTraversed).toEqual([new Coordinate(0, 0)]);
  });

  it("Move Tail twice once, moves tail, and also head", () => {
    const bridge = new Bridge(0);
    bridge.moveHead("R", 2);
    expect(bridge.tail).toEqual(new Coordinate(1, 0));
    expect(bridge.head).toEqual(new Coordinate(2, 0));
    expect(bridge.cellsTraversed).toEqual([
      new Coordinate(0, 0),
      new Coordinate(1, 0),
    ]);
  });

  it("Move Tail right and later up twice moves head properly", () => {
    const bridge = new Bridge(0);
    bridge.moveHead("R", 1);
    bridge.moveHead("U", 2);
    expect(bridge.tail).toEqual(new Coordinate(1, 1));
    expect(bridge.head).toEqual(new Coordinate(1, 2));
    expect(bridge.cellsTraversed).toEqual([
      new Coordinate(0, 0),
      new Coordinate(1, 1),
    ]);
  });

  it("Move right and later left, allows to return unrepeated list of cells", () => {
    const bridge = new Bridge(0);
    bridge.moveHead("R", 3);
    bridge.moveHead("L", 4);
    expect(bridge.unrepeatedCellsTraversed()).toEqual([
      new Coordinate(0, 0),
      new Coordinate(1, 0),
      new Coordinate(2, 0),
    ]);
  });
  it("Test with test.txt", async () => {
    const result = await traversedCellsCounter(0, "test.txt");
    expect(result).toEqual(13);
  });

  it("Test with input.txt", async () => {
    const result = await traversedCellsCounter(0, "input.txt");
    expect(result).toEqual(6087);
  });
});
