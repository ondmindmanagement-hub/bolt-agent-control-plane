# BOLT Agent Control Plane — Institutional evidence brief

**Date:** 21 November 2026  
**Author and maintainer:** Omar Baró, Unfire (an independent founder-led R&D initiative in Spain)  
**Contact:** hello@unfire.technology  
**Scope:** This page documents the **public MIT-licensed BOLT Agent Control Plane experiment only**. It does not disclose or license Unfire's separate commercial BOLT application, Autonomy Convergence, or Control Vision software.

## Purpose

AI models can propose actions. A model-generated action proposal or claim of approval should not itself grant authority to perform an action. This developer experiment explores a limited, inspectable separation between **untrusted AI suggestions** and **local deterministic policy classification**.

## Implemented in the public repository

- Accept restricted structured action suggestions and validate their types.
- Apply predetermined local policy rules that yield **allow**, **approval_required**, or **deny**.
- Reject unsupported and malformed proposals in accordance with the documented rule set.
- Show the resulting decision as a **read-only report**; the demo does not execute the suggested action.
- Provide a static browser visualizer, local test code and an **optional** inference-to-policy demonstration path.

The current repository README says that the newly connected inference-to-policy path was tested with **mocked model responses**, not a fresh live production inference call. Historical model-playground evidence is separately described.

## Inspectable evidence

- Repository and implementation: https://github.com/ondmindmanagement-hub/bolt-agent-control-plane
- Source map, test instructions and limitations: https://github.com/ondmindmanagement-hub/bolt-agent-control-plane/blob/main/README.md
- Static policy visualizer: https://ondmindmanagement-hub.github.io/bolt-agent-control-plane/
- Public repository MIT license: https://github.com/ondmindmanagement-hub/bolt-agent-control-plane/blob/main/LICENSE

The README documents Node.js 20+ with no third-party npm packages and provides:

```sh
npm test
npm start
```

These instructions describe **how a reviewer can reproduce the local demo**, not independent accreditation. The tests have not been independently rerun as part of this publication.

## Claims that are NOT made

This repository **does not** execute external system tools, send emails, deploy code, modify production customer records or implement real authenticated human approvals. It is **not** a certification of security, privacy, regulatory compliance or accessibility; no enterprise deployment, customer performance gain, revenue, or independent security validation is evidenced by this public experiment. Separate Unfire products must not be treated as the same implementation.

The local decision label `approval_required` is a classification output, **not proof that a human has approved**.

## Suggested evaluation approach

An independent reviewer could create synthetic action proposals covering permitted types, denied types, schema failures, unknown actions and forged model approval claims. On a pinned commit, report each expected and observed decision, the number of false authorizations, unexpected denials, malformed inputs and any differences between the policy and visualizer.

This is **proposed future evaluation work**, not an external evaluation claimed to be complete.

## Short catalogue description (OECD.AI draft, under 80 words)

> BOLT Agent Control Plane is a public, read-only developer experiment from Unfire. It separates AI-generated action suggestions from authority to execute them. A deterministic local policy classifies structured proposals as allowed, requiring human approval, or denied, and displays a report without performing external actions. The repository provides a local demonstration and mock-based tests; it does not implement real human approvals, enterprise deployment or certified AI security.

## Publication, rights and attribution

The existing MIT LICENSE applies to material included in this public repository according to its terms, **not to unpublished Unfire source code or separate proprietary applications**. This is a developer-authored technical note, not a peer-reviewed paper, an OECD accreditation or an EU Commission endorsement. Inclusion in any future external catalogue would require its own submission and review.

Unfire website: https://unfire.technology · Contact: hello@unfire.technology
