import { useMemo } from "react";
import * as THREE from "three";

const materials = {
  cap: {
    v1: [
      new THREE.MeshPhongMaterial({
        color: "#EB0234",
        emissive: "#EB0234",
        specular: "#5c5c5c",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#3851BB",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
    ],
    v2: [
      new THREE.MeshPhongMaterial({
        color: "#3851BB",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#00b3e3",
        emissive: "#3851BB",
        specular: "#5c5c5c",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
    ],
    v3: [
      new THREE.MeshPhongMaterial({
        color: "#E64783",
        emissive: "#3851BB",
        specular: "#5c5c5c",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#3851BB",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
    ],
  },

  basketball: {
    v1: [
      new THREE.MeshPhongMaterial({
        color: "#00b3e3",
        emissive: "#005971",
        specular: "#aaa",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#222",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
    ],
    v2: [
      new THREE.MeshPhongMaterial({
        color: "#E64783",
        emissive: "#005971",
        specular: "#aaa",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#222",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
    ],
    v3: [
      new THREE.MeshPhongMaterial({
        color: "#ED8D36",
        emissive: "#005971",
        specular: "#aaa",
        flatShading: true,
        shininess: 25,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#222",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
    ],
  },

  chocolate: {
    v1: [
      new THREE.MeshPhongMaterial({
        color: "#672e06",
        emissive: "#663C34",
        specular: "#777",
        flatShading: true,
        shininess: 3,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#E64783",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#ED8D36",
        flatShading: true,
        shininess: 12,
        side: THREE.DoubleSide,
      }),
    ],
    v2: [
      new THREE.MeshPhongMaterial({
        color: "#672e06",
        emissive: "#663C34",
        specular: "#777",
        flatShading: true,
        shininess: 3,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#00b3e3",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#ED8D36",
        flatShading: true,
        shininess: 12,
        side: THREE.DoubleSide,
      }),
    ],
    v3: [
      new THREE.MeshPhongMaterial({
        color: "#672e06",
        emissive: "#663C34",
        specular: "#777",
        flatShading: true,
        shininess: 3,
        side: THREE.FrontSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#00b3e3",
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        color: "#E64783",
        flatShading: true,
        shininess: 12,
        side: THREE.DoubleSide,
      }),
    ],
  },
  shapes: {
    v1: [new THREE.MeshBasicMaterial({ color: 0x00ff00 })],
    v2: [
      new THREE.MeshPhongMaterial({
        color: "#E64783",
        emissive: "#663C34",
        specular: "#777",
        flatShading: true,
        shininess: 3,
        side: THREE.DoubleSide,
      }),
    ],
    v3: [
      new THREE.MeshPhongMaterial({
        color: "#ED8D36",
        emissive: "#663C34",
        specular: "#777",
        flatShading: true,
        shininess: 3,
        side: THREE.DoubleSide,
      }),
    ],
  },
};

type MaterialType = keyof typeof materials;

export function useMaterials(materialType: MaterialType = "" as MaterialType) {
  const materialsList = useMemo(() => {
    // If no material type specified, return all materials
    if (!materialType) {
      return materials;
    }

    // Return specific material group if it exists
    return materials[materialType] || undefined;
  }, [materialType]);

  return materialsList;
}
