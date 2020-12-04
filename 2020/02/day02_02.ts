const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./passwords.txt");
const lines = decoder.decode(file).split("\n");

const validCount = lines
  .map(
    (line) => /(^[0-9]+)-([0-9]+)\s(\w):\s(\w+$)/.exec(line) as RegExpExecArray
  )
  .map(
    ([_, pos1, pos2, char, password]) =>
      [parseInt(pos1), parseInt(pos2), char, password] as const
  )
  .map(
    ([pos1, pos2, char, pass]) =>
      (pass[pos1 - 1] === char) !== (pass[pos2 - 1] === char)
  )
  .reduce((acc, valid) => acc + (valid ? 1 : 0), 0);

console.log(validCount);

export {};
