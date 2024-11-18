// src/components/RiveButton.jsx
import React, { useRef, useEffect } from 'react';
import { Rive, useRive, useStateMachineInput } from '@rive-app/react-canvas';

const RiveButton = ({ onClick }) => {
    const { rive, RiveComponent } = useRive({
        src: '/jump_button.riv', // Replace with the path to your Rive file
        stateMachines: 'State Machine 1', // Replace with your state machine name
        autoplay: true,
    });

    // Get a reference to the input that triggers the animation
    const onHoverInput = useStateMachineInput(rive, 'State Machine 1', 'over'); // Adjust these names accordingly
    const onPressInput = useStateMachineInput(rive, 'State Machine 1', 'click'); // Adjust these names accordingly

    useEffect(() => {
        console.log('RiveComponent:', RiveComponent);
    }, [RiveComponent]);

    return (
        <div
            onMouseEnter={() => onHoverInput && (onHoverInput.value = true)}
            onMouseLeave={() => onHoverInput && (onHoverInput.value = false)}
            onMouseDown={() => onPressInput && (onPressInput.value = true)}
            onMouseUp={() => {
                onPressInput && (onPressInput.value = false);
                onClick();
            }}
            style={{ width: '500px', height: '500px', position: 'absolute', top: '20px', left: '0px', zIndex: 10 }}
        >
            <RiveComponent />
        </div>
    );
};

export default RiveButton;
