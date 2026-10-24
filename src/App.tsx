import { useEffect, useReducer, useState } from 'react';
import { ArrowUpRight, ArrowRight, Leaf, Radio, FlaskConical, Activity, Menu, X, Globe2, Play } from 'lucide-react';
import { Mark, Plant } from './components/Botanical';
import {Explorer} from './components/Explorer';
import {Dashboard} from './components/Dashboard';
import {Simulator} from './components/Simulator';
import {Process,Architecture,References} from './components/Story';
import { pick } from './data/science';
import type { Lang, Bi } from './data/science';
import { initialState, reducer } from './lib/simulation';
const anchors=['beranda','kandungan','proses','dashboard','simulasi','arsitektur','referensi'];
const nav:Bi[]=[['Beranda','Home'],['Kandungan','Explore'],['Proses','Process'],['Dashboard','Dashboard'],['Simulasi','Simulation'],['Arsitektur','Architecture'],['Referensi','References']];
export default function App(){
 const [lang,setLang]=useState<Lang>('id'); const t=(id:string,en:string)=>lang==='id'?id:en; const p=(v:Bi)=>pick(v,lang);
 const [menu,setMenu]=useState(false),[active,setActive]=useState('beranda');
 const [s,dispatch]=useReducer(reducer,undefined,initialState); const [range,setRange]=useState<'all'|'24'>('all');
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{if(!s.running)return;const timer=window.setInterval(()=>dispatch({type:'tick'}),2000);return()=>clearInterval(timer)},[s.running]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)})},{rootMargin:'-15% 0px -65% 0px'});anchors.forEach(a=>{const el=document.getElementById(a);if(el)observer.observe(el)});return()=>observer.disconnect()},[]);
 function reset(){dispatch({type:'reset'});setRange('all')}
 return <><a className="skip-link" href="#kandungan">{t('Lewati ke eksplorasi','Skip to exploration')}</a>
 <header><div className="nav-shell"><a href="#beranda" className="wordmark" aria-label="HyaGo — Home"><Mark/>HyaGo<span className="brand-dot">✳</span></a><nav id="main-nav" aria-label={t('Navigasi utama','Main navigation')} className={menu?'open':''} onKeyDown={e=>{if(e.key==='Escape'){setMenu(false);document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()}}}>{nav.map((v,i)=><a key={anchors[i]} href={`#${anchors[i]}`} className={active===anchors[i]?'active':''} aria-current={active===anchors[i]?'location':undefined} onClick={()=>setMenu(false)}>{p(v)}</a>)}</nav><div className="nav-actions"><button className="language" onClick={()=>setLang(lang==='id'?'en':'id')} aria-label={t('Switch to English','Ganti ke Bahasa Indonesia')}><Globe2 size={15}/>{lang==='id'?'English':'Indonesia'}</button><button className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" aria-label={t('Buka atau tutup menu','Toggle menu')} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></div></header>
 <main>
 <section className="hero page-width" id="beranda"><div className="hero-copy"><div className="eyebrow"><span className="tiny-dot"/>HyaGo / ECOLOGY MEETS INTELLIGENCE</div><h1>{t('Potensi Baru','New Potential')}<br/>{t('dari','from')} <em>{t('Eceng','Water')}<br/>{t('Gondok.','Hyacinth.')}</em></h1><p className="hero-description">{t('Dari tanaman air, menuju kemungkinan baru. Eksplorasi potensi eceng gondok dan pemantauan proses pengolahannya melalui sensor serta pengembangan AI.','From an aquatic plant to new possibilities. Explore water hyacinth and the monitoring of its processing through sensors and AI development.')}</p><div className="hero-buttons"><a className="button primary" href="#kandungan">{t('Jelajahi Kandungan','Explore the Plant')}<ArrowUpRight size={18}/></a><a className="text-button" href="#simulasi"><span className="play-circle"><Play size={12}/></span>{t('Coba Simulasi','Try Simulation')}</a></div><div className="hero-disclosure"><span className="tiny-dot"/>{t('Prototipe edukasi · Data simulasi · AI dalam pengembangan','Educational prototype · Simulated data · AI in development')}</div></div>
 <div className="hero-art"><div className="orb"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-top"><span></span><span>↗</span></div><Plant label={t('Ilustrasi eceng gondok: bunga ungu, daun, tangkai dan akar serabut','Water hyacinth illustration: violet flowers, leaves, petioles and fibrous roots')}/><div className="art-label flower-label"><span className="label-line"/>{t('Potensi dari alam','Potential from nature')}<span className="label-plus">+</span></div><div className="specimen"><span className="specimen-icon"><Leaf size={18}/></span><div><strong>{t('Eceng gondok','Water hyacinth')}</strong><i>Pontederia crassipes</i></div><span className="specimen-tag">01</span></div><div className="art-bottom"><span>{t('ILUSTRASI BOTANI · BUKAN SKALA UKUR','BOTANICAL ILLUSTRATION · NOT TO SCALE')}</span><span>↓</span></div></div>
 </section>
 <div className="journey page-width"><span className="journey-label">FROM WATER<br/>TO WORTH.</span>{[<Leaf/>,<FlaskConical/>,<Radio/>,<Activity/>].map((icon,i)=><div className="journey-item" key={i}><span className="journey-icon">{icon}</span><span>{p([['Tanaman','Plant'],['Pengolahan','Processing'],['Sensor','Sensors'],['Wawasan Data','Data Insights']][i] as Bi)}</span>{i<3&&<ArrowRight className="journey-arrow" size={16}/>}</div>)}</div>
 <Explorer lang={lang}/><Process lang={lang}/><Dashboard s={s} dispatch={dispatch} lang={lang} range={range} setRange={setRange}/><Simulator s={s} dispatch={dispatch} lang={lang} reset={reset}/><Architecture lang={lang}/><References lang={lang}/>
 </main><footer className="page-width"><div><a href="#beranda" className="wordmark"><Mark/>HyaGo</a><p>From Water to Worth.</p></div><span>{t('Eksplorasi mahasiswa. Kemungkinan untuk masa depan.','A student exploration. Possibilities for the future.')}</span><a href="#beranda" className="back-top" aria-label={t('Kembali ke atas','Back to top')}><ArrowUpRight/></a></footer></>
}

