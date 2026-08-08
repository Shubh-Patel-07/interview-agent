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
    sm: 100,
    md: 260,
    lg: 340,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Robot Head Main Group
    const robotGroup = new THREE.Group();

    // White Ceramic Robot Head Outer Shell
    const headGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.1,
      ior: 1.4,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    robotGroup.add(headMesh);

    // Left Ear Pod Cuffs
    const earGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.18, 32);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.02, 0, 0);
    robotGroup.add(leftEar);

    // Right Ear Pod Cuffs
    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(1.02, 0, 0);
    robotGroup.add(rightEar);

    // Dark Glossy Visor Face
    const visorGeo = new THREE.SphereGeometry(0.88, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.44);
    visorGeo.rotateX(Math.PI / 2);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0f24,
      roughness: 0.05,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0, 0.16);
    robotGroup.add(visorMesh);

    // Soft Glowing Blue/Purple Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.08, 0.16, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: new THREE.Color(0xa855f7),
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.25, 0.04, 0.95);
    leftEye.rotation.z = Math.PI / 10;
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.25, 0.04, 0.95);
    rightEye.rotation.z = -Math.PI / 10;
    robotGroup.add(rightEye);

    scene.add(robotGroup);

    // 3. Floating Holographic Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(1.5, 0.018, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.7 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.7, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    scene.add(ringMesh2);

    // 4. Holographic Base Platform Disks (Matching image)
    const platformGeo1 = new THREE.CylinderGeometry(1.6, 1.8, 0.04, 64);
    const platformMat1 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      transmission: 0.7,
      transparent: true,
      opacity: 0.4,
    });
    const platformMesh1 = new THREE.Mesh(platformGeo1, platformMat1);
    platformMesh1.position.y = -1.3;
    scene.add(platformMesh1);

    const platformGeo2 = new THREE.CylinderGeometry(2.0, 2.2, 0.03, 64);
    const platformMesh2 = new THREE.Mesh(platformGeo2, platformMat1);
    platformMesh2.position.y = -1.45;
    scene.add(platformMesh2);

    // 5. Lighting Setup
    const purpleLight = new THREE.PointLight(0xa855f7, 3, 10);
    purpleLight.position.set(2, 2, 3);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2.5, 10);
    blueLight.position.set(-2, -2, 3);
    scene.add(blueLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // 6. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Floating Y animation
      const floatY = Math.sin(elapsedTime * 1.6) * 0.1;
      robotGroup.position.y = floatY;

      // Mouse Parallax & Gentle Head Rotation
      robotGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.15 + mouseX;
      robotGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.08 + mouseY;

      // Ring rotations
      ringMesh1.rotation.z = elapsedTime * 0.35;
      ringMesh1.position.y = floatY * 0.4;

      ringMesh2.rotation.z = -elapsedTime * 0.25;
      ringMesh2.position.y = floatY * 0.4;

      // Eye blink & pulse
      const eyeScale = isSpeaking ? 1 + Math.sin(elapsedTime * 6) * 0.1 : 1 + Math.sin(elapsedTime * 2.5) * 0.04;
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
      headGeo.dispose();
      headMat.dispose();
      earGeo.dispose();
      earMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      platformGeo1.dispose();
      platformGeo2.dispose();
      platformMat1.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, pixelDimensions]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Soft Ambient Radial Purple/Blue Glow */}
      <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl pointer-events-none" />
      
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative z-10 flex items-center justify-center cursor-pointer" />
    </div>
  );
}
