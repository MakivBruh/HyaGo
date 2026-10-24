import { scenarioSample } from '../data/scenarios.ts';
import type { Scenario } from '../data/scenarios.ts';
export type Point = {hour:number; age:number; temperature:number|null; ph:number|null};
export type Simulation = {temperature:number; ph:number; age:number; connected:boolean; hour:number; tick:number; running:boolean; mode:'manual'|'auto'; scenario:Scenario; history:Point[]; note:string};
export const initialState = ():Simulation => ({temperature:29, ph:6.4, age:0, connected:true, hour:0, tick:0, running:false, mode:'manual', scenario:'stable', history:[{hour:0,age:0,temperature:29,ph:6.4}],note:''});
export type Action = {type:'reset'}|{type:'run';value:boolean}|{type:'mode';value:'manual'|'auto'}|{type:'scenario';value:Scenario}|{type:'note';value:string}|{type:'tick'}|{type:'input';key:'temperature'|'ph'|'age'|'connected';value:number|boolean};
function record(s:Simulation):Simulation { return {...s,history:[...s.history,{hour:s.hour,age:s.age,temperature:s.connected?s.temperature:null,ph:s.connected?s.ph:null}].slice(-240)}; }
export function reducer(s:Simulation,a:Action):Simulation {
 if(a.type==='reset') return initialState();
 if(a.type==='run') return {...s,running:a.value};
 if(a.type==='note') return {...s,note:a.value};
 if(a.type==='mode') return {...s,mode:a.value,running:false,tick:0};
 if(a.type==='scenario') return {...s,scenario:a.value,tick:0,running:false};
 if(a.type==='input') {
  if(s.mode!=='manual') return s;
  const ranges={temperature:[15,55],ph:[2,10],age:[0,Math.max(30,s.age)]};
  if(a.key==='connected') return record({...s,connected:Boolean(a.value),hour:s.hour+1/60});
  if(typeof a.value!=='number'||!Number.isFinite(a.value)) return s;
  const [min,max]=ranges[a.key];
  return record({...s,[a.key]:Math.min(max,Math.max(min,a.value)),hour:s.hour+1/60});
 }
 if(!s.running) return s;
 const tick=s.tick+1;
 return record({...s,...(s.mode==='auto'?scenarioSample(s.scenario,tick):{}),tick,hour:s.hour+6,age:s.age+.25});
}
export function analyze(s:Simulation) {
 if(!s.connected) return {kind:'offline',dt:null,dp:null} as const;
 const current=s.history.at(-1)!;
 const previous=s.history.at(-2);
 if(!previous||previous.temperature===null||previous.ph===null) return {kind:'baseline',dt:null,dp:null} as const;
 const dt=Number((current.temperature!-previous.temperature).toFixed(1));
 const dp=Number((current.ph!-previous.ph).toFixed(1));
 return {kind:Math.abs(dt)>=3||Math.abs(dp)>=.7?'change':'stable',dt,dp} as const;
}

