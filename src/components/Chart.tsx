import type { Point } from '../lib/simulation';
import type { Lang } from '../data/science';
import { format } from '../lib/presentation';
export function Chart({points,metric,label,timeLabel,lang}:{points:Point[];metric:'temperature'|'ph';label:string;timeLabel:string;lang:Lang}) {
 const min=metric==='temperature'?15:2,max=metric==='temperature'?55:10;
 const start=points[0]?.hour??0,end=points.at(-1)?.hour??1;
 const x=(hour:number)=>42+(hour-start)/Math.max(end-start,1/60)*516;
 const y=(v:number)=>155-(v-min)/(max-min)*128;
 let path='', gap=true;
 for(const p of points){const v=p[metric];if(v===null){gap=true;continue;}path+=`${gap?'M':'L'}${x(p.hour)},${y(v)} `;gap=false;}
 return <div className="chart"><div className="chart-title"><span className={`legend ${metric}`}/>{label}</div><svg viewBox="0 0 580 200" role="img" aria-label={`${label}, ${timeLabel}: ${format(start,lang,2)}–${format(end,lang,2)}`}>
 {[min,(min+max)/2,max].map(v=><g key={v}><line x1="42" x2="558" y1={y(v)} y2={y(v)} stroke="#3b4556" strokeDasharray="3 5"/><text x="31" y={y(v)+4} textAnchor="end">{v}</text></g>)}
 <path d={path} fill="none" stroke={metric==='temperature'?'#D5F36B':'#B8AAEF'} strokeWidth="2.5" strokeDasharray={metric==='ph'?'6 4':undefined}/>
 {points.map((p,i)=>p[metric]===null?null:<circle key={i} cx={x(p.hour)} cy={y(p[metric]!)} r="2.5" fill={metric==='temperature'?'#D5F36B':'#B8AAEF'}/>)}
 <text x="42" y="181">{format(start,lang,2)}</text><text x="558" y="181" textAnchor="end">{format(end,lang,2)}</text><text x="300" y="197" textAnchor="middle">{timeLabel}</text></svg></div>
}
