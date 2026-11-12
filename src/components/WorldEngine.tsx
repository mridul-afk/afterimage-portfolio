'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props={progress:React.MutableRefObject<number>};
const GOLD=new THREE.Color('#e4b878'), BLUE=new THREE.Color('#28bfff'), GREEN=new THREE.Color('#7cff91');
function Engine({progress}:Props){
 const {camera,pointer,scene}=useThree();
 const rings=useRef<THREE.Group>(null), monolith=useRef<THREE.Mesh>(null), floor=useRef<THREE.Group>(null);
 const current=useRef(0);
 const geometry=useMemo(()=>new THREE.BoxGeometry(1,1,1),[]);
 const material=useMemo(()=>new THREE.MeshStandardMaterial({color:'#d8e5e2',metalness:.9,roughness:.16,emissive:'#174f3a',emissiveIntensity:.14}),[]);
 useFrame(({clock},dt)=>{
  const p=progress.current;
  current.current=THREE.MathUtils.damp(current.current,p,5,dt);
  const t=current.current;
  const segment=t<.34?0:t<.67?1:2;
  const color=segment===0?GOLD:segment===1?BLUE:GREEN;
  scene.background=new THREE.Color('#03070b').lerp(color,.035);
  camera.position.set(pointer.x*.22, pointer.y*.15, 9-t*48);
  camera.rotation.set(-pointer.y*.012,pointer.x*.016,Math.sin(t*Math.PI*2)*.045);
  if(rings.current){rings.current.children.forEach((r,i)=>{
   const mesh=r as THREE.LineSegments;
   const z=8-i*3.5;
   mesh.position.z=z;
   mesh.rotation.z=Math.sin(t*6+i*.24)*.08+(segment===1?t*.35:0);
   (mesh.material as THREE.LineBasicMaterial).color.copy(color);
   (mesh.material as THREE.LineBasicMaterial).opacity=.22+Math.sin(clock.elapsedTime*.5+i)*.08;
  });}
  if(floor.current){floor.current.children.forEach((child)=>{const m=child as THREE.Line;(m.material as THREE.LineBasicMaterial).color.copy(color);});}
  if(monolith.current){monolith.current.rotation.y=clock.elapsedTime*.15+t*5;monolith.current.rotation.x=t*2;monolith.current.position.z=-32-t*8;material.emissive.copy(color).multiplyScalar(.22);}
 });
 const ringsGeometry=useMemo(()=>{
  const g=new THREE.BufferGeometry();const v:number[]=[];
  const s=4.5;
  const pts=[[-s,-s],[s,-s],[s,s],[-s,s]];
  for(let i=0;i<4;i++){const a=pts[i],b=pts[(i+1)%4];v.push(a[0],a[1],0,b[0],b[1],0);}
  g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));return g;
 },[]);
 const gridLines=useMemo(()=>{
  const out:THREE.Vector3[][]=[];
  for(let x=-4;x<=4;x++)out.push([new THREE.Vector3(x,-4,10),new THREE.Vector3(x,-4,-58)]);
  for(let y=-4;y<=4;y++)out.push([new THREE.Vector3(-4,y,10),new THREE.Vector3(-4,y,-58)]);
  return out;
 },[]);
 return <>
  <ambientLight intensity={.65}/><pointLight position={[0,3,-17]} intensity={85} color="#8adfff"/><pointLight position={[-4,-3,-32]} intensity={70} color="#bdff9d"/>
  <group ref={rings}>{Array.from({length:20},(_,i)=><lineSegments key={i} geometry={ringsGeometry} position={[0,0,8-i*3.5]}><lineBasicMaterial transparent opacity={.3} color="#e4b878" toneMapped={false}/></lineSegments>)}</group>
  <group ref={floor}>{gridLines.map((points,i)=><line key={i}><bufferGeometry attach="geometry"><bufferAttribute attach="attributes-position" args={[new Float32Array(points.flatMap(v=>[v.x,v.y,v.z])),3]}/></bufferGeometry><lineBasicMaterial color="#b2ffd0" transparent opacity={.22}/></line>)}</group>
  <mesh ref={monolith} geometry={geometry} material={material} scale={[3,5,.4]} position={[0,0,-32]}/>
  <mesh position={[0,0,-55]}><sphereGeometry args={[3,32,24]}/><meshBasicMaterial color="#d9f7ff" transparent opacity={.06}/></mesh>
 </>;
}
export default function WorldEngine({progress}:Props){return <Canvas dpr={[1,1.5]} gl={{antialias:false,powerPreference:'high-performance'}} camera={{position:[0,0,9],fov:72,near:.1,far:110}}><Engine progress={progress}/></Canvas>}
