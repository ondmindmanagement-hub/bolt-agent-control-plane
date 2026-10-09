# BOLT Agent Control Plane

**Nebius x NVIDIA Global AI Hackathon 2026 — existing Devpost submission**

BOLT Agent Control Plane is an open-source developer-workflow experiment from Omar Baró / Unfire. It separates an AI model's proposed actions from authority to execute them: the language model proposes, and a fixed local policy decides whether a proposed action is allowed, needs human approval, or is denied. **This public experiment does not execute system tools, send emails, deploy code or grant actual human approvals.**

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
- Existing video: demo/BOLT_Developer_Control_Plane_Demo.mp4, 48 seconds, NOT a new live integrated Token Factory session.
- No enterprise deployment, production-grade auditing, operating-system side-effect execution, real human approvals, financial savings or independently validated customer security are claimed.

**Eligibility:** Nebius x NVIDIA rules require the project to actually use Nebius inference or compute with an open NVIDIA model, plus a working demo, video, public repository/license and feedback. The new Node integration still needs a genuine account-authorized live test. Review/update the **existing submission**, not another one, by 30 October 2026, 10:00 PDT.

## Related Veles prototype

This repo also hosts historical work for the Veles Hyperion challenge (VELES_RESULTS.md and PITCH.md). This is separate from Nebius requirements, and does not mean any Veles result satisfies the Nebius model/inference rule.

## Rights and provenance

MIT license applies to this public clean-room repository only, not Unfire's separate proprietary BOLT macOS software. Work used AI-assisted code and writing; no claim of exclusively human-created material.

Contact: hello@unfire.technology | https://unfire.technology
