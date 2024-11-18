import { a, useSpring } from "@react-spring/three";
import { Thing } from "./sceneThing";

function MainScene({ position }) {
  // Define the spring animation
  const props = useSpring({ position });

  return (
    <a.mesh position={props.position}>
      <Thing />
    </a.mesh>
  );
}

export default MainScene;
