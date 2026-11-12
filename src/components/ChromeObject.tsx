'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
function Sculpture(){
 const mesh=useRef<THREE.Mesh>(null);
 useFrame(({clock,pointer})=>{if(!mesh.current)return;mesh.current.rotation.y=clock.elapsedTime*.13+pointer.x*.24;mesh.current.rotation.x=pointer.y*.14+Math.sin(clock.elapsedTime*.25)*.12;});
 return <Float speed={1.1} rotationIntensity={.15} floatIntensity={.35}><mesh ref={mesh} scale={1.45}><torusKnotGeometry args={[1,.32,180,24,2,3]}/><meshPhysicalMaterial color="#a9a9c9" metalness={1} roughness={.13} clearcoat={1} clearcoatRoughness={.08} envMapIntensity={1.8}/></mesh></Float>;
}
export default function ChromeObject(){return <Canvas dpr={[1,1.6]} camera={{position:[0,0,5.5],fov:40}} gl={{alpha:true,antialias:true}}><ambientLight intensity={1.2}/><directionalLight position={[3,4,5]} intensity={3} color="#d9d6ff"/><pointLight position={[-3,-2,2]} intensity={35} color="#9576ff"/><Environment preset="city"/><Sculpture/></Canvas>}
