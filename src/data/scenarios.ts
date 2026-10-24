export type Scenario = 'stable' | 'sudden' | 'offline';
export const scenarios = [
 {id:'stable' as const, name:['Pola relatif stabil','Relatively stable pattern']},
 {id:'sudden' as const, name:['Perubahan mendadak','Abrupt change']},
 {id:'offline' as const, name:['Gangguan sensor','Sensor interruption']},
];
export function scenarioSample(scenario: Scenario, tick: number) {
 const disturbance = scenario === 'sudden' && tick >= 3 ? 8 : 0;
 return {temperature: Math.round((29 + Math.sin(tick / 3) * .6 + disturbance)*10)/10,
 ph:Math.round((6.4 - Math.min(tick,20)*.015 - disturbance*.12)*10)/10,
 connected: !(scenario === 'offline' && tick >= 3 && tick <= 6)};
}
