import { parseSeat } from "./parseSeat.ts";

const file = await Deno.readTextFile("./seats.txt");

const seats = file.split("\n");

const occupiedSeats = seats.map(parseSeat).map((seat) => seat.id);
occupiedSeats.sort((a, b) => a - b);

for (let i = 0; i < occupiedSeats.length - 1; i++) {
  if (occupiedSeats[i + 1] - occupiedSeats[i] > 1) {
    console.log(occupiedSeats[i] + 1);
    break;
  }
}

// 329 -- too low
