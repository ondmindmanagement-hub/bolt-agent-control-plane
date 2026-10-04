export function decide(action, policy = {}) {
  const allow = new Set(policy.allow || ["inspect", "summarize"]);
  const approval = new Set(policy.approval || ["write", "execute"]);
  if (allow.has(action.type)) return { decision: "allow", action };
  if (approval.has(action.type)) return { decision: "approval_required", action };
  return { decision: "deny", action };
}

export function orchestrate(plan, policy) {
  return plan.map((action, i) => ({ step: i + 1, ...decide(action, policy) }));
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const plan = [{type:"inspect"},{type:"summarize"},{type:"execute"}];
  console.log(JSON.stringify(orchestrate(plan), null, 2));
}