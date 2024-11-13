import { useRef, useEffect } from "react";
import * as three from "three";

const Canvas = ({ props }) => {
  const canvas = useRef();
  const model = props.model ?? null;

  if (!model) {
    return <div>No Model Found</div>;
  }

  return (
    <div className="container">
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default Canvas;
