'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  const init = useCallback(async (signal: { cancelled: boolean }) => {
    if (!containerRef.current) return;

    // Remove any existing canvases from previous mounts
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const THREE = await import('three');

    // Check if cancelled during async import
    if (signal.cancelled || !containerRef.current) return;

    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const earthDayMap = textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'
    );
    const earthNightMap = textureLoader.load(
      'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg'
    );

    // Globe with teal-green tint (#64bf9f)
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: earthDayMap },
        uNightMap: { value: earthNightMap },
        uTime: { value: 0 },
        uSunDir: { value: new THREE.Vector3(1.5, 0.5, 1.0).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
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

        void main() {
          vec3 dayTex = texture2D(uDayMap, vUv).rgb;
          vec3 nightTex = texture2D(uNightMap, vUv).rgb;

          float sunDot = dot(vNormal, uSunDir);
          float dayFactor = smoothstep(-0.15, 0.3, sunDot);

          // Teal-green tint for land (#64bf9f)
          float luminance = dot(dayTex, vec3(0.299, 0.587, 0.114));
          vec3 tealGreen = vec3(0.39, 0.75, 0.62); // #64bf9f
          vec3 darkOcean = vec3(0.04, 0.1, 0.14);

          // Separate land (brighter) from ocean (darker)
          float isLand = smoothstep(0.12, 0.25, luminance);

          // Day side: teal-green land, dark ocean
          vec3 dayColor = mix(darkOcean, tealGreen * (0.6 + luminance * 0.6), isLand);

          // Night side: dark with golden city lights
          vec3 nightColor = vec3(0.01, 0.03, 0.05);
          float cityLights = nightTex.r;
          nightColor += vec3(1.0, 0.75, 0.3) * cityLights * 1.2;
          // Subtle teal glow on land at night
          nightColor += tealGreen * isLand * 0.05;

          vec3 color = mix(nightColor, dayColor, dayFactor);

          // Fresnel atmosphere edge
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          color += vec3(0.15, 0.55, 0.45) * fresnel * 0.4;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.x = 0.25;
    globe.rotation.y = -0.6; // Face Turkey
    scene.add(globe);

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(1.04, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
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
          vec3 color = vec3(0.39, 0.75, 0.62); // #64bf9f
          gl_FragColor = vec4(color, intensity * 0.45);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Connection arcs
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

    [
      [39, 35, 51.5, -0.1, '#ffffff'],
      [39, 35, 48.8, 2.3, '#64bf9f'],
      [39, 35, 52.5, 13.4, '#ffffff'],
      [39, 35, 40.7, -74, '#ffaa44'],
      [39, 35, 35.7, 139.7, '#64bf9f'],
      [39, 35, 25.2, 55.3, '#ffaa44'],
      [39, 35, 55.7, 37.6, '#ffffff'],
      [39, 35, 41.0, 29.0, '#64bf9f'],
    ].forEach(([sLat, sLon, eLat, eLon, color]) => {
      arcGroup.add(createArc(sLat as number, sLon as number, eLat as number, eLon as number, color as string));
    });

    // Star icon sprites
    const starIconTexture = textureLoader.load('/logo/star_icon.png');

    interface StarSprite {
      mesh: InstanceType<typeof THREE.Sprite>;
      life: number;
      maxLife: number;
      velocity: InstanceType<typeof THREE.Vector3>;
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
      const lat = (Math.random() - 0.5) * 140;
      const lon = (Math.random() - 0.5) * 360;
      const pos = toCartesian(lat, lon, 1.06);
      sprite.position.copy(pos);
      const outward = pos.clone().normalize();
      const velocity = outward.multiplyScalar(0.006 + Math.random() * 0.01);
      velocity.x += (Math.random() - 0.5) * 0.003;
      velocity.y += (Math.random() - 0.5) * 0.003;
      const scale = 0.035 + Math.random() * 0.035;
      sprite.scale.set(0, 0, 0);
      starGroup.add(sprite);
      starSprites.push({ mesh: sprite, life: 0, maxLife: 90 + Math.random() * 60, velocity, scale });
    };

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(5, 2, 4);
    scene.add(sunLight);
    const backLight = new THREE.PointLight(0x64bf9f, 0.3, 8);
    backLight.position.set(-3, -1, -3);
    scene.add(backLight);

    // Background stars
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 14;
      starPositions[i + 1] = (Math.random() - 0.5) * 14;
      starPositions[i + 2] = -2 - Math.random() * 10;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    })));

    // Animation
    let time = 0;
    let spawnTimer = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.008;
      spawnTimer++;

      if (!isDragging.current) {
        globe.rotation.y += 0.001; // Slow auto-rotate
      }

      // Apply drag with 1:1 feel + momentum
      globe.rotation.y += targetRotation.current.x;
      globe.rotation.x += targetRotation.current.y;
      targetRotation.current.x *= 0.95;
      targetRotation.current.y *= 0.95;

      arcGroup.rotation.copy(globe.rotation);
      starGroup.rotation.copy(globe.rotation);

      (globe.material as any).uniforms.uTime.value = time;

      // Pulse arcs
      arcGroup.children.forEach((arc, i) => {
        (arc as any).material.opacity = 0.25 + Math.sin(time * 3 + i * 1.2) * 0.2;
      });

      // Spawn stars
      if (spawnTimer % 50 === 0) {
        const count = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) spawnStar();
      }

      // Update star sprites
      for (let i = starSprites.length - 1; i >= 0; i--) {
        const s = starSprites[i];
        s.life++;
        const t = s.life / s.maxLife;
        let opacity = t < 0.15 ? t / 0.15 : t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;
        let scaleT = t < 0.1 ? t / 0.1 * 1.3 : t < 0.2 ? 1.3 - (t - 0.1) / 0.1 * 0.3 : 1.0 - (t - 0.2) * 0.5;
        const sc = s.scale * Math.max(0, scaleT);
        s.mesh.scale.set(sc, sc, sc);
        (s.mesh.material as any).opacity = Math.max(0, opacity) * 0.85;
        s.mesh.position.add(s.velocity);
        if (s.life >= s.maxLife) {
          starGroup.remove(s.mesh);
          (s.mesh.material as any).dispose();
          starSprites.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const nw = containerRef.current.offsetWidth;
      const nh = containerRef.current.offsetHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Pointer - 1:1 drag speed with momentum
    const canvas = renderer.domElement;
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      targetRotation.current = { x: 0, y: 0 };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;
      const speed = 0.006;
      targetRotation.current.x = dx * speed;
      targetRotation.current.y = dy * speed;
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
    const signal = { cancelled: false };
    let cleanup: (() => void) | undefined;
    init(signal).then((c) => {
      if (signal.cancelled) {
        c?.();
      } else {
        cleanup = c;
      }
    });
    return () => {
      signal.cancelled = true;
      cleanup?.();
      // Force remove any leftover canvases
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [init]);

  return <div ref={containerRef} className="w-full h-full" />;
}
