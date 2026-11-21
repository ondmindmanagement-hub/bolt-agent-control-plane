import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { scoreReviewBatch } from "./review.js";

let count = 0;
function check(name, fn) { fn(); count++; console.log("PASS review interface " + name); }
const sample = JSON.parse(readFileSync(new URL("../examples/reviewer-cases.json", import.meta.url), "utf8"));
check("fixed fictional examples match their stated labels", () => {
  const result=scoreReviewBatch(sample);
  assert.equal(result.totalCases,7);
  assert.equal(result.matchedCases,7);
  assert.equal(result.mismatchedCases,0);
  assert.equal(result.externalActionsExecuted,0);
  assert.ok(result.results.every((x)=>x.executed === false));
});
check("wrong reviewer label is reported as mismatch", () => {
  const input={cases:[{id:"R1",proposal:{actions:[{type:"write",description:"x"}]},expected:["allow"]}]};
  const result=scoreReviewBatch(input);
  assert.deepEqual(result.results[0].observed,["approval_required"]);
  assert.equal(result.results[0].matched,false);
});
check("reviewer-defined unscored cases supported", () => {
  const input={cases:[{id:"R1",proposal:{actions:[{type:"delete",description:"x"}]}}]};
  const result=scoreReviewBatch(input);
  assert.equal(result.scoredCases,0);
  assert.equal(result.results[0].matched,null);
  assert.deepEqual(result.results[0].observed,["deny"]);
});
check("invalid ids and duplicates rejected", () => {
  const c={proposal:{actions:[]},expected:"reject"};
  assert.throws(()=>scoreReviewBatch({cases:[{...c,id:"R1"},{...c,id:"R1"}]}));
  assert.throws(()=>scoreReviewBatch({cases:[{...c,id:"user@example.test"}]}));
});
check("unknown expected labels rejected", () => {
  assert.throws(()=>scoreReviewBatch({cases:[{id:"R1",proposal:{actions:[]},expected:["certified"]}]}));
});
check("no human approvals or actions", () => {
  const input={cases:[{id:"R1",proposal:{actions:[{type:"spend",description:"Fictional budget"}]},expected:["approval_required"]}]};
  const result=scoreReviewBatch(input);
  assert.equal(result.externalActionsExecuted,0);
  assert.equal(result.authenticatedHumanApprovals,0);
  assert.equal(result.results[0].matched,true);
});
check("empty and oversized batch rejected", () => {
  assert.throws(()=>scoreReviewBatch({cases:[]}));
  assert.throws(()=>scoreReviewBatch({cases:Array.from({length:51},(_,i)=>({id:"R"+i,proposal:{actions:[]}}))}));
});
check("large input rejected", () => {
  assert.throws(()=>scoreReviewBatch({cases:[{id:"R1",proposal:{actions:[{type:"draft",description:"a".repeat(65536)}]}}]}),/EXCEEDS_LIMIT/);
});
check("CLI accepts piped stdin", () => {
  const p=spawnSync(process.execPath,["src/review.js"],{input:JSON.stringify(sample),encoding:"utf8",timeout:5000});
  assert.equal(p.status,0,p.stderr);
  assert.equal(JSON.parse(p.stdout).matchedCases,7);
});
check("raw synthetic descriptions are not repeated in reports", () => {
  const marker="FICTIONAL_CASE_TEXT_SHOULD_NOT_BE_REPEATED";
  const batch={cases:[{id:"SAFE_1",proposal:{actions:[{type:"inspect",description:marker}]},expected:["allow"]}]};
  const result=scoreReviewBatch(batch);
  assert.ok(!JSON.stringify(result).includes(marker));
});
check("invalid UTF-8 fails closed", () => {
  const bytes=Buffer.from([0xC3,0x28]);
  const p=spawnSync(process.execPath,["src/review.js"],{input:bytes,encoding:"utf8",timeout:5000});
  assert.equal(p.status,2);
  assert.equal(p.stdout,"");
});
check("CLI bad input fails without leaking raw input", () => {
  const marker="FAKE_SECRET_NOT_FOR_LOGS";
  const p=spawnSync(process.execPath,["src/review.js"],{input:marker,encoding:"utf8",timeout:5000});
  assert.equal(p.status,2);
  assert.equal(p.stdout,"");
  assert.ok(!p.stderr.includes(marker));
});
check("CLI oversized input fails closed", () => {
  const p=spawnSync(process.execPath,["src/review.js"],{input:"a".repeat(70000),encoding:"utf8",timeout:5000});
  assert.equal(p.status,2);
  assert.equal(p.stdout,"");
});
console.log(count + "/" + count + " local reviewer interface checks passed. No external inference.");
