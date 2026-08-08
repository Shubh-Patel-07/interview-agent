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
    sm: 90,
    md: 220,
    lg: 300,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. AI Assistant Head Group
    const aiHeadGroup = new THREE.Group();

    // Outer Body: Smooth white glossy glass sphere
    const bodyGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.25,
      ior: 1.4,
      reflectivity: 0.9,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    aiHeadGroup.add(bodyMesh);

    // Visor/Face: Curved dark navy glossy glass
    const visorGeo = new THREE.SphereGeometry(0.88, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.42);
    visorGeo.rotateX(Math.PI / 2);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0, 0.18);
    aiHeadGroup.add(visorMesh);

    // Glowing Cyan Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.07, 0.14, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: isSpeaking ? 0x38bdf8 : 0x60a5fa });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.24, 0.04, 0.96);
    leftEye.rotation.z = Math.PI / 12;
    aiHeadGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.24, 0.04, 0.96);
    rightEye.rotation.z = -Math.PI / 12;
    aiHeadGroup.add(rightEye);

    scene.add(aiHeadGroup);

    // 3. Elliptical Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(1.55, 0.018, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.75, 0.014, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    scene.add(ringMesh2);

    // 4. Holographic Platform
    const platformGeo = new THREE.CylinderGeometry(1.7, 1.9, 0.04, 64);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      transmission: 0.7,
      transparent: true,
      opacity: 0.35,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -1.35;
    scene.add(platformMesh);

    // 5. Lighting setup
    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 10);
    purpleLight.position.set(-2, -2, 2);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // 6. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Floating up and down animation
      const floatY = Math.sin(elapsedTime * 1.8) * 0.12;
      aiHeadGroup.position.y = floatY;

      // Mouse Parallax & Gentle Rotation
      aiHeadGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15 + mouseX;
      aiHeadGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.08 + mouseY;

      // Energy Ring Rotations
      ringMesh1.rotation.z = elapsedTime * 0.3;
      ringMesh1.position.y = floatY * 0.5;

      ringMesh2.rotation.z = -elapsedTime * 0.25;
      ringMesh2.position.y = floatY * 0.5;

      // Eye Pulsing Effect
      const eyeScale = isSpeaking ? 1 + Math.sin(elapsedTime * 8) * 0.15 : 1 + Math.sin(elapsedTime * 3) * 0.05;
      leftEye.scale.set(1, eyeScale, 1);
      rightEye.scale.set(1, eyeScale, 1);

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
      bodyGeo.dispose();
      bodyMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      platformGeo.dispose();
      platformMat.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, pixelDimensions]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Soft Ambient Radial Glow Behind AI Assistant */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none" />
      
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative z-10 flex items-center justify-center cursor-pointer" />
    </div>
  );
}
