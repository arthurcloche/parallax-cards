import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

// Add interfaces for the props and config
interface ShapeConfig {
  branches?: number;
  outerRadius: number;
  innerRadius: number;
  wonkiness?: number;
  offset?: number;
  randomIndices?: number[];
}

interface ShapeProps {
  model: "star" | "bolt";
  materials?: THREE.Material; // Replace with proper type if available
  colorScheme?: string;
  transform?: {
    scale?: number;
  };
  animateModels?: boolean;
  className?: string;
}

function computeCurve(points: { x: number; y: number }[]): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      shape.moveTo(points[i].x, points[i].y);
    } else {
      shape.lineTo(points[i].x, points[i].y);
    }
  }
  shape.closePath();
  return shape;
}

function computeShape(shape: "star" | "bolt", config: ShapeConfig) {
  const _points = [];

  if (shape === "star") {
    const {
      branches,
      outerRadius,
      innerRadius,
      wonkiness,
      offset,
      randomIndices,
    } = config;
    const points = branches! * 2;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius =
        i % 2 === 0
          ? outerRadius + wonkiness! * (randomIndices![i] - 0.5) * innerRadius
          : innerRadius;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * (1 + offset!);

      _points.push({ x, y });
    }
  }
  if (shape === "bolt") {
    const { outerRadius, innerRadius } = config;

    _points.push({ x: 0, y: outerRadius * 1.5 });
    _points.push({ x: innerRadius, y: 0 });
    _points.push({ x: innerRadius * 0.25, y: 0.5 });
    _points.push({ x: 0, y: -outerRadius * 1.5 });
    _points.push({ x: -innerRadius, y: 0 });
    _points.push({ x: -innerRadius * 0.25, y: -0.5 });
  }

  return _points;
}

const Shapes = (props: ShapeProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { model, materials, colorScheme, transform, animateModels } = props;
  const randomIndices = useMemo(
    () => Array.from({ length: 32 }, () => Math.random()),
    []
  );

  const curve = useMemo(() => {
    const config = {
      branches: 8,
      outerRadius: 12.5,
      innerRadius: 5,
      wonkiness: 0.9,
      offset: 0,
    };
    return computeCurve(
      computeShape(model, {
        ...config,
        randomIndices,
      })
    );
  }, [model, randomIndices]);

  // Add download function
  const downloadSnapshot = () => {
    if (!canvas.current) return;
    console.log(canvas.current);
    // Convert canvas to data URL
    const dataUrl = canvas.current.toDataURL("image/png");

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.download = `shape-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  useEffect(() => {
    if (!canvas.current) return;
    const currentMeshes: THREE.Mesh[] = [];
    // Setup scene
    const scene = new THREE.Scene();
    const s = 800;
    const ratio = canvas.current.clientWidth / s;
    const camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 1000);
    camera.position.set(0, 0, 75);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.update();
    renderer.setSize(canvas.current.clientWidth, s);

    renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(5, 0, 8);
    directionalLight.target.position.set(0, 0, 0);
    camera.add(directionalLight);

    const length = 12,
      width = 8;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 2,
      depth: 4,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    // console.log(materials);
    const geometry = new THREE.ExtrudeGeometry(curve, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({
      color: "#32A228",
      // emissive: "#51D356",
      specular: "#AAA",
      flatShading: true,
      shininess: 30,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(
      transform?.scale ?? 1,
      transform?.scale ?? 1,
      transform?.scale ?? 1
    );
    mesh.rotation.z = Math.PI * 0.75;
    mesh.position.z = -extrudeSettings.depth * 0.25;
    scene.add(mesh);
    currentMeshes.push(mesh);

    scene.add(camera);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (animateModels) {
        const time = Date.now() * 0.001;
        // First update rotations
        for (let i = 0; i < currentMeshes.length; i++) {
          currentMeshes[i].rotation.x += 0.005;
          currentMeshes[i].rotation.y += 0.005;
          currentMeshes[i].position.y = Math.abs(Math.sin(time * 2) * 0.1);
        }
      }
      controls.update();
      renderer.render(scene, camera);
    };

    // const handleResize = () => {
    //   // camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(800, 800);
    //   controls.update();
    // };

    // window.addEventListener("resize", handleResize);
    animate();

    return () => {
      scene.remove(...currentMeshes);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, [model, materials, colorScheme, transform, animateModels, curve]);

  return (
    <div className="container">
      <div className="canvas-container">
        <canvas className={props.className} ref={canvas}></canvas>
        <button
          onClick={downloadSnapshot}
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
    </div>
  );
};

export default Shapes;
