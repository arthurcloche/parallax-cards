import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import GUI from "lil-gui";
import useModels from "../hooks/useModels";
export const meta = () => {
  return [
    { title: "Parallax Cards" },
    { name: "description", content: "Parallax Cards" },
  ];
};

const colorSchemes = {
  v1: {
    cards: ["#B1F8FF", "#DDFF9E", "#6482FF"],
    text: ["#1D1E1E", "#1D1E1E", "#F4F4F4"],
  },
  v2: {
    cards: ["#DDFF9E", "#B1F8FF", "#486AF8"],
    text: ["#1D1E1E", "#1D1E1E", "#F4F4F4"],
  },
  v3: {
    cards: ["#5BC766", "#B6EFFF", "#EB86FF"],
    text: ["#1D1E1E", "#1D1E1E", "#1D1E1E"],
  },
};

const layouts = ["v1", "v2"];

export default function Index() {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { models, isLoading } = useModels();
  console.log(models, isLoading);

  const [activeColorScheme, setActiveColorScheme] = useState("v1");
  const [activeLayout, setActiveLayout] = useState("v1");

  useEffect(() => {
    const gui = new GUI();
    gui
      .add({ colorScheme: "v1" }, "colorScheme", ["v1", "v2", "v3"])
      .name("Color Scheme")
      .onChange((value) => {
        setActiveColorScheme(value);
      });
    gui
      .add({ layout: "v1" }, "layout", layouts)
      .name("Layout")
      .onChange((value) => {
        setActiveLayout(value);
      });
    return () => gui.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main ref={container} className="relative">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <Card
            key={`c_${i}`}
            i={i}
            {...card}
            colorScheme={colorSchemes[activeColorScheme]}
            layout={activeLayout}
            progress={scrollProgress}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}

export const cards = [
  {
    title: "Build Your Brand",
    id: "brand",
    maintext:
      "Shopify’s got you covered with incredible sourcing tools like print-on-demand and dropshipping. Whether you're launching a merch line, setting up an esports store, or starting something new, Shopify makes it easy to manage inventory costs and logistics.",
    cta: "Start your Business ",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
  },
  {
    title: "Pick Your Product",
    id: "product",
    maintext:
      "Shopify’s got you covered with incredible sourcing tools like print-on-demand and dropshipping. Whether you're launching a merch line, setting up an esports store, or starting something new, Shopify makes it easy to manage inventory costs and logistics.",
    cta: "Find Products to Sell",
    link: "https://www.shopify.com/",
  },

  {
    title: "Sell On/Offline",
    id: "sell",
    maintext:
      "Shopify’s got you covered with incredible sourcing tools like print-on-demand and dropshipping. Whether you're launching a merch line, setting up an esports store, or starting something new, Shopify makes it easy to manage inventory costs and logistics.",
    cta: "Learn to drive Sales",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
  },
];
