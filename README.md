# BOLT Agent Control Plane

**Public research · 21 November 2026 · MIT-licensed read-only experiment**

A small, inspectable prototype that separates an AI model's *proposal* from permission to act. Its local, deterministic policy classifies structured proposed actions as **allow**, **approval_required** or **deny**, and outputs a **read-only report**. It does not execute external actions, grant authenticated human approvals, or demonstrate production-grade security.

**Start here:** [Try the static policy visualizer](https://ondmindmanagement-hub.github.io/bolt-agent-control-plane/) · [Inspect the fixed 21 November research release](https://github.com/ondmindmanagement-hub/bolt-agent-control-plane/releases/tag/v0.1.0-research-20261121) · [Read the evidence brief](docs/INSTITUTIONAL_EVIDENCE_BRIEF.md) · [Independent reproduction protocol](docs/INDEPENDENT_REPRODUCTION_PROTOCOL.md).

**Reproduce offline (Node.js 20+):** `npm test`. Current `main` additionally offers a synthetic reviewer-challenge CLI: `npm run review:offline < examples/reviewer-cases.json`; that CLI is **not** part of the fixed release. No paid model provider is needed for offline review; the separate, optional live inference route may incur provider charges. The example cases and tests were prepared by the maintainer, not independently certified. Do not enter customer, personal or confidential data.

**Maturity and rights:** This is one public research repository from Omar Baró / Unfire, an independent founder-led R&D initiative in Spain. No independent endorsement, production deployment, revenue impact or compliance certification is claimed. The MIT license applies to **this repository only**, not Unfire's separately developed proprietary apps.

BOLT Agent Control Plane is an open-source developer-workflow experiment from Omar Baró / Unfire. It separates an AI model's proposed actions from authority to execute them: the language model proposes, and a fixed local policy decides whether a proposed action is allowed, needs human approval, or is denied. **This public experiment does not execute system tools, send emails, deploy code or grant actual human approvals.**

## Historical competition context (October 2026)

**Nebius x NVIDIA Global AI Hackathon 2026 — existing Devpost submission.**

> **State as of 9 October 2026:** Devpost acknowledged an initial submission on 4 October. This repository was subsequently adapted for Veles Hack (see VELES_RESULTS.md). The original source had an isolated Nebius request script and a separate local policy gate. This update connects the Nebius response with the policy gate in code. We tested this new connection using mock API responses, **not a new live Nebius inference call**. Evidence from a previous Nemotron Playground session is historical.

## Data flow

    Human task
        |
        v
    NVIDIA Nemotron via Nebius Token Factory (only when a private API key is supplied)
        |
        v
    Suggested JSON actions (UNTRUSTED)
        |
        v
    BOLT deterministic policy gate
       / | \
    allow  approval_required  deny
        |
        v
    Read-only report. NO external actions executed.

## Source map

- src/nebius.js: Optional REAL HTTPS inference request via Nebius Token Factory, then deterministic policy review.
- src/governed.js: Parses and validates untrusted suggestions. Model-generated approval claims are ignored. Unknown actions are denied.
- src/index.js: Simple provider-independent action classifier, retains offline legacy demo.
- src/test.js: Local test suite and fake-request tests; no paid inference.
- docs/index.html: Hosted offline policy visualizer, not a live Nemotron browser demonstration.
- evidence/nemotron-live-run.json: Historical Nebius Playground run dated 4 October, NOT a test of the new Node runtime.

## Run

Requires Node.js 20 or newer. No third-party npm packages.

    npm test
    npm start

For OPTIONAL live model inference using your own authorized key, which can incur usage charges:

    export NEBIUS_API_KEY="YOUR_PRIVATE_KEY"
    npm run nebius -- "Inspect status, prepare a draft, then send the email"

The default model name is nvidia/Nemotron-3-Nano-30B-A3B. Override with NEBIUS_MODEL if actually supported by your Nebius Token Factory account. Never commit API keys. No new live inference was made while preparing these updates.

The model must return a limited JSON actions array. Invalid output or a missing key causes a failure; unknown action types are denied. A model response, even if valid, cannot carry out any approval-required action: this demonstration has no tool execution backend.

## Demo, evidence and limitations

- Earlier historical live use: Nemotron model via Nebius Token Factory Playground, documented in evidence/nemotron-live-run.json.
- Newly connected Node inference-to-policy code: validated through mocked inference response and fail-closed unit tests only.
- Offline browser demonstration: https://ondmindmanagement-hub.github.io/bolt-agent-control-plane/
- **Updated video (28 October):** [BOLT Nebius × NVIDIA evidence walkthrough, 85 seconds](docs/BOLT_Nebius_NVIDIA_2026_Evidence_Demo.mp4), published via the GitHub Pages demo. This caption-led, silent demonstration uses real screenshots of the current offline browser visualizer, validated local tests and separately labeled historical Nemotron Playground evidence. It makes **no** claim of a new live Node.js inference.
- Existing video: demo/BOLT_Developer_Control_Plane_Demo.mp4, 48 seconds, NOT a new live integrated Token Factory session.
- No enterprise deployment, production-grade auditing, operating-system side-effect execution, real human approvals, financial savings or independently validated customer security are claimed.

**Eligibility:** Nebius x NVIDIA rules require the project to actually use Nebius inference or compute with an open NVIDIA model, plus a working demo, video, public repository/license and feedback. The new Node integration still needs a genuine account-authorized live test. The 30 October 2026, 10:00 PDT deadline has passed; this paragraph records historical competition eligibility and is not a current submission invitation.

## Related Veles prototype

This repo also hosts historical work for the Veles Hyperion challenge (VELES_RESULTS.md and PITCH.md). This is separate from Nebius requirements, and does not mean any Veles result satisfies the Nebius model/inference rule.

## Independent reproduction invitation

Researchers may reproduce the fixed public experiment using the [independent evaluation protocol](docs/INDEPENDENT_REPRODUCTION_PROTOCOL.md), which includes synthetic test categories, a reviewer reporting template and clear safety/rights limitations. This is an **invitation, not independent validation**. Voluntary no-cost feedback can be shared via GitHub issues or written email, without calls or proprietary code access.

## Institutional evidence and reproducibility

An [institutional evidence brief](docs/INSTITUTIONAL_EVIDENCE_BRIEF.md) describes this
public read-only experiment, its reproducibility steps, limitations and suggested
independent evaluation protocol. The brief can be cited in research or catalogue
submissions **without suggesting independent certification, OECD/EU endorsement or
rights over Unfire's separate proprietary applications**.

GitHub's **Cite this repository** function is supported through `CITATION.cff`.
No DOI or journal peer review is claimed.

## Rights and provenance

MIT license applies to this public clean-room repository only, not Unfire's separate proprietary BOLT macOS software. Work used AI-assisted code and writing; no claim of exclusively human-created material.

Contact: hello@unfire.technology | https://unfire.technology

## Reviewer-defined fictional challenges (offline)

Researchers can run their OWN invented action proposals against this read-only
policy without editing source code or connecting to a model provider. With
Node.js 20 or newer:

    npm run review:offline < examples/reviewer-cases.json

The seven supplied example cases and their expectations were created by the
maintainer and are NOT independent ground truth. Create a separate JSON file
following the same structure with 1 to 50 cases, distinct case IDs, up to 64 KiB
of UTF-8 input, and optional expected arrays of allow, approval_required or
deny, or expected equal to reject. Write the expectations BEFORE viewing the
output. Cases without expected labels are marked unscored.

Results contain only case IDs, observed classification, mismatches and explicit
no-execution/no-approval indicators. Original proposal descriptions are omitted
from the output to reduce unnecessary disclosure, but this is NOT a privacy
filter: never provide real personal, customer or confidential information.

This helper runs the same deterministic local classifier as the public demo.
It does not authenticate an evaluator, execute an external action, contact
Nebius, check semantic safety or provide audit-grade verification. See the
independent reproduction protocol in docs/INDEPENDENT_REPRODUCTION_PROTOCOL.md.
No private Unfire applications are included.
