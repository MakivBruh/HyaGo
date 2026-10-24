import type {Lang} from '../data/science';
import {analyze} from './simulation';
import type {Simulation} from './simulation';
export function analysisCopy(s:Simulation,lang:Lang){
 const t=(a:string,b:string)=>lang==='id'?a:b,a=analyze(s);
 const title=a.kind==='offline'?t('Analisis dihentikan','Analysis paused'):a.kind==='change'?t('Perubahan perlu diperiksa','Change needs review'):a.kind==='baseline'?t('Menunggu pembanding','Awaiting comparison'):t('Pola relatif stabil','Relatively stable pattern');
 const text=a.kind==='offline'?t('Sensor demo terputus. Periksa koneksi sebelum menilai kondisi terkini.','Demo sensor disconnected. Check the connection before assessing current conditions.'):a.kind==='change'?t('Perubahan antar pembacaan melewati ambang demo. Periksa sensor, kalibrasi dan catatan proses.','The change between readings exceeds the demo threshold. Check sensors, calibration and process notes.'):a.kind==='baseline'?t('Diperlukan dua pembacaan tersambung berurutan untuk membandingkan tren.','Two consecutive connected readings are needed to compare the trend.'):t('Selisih dua pembacaan terakhir kecil menurut aturan demo. Ini bukan bukti proses berhasil.','The last two readings differ little under demo rules. This does not prove process success.');
 return {...a,title,text};
}
export const format=(v:number,lang:Lang,d=1)=>v.toLocaleString(lang==='id'?'id-ID':'en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
