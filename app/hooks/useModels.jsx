import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { useState, useEffect } from "react";
import basketball from "../assets/basketball/basketball-transformed.glb";
import cap from "../assets/cap/cap-transformed.glb";
import chocolate from "../assets/chocolate/Chocolate-transformed.glb";
import earth from "../assets/earth/Earth-transformed.glb";

export default function useModels() {
  const [models, setModels] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
          "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
        );
        gltfLoader.setDRACOLoader(dracoLoader);
        const [basketballModel, capModel, chocolateModel, earthModel] =
          await Promise.all([
            gltfLoader.loadAsync(basketball),
            gltfLoader.loadAsync(cap),
            gltfLoader.loadAsync(chocolate),
            gltfLoader.loadAsync(earth),
          ]);

        setModels({
          basketball: basketballModel,
          cap: capModel,
          chocolate: chocolateModel,
          earth: earthModel,
        });
      } catch (error) {
        console.error("Error loading models:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadModels();
  }, []);

  return {
    models,
    isLoaded,
  };
}
