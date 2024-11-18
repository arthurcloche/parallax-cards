import React, { useRef, useEffect, useState } from 'react';
import { useFrame, } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Model } from './Model';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function Thing() {
  const meshRef = useRef();
  const [loadedTexture, setLoadedTexture] = useState(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.00;
      meshRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/images/round_platform_4k.jpg', (texture) => {
      setLoadedTexture(texture); // Set the loaded texture to the state
    }, undefined, (err) => {
      console.error('An error occurred while loading the texture:', err);
    });
  }, []);


  return (
    <mesh ref={meshRef}>
      {/* Add your GLTF model here */}
      <Model />
      {/* If you want to use the loaded texture somewhere, you can apply it to a material */}
      {loadedTexture && <meshStandardMaterial map={loadedTexture} />}
    </mesh>
  );


}
