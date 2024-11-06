import { useRef } from "react";
import firstScene from "../../assets/img/01.png";
import secondScene from "../../assets/img/02.png";
import thirdScene from "../../assets/img/03.png";
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
  const verticalOffset = 70;
  const scale = progress * (targetScale - 1) + 1;
  const { cards, text } = colorScheme;
  const img = [firstScene, secondScene, thirdScene][i];
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
            className={`text-center m-0 text-[52px] font-space-grotesk font-semibold uppercase`}
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
                color: cards[i],
                border: "none",
                outline: "none",
              }}
              className={`text-center uppercase inline-block mx-auto text-[18px] font-space-grotesk font-semibold px-5 py-2 rounded-full`}
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
          className="flex flex-row relative h-[600px] w-[1000px] rounded-[25px] p-[10px] pb-[40px] origin-top"
        >
          <div className="w-[50%] mx-10 mt-3 flex flex-col items-start  justify-between">
            <h2
              style={{
                color: text[i],
              }}
              className={`m-0 text-[52px] font-space-grotesk font-semibold uppercase leading-[1.1]`}
            >
              {title}
            </h2>
            <div className="flex flex-col items-start pr-10">
              <p
                style={{
                  color: text[i],
                }}
                className={`m-0 text-[14px] font-inter font-normal`}
              >
                {maintext}
              </p>

              <a
                href={link}
                style={{
                  borderColor: text[i],
                  color: text[i],
                  border: "2px solid",
                  outline: "none",
                }}
                className={`text-center uppercase mt-5 text-[18px] font-space-grotesk font-semibold px-5 py-2 rounded-full`}
              >
                {cta}
                <span className="inline-block ml-2">→</span>
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={img} alt="model" />
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
