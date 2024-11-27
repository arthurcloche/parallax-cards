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
  const { models } = useModels();
  const materials = useMaterials();
  const [colorScheme, setColorScheme] = useState("v1");
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
      {/* <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Models</h2>
      </div>

      <div className="flex flex-row h-full">
        {models &&
          models.children.map((child) => (
            <div key={child.name} className="w-1/3">
              <Canvas
                model={child}
                materials={materials[child.name]}
                className="w-full h-full"
                transform={{ scale: 1.0 }}
                animateModels={false}
                colorScheme={colorScheme}
              />
            </div>
          ))}
      </div>
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
      */}
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Shapes</h2>
      </div>

      <div className="flex flex-row h-full">
        {shapes.map((child, i) => (
          <div key={`${child}+${i}`} className="w-1/3">
            <Shapes
              model={child}
              materials={materials["shapes"]}
              className="w-full h-full"
              transform={{ scale: 0.5 }}
              animateModels={false}
              colorScheme={colorScheme}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
