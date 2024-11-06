import { useRef } from "react";
import firstScene from "../../assets/img/01.png";
import secondScene from "../../assets/img/02.png";
import thirdScene from "../../assets/img/03.png";
import fourthScene from "../../assets/img/04.png";
import fifthScene from "../../assets/img/05.png";
import sixthScene from "../../assets/img/06.png";
import { useContext } from "react";
import { ThreeContext } from "../../routes/_index";
const Card = ({
  i,
  title,
  colorScheme,
  maintext,
  cta,
  link,
  progress,
  targetScale,
  layout,
}) => {
  const contextProps = useContext(ThreeContext);
  const container = useRef(null);
  const cardRef = useRef(null);
  const verticalOffset = 80;
  const scale = progress * (targetScale - 1) + 1;
  const { cards, text } = colorScheme;
  const img =
    layout === "v1"
      ? [firstScene, secondScene, thirdScene][i]
      : [fourthScene, fifthScene, sixthScene][i];
  if (layout === "v1") {
    return (
      <div
        ref={container}
        className="card h-screen flex items-center justify-center sticky top-0"
      >
        <div
          ref={cardRef}
          style={{
            backgroundColor: cards[i],
            top: `calc(-5vh + ${i * verticalOffset}px)`,
            transform: `scale(${scale})`,
          }}
          className="flex flex-col items-center justify-center relative h-[600px] w-[1000px] rounded-[25px] p-[10px] pb-[40px] origin-top"
        >
          <h2
            style={{
              color: text[i],
            }}
            className={`text-center m-0 text-[64px] font-space-grotesk font-semibold uppercase`}
          >
            {title}
          </h2>
          <div className="relative w-[80%]">
            <img src={img} alt="model" />
          </div>
          <div className="flex flex-row justify-between items-start">
            <p
              style={{
                color: text[i],
              }}
              className={`text-left m-0 text-[14px] font-inter font-normal w-[50%] mx-auto`}
            >
              {maintext}
            </p>
            <a
              href={link}
              style={{
                backgroundColor: text[i],
                color: "#F4F4F4",
                border: "none",
                outline: "none",
              }}
              className={`text-center uppercase inline-block mx-auto text-[18px] px-5 py-2 rounded-full`}
            >
              {cta}
              <span className="inline-block ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  if (layout === "v2") {
    return (
      <div
        ref={container}
        className="card h-screen flex items-center justify-center sticky top-0"
      >
        <div
          ref={cardRef}
          style={{
            backgroundColor: cards[i],
            top: `calc(-5vh + ${i * verticalOffset}px)`,
            transform: `scale(${scale})`,
          }}
          className="flex flex-row justify-start relative h-[600px] w-[1000px] rounded-[25px] origin-top"
        >
          <div className=" w-full m-[45px]">
            <h2
              style={{
                color: text[i],
              }}
              className={`text-left text-[96px] leading-[0.8] font-semibold uppercase`}
            >
              {title}
            </h2>
            <p
              style={{
                color: text[i],
              }}
              className={`text-left pt-[16px] text-[14px] font-inter font-normal w-[80%]`}
            >
              {maintext}
            </p>
            <div className="relative flex items-center align-center justify-center mx-auto w-[75%]">
              <img src={img} alt="model" />
            </div>

            <a
              href={link}
              style={{
                backgroundColor: "#3525C1",
                color: "#F4F4F4",
                border: "none",
                outline: "none",
              }}
              className={`text-left flex flex-cols justify-between mt-5 px-5 w-full uppercase text-[18px] py-2 rounded-full`}
            >
              {cta}
              <span className="inline-block ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
