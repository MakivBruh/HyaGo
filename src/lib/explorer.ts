import type {ChemistryId} from '../data/chemistry.ts';
import {journeys} from '../data/journeys.ts';
import type {JourneyId} from '../data/journeys.ts';
export type ExplorerState={organ:number;level:number;material:ChemistryId;depth:'brief'|'deep';context:'poc'|'compost';journey:JourneyId;stage:number;replay:number};
export const initialExplorer:ExplorerState={organ:0,level:0,material:'cellulose',depth:'brief',context:'poc',journey:'carbon',stage:0,replay:0};
export type ExplorerAction={type:'organ';value:number}|{type:'level';value:number}|{type:'material';value:ChemistryId}|{type:'depth';value:ExplorerState['depth']}|{type:'context';value:ExplorerState['context']}|{type:'journey';value:JourneyId}|{type:'stage';value:number}|{type:'play'}|{type:'repeat'};
export function explorerReducer(s:ExplorerState,a:ExplorerAction):ExplorerState{
 switch(a.type){
 case 'organ':return {...s,organ:Math.max(0,Math.min(2,a.value)),level:1};
 case 'level':return {...s,level:Math.max(0,Math.min(4,a.value))};
 case 'material':return {...s,material:a.value,level:2};
 case 'depth':return {...s,depth:a.value};
 case 'context':return {...s,context:a.value};
 case 'journey':{const j=journeys.find(j=>j.id===a.value)!;return {...s,journey:a.value,material:j.material,level:3,stage:0,replay:0};}
 case 'stage':return {...s,stage:Math.max(0,Math.min(journeys.find(j=>j.id===s.journey)!.stages.length-1,a.value)),replay:0};
 case 'play':return {...s,replay:s.replay+1};
 case 'repeat':return {...s,stage:0,replay:0};
 }
}
