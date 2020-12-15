import { parseSeat } from "./parseSeat.ts";

const file = await Deno.readTextFile("./seats.txt");

const seats = file.split("\n");

const max = seats
  .map(parseSeat)
  .reduce((max, curr) => (curr.id > max ? curr.id : max), 0);

console.log(max);

// 329 -- too low
