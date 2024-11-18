'use client'
import React, { useState, useRef } from 'react';
import { Environment, OrbitControls, } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import MainScene from './mainScene';
import RiveButton from '../RiveButton';

export function MainCanvas() {
    const [position, setPosition] = useState([0, 0, 0]); // Initial position of the object

    // Function to handle the jump
    const handleJump = () => {
        setPosition([0, 0.5, 0]); // Set position to a higher value for the jump
        setTimeout(() => setPosition([0, 0, 0]), 300); // Reset position after 500ms
    };

    return (
        <div className="w-[70vw] h-[70dvh] fixed top-0 left-0">
            <Canvas camera={{ fov: 35, position: [0, 0, 5] }}> // Set the FOV and initial camera position
                <Environment files="/images/round_platform_4k.jpg" />
                <directionalLight position={[10, 7, -3.5]} intensity={5} />
                <OrbitControls makeDefault />
                <MainScene position={position} />
            </Canvas>
            <RiveButton onClick={handleJump} />
        </div>
    );
}

const buttonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
};

