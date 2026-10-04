# BOLT Agent Control Plane

Hackathon prototype for governed AI-agent execution built for the **Nebius x NVIDIA Global AI Hackathon 2026**.

The project demonstrates a small control layer that receives planned agent actions and classifies them as:

- `allow`
- `approval_required`
- `deny`

This public repository contains only the hackathon demo harness, not proprietary BOLT core source.

## NVIDIA Nemotron + Nebius Token Factory

The prototype uses **NVIDIA Nemotron-3-Nano-30B-A3B** through **Nebius Token Factory** as the reasoning layer for policy-aware workflow classification.

A live run was validated in Nebius Token Factory Playground on 2026-10-04. For the test workflow:

1. summarize a project status → `allow`
2. prepare an email draft → `allow`
3. send the email to a partner → `approval_required`

Observed playground performance for that run:

- time to first token: ~168 ms
- total generation: ~2.9 s
- throughput: ~183.2 tokens/s

The captured result is stored in `evidence/nemotron-live-run.json`.

## Run local policy harness

```bash
npm start
npm test
```

## Run with Nebius Token Factory

Create a Nebius Token Factory API key and keep it only in your environment:

```bash
export NEBIUS_API_KEY="..."
npm run nebius -- "Summarize a status, draft an email, then send it."
```

The integration uses Nebius' OpenAI-compatible chat-completions endpoint and defaults to the NVIDIA Nemotron model used in the validated live run.

## Architecture

```
user request
   |
   v
NVIDIA Nemotron on Nebius Token Factory
   |
   v
structured workflow/risk classification
   |
   v
BOLT policy gate
   +--> allow
   +--> approval_required
   +--> deny
```

## Why this project

Agentic systems become more useful when they can reason about multi-step actions while preserving explicit human authority over consequential actions. The prototype separates model reasoning from the final execution decision and keeps external side effects behind a policy or approval boundary.

## License

MIT.

## Team

Omar Baró — Founder, Unfire  
https://unfire.technology
