/**
 * Real Nebius Token Factory client; requires a legitimate personal API key.
 * Never hardcode or commit credentials. Calls do not execute the AI's proposal.
 */
import { evaluateModelOutput } from "./governed.js";
import { pathToFileURL } from "node:url";

export const TOKEN_FACTORY_ENDPOINT="https://api.tokenfactory.nebius.com/v1/chat/completions";
export const DEFAULT_MODEL="nvidia/Nemotron-3-Nano-30B-A3B";
const SYSTEM = [
 "Return only a JSON object of this exact shape:",
 '{"actions":[{"type":"inspect","description":"Review existing files"}]}',
 "At most 8 actions. Types may include inspect, summarize, draft, write, execute, send_email, deploy, publish, spend, delete.",
 "You are planning; your suggestions do not constitute permission to use tools.",
 "Do not include markdown fences or text outside JSON."
].join("\n");

export async function requestNebiusPlan(task,{
 apiKey=process.env.NEBIUS_API_KEY,
 model=process.env.NEBIUS_MODEL||DEFAULT_MODEL,
 fetchImpl=globalThis.fetch
}={}) {
 if (typeof task!=="string" || task.trim().length===0 || task.length>2000) {
  throw new Error("Expected a nonempty task (max 2000 characters)");
 }
 if (typeof apiKey!=="string" || !apiKey) {
  throw new Error("Set NEBIUS_API_KEY using a private environment variable before live use");
 }
 const response=await fetchImpl(TOKEN_FACTORY_ENDPOINT,{
   method:"POST",
   headers:{"authorization":"Bearer "+apiKey,"content-type":"application/json"},
   body:JSON.stringify({model,messages:[
     {role:"system",content:SYSTEM},
     {role:"user",content:task}
   ],temperature:0.1}),
   signal:AbortSignal.timeout(25000)
 });
 if (!response.ok) throw new Error("Nebius Token Factory inference failed with HTTP "+response.status);
 const payload=await response.json();
 const content=payload?.choices?.[0]?.message?.content;
 if (typeof content!=="string") throw new Error("Nebius response lacked message text");
 return {platform:"Nebius Token Factory",model,rawText:content,decisions:evaluateModelOutput(content)};
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
 const task=process.argv.slice(2).join(" ")||
   "Summarize project status, draft a partner email, then send it.";
 try {
  const result=await requestNebiusPlan(task);
  console.log(JSON.stringify({
   platform:result.platform,model:result.model,
   actualNebiusRuntimeCall:true,
   ...result.decisions
  },null,2));
 } catch(err) {
  console.error("FAIL_CLOSED: "+err.message);
  process.exitCode=2;
 }
}
