const endpoint = "https://api.tokenfactory.nebius.com/v1/chat/completions";
const model = process.env.NEBIUS_MODEL || "nvidia/Nemotron-3-Nano-30B-A3B";

const system = "You are the reasoning engine inside BOLT, a governed AI workflow controller. Return a concise JSON plan with explicit risk level and whether human approval is required.";
const user = process.argv.slice(2).join(" ") || "A user asks the agent to summarize a project status, prepare an email draft, and then send the email to a partner. Classify each step as allow, approval_required, or deny, and explain why.";

if (!process.env.NEBIUS_API_KEY) {
  console.error("Set NEBIUS_API_KEY before running this script.");
  process.exit(2);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "authorization": `Bearer ${process.env.NEBIUS_API_KEY}`,
    "content-type": "application/json"
  },
  body: JSON.stringify({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    temperature: 0.2
  })
});

if (!response.ok) {
  throw new Error(`Nebius Token Factory returned ${response.status}: ${await response.text()}`);
}

const data = await response.json();
console.log(data.choices?.[0]?.message?.content ?? JSON.stringify(data, null, 2));
