import { getSumRightOrderPacketIndexes } from "./13.1.js";
import { Packet, IntValue, PacketsReader } from "./packetsReader.js";

describe("13.1", () => {
  describe("Brackets pair ", () => {
    it("Reads input correctly", () => {
      const line = "[[1],[2,3,4]]";

      const bracketRead = Packet.FromLine(line);

      const expected = new Packet([
        new Packet([new IntValue(1)]),
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);

      expect(bracketRead).toEqual(expected);
    });

    it("Shifts first value", () => {
      const line = "[[1],[2,3,4]]";
      const bracketRead = Packet.FromLine(line);

      const popValue = bracketRead.shiftNextIValue();

      expect(popValue).toEqual(new Packet([new IntValue(1)]));

      const expected = new Packet([
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);
      expect(bracketRead).toEqual(expected);
    });
  });

  describe("Packets Reader", () => {
    it("Read lines create correct packet pairs", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1,1,3,1,1]");
      packetsReader.readLine("[1,1,5,1,1]");
      packetsReader.readLine("");
      packetsReader.readLine("[[1],[2,3,4]]");

      expect(packetsReader.packetGroups.length).toEqual(2);
      expect(packetsReader.packetGroups[0].packetPairs.length).toEqual(2);
      expect(packetsReader.packetGroups[1].packetPairs.length).toEqual(1);

      const expected = new Packet([
        new Packet([new IntValue(1)]),
        new Packet([new IntValue(2), new IntValue(3), new IntValue(4)]),
      ]);

      expect(packetsReader.packetGroups[1].packetPairs[0]).toEqual(expected);
    });

    it("compare packets with the first pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1,1,3,1,1]");
      packetsReader.readLine("[1,1,5,1,1]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });

    it("compare packets with the second pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[[1],[2,3,4]]");
      packetsReader.readLine("[[1],4]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });

    it("compare packets with the third pair returns 0 (wrong packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[9]");
      packetsReader.readLine("[[8,7,6]]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(0);
    });

    it("compare packets with the fourth pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[[4,4],4,4]");
      packetsReader.readLine("[[4,4],4,4,4]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });

    it("compare packets with the fifth pair returns 0 (wrong packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[7,7,7,7]");
      packetsReader.readLine("[7,7,7]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(0);
    });

    it("Same as fifth pair, but the other way (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[[7,7],[5,5]]");
      packetsReader.readLine("[[7,7,7],[5,5]]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });

    it("Same as fifth pair, but the other way (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1]");
      packetsReader.readLine("[1]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(0);
    });

    it("compare packets with the sixth pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[]");
      packetsReader.readLine("[3]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(1);
    });

    it("compare packets with the sixth pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[[[]]]");
      packetsReader.readLine("[[]]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(0);
    });

    it("compare packets with the sixth pair returns 1 (right packet pair)", () => {
      const packetsReader = new PacketsReader();
      packetsReader.readLine("[1,[2,[3,[4,[5,6,7]]]],8,9]");
      packetsReader.readLine("[1,[2,[3,[4,[5,6,0]]]],8,9]");

      const sum = packetsReader.sumRightOrderPacketsIndexes();
      expect(sum).toEqual(0);
    });
  });

  it("Test with test.txt", async () => {
    const result = await getSumRightOrderPacketIndexes("test.txt");
    expect(result).toEqual(13);
  });

  it("Test with input.txt", async () => {
    const result = await getSumRightOrderPacketIndexes("input.txt");
    expect(result).toEqual(6101);
  });
});
