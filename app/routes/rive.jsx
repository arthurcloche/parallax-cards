import RiveButton from "../components/Rive/Buttons";
import useModels from "../hooks/useModels";
import { useMaterials } from "../hooks/useMaterials";
import { useState } from "react";
import Canvas from "../components/Canvas";

export default function Index() {
  const [selectedModel, setSelectedModel] = useState(0);
  const { models, isLoaded } = useModels();

  const handleClick = (value) => {
    setSelectedModel(value - 1);
  };

  console.log(selectedModel);
  const model = models?.children[selectedModel];
  console.log(model);
  const materials = useMaterials();
  console.log(materials[model?.name]);
  return (
    <main className="flex flex-wrap h-[100vh] bg-[#040404]">
      <RiveButton onClick={handleClick} />
      {isLoaded && model && (
        <Canvas
          id={model.name}
          model={model}
          materials={materials[model?.name]}
        />
      )}
    </main>
  );
}
