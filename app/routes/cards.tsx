import Card from "../components/cards/Card";
// import GUI from "lil-gui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useMemo } from "react";
export const meta = () => {
  return [
    { title: "Parallax Cards" },
    { name: "description", content: "Parallax Cards" },
  ];
};
import AddYourProduct from "~/components/cards/src/AddYourProduct";
import DesignYourStore from "~/components/cards/src/DesignYourStore";
import SellOnSocial from "~/components/cards/src/SellOnSocial";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const container = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // we need to preserve the scenes outside of this rendering branch.
  const productScene = useRef(null);
  const storeScene = useRef(null);
  const socialScene = useRef(null);

  const sceneRefs = useMemo(
    () => [
      { Component: AddYourProduct, ref: productScene },
      { Component: DesignYourStore, ref: storeScene },
      { Component: SellOnSocial, ref: socialScene },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
        scrub: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative w-full">
      <div className="h-[1000px]"></div>
      <div className="cards">
        {cards.map((card, i) => {
          const targetScale = 1 - (1 - i / cards.length) * 0.1;
          const verticalOffset =
            (container.current?.offsetWidth ?? 0) <= 540
              ? 60 + i * 10
              : 120 - i * 10;
          const { Component /*ref*/ } = sceneRefs[i];

          return (
            <Card
              key={`c_${i}`}
              i={i}
              {...card}
              progress={scrollProgress}
              targetScale={targetScale}
              verticalOffset={verticalOffset}
            >
              <Component />
            </Card>
          );
        })}
      </div>
      <div className="h-[1000px]"></div>
    </div>
  );
}

export const cards = [
  {
    title: "Add your product",
    id: "product",
    maintext:
      "Create your own product, or develop products fast with print-on-demand and dropshipping apps that make it easy to get started.",
    cta: "Find your product ",
    link: "https://www.shopify.com/",
  },
  {
    title: "design your store",
    id: "store",
    maintext:
      "Create your store fast with Shopify’s code-free themes. Next, customize your brand’s vibes with our logo maker and name generator tools.",
    cta: "Start your Business",
    link: "https://www.shopify.com/",
  },

  {
    title: "Sell on social",
    id: "social",
    maintext:
      "Easily sell on your customers' preferred platforms at any time with Shopify.",
    cta: "Drive Sales",
    link: "https://www.shopify.com/",
  },
];
