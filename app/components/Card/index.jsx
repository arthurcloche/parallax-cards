import { useTransform, motion /*useScroll*/ } from "framer-motion";
import { useRef } from "react";
// import { Link } from "@remix-run/react";

const Card = ({
  i,
  title,
  //   description,
  //   src,
  //   url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: container,
  //     offset: ["start end", "start start"],
  //   });

  //   const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const verticalOffset = 60;
  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * verticalOffset}px)`,
        }}
        className="flex flex-col relative h-[500px] w-[1000px] rounded-[25px] p-[25px] origin-top"
      >
        <h2 className="text-center m-0 text-[28px] text-[#1D1E1E]">{title}</h2>
      </motion.div>
    </div>
  );
};

export default Card;
