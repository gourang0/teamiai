"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useControls, folder, Leva } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type HeroWaveBackgroundProps = {
  className?: string;
  showControls?: boolean;
  colorTheme?: "normal" | "neon" | "metallic" | "matt" | "disabled" | "lightEmerald";
  disableWave?: boolean;
  flowSpeed?: number;
  amp?: number;
  pointSize?: number;
  lineOpacity?: number;
  camX?: number;
  camY?: number;
  camZ?: number;
  fov?: number;
  targetX?: number;
  targetY?: number;
  scale?: number;
  orbitAmount?: number;
  orbitSpeed?: number;
  glowIntensity?: number;
  glowThreshold?: number;
  cursorStrength?: number;
  cursorRadius?: number;
  cursorRecovery?: number;
  transparent?: boolean;
};

// ── Color Themes ──
export type ColorThemeConfig = {
  deep: string;
  mid: string;
  bright: string;
  spine: string;
  core: string;
  lineDark: string;
  lineBright: string;
  lineSpine: string;
  lineCore: string;
  fogEdge: string;
  fogCore: string;
  ambient: string;
  background: string;
};

export const THEMES: Record<string, ColorThemeConfig> = {
  normal: {
    deep: "#03000d",
    mid: "#0d0540",
    bright: "#4d1ae6",
    spine: "#9959ff",
    core: "#fff2ff",
    lineDark: "#05001a",
    lineBright: "#400dd9",
    lineSpine: "#a64dff",
    lineCore: "#ffe6ff",
    fogEdge: "#03000a",
    fogCore: "#260a73",
    ambient: "#6633e6",
    background: "#010005",
  },
  neon: {
    deep: "#000a0a",
    mid: "#00ffcc",
    bright: "#ff007f",
    spine: "#ffff00",
    core: "#ffffff",
    lineDark: "#001212",
    lineBright: "#ff007f",
    lineSpine: "#ffff00",
    lineCore: "#ffffff",
    fogEdge: "#000505",
    fogCore: "#00ffcc",
    ambient: "#00ffcc",
    background: "#000000",
  },
  metallic: {
    deep: "#0c0a05",
    mid: "#8a7350",
    bright: "#d4af37",
    spine: "#f3e5ab",
    core: "#ffffff",
    lineDark: "#15120a",
    lineBright: "#d4af37",
    lineSpine: "#f3e5ab",
    lineCore: "#ffffff",
    fogEdge: "#060502",
    fogCore: "#8a7350",
    ambient: "#d4af37",
    background: "#080705",
  },
  matt: {
    deep: "#1a2324",
    mid: "#5f7a7d",
    bright: "#8aa7a9",
    spine: "#b5c4c5",
    core: "#e3e8e9",
    lineDark: "#202a2c",
    lineBright: "#8aa7a9",
    lineSpine: "#b5c4c5",
    lineCore: "#e3e8e9",
    fogEdge: "#12191a",
    fogCore: "#5f7a7d",
    ambient: "#8aa7a9",
    background: "#0f1213",
  },
  lightEmerald: {
    deep: "#d1d5db",
    mid: "#9ca3af",
    bright: "#4b5563",
    spine: "#1f2937",
    core: "#000000",
    lineDark: "#e5e7eb",
    lineBright: "#4b5563",
    lineSpine: "#1f2937",
    lineCore: "#000000",
    fogEdge: "#f0fdf7",
    fogCore: "#e6f7ef",
    ambient: "#374151",
    background: "#f0fdf7",
  },
  disabled: {
    deep: "#080808",
    mid: "#222222",
    bright: "#444444",
    spine: "#888888",
    core: "#cccccc",
    lineDark: "#111111",
    lineBright: "#444444",
    lineSpine: "#888888",
    lineCore: "#cccccc",
    fogEdge: "#050505",
    fogCore: "#222222",
    ambient: "#444444",
    background: "#000000",
  },
};

type WaveControls = {
  flowSpeed: number;
  amp: number;
  camX: number;
  camY: number;
  camZ: number;
  fov: number;
  targetX: number;
  targetY: number;
  scale: number;
  orbitAmount: number;
  orbitSpeed: number;
  glowIntensity: number;
  glowThreshold: number;
  pointSize: number;
  lineOpacity: number;
  cursorStrength: number;
  cursorRadius: number;
  cursorRecovery: number;
  colorTheme: "normal" | "neon" | "metallic" | "matt" | "disabled";
  disableWave: boolean;
};

function useDeviceQuality() {
  const [q, setQ] = useState<{ tier: "low" | "mid" | "high"; dpr: [number, number] }>({
    tier: "high", dpr: [1, 2],
  });
  useEffect(() => {
    const mem = (navigator as any).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (mobile || mem <= 4 || cores <= 4) setQ({ tier: "low", dpr: [1, 1.25] });
    else if (mem <= 8 || cores <= 8) setQ({ tier: "mid", dpr: [1, 1.5] });
  }, []);
  return q;
}

// ── Shared GLSL Logic (Noise + Wave Math) ──
const WAVE_GLSL = /* glsl */ `
uniform float uTime;
uniform float uFlowSpeed;
uniform float uAmp;
uniform vec3 uCursor;
uniform float uCursorStrength;
uniform float uCursorRadius;

// Simplex 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); 
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ; m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct WaveData {
  vec3 pos;
  float height;
  float spine;
  float turb;
};

WaveData computeWave(float x, float z) {
  float t = uTime * uFlowSpeed;
  
  // 1. Grid Distortion (Breaks perfection, creates stretching/compression)
  float dx = snoise(vec2(x * 0.06, z * 0.06)) * 3.0;
  float dz = snoise(vec2(x * 0.06 + 15.3, z * 0.06 + 7.5)) * 3.0;
  x += dx;
  z += dz;
  
  // 2. Diagonal Flow
  float flowX = x + t * 2.5;
  float flowZ = z - t * 1.8;
  
  // 3. Energy Spine (Focal Point) - Twisting directional curve
  float spinePath = sin(x * 0.15 + t * 0.4) * 4.0 + x * 0.3;
  float distToSpine = abs(z - spinePath);
  float spine = exp(-distToSpine * distToSpine * 0.06); // 0 to 1 intensity
  
  // 4. Micro Turbulence & Main Waves
  float w1 = sin(flowX * 0.12 + flowZ * 0.18) * 1.5;
  float w2 = cos(flowX * 0.25 - flowZ * 0.1) * 1.0;
  float turb = snoise(vec2(flowX * 0.4, flowZ * 0.4)) * 0.6;
  turb += snoise(vec2(flowX * 0.8, flowZ * 0.8)) * 0.3;
  
  // 5. Combine: Valleys calm, spine chaotic and lifted
  float y = (w1 + w2) * (0.4 + spine * 0.6) + turb * (0.2 + spine * 1.5);
  y += spine * 4.0; // Lift the spine significantly
  y *= uAmp;

  // 6. Cursor disruption
  float cR2 = uCursorRadius * uCursorRadius;
  if (uCursor.z > 0.001) {
    float cx = x - uCursor.x;
    float cz = z - uCursor.y;
    float d2 = cx * cx + cz * cz;
    if (d2 < cR2 * 4.0) y += exp(-d2 / cR2) * uCursor.z * uCursorStrength * 3.0;
  }
  
  WaveData d;
  d.pos = vec3(x, y, z);
  d.height = y;
  d.spine = spine;
  d.turb = turb;
  return d;
}

float normHeight(float y) {
  return clamp((y + 3.0) / 8.0, 0.0, 1.0);
}
`;

// ── Dot Shaders ──
const DOT_VERT = WAVE_GLSL + /* glsl */ `
uniform float uPointSize;
attribute float aRandom;
varying float vH;
varying float vSpine;
varying float vRand;
void main() {
  WaveData d = computeWave(position.x, position.z);
  vH = normHeight(d.height);
  vSpine = d.spine;
  vRand = aRandom;
  vec4 mv = modelViewMatrix * vec4(d.pos, 1.0);
  
  // Particles vary in size, massively boosted at spine
  float sizeBoost = 0.5 + aRandom * 1.5 + pow(d.spine, 1.5) * 4.0;
  gl_PointSize = uPointSize * sizeBoost * (150.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const DOT_FRAG = /* glsl */ `
uniform float uTime;
varying float vH;
varying float vSpine;
varying float vRand;

uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorBright;
uniform vec3 uColorSpine;
uniform vec3 uColorCore;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  
  // Randomize glow softness per particle
  float glowDecay = mix(15.0, 40.0, vRand);
  float glow = exp(-d * d * glowDecay);

  vec3 color;
  if (vH < 0.3) color = mix(uColorDeep, uColorMid, vH / 0.3);
  else if (vH < 0.6) color = mix(uColorMid, uColorBright, (vH - 0.3) / 0.3);
  else color = mix(uColorBright, uColorSpine, (vH - 0.6) / 0.4);
  
  // Intense brightness at the focal spine
  color = mix(color, uColorCore, pow(vSpine, 2.0));

  // Opacity: extremely dim in valleys, bright at spine, random variation
  float baseAlpha = mix(0.01, 0.15, vRand);
  float alpha = baseAlpha + pow(vSpine, 1.5) * 0.85;
  alpha *= glow;

  gl_FragColor = vec4(color, alpha);
}
`;

// ── Line Shaders ──
const LINE_VERT = WAVE_GLSL + /* glsl */ `
attribute float aRandom;
varying float vH;
varying float vSpine;
varying float vRand;
void main() {
  WaveData d = computeWave(position.x, position.z);
  vH = normHeight(d.height);
  vSpine = d.spine;
  vRand = aRandom;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(d.pos, 1.0);
}
`;

const LINE_FRAG = /* glsl */ `
uniform float uLineOpacity;
varying float vH;
varying float vSpine;
varying float vRand;

uniform vec3 uColorLineDark;
uniform vec3 uColorLineBright;
uniform vec3 uColorLineSpine;
uniform vec3 uColorLineCore;

void main() {
  vec3 color;
  if (vH < 0.4) color = mix(uColorLineDark, uColorLineBright, vH / 0.4);
  else color = mix(uColorLineBright, uColorLineSpine, (vH - 0.4) / 0.6);
  color = mix(color, uColorLineCore, pow(vSpine, 2.0));

  // Lines broken/randomized, brightest at spine
  float alpha = (0.01 + pow(vSpine, 2.0) * 0.9) * mix(0.3, 1.0, vRand) * uLineOpacity;
  gl_FragColor = vec4(color, alpha);
}
`;

// ── Haze/Fog Layer Shader ──
const FOG_VERT = WAVE_GLSL + /* glsl */ `
varying float vSpine;
varying vec2 vUv;
void main() {
  vUv = uv;
  // Map UV to world bounds
  float x = (uv.x - 0.5) * 70.0;
  float z = (uv.y - 0.5) * 50.0;
  WaveData d = computeWave(x, z);
  vSpine = d.spine;
  vec3 pos = vec3(x, d.height - 1.0, z); // Shifted down
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FOG_FRAG = /* glsl */ `
varying float vSpine;
varying vec2 vUv;

uniform vec3 uColorFogEdge;
uniform vec3 uColorFogCore;

void main() {
  vec3 color = mix(uColorFogEdge, uColorFogCore, vSpine);
  
  float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x)
                 * smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  
  float alpha = (0.05 + vSpine * 0.25) * edgeFade;
  gl_FragColor = vec4(color, alpha);
}
`;

// ── Ambient Floating Particles ──
const AMB_VERT = /* glsl */ `
uniform float uTime;
attribute float aPhase;
attribute float aSize;
attribute float aSpeed;
varying float vA;
void main() {
  vec3 p = position;
  float t = uTime * aSpeed * 0.3;
  // Flow diagonally over time, wrapping around
  p.x = mod(position.x + t * 6.0 + 40.0, 80.0) - 40.0;
  p.z = mod(position.z - t * 4.0 + 25.0, 50.0) - 25.0;
  p.y += sin(p.x * 0.2 + p.z * 0.2 + t) * 3.0; // organic bobbing
  
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * (200.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
  vA = 0.1 + 0.9 * (0.5 + 0.5 * sin(t * 5.0 + aPhase * 4.0));
}
`;
const AMB_FRAG = /* glsl */ `
varying float vA;
uniform vec3 uColorAmbient;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float a = exp(-d * d * 25.0);
  gl_FragColor = vec4(uColorAmbient, a * vA * 0.25);
}
`;

// ── React Components ──

function AmbientParticles({ tier, themeConfig }: { tier: string; themeConfig: ColorThemeConfig }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const N = tier === "low" ? 300 : tier === "mid" ? 800 : 1500;
  const { pos, ph, sz, sp } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const ph = new Float32Array(N);
    const sz = new Float32Array(N);
    const sp = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random()-0.5)*80;
      pos[i*3+1] = (Math.random()-0.5)*30;
      pos[i*3+2] = (Math.random()-0.5)*50;
      ph[i] = Math.random()*6.28;
      sz[i] = 0.5 + Math.random()*3;
      sp[i] = 0.5 + Math.random();
    }
    return { pos, ph, sz, sp };
  }, [N]);
  const u = useMemo(() => ({ 
    uTime: { value: 0 },
    uColorAmbient: { value: new THREE.Color(themeConfig.ambient) }
  }), []);
  useFrame(({ clock }) => { 
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uColorAmbient.value.set(themeConfig.ambient);
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
      <shaderMaterial ref={matRef} vertexShader={AMB_VERT} fragmentShader={AMB_FRAG}
        uniforms={u} transparent depthWrite={false} blending={themeConfig.background === "#f0fdf7" ? THREE.NormalBlending : THREE.AdditiveBlending} />
    </points>
  );
}

function WaveField({
  controls, tier, pointer, themeConfig,
}: {
  controls: WaveControls;
  tier: "low" | "mid" | "high";
  pointer: React.MutableRefObject<{ x: number; z: number; strength: number }>;
  themeConfig: ColorThemeConfig;
}) {
  const dotMatRef = useRef<THREE.ShaderMaterial>(null!);
  const lineMatRef = useRef<THREE.ShaderMaterial>(null!);
  const fogMatRef = useRef<THREE.ShaderMaterial>(null!);

  const CX = tier === "low" ? 150 : tier === "mid" ? 250 : 350;
  const CZ = tier === "low" ? 150 : tier === "mid" ? 250 : 350;
  const W = 70, H = 50;

  const { dotPos, dotRand, linePos, lineRand } = useMemo(() => {
    const dotPos = new Float32Array(CX * CZ * 3);
    const dotRand = new Float32Array(CX * CZ);
    const linePos = new Float32Array(CZ * (CX - 1) * 2 * 3);
    const lineRand = new Float32Array(CZ * (CX - 1) * 2);
    
    const sx = W / CX, sz = H / CZ;
    let di = 0, dr = 0, li = 0, lr = 0;
    
    for (let iz = 0; iz < CZ; iz++) {
      const z = iz * sz - H / 2;
      for (let ix = 0; ix < CX; ix++) {
        const x = ix * sx - W / 2;
        dotPos[di++] = x; dotPos[di++] = 0; dotPos[di++] = z;
        dotRand[dr++] = Math.random();
        
        if (ix < CX - 1) {
          const x2 = (ix + 1) * sx - W / 2;
          linePos[li++] = x; linePos[li++] = 0; linePos[li++] = z;
          linePos[li++] = x2; linePos[li++] = 0; linePos[li++] = z;
          const r = Math.random();
          lineRand[lr++] = r; lineRand[lr++] = r;
        }
      }
    }
    return { dotPos, dotRand, linePos, lineRand };
  }, [CX, CZ, W, H]);

  const makeUniforms = () => ({
    uTime: { value: 0 },
    uFlowSpeed: { value: 0.55 },
    uAmp: { value: 1.2 },
    uCursor: { value: new THREE.Vector3(0, 0, 0) },
    uCursorStrength: { value: 0.7 },
    uCursorRadius: { value: 3.5 },

    // Dot Colors
    uColorDeep: { value: new THREE.Color(themeConfig.deep) },
    uColorMid: { value: new THREE.Color(themeConfig.mid) },
    uColorBright: { value: new THREE.Color(themeConfig.bright) },
    uColorSpine: { value: new THREE.Color(themeConfig.spine) },
    uColorCore: { value: new THREE.Color(themeConfig.core) },

    // Line Colors
    uColorLineDark: { value: new THREE.Color(themeConfig.lineDark) },
    uColorLineBright: { value: new THREE.Color(themeConfig.lineBright) },
    uColorLineSpine: { value: new THREE.Color(themeConfig.lineSpine) },
    uColorLineCore: { value: new THREE.Color(themeConfig.lineCore) },

    // Fog Colors
    uColorFogEdge: { value: new THREE.Color(themeConfig.fogEdge) },
    uColorFogCore: { value: new THREE.Color(themeConfig.fogCore) },
  });

  const dotUniforms = useMemo(() => ({ ...makeUniforms(), uPointSize: { value: 0.5 } }), []);
  const lineUniforms = useMemo(() => ({ ...makeUniforms(), uLineOpacity: { value: 0.8 } }), []);
  const fogUniforms = useMemo(() => makeUniforms(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = pointer.current;
    p.strength *= Math.max(0, 1 - controls.cursorRecovery * 0.05);

    for (const mat of [dotMatRef.current, lineMatRef.current, fogMatRef.current]) {
      if (!mat) continue;
      const u = mat.uniforms;
      u.uTime.value = t;
      u.uFlowSpeed.value = controls.flowSpeed;
      u.uAmp.value = controls.amp;
      u.uCursorStrength.value = controls.cursorStrength;
      u.uCursorRadius.value = controls.cursorRadius;
      u.uCursor.value.set(p.x, p.z, p.strength);
    }
    if (dotMatRef.current) {
      dotMatRef.current.uniforms.uPointSize.value = controls.pointSize;
      dotMatRef.current.uniforms.uColorDeep.value.set(themeConfig.deep);
      dotMatRef.current.uniforms.uColorMid.value.set(themeConfig.mid);
      dotMatRef.current.uniforms.uColorBright.value.set(themeConfig.bright);
      dotMatRef.current.uniforms.uColorSpine.value.set(themeConfig.spine);
      dotMatRef.current.uniforms.uColorCore.value.set(themeConfig.core);
    }
    if (lineMatRef.current) {
      lineMatRef.current.uniforms.uLineOpacity.value = controls.lineOpacity;
      lineMatRef.current.uniforms.uColorLineDark.value.set(themeConfig.lineDark);
      lineMatRef.current.uniforms.uColorLineBright.value.set(themeConfig.lineBright);
      lineMatRef.current.uniforms.uColorLineSpine.value.set(themeConfig.lineSpine);
      lineMatRef.current.uniforms.uColorLineCore.value.set(themeConfig.lineCore);
    }
    if (fogMatRef.current) {
      fogMatRef.current.uniforms.uColorFogEdge.value.set(themeConfig.fogEdge);
      fogMatRef.current.uniforms.uColorFogCore.value.set(themeConfig.fogCore);
    }
  });

  return (
    <group scale={controls.scale}>
      {/* Background Energy Haze */}
      <mesh position={[0, -0.5, 0]}>
        <planeGeometry args={[1, 1, tier==="high"?128:64, tier==="high"?128:64]} />
        <shaderMaterial ref={fogMatRef} vertexShader={FOG_VERT} fragmentShader={FOG_FRAG}
          uniforms={fogUniforms} transparent depthWrite={false} blending={themeConfig.background === "#f0fdf7" ? THREE.NormalBlending : THREE.AdditiveBlending}
          side={THREE.DoubleSide} />
      </mesh>
      
      {/* Energy Threads */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[lineRand, 1]} />
        </bufferGeometry>
        <shaderMaterial ref={lineMatRef} vertexShader={LINE_VERT} fragmentShader={LINE_FRAG}
          uniforms={lineUniforms} transparent depthWrite={false} blending={themeConfig.background === "#f0fdf7" ? THREE.NormalBlending : THREE.AdditiveBlending} />
      </lineSegments>
      
      {/* Energy Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPos, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[dotRand, 1]} />
        </bufferGeometry>
        <shaderMaterial ref={dotMatRef} vertexShader={DOT_VERT} fragmentShader={DOT_FRAG}
          uniforms={dotUniforms} transparent depthWrite={false} blending={themeConfig.background === "#f0fdf7" ? THREE.NormalBlending : THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

function CameraRig({ c }: { c: WaveControls }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * c.orbitSpeed;
    camera.position.set(c.camX + Math.sin(t) * c.orbitAmount, c.camY + Math.cos(t*0.7) * c.orbitAmount * 0.2, c.camZ);
    camera.lookAt(c.targetX, c.targetY, 0);
    const pc = camera as THREE.PerspectiveCamera;
    if (pc.fov !== c.fov) { pc.fov = c.fov; pc.updateProjectionMatrix(); }
  });
  return null;
}

function Scene({ controls, tier, pointer, transparent }: {
  controls: WaveControls; tier: "low"|"mid"|"high";
  pointer: React.MutableRefObject<{x:number;z:number;strength:number}>;
  transparent?: boolean;
}) {
  const themeConfig = THEMES[controls.colorTheme] || THEMES.normal;
  const isLightTheme = themeConfig.background === "#f0fdf7";
  const fogColor = transparent ? (isLightTheme ? "#f0fdf7" : "#070708") : themeConfig.background;

  if (controls.disableWave) {
    return (
      <>
        {!transparent && <color attach="background" args={[themeConfig.background]} />}
        <CameraRig c={controls} />
      </>
    );
  }

  return (
    <>
      {!transparent && <color attach="background" args={[themeConfig.background]} />}
      <fog attach="fog" args={[fogColor, 20, 60]} />
      <CameraRig c={controls} />
      <AmbientParticles tier={tier} themeConfig={themeConfig} />
      <WaveField controls={controls} tier={tier} pointer={pointer} themeConfig={themeConfig} />
      {controls.glowIntensity > 0.01 && (
        <EffectComposer multisampling={tier === "low" ? 0 : 2}>
          <Bloom mipmapBlur intensity={controls.glowIntensity}
            luminanceThreshold={controls.glowThreshold} luminanceSmoothing={0.8} radius={0.8} />
        </EffectComposer>
      )}
    </>
  );
}

export function HeroWaveBackground({
  className = "absolute inset-0", 
  showControls = false,
  colorTheme = "normal",
  disableWave = false,
  flowSpeed,
  amp,
  pointSize,
  lineOpacity,
  camX,
  camY,
  camZ,
  fov,
  targetX,
  targetY,
  scale,
  orbitAmount,
  orbitSpeed,
  glowIntensity,
  glowThreshold,
  cursorStrength,
  cursorRadius,
  cursorRecovery,
  transparent,
}: HeroWaveBackgroundProps) {
  const { tier, dpr } = useDeviceQuality();
  const pointer = useRef({ x: 0, z: 0, strength: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const controls = useControls({
    Theme: folder({
      colorTheme: {
        value: colorTheme,
        options: ["normal", "neon", "metallic", "matt", "disabled", "lightEmerald"],
      },
      disableWave: {
        value: disableWave,
      },
    }),
    Wave: folder({
      flowSpeed: { value: flowSpeed ?? 0.35, min: 0, max: 3, step: 0.05 },
      amp: { value: amp ?? 1.0, min: 0.2, max: 3, step: 0.05 },
    }),
    Particles: folder({
      pointSize: { value: pointSize ?? 1.5, min: 0.1, max: 8, step: 0.1 },
      lineOpacity: { value: lineOpacity ?? 0.6, min: 0, max: 2, step: 0.05 },
    }),
    Camera: folder({
      camX: { value: camX ?? 14, min: -20, max: 20, step: 0.1 },
      camY: { value: 6, min: -10, max: 20, step: 0.1 },
      camZ: { value: camZ ?? 18, min: 2, max: 40, step: 0.1 },
      fov: { value: fov ?? 50, min: 20, max: 90, step: 1 },
      targetX: { value: targetX ?? -2, min: -10, max: 10, step: 0.1 },
      targetY: { value: targetY ?? 0, min: -10, max: 10, step: 0.1 },
      scale: { value: scale ?? 1, min: 0.3, max: 3, step: 0.05 },
      orbitAmount: { value: orbitAmount ?? 0.3, min: 0, max: 4, step: 0.05 },
      orbitSpeed: { value: orbitSpeed ?? 0.05, min: 0, max: 1.5, step: 0.01 },
    }),
    Glow: folder({
      glowIntensity: { value: glowIntensity ?? 1.5, min: 0, max: 5, step: 0.05 },
      glowThreshold: { value: glowThreshold ?? 0.4, min: 0, max: 1, step: 0.01 },
    }),
    Cursor: folder({
      cursorStrength: { value: cursorStrength ?? 1.0, min: 0, max: 3, step: 0.05 },
      cursorRadius: { value: cursorRadius ?? 4.0, min: 0.5, max: 12, step: 0.1 },
      cursorRecovery: { value: cursorRecovery ?? 0.6, min: 0.05, max: 3, step: 0.05 },
    }),
  }) as WaveControls;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width * 2 - 1) * 14;
      pointer.current.z = -(((e.clientY - r.top) / r.height) * 2 - 1) * 8 + 2;
      pointer.current.strength = Math.min(1, pointer.current.strength + 0.3);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const themeConfig = THEMES[controls.colorTheme] || THEMES.normal;

  return (
    <div ref={containerRef} className={className} style={{ background: transparent ? "transparent" : themeConfig.background }}>
      {showControls && <Leva collapsed={false} oneLineLabels titleBar={{ title: "Wave Studio" }} />}
      {!showControls && <Leva hidden />}
      <Canvas dpr={dpr} camera={{ position: [14, 6, 18], fov: 50 }}
        frameloop={isInView ? "always" : "never"}
        gl={{ antialias: tier !== "low", alpha: transparent, powerPreference: "high-performance" }}>
        <Scene controls={controls} tier={tier} pointer={pointer} transparent={transparent} />
      </Canvas>
    </div>
  );
}

export default HeroWaveBackground;
