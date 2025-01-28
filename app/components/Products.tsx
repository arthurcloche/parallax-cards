import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

import useProductModels from "../hooks/useModels.jsx";

interface ProductProps {
  animated: boolean;
  className: string;
  selected: string;
}

const Product = (props: ProductProps) => {
  const { animated, selected } = props;
  const container = useRef<HTMLDivElement>(null);
  const { productsModels } = useProductModels();

  const models = useMemo(() => {
    if (!productsModels) {
      return {};
    }

    const modelMap: Record<string, THREE.Object3D> = {};
    (productsModels as THREE.Group).children.forEach(
      (model: THREE.Object3D) => {
        if (model.name) {
          modelMap[model.name] = model;
        }
      }
    );

    return modelMap;
  }, [productsModels]);

  useEffect(() => {
    if (!container.current || !models[selected]) {
      return;
    }
    console.log(models, selected);
    // Clear existing canvas
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    let currentModel: THREE.Object3D | null = null;
    const scene = new THREE.Scene();

    const width = 800;
    const height = 800;

    // const ratio = canvasRef.current.clientWidth / canvasRef.current.clientWidth;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    container.current.appendChild(renderer.domElement);
    renderer.setSize(width, height);

    renderer.setPixelRatio(window.devicePixelRatio);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.update();
    renderer.setPixelRatio(window.devicePixelRatio);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 10, 8);
    directionalLight.target.position.set(0, 0, 0);
    camera.add(directionalLight);

    // Replace with selected model
    const model = models[selected].clone();
    scene.add(model);
    currentModel = model;

    // Center and scale model (you might need to adjust these values)
    // const box = new THREE.Box3().setFromObject(model);
    // const center = box.getCenter(new THREE.Vector3());
    // const size = box.getSize(new THREE.Vector3());
    // const maxDim = Math.max(size.x, size.y, size.z);
    // const scale = 30 / maxDim; // Adjust 20 to your needs

    // model.position.sub(center);
    model.scale.multiplyScalar(24);

    scene.add(camera);

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      if (animated) {
        model.rotation.y += 0.005;
      }
      controls.update();
      renderer.render(scene, camera);
      return animationId;
    };
    const handleResize = () => {
      if (!container.current) {
        return;
      }
      const _container = container.current.getBoundingClientRect();
      // Update camera and renderer
      camera.aspect = _container.width / _container.height;
      camera.updateProjectionMatrix();
      renderer.setSize(_container.width, _container.height);
    };

    window.addEventListener("resize", handleResize);
    const animationId = animate();

    return () => {
      if (currentModel) {
        scene.remove(currentModel);
      }
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [container, animated, selected, models]);

  return (
    <div className={props.className}>
      <div className={props.className} ref={container}></div>
      <button
        onClick={() => {
          if (!container.current?.firstChild) return;
          const canvas = container.current.firstChild as HTMLCanvasElement;
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = `product-${selected}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        }}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          padding: "8px 16px",
          background: "#32A228",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default Product;
