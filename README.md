# BOLT Developer Control Plane

**Veles Hack 2026 · Challenge 1 (HYPER-AI): Hyperion — An LLM-Powered Agentic Assistant**

BOLT Developer Control Plane is a governed AI-agent execution layer for developer environments. It turns a natural-language development request into a visible plan, classifies proposed tool actions, pauses for explicit approval on consequential steps, and records the outcome in an auditable log.

## Veles / Hyperion result

The hackathon prototype demonstrates the control loop:

```text
developer request
      |
      v
LLM plan
      |
      v
proposed developer-tool actions
      |
      v
BOLT policy gate
  +--> allow
  +--> approval_required
  +--> deny
      |
      v
approved execution
      |
      v
auditable result
```

The core idea is simple: **reasoning is not authority**. An agent may plan a deployment, file edit, command, publication or other developer action, but BOLT makes consequential side effects explicit and reviewable.

### What the prototype demonstrates

- LLM-driven planning for developer workflows.
- Bounded action classes: `allow`, `approval_required`, and `deny`.
- Human approval before high-impact or irreversible operations.
- Structured results suitable for execution logs and audit trails.
- A provider-agnostic control-plane pattern that can sit between an agent and local, edge or cloud developer tooling.

## Run

```bash
npm start
npm test
```

The public repository contains only the hackathon demo harness, not proprietary BOLT core source.

## Example workflow

Input:

```text
Summarize the project status, prepare an email draft, then send it to the partner.
```

Expected action boundary:

1. summarize project status → `allow`
2. prepare draft → `allow`
3. send external email → `approval_required`

That separation lets an agent stay useful while preserving explicit human control over the external side effect.

## Prior live model evidence

This repository was first created as a clean-room hackathon harness for the Nebius x NVIDIA Global AI Hackathon 2026. A live run using NVIDIA Nemotron-3-Nano-30B-A3B through Nebius Token Factory validated the same control-plane pattern.

The captured result remains in `evidence/nemotron-live-run.json` for reproducibility.

## Why this matters for Hyperion

Developer agents become much more useful when they can operate tools, but the same capability creates risk when execution is silent. BOLT keeps planning fast while placing an explicit boundary around actions such as deploy, delete, overwrite, publish, send, or spend.

This design is particularly suited to edge-to-cloud developer workflows because the control plane can remain independent from the model provider and the target environment.

## License

MIT.

## Team

Omar Baró — Founder, Unfire  
https://unfire.technology
