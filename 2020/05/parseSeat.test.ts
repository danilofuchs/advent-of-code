import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { parseSeat } from "./parseSeat.ts";

Deno.test("works", () => {
  const seats = ["FBFBBFFRLR", "BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];
  assertEquals(parseSeat(seats[0]), { row: 44, column: 5, id: 357 });
  assertEquals(parseSeat(seats[1]), { row: 70, column: 7, id: 567 });
  assertEquals(parseSeat(seats[2]), { row: 14, column: 7, id: 119 });
  assertEquals(parseSeat(seats[3]), { row: 102, column: 4, id: 820 });
});
