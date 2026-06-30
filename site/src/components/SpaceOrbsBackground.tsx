"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

export type SpaceOrbsBackgroundProps = {
  className?: string;
  orbColor?: string; // e.g. "#6633e6" (normal theme ambient color)
  backgroundColor?: string; // e.g. "#010005"
  particleCount?: number; // density of orbs (default: 800)
  speed?: number; // flow speed multiplier (default: 1.0)
  minSize?: number; // minimum orb size (default: 0.5)
  maxSize?: number; // maximum orb size (default: 3.5)
  glowIntensity?: number; // bloom strength (default: 1.5)
  glowThreshold?: number; // bloom threshold (default: 0.25)
  cameraRotationSpeed?: number; // gentle background camera pan (default: 0.05)
  active?: boolean; // toggle performance rendering loop
};

// ── Ambient Floating Particles Shaders ──
const AMB_VERT = /* glsl */ `
uniform float uTime;
attribute float aPhase;
attribute float aSize;
attribute float aSpeed;
varying float vA;
void main() {
  vec3 p = position;
  float t = uTime * aSpeed * 0.3;
  
  // Flow diagonally over time, wrapping around a boundary box
  p.x = mod(position.x + t * 6.0 + 40.0, 80.0) - 40.0;
  p.z = mod(position.z - t * 4.0 + 25.0, 50.0) - 25.0;
  p.y += sin(p.x * 0.2 + p.z * 0.2 + t) * 3.0; // organic bobbing motion
  
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * (200.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
  
  // Glowing / pulsing opacity cycle over time
  vA = 0.1 + 0.9 * (0.5 + 0.5 * sin(t * 5.0 + aPhase * 4.0));
}
`;

const AMB_FRAG = /* glsl */ `
varying float vA;
uniform vec3 uColorAmbient;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  
  // Exponential decay for soft glowing edges
  float a = exp(-d * d * 25.0);
  gl_FragColor = vec4(uColorAmbient, a * vA * 0.08); // very faded alpha for a super subtle, premium look
}
`;

// Helper hook for device quality detection (lowers particle count/DPR on slower devices)
function useDeviceQuality() {
  const [q, setQ] = useState<{ tier: "low" | "mid" | "high"; dpr: [number, number] }>({
    tier: "high",
    dpr: [1, 2],
  });
  
  useEffect(() => {
    const mem = (navigator as any).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (mobile || mem <= 4 || cores <= 4) {
      setQ({ tier: "low", dpr: [1, 1.25] });
    } else if (mem <= 8 || cores <= 8) {
      setQ({ tier: "mid", dpr: [1, 1.5] });
    }
  }, []);
  
  return q;
}

// ── Particle System Component ──
function OrbParticles({
  count,
  orbColor,
  speed,
  minSize,
  maxSize,
  blending = THREE.AdditiveBlending,
}: {
  count: number;
  orbColor: string;
  speed: number;
  minSize: number;
  maxSize: number;
  blending?: THREE.Blending;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const { pos, ph, sz, sp } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const sz = new Float32Array(count);
    const sp = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles across space
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      ph[i] = Math.random() * Math.PI * 2;
      sz[i] = minSize + Math.random() * (maxSize - minSize);
      sp[i] = (0.5 + Math.random()) * speed;
    }
    return { pos, ph, sz, sp };
  }, [count, speed, minSize, maxSize]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorAmbient: { value: new THREE.Color(orbColor) }
  }), [orbColor]);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uColorAmbient.value.set(orbColor);
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[ph, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sz, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[sp, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={AMB_VERT}
        fragmentShader={AMB_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={blending}
      />
    </points>
  );
}

// ── Gentle Camera Movement Rig ──
function CameraRig() {
  useFrame(({ camera }) => {
    // Keep camera completely static at the same coordinates as the hero section to make it look like one continuous background
    camera.position.set(10.8, 16.8, 40.0);
    camera.lookAt(10.0, 6.1, 0);
  });
  return null;
}

// ── Main Exported Component ──
export function SpaceOrbsBackground({
  className = "absolute inset-0",
  orbColor,
  backgroundColor = "transparent",
  particleCount = 1500,
  speed = 1.0,
  minSize = 0.5,
  maxSize = 3.5,
  glowIntensity = 1.5,
  glowThreshold = 0.25,
  active = true,
}: SpaceOrbsBackgroundProps) {
  const { theme } = useTheme();
  
  // Sync colors exactly with the Hero's wave theme: Matt (dark mode) & LightEmerald (light mode)
  const activeOrbColor = orbColor !== undefined ? orbColor : (theme === "light" ? "#5C534C" : "#8aa7a9");
  const activeBgColor = backgroundColor;

  const { tier, dpr } = useDeviceQuality();

  // Adjust particle count dynamically based on detected device tier
  const finalCount = useMemo(() => {
    if (tier === "low") return Math.min(300, particleCount);
    if (tier === "mid") return Math.min(800, particleCount);
    return particleCount;
  }, [tier, particleCount]);

  return (
    <div className={className} style={{ background: activeBgColor, position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [10.8, 16.8, 40.0], fov: 40 }}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: tier !== "low",
          alpha: activeBgColor === "transparent",
          powerPreference: "high-performance",
        }}
      >
        {activeBgColor !== "transparent" && (
          <color attach="background" args={[activeBgColor]} />
        )}
        <fog attach="fog" args={[activeBgColor === "transparent" ? (theme === "light" ? "#FAF8F5" : "#000000") : activeBgColor, 20, 60]} />
        
        {/* Static camera matching the Hero wave layout */}
        <CameraRig />
        
        {/* Isolated floating orbs */}
        <OrbParticles
          count={finalCount}
          orbColor={activeOrbColor}
          speed={speed}
          minSize={minSize}
          maxSize={maxSize}
          blending={activeBgColor === "#f0fdf7" ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
        
        {/* Glow / Bloom filter effect */}
        <EffectComposer multisampling={tier === "low" ? 0 : 2}>
          <Bloom
            mipmapBlur
            intensity={glowIntensity}
            luminanceThreshold={glowThreshold}
            luminanceSmoothing={0.8}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default SpaceOrbsBackground;
