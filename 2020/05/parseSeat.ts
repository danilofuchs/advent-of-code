export const parseSeat = (encoded: string) => {
  const row = parseRow(encoded.slice(0, 7));
  const column = parseCol(encoded.slice(7, 10));
  const id = row * 8 + column;
  return {
    row,
    column,
    id,
  };
};

const parseRow = (encoded: string) =>
  parseBinarySpacePartition(encoded, 0, 127, "F", "B");
const parseCol = (encoded: string) =>
  parseBinarySpacePartition(encoded, 0, 7, "L", "R");

const parseBinarySpacePartition = (
  encoded: string,
  min: number,
  max: number,
  lower: string,
  upper: string
) => {
  for (const char of encoded) {
    if (char === lower) {
      max = min + Math.floor((max - min) / 2);
    } else if (char === upper) {
      min = min + Math.ceil((max - min) / 2);
    }
  }

  return min;
};
