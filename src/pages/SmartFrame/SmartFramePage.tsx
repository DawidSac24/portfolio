// import { SideNav } from "../../components/Navigation/SideNav";
// import layoutStyles from "../layout/PageLayout.module.css";

export const SmartframePage = () => {
  // // const navItems = [
  // //   { id: "overview", label: "Overview" },
  // //   { id: "experience", label: "Work Experience" },
  // //   { id: "education", label: "Education" },
  // // ];
  // // We use a div reference, Three.js will inject the <canvas> inside it
  // const mountRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!mountRef.current) return;

  //   // 1. The Core Engines
  //   const scene = new THREE.Scene();
  //   scene.background = new THREE.Color(0x0a0a0a); // Dark background

  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     mountRef.current.clientWidth / mountRef.current.clientHeight,
  //     0.1,
  //     1000,
  //   );
  //   camera.position.z = 2;

  //   const renderer = new THREE.WebGLRenderer({ antialias: true });
  //   renderer.setSize(
  //     mountRef.current.clientWidth,
  //     mountRef.current.clientHeight,
  //   );
  //   mountRef.current.appendChild(renderer.domElement);

  //   // 2. The Geometry (Amber Wireframe Cube)
  //   // const geometry = new THREE.BoxGeometry();
  //   // const material = new THREE.MeshBasicMaterial({
  //   //   color: 0xf59e0b, // TUI Amber
  //   //   wireframe: true,
  //   // });
  //   // const cube = new THREE.Mesh(geometry, material);
  //   // scene.add(cube);

  //   // // 3. The Render Loop
  //   // let animationFrameId: number;
  //   // const animate = () => {
  //   //   animationFrameId = requestAnimationFrame(animate);

  //   //   cube.rotation.x += 0.01;
  //   //   cube.rotation.y += 0.01;

  //   //   renderer.render(scene, camera);
  //   // };
  //   // animate();

  //   // 4. Handle Window Resize
  //   const handleResize = () => {
  //     if (!mountRef.current) return;
  //     camera.aspect =
  //       mountRef.current.clientWidth / mountRef.current.clientHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(
  //       mountRef.current.clientWidth,
  //       mountRef.current.clientHeight,
  //     );
  //   };
  //   window.addEventListener("resize", handleResize);

  //   const loader = new FBXLoader();
  //   loader.loadAsync("src/assets/saturn/source/saturn.fbx").then((object) => {
  //     scene.add(object);
  //   });

  //   // 5. Cleanup on Unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     // cancelAnimationFrame(animationFrameId);
  //     if (mountRef.current) {
  //       mountRef.current.removeChild(renderer.domElement);
  //     }
  //     renderer.dispose();
  //     // geometry.dispose();
  //     // material.dispose();
  //   };
  // }, []);

  // The container must have a defined height for the canvas to fill
  return <div />;
};
