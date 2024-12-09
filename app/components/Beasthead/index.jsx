import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useBeastModel from "../../hooks/useBeastModel";

const helper = {
  normalize: (val) => val * 0.5 + 0.5,
  expand: (val) => val * 2.0 - 1.0,
  ease: (val) => (val < 0.5 ? 2 * val * val : -1 + (4 - 2 * val) * val),
};
//entry point
const Beasthead = (props) => {
  const canvas = useRef();
  const { transform } = props;
  const { beastModel } = useBeastModel();
  const mouse = useRef({ x: 0, y: 0 });
  const targetQuaternion = useRef(new THREE.Quaternion());
  const startQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (!canvas.current || !beastModel) return;
    let currentMeshes = [];
    let scene = new THREE.Scene();
    // fixed height for debug
    const s = 800;
    const ratio = canvas.current.clientWidth / s;
    const camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 1000);
    camera.position.z = 4;
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
    directionalLight.position.set(5, 10, 10);
    directionalLight.target.position.set(0, 0, 0);
    camera.add(directionalLight);

    for (let i = 0; i < beastModel.children.length; i++) {
      for (let j = 0; j < beastModel.children[0].children.length; j++) {
        const object = beastModel.children[0].children[j];
        const material = object.material;
        const mesh = new THREE.Mesh(object.geometry, material);
        mesh.scale.set(
          transform?.scale ?? 1,
          transform?.scale ?? 1,
          transform?.scale ?? 1
        );
        scene.add(mesh);
        currentMeshes.push(mesh);
      }
    }
    scene.add(camera);

    // Store the initial rotation
    startQuaternion.current.setFromEuler(new THREE.Euler(0, 0, 0));

    const handleMouseMove = (event) => {
      const rect = canvas.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let idleAnimationTime = 0;
    let transitionFactor = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      idleAnimationTime += 0.004;

      const mouseDistance = Math.sqrt(
        mouse.current.x * mouse.current.x + mouse.current.y * mouse.current.y
      );
      const isInRadius = mouseDistance < 1;

      transitionFactor += isInRadius ? 0.05 : -0.05;
      transitionFactor = Math.max(0, Math.min(1, transitionFactor));

      const mouseTarget = new THREE.Vector3(
        mouse.current.x * 3,
        mouse.current.y * 3,
        2
      );

      const idleX = helper.expand(
        helper.ease(helper.normalize(Math.sin(idleAnimationTime)))
      );
      const idleY = helper.expand(
        helper.ease(helper.normalize(Math.cos(idleAnimationTime)))
      );

      const idleTarget = new THREE.Vector3(idleX * 0.5, idleY * 0.25, 2);

      const target = new THREE.Vector3().lerpVectors(
        idleTarget,
        mouseTarget,
        transitionFactor
      );

      for (let i = 0; i < currentMeshes.length; i++) {
        const mesh = currentMeshes[i];
        mesh.lookAt(target);
        targetQuaternion.current.copy(mesh.quaternion);
        mesh.quaternion.slerp(targetQuaternion.current, 0.03);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      scene.remove(...currentMeshes);
      cancelAnimationFrame(animate);
      controls.dispose();
      renderer.dispose();
    };
  }, [beastModel]);

  return (
    <div className="container">
      <div className="canvas-container">
        <canvas className={props.className} ref={canvas}></canvas>
      </div>
    </div>
  );
};

export default Beasthead;
