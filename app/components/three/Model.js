import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/robo.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_Groups_366_COMBINED.geometry} material={materials['robo foot']} />
    </group>
  );
}

useGLTF.preload('/robo.glb');
