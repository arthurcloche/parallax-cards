import { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import Beasthead from "../components/Beasthead";
import Shapes from "../components/Shapes";
import useModels from "../hooks/useModels";
import GUI from "lil-gui";
import { useMaterials } from "../hooks/useMaterials";

const layouts = ["v1", "v2", "v3"];
const shapes = ["star", "star", "bolt"];

export default function Index() {
  // const { models } = useModels();
  // const materials = useMaterials();
  // const [colorScheme, setColorScheme] = useState("v1");
  useEffect(() => {
    const gui = new GUI();
    gui
      .add({ layout: "v1" }, "Color Scheme", layouts)
      .name("Color Scheme")
      .onChange((value) => {
        setColorScheme(value);
      });
    return () => gui.destroy();
  }, []);
  return (
    <main className="bg-[#0a0a0a]">
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Mr Beast</h2>
      </div>
      <div className="flex items-center justify-center">
        <Beasthead
          className="w-full h-full"
          transform={{ scale: 2.5 }}
          animateModels={false}
        />
      </div>
    </main>
  );
}
