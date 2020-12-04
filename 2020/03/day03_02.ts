import { treeCounter } from "./treeCounter.ts";

const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./map.txt");
const lines = decoder.decode(file).split("\n");

const countTrees = treeCounter(lines);

const mul = [
  countTrees({ dx: 1, dy: 1 }),
  countTrees({ dx: 3, dy: 1 }),
  countTrees({ dx: 5, dy: 1 }),
  countTrees({ dx: 7, dy: 1 }),
  countTrees({ dx: 1, dy: 2 }),
].reduce((acc, curr) => acc * curr.count, 1);

console.log(mul);
