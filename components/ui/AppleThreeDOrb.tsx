'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type AIState = 'idle' | 'thinking' | 'speaking' | 'listening' | 'evaluating';

interface ThreeDOrbProps {
  aiState?: AIState;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AppleThreeDOrb({ aiState = 'idle', isSpeaking = false, size = 'md' }: ThreeDOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const pixelDimensions = {
    sm: 120,
    md: 300,
    lg: 380,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Robot AI Entity Master Group
    const masterGroup = new THREE.Group();

    // White Ceramic Robot Head Outer Shell
    const headGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transmission: 0.15,
      ior: 1.45,
      reflectivity: 0.9,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    masterGroup.add(headMesh);

    // Side Ear Pod Cuffs (Left & Right Headphones)
    const earGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.22, 32);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.08, 0, 0);
    masterGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(1.08, 0, 0);
    masterGroup.add(rightEar);

    // Dark Glossy Visor Face
    const visorGeo = new THREE.SphereGeometry(0.92, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.44);
    visorGeo.rotateX(Math.PI / 2);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x080d1a,
      roughness: 0.04,
      metalness: 0.9,
      clearcoat: 1.0,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0, 0.18);
    masterGroup.add(visorMesh);

    // Bright Glowing White-Cyan Angled Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.09, 0.18, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.28, 0.05, 0.98);
    leftEye.rotation.z = Math.PI / 8;
    masterGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.28, 0.05, 0.98);
    rightEye.rotation.z = -Math.PI / 8;
    masterGroup.add(rightEye);

    scene.add(masterGroup);

    // 3. Multi-Layer Energy System
    // Layer 1: Inner Energy Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Layer 2 & 3: Orbital Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.75 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.014, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.8;
    ringMesh2.rotation.y = Math.PI / 5;
    scene.add(ringMesh2);

    // Layer 4: Neural Particle Field (220 particles)
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Layer 5: Holographic Platform Disks
    const platformGeo1 = new THREE.CylinderGeometry(1.7, 1.9, 0.04, 64);
    const platformMat1 = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      transmission: 0.75,
      transparent: true,
      opacity: 0.5,
    });
    const platformMesh1 = new THREE.Mesh(platformGeo1, platformMat1);
    platformMesh1.position.y = -1.35;
    scene.add(platformMesh1);

    // 4. Lights
    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 10);
    cyanLight.position.set(2, 2.5, 3.5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3, 10);
    violetLight.position.set(-2, -2, 3);
    scene.add(violetLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // 5. Mouse Parallax with Smooth LERP Interpolation
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.45;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.45;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Base Floating Motion
      const floatY = Math.sin(elapsedTime * 1.6) * 0.1;
      masterGroup.position.y = floatY;

      // Mouse Head Tilting & Parallax
      masterGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.12 + currentMouseX;
      masterGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.06 + currentMouseY;

      // Hover Reactive Scaling & Light Boost
      const targetScale = container.getAttribute('data-hover') === 'true' ? 1.08 : 1.0;
      masterGroup.scale.setScalar(THREE.MathUtils.lerp(masterGroup.scale.x, targetScale, 0.08));

      // State-Dependent Behavior
      let ringSpeedMultiplier = container.getAttribute('data-hover') === 'true' ? 1.8 : 1.0;
      let eyePulseFrequency = 2.5;

      if (aiState === 'thinking') {
        ringSpeedMultiplier *= 2.2;
        eyePulseFrequency = 8;
        eyeMat.emissive.setHex(0xa855f7);
      } else if (aiState === 'speaking' || isSpeaking) {
        ringSpeedMultiplier *= 1.6;
        eyePulseFrequency = 6;
        eyeMat.emissive.setHex(0x38bdf8);
      } else if (aiState === 'listening') {
        ringSpeedMultiplier *= 0.8;
        eyePulseFrequency = 1.5;
        eyeMat.emissive.setHex(0x10b981);
      } else if (aiState === 'evaluating') {
        ringSpeedMultiplier *= 2.8;
        eyePulseFrequency = 10;
        eyeMat.emissive.setHex(0xf59e0b);
      } else {
        eyeMat.emissive.setHex(0x38bdf8);
      }

      // Ring Rotations
      ringMesh1.rotation.z = elapsedTime * 0.35 * ringSpeedMultiplier;
      ringMesh1.position.y = floatY * 0.4;

      ringMesh2.rotation.z = -elapsedTime * 0.28 * ringSpeedMultiplier;
      ringMesh2.position.y = floatY * 0.4;

      particleField.rotation.y = elapsedTime * 0.12 * ringSpeedMultiplier;

      // Eye Pulse Scale
      const eyeScale = 1 + Math.sin(elapsedTime * eyePulseFrequency) * 0.08;
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
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      platformGeo1.dispose();
      platformMat1.dispose();
      renderer.dispose();
    };
  }, [aiState, isSpeaking, pixelDimensions]);

  return (
    <div
      className="relative inline-flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft Ambient Radial Glow (Expands on Hover) */}
      <div
        className={`absolute rounded-full bg-gradient-to-tr from-purple-500/30 via-blue-500/25 to-cyan-400/30 blur-3xl pointer-events-none transition-all duration-500 ${
          isHovered ? 'w-72 h-72 opacity-100 scale-110' : 'w-64 h-64 opacity-80 scale-100'
        }`}
      />

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        data-hover={isHovered ? 'true' : 'false'}
        className="relative z-10 flex items-center justify-center cursor-pointer transition-transform duration-300"
      />
    </div>
  );
}
