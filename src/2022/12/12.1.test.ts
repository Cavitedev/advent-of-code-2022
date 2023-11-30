import { bestPathLengthToGoal } from "./12.js";
import { HeightMap, HeightMapCell } from "./heightMap.js";
import { HeightMapCellNode } from "./heightMapSearch.js";

describe("12.1", () => {
  it("HeightMapCell S is at height 1 and it is the start cell", () => {
    const cell = HeightMapCell.FromChar("S");

    expect(cell.height).toEqual(1);
    expect(cell.isStart).toEqual(true);
    expect(cell.isEnd).toEqual(false);
  });

  it("HeightMapCell E is at height 27 and it is the end cell", () => {
    const cell = HeightMapCell.FromChar("E");
    expect(cell.height).toEqual(26);
    expect(cell.isStart).toEqual(false);
    expect(cell.isEnd).toEqual(true);
  });

  it("HeightMapCell a is at height 1 and it is not either start or end cell", () => {
    const cell = HeightMapCell.FromChar("a");
    expect(cell.height).toEqual(1);
    expect(cell.isStart).toEqual(false);
    expect(cell.isEnd).toEqual(false);
  });

  it("HeightMapCell z is at height 26 and it is not either start or end cell", () => {
    const cell = HeightMapCell.FromChar("z");
    expect(cell.height).toEqual(26);
    expect(cell.isStart).toEqual(false);
    expect(cell.isEnd).toEqual(false);
  });

  describe("Height map reading test example", () => {
    let heightMap: HeightMap;

    beforeEach(() => {
      heightMap = new HeightMap();
      heightMap.readLine("Sabqponm");
      heightMap.readLine("abcryxxl");
      heightMap.readLine("accszExk");
      heightMap.readLine("acctuvwj");
      heightMap.readLine("abdefghi");
    });

    it("Height map has right shape and right cells", () => {
      expect(heightMap.cells.length).toEqual(5);
      expect(heightMap.cells[0].length).toEqual(8);
      expect(heightMap.cells[2][4].i).toEqual(2);
      expect(heightMap.cells[2][4].j).toEqual(4);
      expect(heightMap.cells[2][4].height).toEqual(26);
    });

    it("Start cell is found correctly", () => {
      const startCell = heightMap.getStartCell();
      expect(startCell.isStart).toEqual(true);
      expect(startCell.i).toEqual(0);
      expect(startCell.j).toEqual(0);
    });

    it("End cell is found correctly", () => {
      const endCell = heightMap.getEndCell();
      expect(endCell.isEnd).toEqual(true);
      expect(endCell.i).toEqual(2);
      expect(endCell.j).toEqual(5);
    });

    it("Get adyacent valid cells at (0,0) returns cell at (1,0) and (0,1)", () => {
      const cell0_0 = heightMap.cells[0][0];
      const cell0_1 = heightMap.cells[0][1];
      const cell1_0 = heightMap.cells[1][0];

      const adyacentCells = heightMap.getValidAdyacentCellsFrom(cell0_0);
      expect(adyacentCells).toEqual([cell1_0, cell0_1]);
    });

    it("Path length is 31 on this example using backtracking", () => {
      const path = heightMap.findPathBacktracking();
      expect(path.length - 1).toEqual(31);
    });

    it("Path length is 31 on this example using A*", () => {
      const path = heightMap.findPathAStarFromStart(false);
      expect(path.length - 1).toEqual(31);
    });
  });

  describe("A* search", () => {
    it("Linking three nodes as a parent and asking route on last node, returns path from first parent to the last child", () => {
      const cell1 = new HeightMapCell(1);
      const cell2 = new HeightMapCell(2);
      const cell3 = new HeightMapCell(3);

      const node1 = new HeightMapCellNode(cell1);
      const node2 = new HeightMapCellNode(cell2);
      const node3 = new HeightMapCellNode(cell3);

      node3.parent = node2;
      node2.parent = node1;

      const pathTo3 = node3.pathToReachNode();
      expect(pathTo3).toEqual([node1, node2, node3]);
    });
  });

  it("Test with test.txt", async () => {
    const steps = await bestPathLengthToGoal(false, "test.txt");
    expect(steps).toEqual(31);
  });

  it("Test with input.txt", async () => {
    const steps = await bestPathLengthToGoal(false, "input.txt");
    expect(steps).toEqual(383);
  });
});
