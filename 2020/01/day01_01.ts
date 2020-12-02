const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./numbers.csv");
const numbers = decoder
  .decode(file)
  .split("\n")
  .map((str) => parseInt(str));

const target = 2020;

for (const number of numbers) {
  const complement = numbers.find(
    (complement) => number + complement === target
  );
  if (complement !== undefined) {
    console.log(`${number} + ${complement} = ${target}`);
    console.log(`${number} * ${complement} = ${number * complement}`);
    break;
  }
}

export {};
