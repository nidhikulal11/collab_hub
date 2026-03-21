import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Bubble = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  floatPhase: number;
  floatSpeed: number;
  floatAmplitude: number;
};

/**
 * BubbleBackground
 *
 * Futuristic 3D bubble field using Three.js.
 * - 40–60 glowing spheres in motion
 * - Smooth sine-wave vertical drift + gentle rotation
 * - Fixed full-screen canvas behind all UI (pointer-events: none)
 */
export default function BubbleBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    mount.appendChild(renderer.domElement);

    // Lighting: ambient + soft point light for shine
    const ambientLight = new THREE.AmbientLight(0x8fa3ff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa78bfa, 1.2, 40);
    pointLight.position.set(4, 6, 10);
    scene.add(pointLight);

    // Shared geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Palette for bubbles
    const palette = [
      new THREE.Color('#6d28d9'),
      new THREE.Color('#4f46e5'),
      new THREE.Color('#2563eb'),
      new THREE.Color('#7c3aed'),
    ];

    const bubbles: Bubble[] = [];

    // World bounds that roughly cover the viewport in world space
    const WORLD_HALF_X = 12; // horizontal spread
    const WORLD_HALF_Y = 9;  // vertical spread
    const WORLD_HALF_Z = 14; // depth spread

    // Slightly fewer bubbles on small screens, more on desktop
    const BUBBLE_COUNT = window.innerWidth < 640 ? 40 : 60;

    const spawnBubble = (existing?: Bubble): Bubble => {
        const color = palette[Math.floor(Math.random() * palette.length)];
        const material = new THREE.MeshPhongMaterial({
          color,
          emissive: color.clone().multiplyScalar(0.5),
          emissiveIntensity: 0.9,
          transparent: true,
        opacity: 0.25 + Math.random() * 0.15, // 0.25–0.4
          shininess: 90,
        });

        const mesh = existing?.mesh ?? new THREE.Mesh(geometry, material);

      // Spawn across the full world volume
      const x = (Math.random() - 0.5) * 2 * WORLD_HALF_X;
      const y = (Math.random() - 0.5) * 2 * WORLD_HALF_Y;
      const z = (Math.random() - 0.5) * 2 * WORLD_HALF_Z;
      mesh.position.set(x, y, z);

      // Bubble size: keep same minimum, but if a bubble becomes too large,
      // resample it so we effectively "remove" the single biggest outlier.
      const baseRadius = 0.1 + Math.random() * 0.5; // min unchanged
      const depthFactor = 1 - Math.min(Math.abs(z) / WORLD_HALF_Z, 1); // closer -> larger
      let radius = baseRadius * (0.7 + depthFactor * 0.8);
      const MAX_RADIUS = 0.7;
      if (radius > MAX_RADIUS) {
        // Too big: regenerate this bubble once with a new random position/size
        const safeX = (Math.random() - 0.5) * 2 * WORLD_HALF_X;
        const safeY = (Math.random() - 0.5) * 2 * WORLD_HALF_Y;
        const safeZ = (Math.random() - 0.5) * 2 * WORLD_HALF_Z;
        mesh.position.set(safeX, safeY, safeZ);
        const safeBaseRadius = 0.1 + Math.random() * 0.5;
        const safeDepthFactor = 1 - Math.min(Math.abs(safeZ) / WORLD_HALF_Z, 1);
        radius = Math.min(
          safeBaseRadius * (0.7 + safeDepthFactor * 0.8),
          MAX_RADIUS
        );
      }
      mesh.scale.set(radius, radius, radius);

        // Base upward motion + sideways drift
        const velocity = existing?.velocity ?? new THREE.Vector3();
        const baseUp = 0.6 + Math.random() * 0.9; // noticeable upward
        velocity.set(
          (Math.random() - 0.5) * 0.8, // left/right drift
          baseUp,
          (Math.random() - 0.5) * 0.8 // depth drift
        );

        const floatPhase = Math.random() * Math.PI * 2;
        const floatSpeed = 0.6 + Math.random() * 0.9;
        const floatAmplitude = 0.4 + Math.random() * 0.6;

        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

        if (!existing) {
          scene.add(mesh);
        }

        return {
          mesh,
          velocity,
          floatPhase,
          floatSpeed,
          floatAmplitude,
        };
      };

      for (let i = 0; i < BUBBLE_COUNT; i++) {
        bubbles.push(spawnBubble());
      }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = clock.getDelta(); // seconds

      const boundsX = WORLD_HALF_X + 2;
      const boundsY = WORLD_HALF_Y + 2;
      const boundsZ = WORLD_HALF_Z + 2;

      bubbles.forEach((bubble, index) => {
        const { mesh, velocity } = bubble;

        // Update float phase
        bubble.floatPhase += bubble.floatSpeed * dt;

        // Base linear motion
        mesh.position.x += velocity.x * dt;
        mesh.position.y += velocity.y * dt;
        mesh.position.z += velocity.z * dt;

        // Gentle sine-based vertical float
        mesh.position.y += Math.sin(bubble.floatPhase) * bubble.floatAmplitude * dt * 2;

        // Slow rotation for a "living" feel
        mesh.rotation.y += 0.6 * dt;
        mesh.rotation.x += 0.35 * dt;

        // If bubble goes out of a loose bounding box, respawn near center
        if (
          Math.abs(mesh.position.x) > boundsX ||
          Math.abs(mesh.position.y) > boundsY ||
          Math.abs(mesh.position.z) > boundsZ
        ) {
          bubbles[index] = spawnBubble(bubble);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      bubbles.forEach(({ mesh }) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
