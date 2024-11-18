import Canvas from "../components/Canvas";
const _models = ["cap", "basketball", "chocolate"];
const colors = ["#5BC766", "#B6EFFF", "#EB86FF"];
import useModels from "../hooks/useModels";
import useBeastModel from "../hooks/useBeastModel";
import { useMaterials } from "../hooks/useMaterials";
export default function Index() {
  const { models } = useModels();
  const materials = useMaterials();
  const { beastModel } = useBeastModel();
  console.log(beastModel);

  return (
    <main className="bg-[#0a0a0a]">
      <div className="flex items-center justify-center h-full">
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
                animateModels={true}
              />
            </div>
          ))}
      </div>
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Mr Beast Head</h2>
      </div>
      <div className="flex items-center justify-center">
        {beastModel && (
          <Canvas
            model={beastModel}
            className="w-full h-full"
            transform={{ scale: 1.5 }}
            animateModels={false}
          />
        )}
      </div>
    </main>
  );
}
