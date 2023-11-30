import { readFileLines } from "../../common/readfileLines.js";
import { Runsack } from "./Runsack.js";

export async function runsackPrioritiesSumGroups(
  groupsCount: number = 3,
  file: string = "input.txt"
): Promise<number> {
  const rl = readFileLines(__dirname, file);

  let sumPriorities = 0;

  let groups: Array<string> = [];
  for await (const line of rl) {
    if (groups.length < groupsCount) {
      groups.push(line);

      if (groups.length == groupsCount) {
        const runsack = new Runsack(groups);
        const sharedItemsPriorities = runsack.sharedItemsPrioritiesSum();
        sumPriorities += sharedItemsPriorities;
        groups = [];
      }
    }
  }

  console.log(sumPriorities);
  return sumPriorities;
}
