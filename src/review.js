/**
 * Bounded offline reviewer runner: fictional input, classification only.
 * No provider calls, system actions, human approval or audit attestation.
 */
import { evaluateModelOutput } from "./governed.js";
import { pathToFileURL } from "node:url";

const MAX_INPUT_BYTES = 65536;
const MAX_CASES = 50;
const LABELS = new Set(["allow", "approval_required", "deny"]);

function validLabels(value) {
  return Array.isArray(value) && value.length >= 1 && value.length <= 8 &&
    value.every((item) => LABELS.has(item));
}
export function scoreReviewBatch(batch) {
  if (!batch || typeof batch !== "object" || Array.isArray(batch) ||
      !Array.isArray(batch.cases) || batch.cases.length < 1 ||
      batch.cases.length > MAX_CASES) throw new Error("INVALID_REVIEW_BATCH");
  if (Buffer.byteLength(JSON.stringify(batch), "utf8") > MAX_INPUT_BYTES)
    throw new Error("REVIEW_INPUT_EXCEEDS_LIMIT");
  const ids = new Set();
  const rows = batch.cases.map((testCase) => {
    if (!testCase || typeof testCase !== "object" || Array.isArray(testCase) ||
        typeof testCase.id !== "string" ||
        !/^[A-Za-z0-9_-]{1,50}$/.test(testCase.id) ||
        ids.has(testCase.id)) throw new Error("INVALID_OR_DUPLICATE_CASE_ID");
    ids.add(testCase.id);
    const expected = testCase.expected;
    if (expected !== undefined && expected !== "reject" &&
        !validLabels(expected)) throw new Error("INVALID_EXPECTED_LABELS");
    let observed;
    try {
      const result = evaluateModelOutput(JSON.stringify(testCase.proposal));
      observed = result.actions.map((action) => action.decision);
    } catch (error) {
      if (!(error instanceof Error) ||
          !error.message.startsWith("Untrusted model output:")) {
        throw error;
      }
      observed = "reject";
    }
    return {
      id: testCase.id, observed,
      matched: expected === undefined ? null :
        JSON.stringify(observed) === JSON.stringify(expected),
      executed: false
    };
  });
  return {
    schema: "unfire.public-bolt.offline-review.v1",
    limitations: "Maintainer's local rules, not independent validation, security certification or real approval.",
    externalActionsExecuted: 0,
    authenticatedHumanApprovals: 0,
    totalCases: rows.length,
    scoredCases: rows.filter((x) => x.matched !== null).length,
    matchedCases: rows.filter((x) => x.matched === true).length,
    mismatchedCases: rows.filter((x) => x.matched === false).length,
    rejectedInputs: rows.filter((x) => x.observed === "reject").length,
    results: rows
  };
}
async function runCli() {
  const parts = [];
  let bytes = 0;
  for await (const chunk of process.stdin) {
    bytes += chunk.byteLength;
    if (bytes > MAX_INPUT_BYTES) throw new Error("REVIEW_INPUT_EXCEEDS_LIMIT");
    parts.push(chunk);
  }
  const input = new TextDecoder("utf-8",{fatal:true}).decode(Buffer.concat(parts));
  process.stdout.write(JSON.stringify(scoreReviewBatch(JSON.parse(input)), null, 2) + "\n");
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch(() => {
    process.stderr.write("FAIL_CLOSED: Invalid or excessive synthetic review input.\n");
    process.exitCode = 2;
  });
}
