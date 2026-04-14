import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 80;

    const COUNT  = 130;
    const RANGE  = 110;
    const positions  = [];
    const velocities = [];

    for (let i = 0; i < COUNT; i++) {
      positions.push({
        x: (Math.random() - 0.5) * RANGE,
        y: (Math.random() - 0.5) * RANGE,
        z: (Math.random() - 0.5) * 30,
      });
      velocities.push({
        x: (Math.random() - 0.5) * 0.035,
        y: (Math.random() - 0.5) * 0.035,
      });
    }

    const dotPositions = new Float32Array(COUNT * 3);
    positions.forEach((p, i) => {
      dotPositions[i * 3]     = p.x;
      dotPositions[i * 3 + 1] = p.y;
      dotPositions[i * 3 + 2] = p.z;
    });

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xb89fff, size: 0.65, transparent: true, opacity: 0.75,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    const maxLines    = COUNT * COUNT;
    const linePos     = new Float32Array(maxLines * 6);
    const lineCol     = new Float32Array(maxLines * 6);
    const lineGeo     = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineCol, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMesh = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.22,
    }));
    scene.add(lineMesh);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const CONNECT = 24;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      positions.forEach((p, i) => {
        p.x += velocities[i].x;
        p.y += velocities[i].y;
        if (Math.abs(p.x) > RANGE / 2) velocities[i].x *= -1;
        if (Math.abs(p.y) > RANGE / 2) velocities[i].y *= -1;
        dotPositions[i * 3]     = p.x;
        dotPositions[i * 3 + 1] = p.y;
      });
      dotGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let a = 0; a < COUNT; a++) {
        for (let b = a + 1; b < COUNT; b++) {
          const dx   = positions[a].x - positions[b].x;
          const dy   = positions[a].y - positions[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            const al = (1 - dist / CONNECT) * 0.6;
            linePos[li*6]   = positions[a].x; linePos[li*6+1] = positions[a].y; linePos[li*6+2] = positions[a].z;
            linePos[li*6+3] = positions[b].x; linePos[li*6+4] = positions[b].y; linePos[li*6+5] = positions[b].z;
            lineCol[li*6]   = 0.47*al; lineCol[li*6+1] = 0.37*al; lineCol[li*6+2] = al;
            lineCol[li*6+3] = 0.47*al; lineCol[li*6+4] = 0.37*al; lineCol[li*6+5] = al;
            li++;
          }
        }
      }
      lineGeo.setDrawRange(0, li * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 6 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}