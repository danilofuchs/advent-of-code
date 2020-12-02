const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./numbers.csv");
const numbers = decoder
  .decode(file)
  .split("\n")
  .map((str) => parseInt(str));

const target = 2020;

const find = () => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) {
        continue;
      }

      const first = numbers[i];
      const second = numbers[j];

      if (first + second >= target) {
        continue;
      }

      for (let k = 0; k < numbers.length; k++) {
        const third = numbers[k];

        if (k === i || k === j) {
          continue;
        }

        if (first + second + third === target) {
          return [first, second, third] as const;
        }
      }
    }
  }

  throw new Error(`Could not find 3 numbers which sum to ${target}`);
};

const [first, second, third] = find();

console.log(`${first} + ${second} + ${third} = ${target}`);
console.log(`${first} * ${second} * ${third} = ${first * second * third}`);

export {};
