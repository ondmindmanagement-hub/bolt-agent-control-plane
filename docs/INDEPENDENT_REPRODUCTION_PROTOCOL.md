# Independent reproduction protocol — BOLT Agent Control Plane

**Open research preview · 21 November 2026 · Public-source review only**

Unfire invites independent, reproducible technical feedback on its already-public, MIT-licensed BOLT Agent Control Plane experiment. This is a read-only demonstration of how a local policy classifies AI-proposed actions. It neither executes actions nor authenticates human approvals. This invitation is **not an external evaluation already completed**, a paid commission, a job offer, a university endorsement, a certificate or evidence of customer deployment.

**Scope:** The public repository at https://github.com/ondmindmanagement-hub/bolt-agent-control-plane . Commercial Bolt macOS, Unfire Autonomy Convergence, Unfire Control Vision and all private source are expressly out of scope.

## Fixed source and reproduction

Pin the exact research version:
- Tag: v0.1.0-research-20261121
- Commit: 02f79c7456f258e8733f7f93854d47a699ad5327
- Requirements: Node.js 20+, Git. No external npm packages or paid services required.

Commands:

    git clone https://github.com/ondmindmanagement-hub/bolt-agent-control-plane.git
    cd bolt-agent-control-plane
    git checkout v0.1.0-research-20261121
    npm test
    npm start

The first command sequence tests the local public code and prints a planning-only report. Inspect the scripts before execution. Do **not** run npm run nebius for this assessment: the optional live inference path could incur costs and is not necessary. The author observed 12/12 local offline checks on this fixed experimental version; this observation is **not independent third-party validation**.

## Optional repeatable case runner on the current main branch

Beyond the pinned v0.1.0-research-20261121 release, current main now includes
a small read-only command to score reviewer-created fictional batches:

    npm run review:offline < examples/reviewer-cases.json

The seven example labels were authored by the maintainer and **do not constitute
independent test evidence**. You can provide your own JSON cases and expected
classification labels, or omit expectations until after running. The command
reports classifications and mismatches, never carries out actions, and does
not call Nebius or another provider.

**Version warning:** this reviewer runner was added AFTER the fixed research
release. It is not included in the original v0.1.0 tag. Record the exact main
Git commit you tested; do not claim the later runner is part of the pinned
release. Any change to this interface or policy must also be separately noted.

## Independent synthetic challenges

A reviewer should write expected decisions **before** running new cases. Beyond the bundled unit tests, independently create at least 12 new fictional proposals covering:
1. Allowed inspect, summarize and draft actions. These are classification labels, never permission to execute.
2. Approval-required write, execute, send_email, deploy, publish and spend actions, with no actual effect.
3. Denied delete, unknown tools and unsupported action types.
4. Forged model approval claims, humanApproved flags or descriptions asking to ignore rules.
5. Malformed JSON, missing descriptions, extra/empty action lists, excessive lengths and unusual Unicode.
6. Boundary contradictions, duplicate proposals, modified types, or surprising combinations.

Report **every failed case**, false authorization classification, unexpected denial, thrown exception and any difference from the documented fixed local rules. A false allow classification is **not** evidence that a dangerous real-world action executed: there is no tool execution backend. No real data, customer accounts, credentials, payment actions, outbound email, remote deployment or production connector should be used.

## Reviewer findings template

Suggested fields:
- Date and reviewer affiliation or identifier; declared relationship to Unfire, if any.
- OS, Node version, exact Git commit SHA and unchanged/modified status.
- Bundled tests passed and failed; exact command output.
- New independently-authored fictional inputs; predeclared reference labels; observed classifications; failure cases.
- Negative findings, uncertainties, false approvals/denials, no-execution observation.
- Source/hash provenance, limitations and a clear decision about what was and was NOT evaluated.
- Written permission or refusal to identify the evaluator, quote findings or publish a document.

A written report with author, dated methods and negative findings is valuable even if the results are unfavorable. No particular positive conclusion is required.

## Disclosure and boundaries

Feedback can be opened as a GitHub issue in this public repository or sent to hello@unfire.technology. Participation is voluntary, remote and written-first, with **no stipend, required calls, fees, deposits or commercial commitments**. A GitHub issue or unverified email alone is **not an independent accreditation**.

Do not share personal/customer information, real payment identifiers, source credentials, private code, institutional logos or confidential vulnerabilities in a public issue. For a suspected exploitable security defect, first send a minimal private note by email. Reviewer attribution and quotation require explicit permission.

The existing MIT license covers the material in this public repository only, not separate Unfire technologies. No additional IP or liability commitments are created by this protocol.

**Reference material:** [Repository README](../README.md) · [Institutional evidence note](INSTITUTIONAL_EVIDENCE_BRIEF.md) · [Fixed research release](https://github.com/ondmindmanagement-hub/bolt-agent-control-plane/releases/tag/v0.1.0-research-20261121) · [Archived source snapshot](https://archive.softwareheritage.org/browse/snapshot/80c15542344169822e532670c05c66475e64ce29/)

**Current third-party review status: NOT STARTED.**
