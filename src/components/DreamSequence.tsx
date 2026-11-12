'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const WorldEngine=dynamic(()=>import('./WorldEngine'),{ssr:false});
const worlds=[
 {number:'01',title:'THE THRESHOLD',tag:'ANALOG MEMORY / 2001',copy:'A world of strange architecture, nostalgia, and impossible perspectives.'},
 {number:'02',title:'THE TRANSMISSION',tag:'SOFT CLUB / DIGITAL DREAM',copy:'Light bends. The interface disappears. Curiosity becomes a place.'},
 {number:'03',title:'THE MACHINE',tag:'SYSTEM ONLINE / REALTIME',copy:'Beyond the surface: graphics, kernels, mathematics, and the machinery underneath.'}
];
export default function DreamSequence(){
 const wrap=useRef<HTMLElement>(null),progress=useRef(0);
 const [scene,setScene]=useState(0),[reduced,setReduced]=useState(true);
 useEffect(()=>{
  const el=wrap.current;if(!el)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setReduced(motion);
  if(motion)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   const q=gsap.utils.selector(el);
   const timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:el,start:'top top',end:'+=430%',pin:true,scrub:1.1,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{progress.current=self.progress;setScene(Math.min(2,Math.floor(self.progress*3)));}}});
   timeline.fromTo(q('.world-analogue'),{opacity:.9,scale:1},{opacity:0,scale:1.7,rotate:-7,duration:.9},0)
    .fromTo(q('.world-blue'),{opacity:0,scale:1.2},{opacity:.72,scale:1,duration:.65},.7)
    .to(q('.world-blue'),{opacity:0,scale:1.7,rotate:6,duration:.7},1.7)
    .fromTo(q('.world-green'),{opacity:0,scale:1.3},{opacity:.5,scale:1,duration:.8},1.9)
    .to(q('.world-green'),{opacity:0,duration:.6},2.85);
   q('.dream-caption').forEach((caption,i)=>{
    const at=i===0?0:i===1?1.05:2.2;
    timeline.fromTo(caption,{opacity:0,y:95,scale:.9},{opacity:1,y:0,scale:1,duration:.35},at)
      .to(caption,{opacity:0,y:-85,scale:1.1,duration:.35},at+.68);
   });
   timeline.fromTo(q('.dream-exit'),{opacity:0,y:90},{opacity:1,y:0,duration:.45},3.1);
   timeline.to(q('.dream-exit'),{opacity:1,duration:.4},3.55);
  },el);
  return()=>ctx.revert();
 },[]);
 return <section className="dream-sequence world-sequence" ref={wrap} aria-label="Scroll through a cinematic 3D world">
  <div className="world-webgl" aria-hidden="true">{!reduced&&<WorldEngine progress={progress}/>}</div>
  <div className="world-overlay world-analogue" aria-hidden="true"/>
  <div className="world-overlay world-blue" aria-hidden="true"/>
  <div className="world-overlay world-green" aria-hidden="true"/>
  <div className="world-crosshair" aria-hidden="true">+ &nbsp; + &nbsp; +</div>
  <div className="dream-vignette" aria-hidden="true"/>
  <div className="dream-topline"><span>AFTERIMAGE / REALTIME WORLD ENGINE</span><span>SCROLL = CAMERA MOVEMENT ↓</span></div>
  {worlds.map((world,i)=><div className={'dream-caption dream-caption-'+i} key={world.number}><span className="dream-overline">WORLD {world.number} / {world.tag}</span><h2>{world.title}</h2><p>{world.copy}</p></div>)}
  <div className="dream-exit"><span>THE CAMERA STOPS. THE QUESTIONS DON'T.</span><h2>WELCOME TO<br/><em>MY WORLD.</em></h2></div>
  <div className="dream-bottomline"><span>RENDERED IN REAL TIME / WEBGL</span><span className="dream-dots" aria-label={'Current world '+(scene+1)}>{worlds.map((w,i)=><i key={w.number} className={scene===i?'is-active':''}/>)}</span><span>001 — 003</span></div>
 </section>;
}
