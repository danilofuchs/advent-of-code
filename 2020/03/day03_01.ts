import { treeCounter } from "./treeCounter.ts";

const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./map.txt");
const lines = decoder.decode(file).split("\n");

const countTrees = treeCounter(lines);
const treeCount = countTrees({ dx: 3, dy: 1 });

console.log("Stopped at:", treeCount.position);

console.log("Tree count:", treeCount.count);
