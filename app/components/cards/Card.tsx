import { useRef } from "react";

interface CardType {
  i: number;
  title: string;
  maintext: string;
  cta: string;
  link: string;
  progress: number;
  targetScale: number;
  verticalOffset: number;
  children: React.ReactNode;
}

const colorScheme = ["#5BC766", "#B6EFFF", "#EB86FF"];

const Card = ({
  i,
  title,
  maintext,
  cta,
  link,
  progress,
  targetScale,
  children,
  verticalOffset,
}: CardType) => {
  const container = useRef(null);
  const cardRef = useRef(null);
  //   const verticalOffset = 80;
  const scale = progress * (targetScale - 1) + 1;
  const color = colorScheme[i];
  return (
    <div
      ref={container}
      className="card h-screen flex items-center justify-center sticky top-0"
    >
      <div
        ref={cardRef}
        style={{
          backgroundColor: color,
          top: `calc(-${progress * 5}vh + ${i * verticalOffset}px)`,
          transform: `scale(${scale})`,
        }}
        className="flex flex-col items-center justify-center relative h-auto max-w-[1200px] rounded-[25px] p-[0px] pb-[40px] origin-top overflow-hidden"
      >
        <h2 className={`card-title xl-lg w-[80%]`}>{title}</h2>
        <div className="relative children-container">{children}</div>
        <div className="  card-content pt-5">
          <p className={`card-text xs-lg  mx-auto`}>{maintext}</p>
          <a
            href={link}
            className={`card-link xs-lg inline-block mx-auto px-5 py-2 rounded-full`}
          >
            {cta}
            <span className="inline-block ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
