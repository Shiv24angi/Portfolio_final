
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Text, Environment, PerspectiveCamera, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Section } from '../types';

interface SceneProps {
  currentSection: Section;
}

const BackgroundPoints = () => {
  const points = useMemo(() => {
    const p = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 80;
      p[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0002;
      ref.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#6366f1" transparent opacity={0.2} />
    </points>
  );
};

const AbstractSphere = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      mesh.current.rotation.y = Math.cos(time * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={[0, 0, -15]}>
        <sphereGeometry args={[6, 64, 64]} />
        <MeshDistortMaterial
          color="#1e1b4b"
          emissive="#4f46e5"
          emissiveIntensity={0.1}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const CameraController = ({ section }: { section: Section }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const config: Record<Section, { x: number; y: number; z: number; rx: number; ry: number }> = {
      [Section.HERO]: { x: 0, y: 0, z: 18, rx: 0, ry: 0 },
      [Section.ABOUT]: { x: -8, y: 2, z: 15, rx: 0, ry: 0.4 },
      [Section.SKILLS]: { x: 0, y: 8, z: 12, rx: -0.4, ry: 0 },
      [Section.PROJECTS]: { x: 12, y: -2, z: 20, rx: 0.1, ry: -0.4 },
      [Section.EXPERIENCE]: { x: -5, y: -18, z: 22, rx: 0.5, ry: 0.3 },
      [Section.ACHIEVEMENTS]: { x: 10, y: 18, z: 22, rx: -0.5, ry: -0.3 },
      [Section.CONTACT]: { x: 0, y: 0, z: 12, rx: 0, ry: 0 },
    };

    const target = config[section];
    
    // Kill existing tweens to prevent "lag" accumulation
    gsap.to(camera.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2.2,
      ease: 'expo.inOut',
      overwrite: 'auto'
    });

    gsap.to(camera.rotation, {
      x: target.rx,
      y: target.ry,
      duration: 2.2,
      ease: 'expo.inOut',
      overwrite: 'auto'
    });
  }, [section, camera]);

  useFrame(() => {
    // Subtle parallax effect
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x * 0.01) * 0.05;
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y * 0.01) * 0.05;
    camera.lookAt(0, 0, -10); // Keep focused on the center scene
  });

  return null;
};

const Scene: React.FC<SceneProps> = ({ currentSection }) => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45} />
        <CameraController section={currentSection} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#818cf8" />
        <spotLight position={[-30, 30, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

        <Stars radius={200} depth={50} count={5000} factor={6} saturation={0.5} fade speed={1} />
        <Sparkles count={150} scale={40} size={2} speed={0.3} color="#818cf8" />
        
        <BackgroundPoints />

        {currentSection === Section.HERO && (
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <Text
              position={[0, 3, -12]}
              fontSize={6}
              color="#ffffff"
              font="https://fonts.gstatic.com/s/orbitron/v30/yMJR8V-923fS75eQp_o5.woff2"
              fillOpacity={0.05}
              strokeWidth={0.01}
              strokeColor="#4f46e5"
            >
              INNOVATION
            </Text>
          </Float>
        )}

        <AbstractSphere />
        
        <Environment preset="night" />
        {/* Increased fog range to prevent hard clipping to black */}
        <fog attach="fog" args={['#000', 30, 100]} />
      </Canvas>
    </div>
  );
};

export default Scene;
