# Fictional banking-workflow policy review — PUBLIC RESEARCH ONLY

**Unfire / BOLT Agent Control Plane · 21 November 2026**  
**Status:** Maintainer-authored test fixture, **not** a bank integration, independent validation, financial-services certification or customer endorsement.

This file accompanies the existing public, MIT-licensed, **read-only** action-policy classifier. The banking context is fictional; no bank, account, employee, financial transaction or live customer system was accessed.

## One-command reproduction

On the repository's actual current source, verify your exact Git commit before testing:

```bash
node --version                 # Node.js 20+
git rev-parse HEAD             # Record exact source commit
npm test                       # Existing repo checks; uses no paid model
npm run review:offline < examples/banking-fictional-cases.json
```

No npm install or live Nebius API is needed. Do **not** run `npm run nebius` for this test; it is unrelated to the offline reproducibility check and may make a paid API call. The bank example is an additional fixture, not a new execution feature.

## Maintainer-authored demonstration

The fixture contains **36 entirely invented proposals** whose expected classifications were written by the same developer who prepared the fixture. In an isolated local Node.js 22 exercise on 21 November 2026, **36/36** matched those labels, **8** were intentionally malformed and rejected, **0** actions executed, and **0** authenticated human approvals took place. The developer also ran 11 separate local packaging/boundary tests, but those tests belong to a distinct local bundle and are **not added to the repository by this patch**. Do not call these numbers an independent evaluation or a quantitative performance result.

Labels mean **only**:

| Label | What the demo does | What the demo does NOT do |
| --- | --- | --- |
| `allow` | Lists a locally permitted *type* for hypothetical action | Authorize an account user or execute any action |
| `approval_required` | Marks a type that a real system would need to approve | Verify a real human identity, credential or sign-off |
| `deny` | Marks a type outside a fixed allowlist | Stop a production system, reverse a payment or block a real tool |
| `reject` | Rejects malformed proposed input | Validate real bank data or verify legal compliance |

**Important negative/control observations:** The classifier does not parse euro amounts or account ownership; `inspect` is allowed by action *type* even when descriptions mention potentially sensitive material; `stop` is an unknown action that is **denied as a label**, not a working emergency STOP; and forged `humanApproved` flags do not become genuine human authorization. These limitations are essential to the claimed scope and must not be obscured.

No customer data, credentials, payment connectors, transaction permission, audit persistence, cryptographic event integrity, money movement, identity-backed approval, crash-safe state, side-effect idempotence, real STOP/rollback or DORA compliance is demonstrated. Commercial Bolt macOS and Unfire Autonomy are **outside the scope** of this public research test.

## Challenge to an *independent* reviewer

1. Read the public [reproduction protocol](INDEPENDENT_REPRODUCTION_PROTOCOL.md) and audit `src/index.js`, `src/governed.js`, and `src/review.js` first.
2. Before executing, create at least **12 entirely new fictional cases** and **predeclare** your expected classifications independently. Do not merely repeat these 36 developer-authored examples.
3. Include unknown types, misleading descriptions, malformed input, purported human approval, high-impact simulated actions, unusual Unicode and contradictions. Never include real personal or financial data.
4. Record the exact source commit, Node.js version, raw command outputs, matches **and failures**, any unexpected rejections, and the absent features mentioned above.
5. Share only a non-sensitive written verdict via [the existing reviewer issue](https://github.com/ondmindmanagement-hub/bolt-agent-control-plane/issues/2) or `hello@unfire.technology`. Report potentially exploitable concerns privately by email rather than publishing confidential details. Review is voluntary, free, remote and does not imply formal sponsorship or certification.

## Version and provenance

This file is a proposed **additive** research fixture, not a new application release. It was prepared against public `main` observed at `9a7285658c80d3ad71b9049bbc7c935a752db05e` on 21 November 2026. Verify the current HEAD when applying the patch; never assume the target branch has not advanced. No Unfire proprietary source is included.

**Source/license:** [BOLT Agent Control Plane](https://github.com/ondmindmanagement-hub/bolt-agent-control-plane) (MIT) · Contact `hello@unfire.technology`.
