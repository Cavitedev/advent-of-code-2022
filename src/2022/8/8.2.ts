import { readFileLines } from "../../common/readfileLines.js";
import { Forest } from "./forest.js";

export async function bestScenicValueInForest(
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  const forest = new Forest();
  for await (const line of rl) {
    forest.addRow(line);
  }
  forest.checkVerticalVisibility();
  forest.checkAmountOfVisibleTreesOnEachDirection();
  const bestScenicValue = forest.bestScenicValue();
  return bestScenicValue;
}
