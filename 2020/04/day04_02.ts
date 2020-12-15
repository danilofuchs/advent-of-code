const validEyeColors = new Set([
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
]);

const validations: Record<string, (input: string) => boolean> = {
  byr: (input) =>
    input !== undefined &&
    input.length === 4 &&
    parseInt(input) >= 1920 &&
    parseInt(input) <= 2002,
  iyr: (input) =>
    input !== undefined &&
    input.length === 4 &&
    parseInt(input) >= 2010 &&
    parseInt(input) <= 2020,
  eyr: (input) =>
    input !== undefined &&
    input.length === 4 &&
    parseInt(input) >= 2020 &&
    parseInt(input) <= 2030,
  hgt: (input) => {
    if (!input) {
      return false;
    }
    const num = parseInt(input.slice(0, -2));
    if (input.endsWith("cm")) {
      return num >= 150 && num <= 193;
    }
    if (input.endsWith("in")) {
      return num >= 59 && num <= 76;
    }
    return false;
  },
  hcl: (input) => /^#[0-9a-f]{6}$/.test(input),
  ecl: (input) => validEyeColors.has(input),
  pid: (input) => /^[0-9]{9}$/.test(input),
  cid: (_) => true,
};

const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./passports.txt");
const decoded = decoder.decode(file);

const passports = decoded
  .split("\n\n")
  .map((passportData) => passportData.split(/[\s]/g))
  .map((fields) => Object.fromEntries(fields.map((field) => field.split(":"))));

const validPassports = passports.map((passport) =>
  Object.entries(validations).every(([key, validator]) =>
    validator(passport[key])
  )
);

const validCount = validPassports.reduce(
  (acc, curr) => (acc += curr ? 1 : 0),
  0
);

console.log(validCount);

export {};
