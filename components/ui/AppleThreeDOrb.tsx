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
    sm: 140,
    md: 360,
    lg: 440,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & High-Performance Renderer Setup (Expanded View Frustum so NO rings ever clip)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Photorealistic Ceramic Glass AI Entity Group
    const masterGroup = new THREE.Group();

    // Apple-Style Ceramic Glass Outer Shell Material
    const headGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transmission: 0.12,
      ior: 1.5,
      reflectivity: 0.95,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    masterGroup.add(headMesh);

    // Side Ear Pod Cuffs (Headphones Pods)
    const earGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.22, 32);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      roughness: 0.12,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.02, 0, 0);
    masterGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(1.02, 0, 0);
    masterGroup.add(rightEar);

    // Dark Glossy Visor Face
    const visorGeo = new THREE.SphereGeometry(0.88, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.44);
    visorGeo.rotateX(Math.PI / 2);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050a18,
      roughness: 0.02,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0, 0.16);
    masterGroup.add(visorMesh);

    // Bright Glowing Cyan LED Angled Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.085, 0.16, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0x38bdf8),
      emissiveIntensity: 2.5,
      roughness: 0.05,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.26, 0.04, 0.96);
    leftEye.rotation.z = Math.PI / 8;
    masterGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.26, 0.04, 0.96);
    rightEye.rotation.z = -Math.PI / 8;
    masterGroup.add(rightEye);

    scene.add(masterGroup);

    // 3. Multi-Layer Orbital Energy Rings (Sized proportionally inside camera view)
    const ringGeo1 = new THREE.TorusGeometry(1.35, 0.018, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.5, 0.014, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.8;
    ringMesh2.rotation.y = Math.PI / 5;
    scene.add(ringMesh2);

    // Soft Fading Horizontal Orbital Base Ring
    const baseRingGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 100);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const baseRingMesh = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRingMesh.rotation.x = Math.PI / 2;
    baseRingMesh.position.y = -1.0;
    scene.add(baseRingMesh);

    // 4. Studio Lighting System (Key, Fill & Backlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    cyanFillLight.position.set(-5, -2, 4);
    scene.add(cyanFillLight);

    const violetBackLight = new THREE.DirectionalLight(0x8b5cf6, 2.0);
    violetBackLight.position.set(0, 5, -5);
    scene.add(violetBackLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // 5. Mouse Parallax LERP Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      const floatY = Math.sin(elapsedTime * 1.6) * 0.08;
      masterGroup.position.y = floatY;

      masterGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.12 + currentMouseX;
      masterGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.06 + currentMouseY;

      const targetScale = container.getAttribute('data-hover') === 'true' ? 1.06 : 1.0;
      masterGroup.scale.setScalar(THREE.MathUtils.lerp(masterGroup.scale.x, targetScale, 0.08));

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

      ringMesh1.rotation.z = elapsedTime * 0.35 * ringSpeedMultiplier;
      ringMesh1.position.y = floatY * 0.4;

      ringMesh2.rotation.z = -elapsedTime * 0.28 * ringSpeedMultiplier;
      ringMesh2.position.y = floatY * 0.4;

      baseRingMesh.rotation.z = elapsedTime * 0.2 * ringSpeedMultiplier;
      baseRingMesh.position.y = -1.0 + floatY * 0.3;

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
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      baseRingGeo.dispose();
      baseRingMat.dispose();
      renderer.dispose();
    };
  }, [aiState, isSpeaking, pixelDimensions]);

  return (
    <div
      className="relative inline-flex items-center justify-center group shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft Ambient Radial Glow */}
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
