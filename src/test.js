import { decide } from "./index.js";
const expected = [["inspect","allow"],["write","approval_required"],["unknown","deny"]];
for (const [type,want] of expected) {
  const got = decide({type}).decision;
  if (got !== want) throw new Error(type + " => " + got);
}
console.log("3/3 policy tests passed");