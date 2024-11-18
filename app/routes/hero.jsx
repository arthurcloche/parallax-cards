import { useEffect, useState } from "react";
import GUI from "lil-gui";

const layouts = ["v1", "v2"];
const colors = ["#5BC766", "#B6EFFF", "#EB86FF"];

export default function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayout, setActiveLayout] = useState("v2");
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    const gui = new GUI();
    gui
      .add({ layout: "v2" }, "layout", layouts)
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
  const middleHeight = Math.min(80, scrollProgress * 160);
  if (activeLayout === "v1") {
    return (
      <main className="relative h-[150vh] ">
        <div className="sticky top-0 w-full h-[100vh] flex flex-col justify-center items-center">
          <div className="container flex flex-col justify-center items-center">
            <div className="top flex flex-col justify-center items-center">
              <div className="title-words">conquer</div>
              <div className="title-words">your</div>
            </div>
            <div className="middle max-w-[60vw] rounded-xl overflow-hidden bg-orange-200">
              <div
                className="video-container  aspect-[16/9]"
                style={{ height: `${middleHeight}vh` }}
              ></div>
            </div>
            <div className="bottom flex flex-col justify-center items-center">
              <div className="title-words">dream</div>
              <div className="title-words">business</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  if (activeLayout === "v2") {
    return (
      <main className="relative h-full overflow-hidden">
        <div
          className="media h-[50vh]"
          style={{ backgroundColor: activeColor || "#ff0" }}
        ></div>
        <div className="content flex flex-col justify-center p-10 w-full">
          <div className="words-container w-[50vw] title-words-small flex flex-wrap gap-4">
            <span
              className={`inline-block transition-colors ${
                activeColor === colors[0]
                  ? "text-[#5BC766]"
                  : "hover:text-[#5BC766]"
              }`}
              onMouseEnter={() => setActiveColor(colors[0])}
            >
              conquer
            </span>
            <span className="inline-block">your</span>
            <span
              className={`inline-block transition-colors ${
                activeColor === colors[1]
                  ? "text-[#B6EFFF]"
                  : "hover:text-[#B6EFFF]"
              }`}
              onMouseEnter={() => setActiveColor(colors[1])}
            >
              dream
            </span>
            <span
              className={`inline-block transition-colors ${
                activeColor === colors[2]
                  ? "text-[#EB86FF]"
                  : "hover:text-[#EB86FF]"
              }`}
              onMouseEnter={() => setActiveColor(colors[2])}
            >
              business
            </span>
          </div>
          <div
            className="cta-container w-[80%] flex flex-row justify-between border p-2 mt-5 rounded-full"
            style={{ borderColor: activeColor || "currentColor" }}
          >
            <p className="px-[30px] flex items-center">
              Enter your email address
            </p>
            <div className="button-container">
              <button
                className="rounded-full text-black py-3 px-10 transition-colors"
                style={{ backgroundColor: activeColor || "rgb(107 114 128)" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
