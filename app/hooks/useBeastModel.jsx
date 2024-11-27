import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { useState, useEffect, useMemo } from "react";
import _models from "../assets/gltfs/mrbeast.glb";

// Cache outside the component to persist between renders
const modelsCache = {
  data: null,
  promise: null,
};

export default function useBeastModel() {
  const [beastModel, setBeastModel] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loader = useMemo(() => {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    gltfLoader.setDRACOLoader(dracoLoader);
    return gltfLoader;
  }, []);

  useEffect(() => {
    if (modelsCache.data) {
      setBeastModel(modelsCache.data);
      setIsLoaded(true);
      return;
    }

    const loadModels = async () => {
      try {
        // If there's already a loading promise, wait for it
        if (modelsCache.promise) {
          const loadedModels = await modelsCache.promise;
          setBeastModel(loadedModels.scene);
        } else {
          // Create new promise and cache it
          modelsCache.promise = loader.loadAsync(_models);
          const loadedModels = await modelsCache.promise;
          modelsCache.data = loadedModels.scene;
          setBeastModel(loadedModels.scene);
        }
      } catch (error) {
        console.error("Error loading models:", error);
        setBeastModel(null);
        modelsCache.promise = null;
      } finally {
        setIsLoaded(true);
      }
    };

    loadModels();
  }, [loader]);

  return { beastModel, isLoaded };
}
