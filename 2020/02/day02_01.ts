const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./passwords.txt");
const lines = decoder.decode(file).split("\n");

const validCount = lines
  .map(
    (line) => /(^[0-9]+)-([0-9]+)\s(\w):\s(\w+$)/.exec(line) as RegExpExecArray
  )
  .map(
    ([_, min, max, char, password]) =>
      [
        parseInt(min),
        parseInt(max),
        char,
        password.replace(new RegExp(`[^${char}]`, "g"), ""),
      ] as const
  )
  .map(([min, max, _, pass]) => pass.length >= min && pass.length <= max)
  .reduce((acc, valid) => acc + (valid ? 1 : 0), 0);

console.log(validCount);

export {};
