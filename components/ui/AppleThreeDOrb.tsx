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
    sm: 110,
    md: 280,
    lg: 360,
  }[size];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(pixelDimensions, pixelDimensions);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Robot Head Entity Group
    const robotHeadGroup = new THREE.Group();

    // Smooth White Ceramic Head Sphere
    const headGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transmission: 0.1,
      ior: 1.45,
      reflectivity: 0.9,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    robotHeadGroup.add(headMesh);

    // Side Ear Cups (Headphone Pods on Left & Right)
    const earGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.22, 32);
    earGeo.rotateZ(Math.PI / 2);
    const earMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.1,
      metalness: 0.15,
      clearcoat: 1.0,
    });
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.position.set(-1.08, 0, 0);
    robotHeadGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.position.set(1.08, 0, 0);
    robotHeadGroup.add(rightEar);

    // Curved Dark Glossy Visor Face
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
    robotHeadGroup.add(visorMesh);

    // Bright Glowing White-Cyan Angled Eyes (Matching screenshot \ / shape)
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
    robotHeadGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.28, 0.05, 0.98);
    rightEye.rotation.z = -Math.PI / 8;
    robotHeadGroup.add(rightEye);

    scene.add(robotHeadGroup);

    // 3. Swirling Energy Orbit Rings (Violet & Cyan glowing rings)
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

    const ringGeo3 = new THREE.TorusGeometry(2.05, 0.01, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.45 });
    const ringMesh3 = new THREE.Mesh(ringGeo3, ringMat3);
    ringMesh3.rotation.x = Math.PI / 4;
    scene.add(ringMesh3);

    // 4. Holographic Platform Disks (Base under robot)
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

    const platformGeo2 = new THREE.CylinderGeometry(2.1, 2.3, 0.03, 64);
    const platformMesh2 = new THREE.Mesh(platformGeo2, platformMat1);
    platformMesh2.position.y = -1.5;
    scene.add(platformMesh2);

    // 5. Lighting Setup
    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 10);
    cyanLight.position.set(2, 2.5, 3.5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3, 10);
    violetLight.position.set(-2, -2, 3);
    scene.add(violetLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // 6. Mouse Parallax Tracking
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

      // Smooth Floating Y
      const floatY = Math.sin(elapsedTime * 1.6) * 0.09;
      robotHeadGroup.position.y = floatY;

      // Mouse Parallax & Head Tilting
      robotHeadGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.12 + mouseX;
      robotHeadGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.06 + mouseY;

      // Energy Ring Swirls
      ringMesh1.rotation.z = elapsedTime * 0.35;
      ringMesh1.position.y = floatY * 0.4;

      ringMesh2.rotation.z = -elapsedTime * 0.28;
      ringMesh2.position.y = floatY * 0.4;

      ringMesh3.rotation.z = elapsedTime * 0.2;
      ringMesh3.position.y = floatY * 0.4;

      // Eye Expression Pulse
      const eyeScale = isSpeaking ? 1 + Math.sin(elapsedTime * 6) * 0.12 : 1 + Math.sin(elapsedTime * 2.5) * 0.04;
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
      ringGeo3.dispose();
      ringMat3.dispose();
      platformGeo1.dispose();
      platformGeo2.dispose();
      platformMat1.dispose();
      renderer.dispose();
    };
  }, [isSpeaking, pixelDimensions]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Soft Ambient Radial Violet & Blue Aura */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-purple-500/25 via-blue-500/20 to-cyan-400/25 blur-3xl pointer-events-none" />
      
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative z-10 flex items-center justify-center cursor-pointer" />
    </div>
  );
}
