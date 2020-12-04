export const treeCounter = (lines: string[]) => {
  const lineCount = lines.length;
  const columnCount = lines[0].length;
  console.log(`Board is ${columnCount} X ${lineCount}`);

  return (slope: { dx: number; dy: number }) => {
    let position = { x: 0, y: 0 };
    let treeCount = 0;

    while (position.y < lineCount) {
      const { x, y } = position;

      const tree = isTree(lines[y][x % columnCount]);

      if (tree) {
        treeCount++;
      }

      position = {
        x: x + slope.dx,
        y: y + slope.dy,
      };
    }

    return { count: treeCount, position };
  };
};

const isTree = (char: string) => char === "#";
