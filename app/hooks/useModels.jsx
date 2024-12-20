import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { useState, useEffect, useMemo } from "react";
import _models from "../assets/gltfs/models.glb";

// Cache outside the component to persist between renders
const modelsCache = {
  data: null,
  promise: null,
};

export default function useModels() {
  const [models, setModels] = useState(null);
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
      setModels(modelsCache.data);
      setIsLoaded(true);
      return;
    }

    const loadModels = async () => {
      try {
        // If there's already a loading promise, wait for it
        if (modelsCache.promise) {
          const loadedModels = await modelsCache.promise;
          setModels(loadedModels.scene);
        } else {
          // Create new promise and cache it
          modelsCache.promise = loader.loadAsync(_models);
          const loadedModels = await modelsCache.promise;
          modelsCache.data = loadedModels.scene;
          setModels(loadedModels.scene);
        }
      } catch (error) {
        console.error("Error loading models:", error);
        setModels(null);
        modelsCache.promise = null;
      } finally {
        setIsLoaded(true);
      }
    };

    loadModels();
  }, [loader]);

  return { models, isLoaded };
}
