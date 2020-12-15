const decoder = new TextDecoder("utf-8");
const file = await Deno.readFile("./passports.txt");
const decoded = decoder.decode(file);

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid" // optional
];

const validPassports = decoded
  .split("\n\n")
  .map((passportData) => passportData.split(/[\s]/g))
  .map((fields) => fields.map((field) => field.split(":")[0]))
  .map((fieldNames) =>
    requiredFields.every((requiredField) => fieldNames.includes(requiredField))
  );

const validCount = validPassports.reduce(
  (acc, curr) => (acc += curr ? 1 : 0),
  0
);

console.log(validCount);

export {};
