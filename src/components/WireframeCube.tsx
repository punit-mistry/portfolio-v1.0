import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function WireframeCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.LineSegments | null>(null);
  const animFrameRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 300;
    const height = 300;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xC5B8A5,
      transparent: true,
      opacity: 0.4,
    });
    const mesh = new THREE.LineSegments(edges, material);
    scene.add(mesh);
    meshRef.current = mesh;

    let isVisible = false;
    const rotationSpeed = { current: 0.003 };

    const animate = () => {
      if (!isVisible) return;

      mesh.rotation.x += rotationSpeed.current;
      mesh.rotation.y += rotationSpeed.current;

      // Hover speed
      const targetSpeed = hovered ? 0.008 : 0.003;
      rotationSpeed.current += (targetSpeed - rotationSpeed.current) * 0.05;

      // Hover opacity
      const targetOpacity = hovered ? 0.7 : 0.4;
      material.opacity += (targetOpacity - material.opacity) * 0.05;

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          animFrameRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      edges.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '300px',
        height: '300px',
        position: 'relative',
        boxShadow: '0 0 60px rgba(197,184,165,0.08)',
        borderRadius: '20px',
      }}
    />
  );
}
