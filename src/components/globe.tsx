'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const globeRef = useRef<any>(null);
  const frameRef = useRef<number>(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotationSpeed = useRef({ x: 0.002, y: 0.001 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const init = useCallback(async () => {
    if (!containerRef.current) return;

    const THREE = await import('three');

    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 2.8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Custom shader material for the globe
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#0a2e1a') },
        uColor2: { value: new THREE.Color('#1a5c3a') },
        uGlow: { value: new THREE.Color('#36f4a4') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uGlow;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simplex-like noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          // Fresnel edge glow
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);

          // Grid lines (latitude/longitude)
          float lat = abs(sin(vUv.y * 3.14159 * 12.0));
          float lon = abs(sin(vUv.x * 3.14159 * 24.0));
          float grid = smoothstep(0.96, 1.0, lat) + smoothstep(0.96, 1.0, lon);
          grid *= 0.15;

          // Continent-like noise pattern
          float n = noise(vUv * 8.0 + uTime * 0.05);
          float n2 = noise(vUv * 16.0 - uTime * 0.03);
          float continents = smoothstep(0.45, 0.55, n * 0.7 + n2 * 0.3);

          // Base color mix
          vec3 baseColor = mix(uColor1, uColor2, continents * 0.8);

          // Add grid
          baseColor += vec3(grid) * uGlow * 0.5;

          // Add animated dots (cities)
          float dots = 0.0;
          for (int i = 0; i < 8; i++) {
            vec2 dotPos = vec2(
              hash(vec2(float(i) * 1.3, 0.5)),
              hash(vec2(0.5, float(i) * 1.7))
            );
            float d = distance(vUv, dotPos);
            float pulse = sin(uTime * 2.0 + float(i) * 1.5) * 0.5 + 0.5;
            dots += smoothstep(0.015, 0.005, d) * pulse;
          }
          baseColor += uGlow * dots * 0.8;

          // Edge glow
          baseColor += uGlow * fresnel * 0.4;

          // Atmosphere
          float atmosphere = fresnel * 0.6;
          baseColor += uGlow * atmosphere * 0.3;

          gl_FragColor = vec4(baseColor, 0.95 - fresnel * 0.3);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });

    const globe = new THREE.Mesh(geometry, globeMaterial);
    globe.rotation.x = 0.3;
    scene.add(globe);
    globeRef.current = globe;

    // Atmosphere glow ring
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uGlow: { value: new THREE.Color('#36f4a4') },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uGlow;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(uGlow, intensity * 0.4);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Connection arcs
    const arcGroup = new THREE.Group();
    scene.add(arcGroup);

    const createArc = (startLat: number, startLon: number, endLat: number, endLon: number) => {
      const toCartesian = (lat: number, lon: number, r: number) => {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      const start = toCartesian(startLat, startLon, 1.01);
      const end = toCartesian(endLat, endLon, 1.01);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(1.0 + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('#36f4a4'),
        transparent: true,
        opacity: 0.35,
      });
      return new THREE.Line(lineGeometry, lineMaterial);
    };

    // Add some connection arcs (Turkey-centric)
    const arcs = [
      [39, 35, 51, 0],      // Turkey → UK
      [39, 35, 48, 2],      // Turkey → France
      [39, 35, 52, 13],     // Turkey → Germany
      [39, 35, 40, -74],    // Turkey → USA
      [39, 35, 35, 139],    // Turkey → Japan
      [39, 35, 55, 37],     // Turkey → Russia
      [39, 35, 25, 55],     // Turkey → UAE
    ];
    arcs.forEach(([sLat, sLon, eLat, eLon]) => {
      arcGroup.add(createArc(sLat, sLon, eLat, eLon));
    });

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x36f4a4, 1.5, 10);
    pointLight.position.set(3, 2, 3);
    scene.add(pointLight);

    // Particles (stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x36f4a4,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Auto-rotate + drag
      if (!isDragging.current) {
        globe.rotation.y += rotationSpeed.current.x;
      }
      globe.rotation.y += targetRotation.current.x * 0.05;
      globe.rotation.x += targetRotation.current.y * 0.05;
      targetRotation.current.x *= 0.92;
      targetRotation.current.y *= 0.92;

      arcGroup.rotation.y = globe.rotation.y;
      arcGroup.rotation.x = globe.rotation.x;
      atmosphere.rotation.y = globe.rotation.y;
      atmosphere.rotation.x = globe.rotation.x;

      // Update shader time
      (globe.material as any).uniforms.uTime.value = time;

      // Pulse arcs
      arcGroup.children.forEach((arc, i) => {
        const mat = (arc as any).material;
        mat.opacity = 0.2 + Math.sin(time * 2 + i * 0.8) * 0.15;
      });

      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Mouse/touch interaction
    const canvas = renderer.domElement;
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;
      targetRotation.current.x = dx * 0.003;
      targetRotation.current.y = dy * 0.003;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerUp);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    init().then((c) => { cleanup = c; });
    return () => { cleanup?.(); };
  }, [init]);

  return <div ref={containerRef} className="w-full h-full" />;
}
