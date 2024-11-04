import { useRef } from "react";

const Card = ({ i, title, color }) => {
  const container = useRef(null);
  const cardRef = useRef(null);
  const verticalOffset = 60;

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <div
        ref={cardRef}
        style={{
          backgroundColor: color,
          top: `calc(-5vh + ${i * verticalOffset}px)`,
        }}
        className="flex flex-col relative h-[500px] w-[1000px] rounded-[25px] p-[25px] origin-top"
      >
        <h2 className="text-center m-0 text-[28px] text-[#1D1E1E]">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
