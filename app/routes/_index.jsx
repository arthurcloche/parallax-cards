import Card from "../components/Card/Card";
import { useEffect, useRef, useState, createContext } from "react";
import GUI from "lil-gui";
import useModels from "../hooks/useModels";

// Create the context
export const ThreeContext = createContext("onInit");

export const meta = () => {
  return [
    { title: "Parallax Cards" },
    { name: "description", content: "Parallax Cards" },
  ];
};

const colorSchemes = {
  v1: {
    cards: ["#5BC766", "#B6EFFF", "#EB86FF"],
    text: ["#1D1E1E", "#1D1E1E", "#1D1E1E"],
  },
  v2: {
    cards: ["#CEFC17", "#22C357", "#ED6BF8"],
    text: ["#1D1E1E", "#1D1E1E", "#1D1E1E"],
  },
};

const layouts = ["v1", "v2"];

export default function Index() {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { models, isLoaded } = useModels();
  const [activeColorScheme, setActiveColorScheme] = useState("v1");
  const [activeLayout, setActiveLayout] = useState("v1");
  const [activeContext, setActiveContext] = useState("instate");
  useEffect(() => {
    setActiveContext("afterUseEffect");
  }, []);

  useEffect(() => {
    const gui = new GUI();

    gui
      .add({ layout: "v1" }, "layout", layouts)
      .name("Layout")
      .onChange((value) => {
        setActiveLayout(value);
        setActiveColorScheme(value);
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
  if (isLoaded) {
    return (
      <main ref={container} className="relative">
        <ThreeContext.Provider value={activeContext}>
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
        </ThreeContext.Provider>
      </main>
    );
  }
  return null;
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
    title: "Sell On / Offline",
    id: "sell",
    maintext:
      "Shopify’s got you covered with incredible sourcing tools like print-on-demand and dropshipping. Whether you're launching a merch line, setting up an esports store, or starting something new, Shopify makes it easy to manage inventory costs and logistics.",
    cta: "Learn to drive Sales",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
  },
];
