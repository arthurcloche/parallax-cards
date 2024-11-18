import { useMemo } from "react";
import * as THREE from "three";

const materials = {
  cap: [
    new THREE.MeshPhongMaterial({
      color: "#049ef4",
      emissive: "#1c2497",
      specular: "#5c5c5c",
      flatShading: true,
      shininess: 25,
      side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
      color: "#f0f",
      flatShading: true,
      shininess: 50,
      side: THREE.DoubleSide,
    }),
  ],

  basketball: [
    new THREE.MeshPhongMaterial({
      color: "#049ef4",
      emissive: "#1c2497",
      specular: "#5c5c5c",
      flatShading: true,
      shininess: 25,
      side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
      color: "#f0f",
      flatShading: true,
      shininess: 50,
      side: THREE.DoubleSide,
    }),
  ],
  chocolate: [
    new THREE.MeshPhongMaterial({
      color: "#049ef4",
      emissive: "#1c2497",
      specular: "#5c5c5c",
      flatShading: true,
      shininess: 25,
      side: THREE.FrontSide,
    }),
    new THREE.MeshPhongMaterial({
      color: "#f0f",
      flatShading: true,
      shininess: 50,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshPhongMaterial({
      color: "#ff0",
      flatShading: true,
      shininess: 50,
      side: THREE.DoubleSide,
    }),
  ],
};

export function useMaterials(materialType = "") {
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
