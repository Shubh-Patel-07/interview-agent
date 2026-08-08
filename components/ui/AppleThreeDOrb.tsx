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
    sm: 80,
    md: 180,
    lg: 260,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. AI Intelligence Core Group
    const orbGroup = new THREE.Group();

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.72, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isSpeaking ? 0x2563eb : 0x4f46e5),
      emissive: new THREE.Color(isSpeaking ? 0x38bdf8 : 0x6366f1),
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // Outer Glass Shell Sphere (Apple Siri / Glassmorphic Refraction)
    const shellGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 0.75,
      ior: 1.52,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.85,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    orbGroup.add(shellMesh);

    // Dynamic Orbital Halo Rings
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.015, 32, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    orbGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.55, 0.01, 32, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 5;
    orbGroup.add(ringMesh2);

    scene.add(orbGroup);

    // 3. Dynamic Ambient Lights
    const blueLight = new THREE.PointLight(0x38bdf8, 3, 10);
    blueLight.position.set(2, 2, 3);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 10);
    purpleLight.position.set(-2, -2, 2);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // 4. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth floating motion
      const floatY = Math.sin(elapsedTime * 1.8) * 0.08;
      orbGroup.position.y = floatY;

      // Mouse Parallax & Smooth Rotation
      orbGroup.rotation.y = elapsedTime * (isSpeaking ? 0.6 : 0.25) + mouseX;
      orbGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1 + mouseY;

      ringMesh1.rotation.z = elapsedTime * 0.4;
      ringMesh2.rotation.z = -elapsedTime * 0.3;

      // Pulse breathing animation
      const pulseScale = isSpeaking ? 1 + Math.sin(elapsedTime * 5) * 0.04 : 1 + Math.sin(elapsedTime * 2) * 0.02;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

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
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, pixelDimensions]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Soft Ambient Radial Glow */}
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400/25 via-indigo-400/20 to-purple-400/25 blur-3xl pointer-events-none" />
      
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative z-10 flex items-center justify-center" />
    </div>
  );
}
