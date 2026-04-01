'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const init = useCallback(async () => {
    if (!containerRef.current) return;

    const THREE = await import('three');

    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 2.6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // ── Earth textures (NASA Blue Marble) ──
    const earthDayMap = textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'
    );
    const earthNightMap = textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg'
    );
    const earthBumpMap = textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
    );

    // ── Globe with day/night shader ──
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: earthDayMap },
        uNightMap: { value: earthNightMap },
        uBumpMap: { value: earthBumpMap },
        uTime: { value: 0 },
        uSunDir: { value: new THREE.Vector3(1.5, 0.5, 1.0).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform float uTime;
        uniform vec3 uSunDir;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          vec3 dayColor = texture2D(uDayMap, vUv).rgb;
          vec3 nightColor = texture2D(uNightMap, vUv).rgb;

          // Sun lighting
          float sunDot = dot(vNormal, uSunDir);
          float dayFactor = smoothstep(-0.15, 0.3, sunDot);

          // Mix day/night
          vec3 color = mix(nightColor * 1.3, dayColor, dayFactor);

          // Slight teal tint to ocean areas (darker regions)
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          vec3 tealTint = vec3(0.05, 0.18, 0.22);
          color = mix(color, color + tealTint * 0.3, smoothstep(0.0, 0.15, 1.0 - luminance) * (1.0 - dayFactor));

          // City lights glow on night side (golden)
          float nightGlow = (1.0 - dayFactor) * nightColor.r;
          color += vec3(1.0, 0.75, 0.3) * nightGlow * 0.6;

          // Fresnel edge atmosphere
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          vec3 atmosColor = vec3(0.2, 0.6, 0.9);
          color += atmosColor * fresnel * 0.35;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.x = 0.25;
    // Start facing Turkey (lon ~35°)
    globe.rotation.y = -0.6;
    scene.add(globe);

    // ── Atmosphere outer glow ──
    const atmoGeo = new THREE.SphereGeometry(1.06, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
          vec3 color = mix(vec3(0.15, 0.5, 0.8), vec3(0.2, 0.95, 0.6), 0.3);
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmosphere);

    // ── Connection arcs (Turkey-centric, golden/green) ──
    const arcGroup = new THREE.Group();
    scene.add(arcGroup);

    const toCartesian = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const createArc = (sLat: number, sLon: number, eLat: number, eLon: number, color: string) => {
      const start = toCartesian(sLat, sLon, 1.005);
      const end = toCartesian(eLat, eLon, 1.005);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(1.0 + dist * 0.4);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.5,
      });
      return new THREE.Line(geo, mat);
    };

    const arcData = [
      [39, 35, 51.5, -0.1, '#ffffff'],   // Turkey → London
      [39, 35, 48.8, 2.3, '#36f4a4'],    // Turkey → Paris
      [39, 35, 52.5, 13.4, '#ffffff'],    // Turkey → Berlin
      [39, 35, 40.7, -74, '#ffaa44'],     // Turkey → NYC
      [39, 35, 35.7, 139.7, '#36f4a4'],   // Turkey → Tokyo
      [39, 35, 25.2, 55.3, '#ffaa44'],    // Turkey → Dubai
      [39, 35, 55.7, 37.6, '#ffffff'],    // Turkey → Moscow
      [39, 35, 41.0, 29.0, '#36f4a4'],    // Ankara → Istanbul
    ];
    arcData.forEach(([sLat, sLon, eLat, eLon, color]) => {
      arcGroup.add(createArc(sLat as number, sLon as number, eLat as number, eLon as number, color as string));
    });

    // ── Star icon sprites that burst/pop around the globe ──
    const starIconTexture = textureLoader.load('/logo/star_icon.png');

    interface StarSprite {
      mesh: THREE.Sprite;
      life: number;
      maxLife: number;
      velocity: THREE.Vector3;
      startPos: THREE.Vector3;
      scale: number;
    }

    const starSprites: StarSprite[] = [];
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const spawnStar = () => {
      const spriteMat = new THREE.SpriteMaterial({
        map: starIconTexture,
        transparent: true,
        opacity: 0,
        color: new THREE.Color().setHSL(0.12 + Math.random() * 0.15, 0.9, 0.65),
      });
      const sprite = new THREE.Sprite(spriteMat);

      // Random position on globe surface
      const lat = (Math.random() - 0.5) * 140;
      const lon = (Math.random() - 0.5) * 360;
      const pos = toCartesian(lat, lon, 1.08);
      sprite.position.copy(pos);

      const outward = pos.clone().normalize();
      const velocity = outward.multiplyScalar(0.008 + Math.random() * 0.012);
      velocity.x += (Math.random() - 0.5) * 0.004;
      velocity.y += (Math.random() - 0.5) * 0.004;

      const scale = 0.04 + Math.random() * 0.04;
      sprite.scale.set(0, 0, 0);

      starGroup.add(sprite);
      starSprites.push({
        mesh: sprite,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        velocity,
        startPos: pos.clone(),
        scale,
      });
    };

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 2, 4);
    scene.add(sunLight);
    const backLight = new THREE.PointLight(0x36f4a4, 0.4, 8);
    backLight.position.set(-3, -1, -3);
    scene.add(backLight);

    // ── Background stars ──
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 12;
      starPositions[i + 1] = (Math.random() - 0.5) * 12;
      starPositions[i + 2] = -3 - Math.random() * 8;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    scene.add(new THREE.Points(starsGeo, starsMat));

    // ── Animation loop ──
    let time = 0;
    let spawnTimer = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.008;
      spawnTimer++;

      // Auto-rotate
      if (!isDragging.current) {
        globe.rotation.y += 0.0015;
      }
      globe.rotation.y += targetRotation.current.x * 0.05;
      globe.rotation.x += targetRotation.current.y * 0.05;
      targetRotation.current.x *= 0.93;
      targetRotation.current.y *= 0.93;

      // Sync
      arcGroup.rotation.copy(globe.rotation);
      atmosphere.rotation.copy(globe.rotation);
      starGroup.rotation.copy(globe.rotation);

      // Shader time
      (globe.material as any).uniforms.uTime.value = time;

      // Pulse arcs
      arcGroup.children.forEach((arc, i) => {
        (arc as any).material.opacity = 0.25 + Math.sin(time * 3 + i * 1.2) * 0.2;
      });

      // Spawn star icons periodically (burst of 1-3)
      if (spawnTimer % 45 === 0) {
        const count = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          spawnStar();
        }
      }

      // Update star sprites
      for (let i = starSprites.length - 1; i >= 0; i--) {
        const s = starSprites[i];
        s.life++;
        const t = s.life / s.maxLife;

        // Fade in → hold → fade out
        let opacity = 0;
        if (t < 0.15) opacity = t / 0.15;
        else if (t < 0.6) opacity = 1;
        else opacity = 1 - (t - 0.6) / 0.4;

        // Scale pop: quick grow then shrink
        let scaleT = 0;
        if (t < 0.1) scaleT = t / 0.1 * 1.3;
        else if (t < 0.2) scaleT = 1.3 - (t - 0.1) / 0.1 * 0.3;
        else scaleT = 1.0 - (t - 0.2) * 0.5;

        const sc = s.scale * Math.max(0, scaleT);
        s.mesh.scale.set(sc, sc, sc);
        (s.mesh.material as any).opacity = Math.max(0, opacity) * 0.85;

        // Move outward
        s.mesh.position.add(s.velocity);

        // Remove dead
        if (s.life >= s.maxLife) {
          starGroup.remove(s.mesh);
          (s.mesh.material as any).dispose();
          starSprites.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.offsetWidth;
      const nh = containerRef.current.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // ── Pointer interaction ──
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
