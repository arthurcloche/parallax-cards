import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

const Canvas = (props) => {
  const canvas = useRef();
  const { model, materials, colorScheme, transform, animateModels } = props;
  console.log(colorScheme);

  useEffect(() => {
    if (!canvas.current) return;
    let currentMeshes = [];
    // Setup scene
    let scene = new THREE.Scene();
    const s = 400;
    const ratio = canvas.current.clientWidth / s;
    const camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 1000);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
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
    directionalLight.position.set(5, 10, 8);
    directionalLight.target.position.set(0, 0, 0);
    camera.add(directionalLight);

    for (let i = 0; i < model.children.length; i++) {
      const object = model.children[i];
      const material = materials[colorScheme][i];
      const mesh = new THREE.Mesh(object.geometry, material);
      mesh.scale.set(
        transform?.scale ?? 1,
        transform?.scale ?? 1,
        transform?.scale ?? 1
      );
      scene.add(mesh);
      currentMeshes.push(mesh);
    }

    scene.add(camera);

    const animate = () => {
      requestAnimationFrame(animate);
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
      cancelAnimationFrame(animate);
      controls.dispose();
      renderer.dispose();
    };
  }, [model, materials, colorScheme, transform, animateModels]);

  return (
    <div className="container">
      <div className="canvas-container">
        <canvas className={props.className} ref={canvas}></canvas>
      </div>
    </div>
  );
};

export default Canvas;
