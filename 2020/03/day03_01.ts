const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();
const file = await Deno.readFile("./map.txt");
const out = await Deno.open("./map_result.txt", { write: true, create: true });
const lines = decoder.decode(file).split("\n");

const outputMap = Deno.args.includes("--output-map");

const lineCount = lines.length;
const columnCount = lines[0].length;

console.log(`Board is ${columnCount} X ${lineCount}`);

const isTree = (char: string) => char === "#";

let position = { x: 0, y: 0 };
let treeCount = 0;

while (position.y < lineCount) {
  const { x, y } = position;

  const tree = isTree(lines[y][x % columnCount]);

  if (outputMap) {
    const markedLine = replaceAt(lines[y], tree ? "X" : "O", x % columnCount);
    await out.write(encoder.encode(markedLine + "\n"));
  }

  if (tree) {
    treeCount++;
  }

  position = {
    x: x + 3,
    y: y + 1,
  };
}

console.log("End:", position);
console.log("Tree count:", treeCount);

function replaceAt(str: string, char: string, at: number) {
  return str.substring(0, at) + char + str.substring(at + 1);
}
