'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDOrbProps {
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AppleThreeDOrb({ isSpeaking = false, size = 'md' }: ThreeDOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const pixelDimensions = {
    sm: 64,
    md: 160,
    lg: 240,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Icosahedron Core Sphere
    const geometry = new THREE.IcosahedronGeometry(1.1, 3);

    // Custom Glassmorphic Material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isSpeaking ? 0x2563eb : 0x4f46e5),
      emissive: new THREE.Color(isSpeaking ? 0x1d4ed8 : 0x3730a3),
      emissiveIntensity: isSpeaking ? 0.6 : 0.25,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      ior: 1.5,
      wireframe: true,
    });

    const orbMesh = new THREE.Mesh(geometry, material);
    scene.add(orbMesh);

    // Outer Glow Halo Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // 3. Dynamic Lighting
    const pointLight = new THREE.PointLight(0x38bdf8, 2, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 4. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      orbMesh.rotation.y = elapsedTime * (isSpeaking ? 0.8 : 0.3) + mouseX;
      orbMesh.rotation.x = elapsedTime * (isSpeaking ? 0.5 : 0.2) + mouseY;

      ringMesh.rotation.z = -elapsedTime * 0.4;
      ringMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.3;

      if (isSpeaking) {
        const scale = 1 + Math.sin(elapsedTime * 6) * 0.08;
        orbMesh.scale.set(scale, scale, scale);
      } else {
        orbMesh.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, pixelDimensions]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="relative z-10 flex items-center justify-center" />
    </div>
  );
}
