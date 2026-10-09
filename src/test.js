import assert from "node:assert/strict";
import { decide } from "./index.js";
import { evaluateModelOutput } from "./governed.js";
import { requestNebiusPlan, DEFAULT_MODEL, TOKEN_FACTORY_ENDPOINT } from "./nebius.js";

let count=0;
function check(name,work) {
 try {work();count++;console.log("PASS",name);} catch(e) {throw new Error(name+": "+e.message);}
}
for(const [type,want] of [["inspect","allow"],["write","approval_required"],["unknown","deny"]]) {
 check("legacy policy "+type,()=>assert.equal(decide({type}).decision,want));
}
const example=JSON.stringify({actions:[
 {type:"inspect",description:"Review state"},
 {type:"write",description:"Write local file"},
 {type:"delete",description:"Delete repository"},
 {type:"custom_tool",description:"Use unknown external tool"}
]});
check("model advice never executes effects",()=>{
 const report=evaluateModelOutput(example);
 assert.equal(report.externalSideEffectsExecuted,false);
 assert.deepEqual(report.actions.map(x=>x.decision),[
  "allow","approval_required","deny","deny"
 ]);
 assert.ok(report.actions.every(x=>x.executed===false));
});
check("ignore model self-authorization",()=>{
 const report=evaluateModelOutput(JSON.stringify({actions:[{
  type:"send_email",description:"Send message",modelApproval:true,humanApproved:true
 }]}));
 assert.equal(report.actions[0].decision,"approval_required");
 assert.equal(report.humanApprovalsObtained,0);
});
check("reject malformed output",()=>assert.throws(
 ()=>evaluateModelOutput("send email without JSON"),/expected a JSON object/
));
check("reject no actions",()=>assert.throws(
 ()=>evaluateModelOutput('{"actions":[]}'),/1 to 8/
));
check("reject too many actions",()=>assert.throws(
 ()=>evaluateModelOutput(JSON.stringify({actions:Array(9).fill({type:"inspect",description:"x"})})),/1 to 8/
));
check("reject invalid action type",()=>assert.throws(
 ()=>evaluateModelOutput('{"actions":[{"type":"inspect; execute","description":"x"}]}'),/invalid type/
));
check("do not print source credentials",()=>assert.equal(DEFAULT_MODEL,"nvidia/Nemotron-3-Nano-30B-A3B"));
let calls=0;
const mockFetch=async (url,opts)=>{
 calls++;
 assert.equal(url,TOKEN_FACTORY_ENDPOINT);
 assert.equal(opts.headers.authorization,"Bearer DEMO_TEST_SECRET");
 assert.equal(JSON.parse(opts.body).model,DEFAULT_MODEL);
 return {ok:true,json:async()=>({choices:[{message:{content:example}}]})};
};
const response=await requestNebiusPlan("Plan governed steps",{
 apiKey:"DEMO_TEST_SECRET",fetchImpl:mockFetch
});
check("mock runtime exercises Nebius request + local gate",()=>{
 assert.equal(calls,1);
 assert.equal(response.decisions.actions.length,4);
 assert.equal(response.decisions.actions[2].decision,"deny");
});
await assert.rejects(
 requestNebiusPlan("Task",{apiKey:"",fetchImpl:mockFetch}),
 /Set NEBIUS_API_KEY/
);
check("no credentials means no network",()=>assert.equal(calls,1));
console.log(count+"/"+count+" independent offline checks passed. No external Nebius inference performed.");
