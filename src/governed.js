/**
 * Nebius hackathon control plane: LLM text is UNTRUSTED.
 * This code makes decisions only. It never executes local tools or external actions.
 */
import { orchestrate } from "./index.js";

export const KNOWN_ACTIONS = Object.freeze([
 "inspect", "summarize", "draft", "write", "execute", "send_email",
 "deploy", "publish", "spend", "delete"
]);

const FIXED_POLICY = Object.freeze({
 allow:["inspect","summarize","draft"],
 approval:["write","execute","send_email","deploy","publish","spend"]
});

export function evaluateModelOutput(rawText) {
 if (typeof rawText !== "string" || rawText.length > 16384) {
   throw new Error("Untrusted model output: missing or excessive text");
 }
 let parsed;
 try { parsed=JSON.parse(rawText.trim()); } catch {
   throw new Error("Untrusted model output: expected a JSON object");
 }
 if (!parsed || Array.isArray(parsed) || typeof parsed !== "object" ||
     !Array.isArray(parsed.actions) || parsed.actions.length < 1 ||
     parsed.actions.length > 8) {
   throw new Error("Untrusted model output: expected 1 to 8 actions");
 }
 const actions=parsed.actions.map((item,index) => {
   if (!item || Array.isArray(item) || typeof item !== "object" ||
       typeof item.type !== "string" || item.type.length > 40 ||
       typeof item.description !== "string" || item.description.length > 280) {
      throw new Error("Untrusted model output: invalid action at index " + index);
   }
   const type=item.type.trim().toLowerCase();
   if (!/^[a-z_]+$/.test(type)) throw new Error("Untrusted model output: invalid type");
   return {type,description:item.description};
 });
 const decisions=orchestrate(actions,FIXED_POLICY);
 return {
  modelWasUntrusted:true,
  externalSideEffectsExecuted:false,
  humanApprovalsObtained:0,
  note:"Planning/decision-only evidence. Approval-required tasks were not executed.",
  actions:decisions.map(({step,decision,action}) => ({
   step,type:action.type,description:action.description,decision,executed:false,
   reason:decision==="allow" ? "Local allowlist (planning only)" :
     decision==="approval_required" ? "A real human must approve before execution" :
     "Denied: action outside local allowlist"
  }))
 };
}
